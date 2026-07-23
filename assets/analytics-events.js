(function () {
  'use strict';

  function sendEvent(name, parameters) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters || {});
  }

  function cleanText(value) {
    return (value || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  }

  function pageLanguage() {
    return document.documentElement.lang || 'en';
  }

  function commonParameters(link) {
    return {
      page_path: window.location.pathname,
      page_language: pageLanguage(),
      link_text: cleanText(link.textContent || link.getAttribute('aria-label'))
    };
  }

  function classifyEmailLink(url) {
    var subject = (url.searchParams.get('subject') || '').toLowerCase();
    var path = window.location.pathname;

    if (subject.indexOf('test report') !== -1) return 'test_report_request';
    if (subject.indexOf('sample') !== -1) return 'sample_request';
    if (subject.indexOf('quotation') !== -1 || subject.indexOf('rfq') !== -1) return 'rfq';
    if (path.indexOf('/textile/') !== -1) return 'product_inquiry';
    if (path.indexOf('/contact/') !== -1) return 'rfq';
    return 'general_email';
  }

  var viewedReportTabs = new WeakSet();

  document.addEventListener('click', function (event) {
    var target = event.target && event.target.nodeType === 1
      ? event.target
      : event.target.parentElement;
    if (!target || typeof target.closest !== 'function') return;

    var reportTab = target.closest('[data-detail-tab="performance"]');
    if (reportTab && !viewedReportTabs.has(reportTab)) {
      viewedReportTabs.add(reportTab);
      var product = reportTab.closest('[data-product-page]');
      sendEvent('view_test_report', {
        item_name: product ? product.getAttribute('data-product-page') : 'bamboo_fabric',
        page_path: window.location.pathname,
        page_language: pageLanguage()
      });
    }

    var link = target.closest('a[href]');
    if (!link) return;

    var rawHref = link.getAttribute('href');
    if (!rawHref) return;

    var url;
    try {
      url = new URL(rawHref, window.location.href);
    } catch (error) {
      return;
    }

    if (url.protocol === 'mailto:') {
      var inquiryType = classifyEmailLink(url);
      var emailParameters = commonParameters(link);
      emailParameters.method = 'email';
      emailParameters.inquiry_type = inquiryType;

      sendEvent('email_click', emailParameters);

      if (inquiryType !== 'general_email') {
        sendEvent('generate_lead', {
          method: 'email',
          lead_source: inquiryType,
          page_path: emailParameters.page_path,
          page_language: emailParameters.page_language
        });
        sendEvent('product_inquiry', {
          method: 'email',
          inquiry_type: inquiryType,
          page_path: emailParameters.page_path,
          page_language: emailParameters.page_language
        });
      }
      return;
    }

    var isContactPage = url.origin === window.location.origin &&
      (url.pathname === '/contact/' || url.pathname === '/zh/contact/');
    if (isContactPage && url.pathname !== window.location.pathname) {
      var contactParameters = commonParameters(link);
      contactParameters.method = 'contact_page';
      sendEvent('contact_click', contactParameters);
    }
  });
})();
