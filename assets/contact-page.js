(function () {
  'use strict';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var endpoint = 'https://formsubmit.co/ajax/sam@hlctex.com';
  var page = form.closest('[data-contact-language]');
  var language = page ? page.getAttribute('data-contact-language') : 'en';
  var status = form.querySelector('[data-contact-status]');
  var submitButton = form.querySelector('button[type="submit"]');

  var translations = {
    en: {
      required: 'Please complete all required fields.',
      sending: 'Sending your inquiry…',
      success: 'Your inquiry has been sent. We will reply to your email.',
      error: 'The inquiry could not be sent. Please try again shortly.',
      subject: 'Website fabric inquiry'
    },
    zh: {
      required: '请先填写所有必填项目。',
      sending: '正在发送您的咨询…',
      success: '您的咨询已发送，我们会通过邮件回复您。',
      error: '咨询暂时无法发送，请稍后重试。',
      subject: '网站面料咨询'
    },
    'zh-tw': {
      required: '請先填寫所有必填項目。',
      sending: '正在發送您的諮詢…',
      success: '您的諮詢已發送，我們會透過電郵回覆您。',
      error: '諮詢暫時無法發送，請稍後重試。',
      subject: '網站布料諮詢'
    },
    ja: {
      required: '必須項目をすべて入力してください。',
      sending: 'お問い合わせを送信しています…',
      success: 'お問い合わせを送信しました。メールでご返信いたします。',
      error: '送信できませんでした。しばらくしてからもう一度お試しください。',
      subject: 'ウェブサイトからの生地お問い合わせ'
    },
    ru: {
      required: 'Заполните все обязательные поля.',
      sending: 'Отправляем ваш запрос…',
      success: 'Ваш запрос отправлен. Мы ответим вам по электронной почте.',
      error: 'Не удалось отправить запрос. Повторите попытку позже.',
      subject: 'Запрос по ткани с сайта'
    },
    de: {
      required: 'Bitte füllen Sie alle Pflichtfelder aus.',
      sending: 'Ihre Anfrage wird gesendet…',
      success: 'Ihre Anfrage wurde gesendet. Wir antworten Ihnen per E-Mail.',
      error: 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
      subject: 'Stoffanfrage über die Website'
    },
    es: {
      required: 'Complete todos los campos obligatorios.',
      sending: 'Enviando su consulta…',
      success: 'Su consulta ha sido enviada. Le responderemos por correo electrónico.',
      error: 'No se pudo enviar la consulta. Inténtelo de nuevo más tarde.',
      subject: 'Consulta sobre tejidos desde el sitio web'
    },
    fr: {
      required: 'Veuillez remplir tous les champs obligatoires.',
      sending: 'Envoi de votre demande…',
      success: 'Votre demande a été envoyée. Nous vous répondrons par e-mail.',
      error: "La demande n'a pas pu être envoyée. Veuillez réessayer plus tard.",
      subject: 'Demande de tissu depuis le site web'
    }
  };

  var messages = translations[language] || translations.en;
  var honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = '_honey';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
  form.appendChild(honeypot);

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

  function setSubmitting(isSubmitting) {
    if (submitButton) submitButton.disabled = isSubmitting;
    form.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
  }

  form.addEventListener('input', function (event) {
    event.target.classList.remove('is-invalid');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    markInvalidFields();

    if (!form.checkValidity()) {
      status.textContent = messages.required;
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    status.textContent = messages.sending;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: value('name'),
        email: value('email'),
        _replyto: value('email'),
        country: value('country'),
        company: value('company'),
        message: value('message'),
        _subject: messages.subject + (value('company') ? ' - ' + value('company') : ''),
        _template: 'table',
        _honey: honeypot.value,
        _url: window.location.href
      })
    }).then(function (response) {
      if (!response.ok) throw new Error('Contact form request failed with status ' + response.status);
      return response.json();
    }).then(function (result) {
      if (result && result.success === false) throw new Error(result.message || 'Contact form submission failed');

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { method: 'contact_form', page_language: language });
      }

      form.reset();
      status.textContent = messages.success;
    }).catch(function (error) {
      console.error(error);
      status.textContent = messages.error;
    }).finally(function () {
      setSubmitting(false);
    });
  });
})();
