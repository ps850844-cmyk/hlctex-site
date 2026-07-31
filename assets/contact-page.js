(function () {
  'use strict';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var page = form.closest('[data-contact-language]');
  var language = page && page.getAttribute('data-contact-language') === 'zh' ? 'zh' : 'en';
  var status = form.querySelector('[data-contact-status]');

  function value(name) {
    var field = form.elements[name];
    if (!field) return '';
    if (field instanceof RadioNodeList) return field.value || '';
    return String(field.value || '').trim();
  }

  function markInvalidFields() {
    form.querySelectorAll('.is-invalid').forEach(function (field) {
      field.classList.remove('is-invalid');
    });
    form.querySelectorAll(':invalid').forEach(function (field) {
      if (field.matches('input[type="radio"], input[type="checkbox"]')) return;
      field.classList.add('is-invalid');
    });
  }

  form.addEventListener('input', function (event) {
    event.target.classList.remove('is-invalid');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    markInvalidFields();

    if (!form.checkValidity()) {
      status.textContent = language === 'zh' ? '请先填写所有必填项目。' : 'Please complete all required fields.';
      form.reportValidity();
      return;
    }

    var labels = language === 'zh' ? {
      subject: '网站面料咨询', name: '姓名', email: '邮箱', country: '国家或地区', buyerType: '客户类型', company: '公司名称', industry: '行业', website: '公司网址', relationship: '业务关系', representative: 'HLC 对接人员', message: '咨询内容'
    } : {
      subject: 'Website fabric inquiry', name: 'Name', email: 'Email', country: 'Country / Region', buyerType: 'Buyer type', company: 'Company', industry: 'Industry', website: 'Website', relationship: 'Relationship', representative: 'HLC representative', message: 'Inquiry details'
    };

    var body = [
      labels.name + ': ' + value('name'),
      labels.email + ': ' + value('email'),
      labels.country + ': ' + value('country'),
      labels.buyerType + ': ' + value('buyerType'),
      labels.company + ': ' + value('company'),
      labels.industry + ': ' + value('industry'),
      labels.website + ': ' + value('website'),
      labels.relationship + ': ' + value('relationship'),
      labels.representative + ': ' + value('representative'),
      '',
      labels.message + ':',
      value('message')
    ].join('\n');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { method: 'contact_form', page_language: language });
    }

    status.textContent = language === 'zh' ? '正在打开您的邮件应用…' : 'Opening your email application…';
    window.location.href = 'mailto:sam@hlctex.com?subject=' + encodeURIComponent(labels.subject + ' - ' + value('company')) + '&body=' + encodeURIComponent(body);
  });
})();
