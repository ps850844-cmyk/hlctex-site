(function () {
  'use strict';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var page = form.closest('[data-contact-language]');
  var language = page ? page.getAttribute('data-contact-language') : 'en';
  if (language !== 'zh' && language !== 'ja') language = 'en';
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
      status.textContent = language === 'zh' ? '请先填写所有必填项目。' : language === 'ja' ? '必須項目をすべて入力してください。' : 'Please complete all required fields.';
      form.reportValidity();
      return;
    }

    var labels = language === 'zh' ? {
      subject: '网站面料咨询', name: '姓名', email: '邮箱', country: '国家或地区', company: '公司名称', message: '咨询内容'
    } : language === 'ja' ? {
      subject: 'ウェブサイトからの生地お問い合わせ', name: 'お名前', email: 'メール', country: '国・地域', company: '会社名', message: 'お問い合わせ内容'
    } : {
      subject: 'Website fabric inquiry', name: 'Name', email: 'Email', country: 'Country / Region', company: 'Company', message: 'Inquiry'
    };

    var body = [
      labels.name + ': ' + value('name'),
      labels.email + ': ' + value('email'),
      labels.country + ': ' + value('country'),
      labels.company + ': ' + value('company'),
      '',
      labels.message + ':',
      value('message')
    ].join('\n');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { method: 'contact_form', page_language: language });
    }

    status.textContent = language === 'zh' ? '正在打开您的邮件应用…' : language === 'ja' ? 'メールアプリを開いています…' : 'Opening your email application…';
    window.location.href = 'mailto:sam@hlctex.com?subject=' + encodeURIComponent(labels.subject + ' - ' + value('company')) + '&body=' + encodeURIComponent(body);
  });
})();
