(function () {
  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", "G-YX56MW1TBB");

    var analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-YX56MW1TBB";
    document.head.appendChild(analyticsScript);
  }

  var gallery = document.querySelector("[data-product-gallery]");
  var mainImage = document.querySelector("[data-gallery-main]");
  var dialog = document.querySelector("[data-gallery-dialog]");
  var dialogImage = document.querySelector("[data-gallery-dialog-image]");

  if (gallery && mainImage) {
    gallery.querySelectorAll("[data-gallery-thumb]").forEach(function (button) {
      button.addEventListener("click", function () {
        var nextImage = button.getAttribute("data-image");
        var nextSrcset = button.getAttribute("data-srcset");
        var nextSizes = button.getAttribute("data-sizes");
        var fullImage = button.getAttribute("data-full-image") || nextImage;
        var nextAlt = button.getAttribute("data-alt") || "";
        if (!nextImage) return;
        mainImage.src = nextImage;
        if (nextSrcset) mainImage.setAttribute("srcset", nextSrcset);
        else mainImage.removeAttribute("srcset");
        if (nextSizes) mainImage.setAttribute("sizes", nextSizes);
        else mainImage.removeAttribute("sizes");
        mainImage.setAttribute("data-full-image", fullImage);
        mainImage.alt = nextAlt;
        gallery.querySelectorAll("[data-gallery-thumb]").forEach(function (thumb) {
          var active = thumb === button;
          thumb.classList.toggle("is-active", active);
          thumb.setAttribute("aria-selected", active ? "true" : "false");
        });
      });
    });

    var mainImageButton = gallery.querySelector("[data-gallery-open]");
    if (mainImageButton) {
      mainImageButton.addEventListener("pointermove", function (event) {
        var bounds = mainImageButton.getBoundingClientRect();
        var x = ((event.clientX - bounds.left) / bounds.width) * 100;
        var y = ((event.clientY - bounds.top) / bounds.height) * 100;
        mainImage.style.transformOrigin = x.toFixed(2) + "% " + y.toFixed(2) + "%";
      });
      mainImageButton.addEventListener("pointerleave", function () {
        mainImage.style.transformOrigin = "50% 50%";
      });
    }
  }

  function openGallery() {
    if (!dialog || !dialogImage || !mainImage) return;
    dialogImage.src = mainImage.getAttribute("data-full-image") ||
      mainImage.currentSrc || mainImage.src;
    dialogImage.alt = mainImage.alt;
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  function closeGallery() {
    if (dialog && dialog.open) dialog.close();
  }

  document.querySelectorAll("[data-gallery-open]").forEach(function (button) {
    button.addEventListener("click", openGallery);
  });
  document.querySelectorAll("[data-gallery-close]").forEach(function (button) {
    button.addEventListener("click", closeGallery);
  });
  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeGallery();
    });
  }

  document.querySelectorAll("[data-product-tabs]").forEach(function (tabs) {
    tabs.querySelectorAll("[data-product-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = button.getAttribute("data-product-tab");
        tabs.querySelectorAll("[data-product-tab]").forEach(function (tab) {
          var active = tab === button;
          tab.classList.toggle("is-active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        tabs.querySelectorAll("[data-product-panel]").forEach(function (panel) {
          var active = panel.getAttribute("data-product-panel") === target;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
      });
    });
  });

  var sampleDialog = document.querySelector("[data-sample-dialog]");
  var sampleForm = document.querySelector("[data-sample-form]");
  var sampleEmail = document.querySelector("[data-sample-email]");
  var sampleError = document.querySelector("[data-sample-error]");
  var sampleSubmit = sampleForm ? sampleForm.querySelector('button[type="submit"]') : null;
  var sampleDescription = sampleDialog ? sampleDialog.querySelector(".catalog-sample-dialog-inner > p:not(.catalog-collection-label)") : null;
  var sampleNote = sampleDialog ? sampleDialog.querySelector(".catalog-sample-dialog-inner > small") : null;
  var sampleLanguage = (document.documentElement.lang || "en").toLowerCase();
  var sampleTranslations = {
    en: {
      required: "Please enter a valid business email.",
      sending: "Sending your sample request…",
      success: "Sample request sent successfully. HLC will contact you by email.",
      error: "The sample request could not be sent. Please try again shortly.",
      button: "Send sample request",
      description: "Enter your business email. HLC will receive your email address together with this product name, Style# and page link.",
      note: "Your email address is used only to process this sample request.",
      subject: "Sample Request"
    },
    "zh-hans": {
      required: "请输入有效的商务邮箱。",
      sending: "正在发送样品申请…",
      success: "样品申请已发送，HLC 将通过邮件与您联系。",
      error: "样品申请暂时无法发送，请稍后重试。",
      button: "发送样品申请",
      description: "请输入您的公司邮箱。HLC 将收到您的邮箱、当前产品名称、型号和产品页面链接。",
      note: "您的邮箱仅用于处理本次样品申请。",
      subject: "样品申请"
    },
    "zh-hant": {
      required: "請輸入有效的商務電郵。",
      sending: "正在發送樣品申請…",
      success: "樣品申請已發送，HLC 將透過電郵與您聯繫。",
      error: "樣品申請暫時無法發送，請稍後重試。",
      button: "發送樣品申請",
      description: "請輸入您的公司電郵。HLC 將收到您的電郵、目前產品名稱、型號和產品頁面連結。",
      note: "您的電郵僅用於處理本次樣品申請。",
      subject: "樣品申請"
    },
    ko: {
      required: "유효한 업무용 이메일을 입력해 주세요.",
      sending: "샘플 요청을 보내는 중입니다…",
      success: "샘플 요청이 전송되었습니다. HLC가 이메일로 연락드리겠습니다.",
      error: "샘플 요청을 전송할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      button: "샘플 요청 보내기",
      description: "업무용 이메일을 입력해 주세요. HLC는 이메일 주소와 함께 현재 제품명, Style# 및 제품 페이지 링크를 받습니다.",
      note: "이메일 주소는 이 샘플 요청을 처리하는 용도로만 사용됩니다.",
      subject: "샘플 요청"
    },
    ja: {
      required: "有効な業務用メールアドレスを入力してください。",
      sending: "サンプル依頼を送信しています…",
      success: "サンプル依頼を送信しました。HLCよりメールでご連絡いたします。",
      error: "サンプル依頼を送信できませんでした。しばらくしてからもう一度お試しください。",
      button: "サンプル依頼を送信",
      description: "業務用メールアドレスを入力してください。現在の製品名、Style#、製品ページのリンクとともにHLCへ送信されます。",
      note: "メールアドレスは、このサンプル依頼の対応にのみ使用されます。",
      subject: "サンプル依頼"
    },
    ru: {
      required: "Введите действующий рабочий адрес электронной почты.",
      sending: "Отправляем запрос образца…",
      success: "Запрос образца отправлен. HLC свяжется с вами по электронной почте.",
      error: "Не удалось отправить запрос образца. Повторите попытку позже.",
      button: "Отправить запрос образца",
      description: "Введите рабочий e-mail. HLC получит ваш адрес вместе с названием продукта, Style# и ссылкой на страницу.",
      note: "Ваш e-mail используется только для обработки этого запроса образца.",
      subject: "Запрос образца"
    },
    de: {
      required: "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.",
      sending: "Ihre Musteranfrage wird gesendet…",
      success: "Ihre Musteranfrage wurde gesendet. HLC wird Sie per E-Mail kontaktieren.",
      error: "Die Musteranfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      button: "Musteranfrage senden",
      description: "Geben Sie Ihre geschäftliche E-Mail-Adresse ein. HLC erhält sie zusammen mit Produktname, Style# und Seitenlink.",
      note: "Ihre E-Mail-Adresse wird nur zur Bearbeitung dieser Musteranfrage verwendet.",
      subject: "Musteranfrage"
    },
    es: {
      required: "Introduzca un correo electrónico empresarial válido.",
      sending: "Enviando su solicitud de muestra…",
      success: "Su solicitud de muestra ha sido enviada. HLC se pondrá en contacto por correo electrónico.",
      error: "No se pudo enviar la solicitud de muestra. Inténtelo de nuevo más tarde.",
      button: "Enviar solicitud de muestra",
      description: "Introduzca su correo empresarial. HLC lo recibirá junto con el nombre del producto, Style# y el enlace de la página.",
      note: "Su correo electrónico se utiliza únicamente para tramitar esta solicitud de muestra.",
      subject: "Solicitud de muestra"
    },
    fr: {
      required: "Veuillez saisir une adresse e-mail professionnelle valide.",
      sending: "Envoi de votre demande d’échantillon…",
      success: "Votre demande d’échantillon a été envoyée. HLC vous contactera par e-mail.",
      error: "La demande d’échantillon n’a pas pu être envoyée. Veuillez réessayer plus tard.",
      button: "Envoyer la demande d’échantillon",
      description: "Saisissez votre e-mail professionnel. HLC le recevra avec le nom du produit, le Style# et le lien de la page.",
      note: "Votre e-mail est utilisé uniquement pour traiter cette demande d’échantillon.",
      subject: "Demande d’échantillon"
    }
  };
  var sampleMessages = sampleTranslations[sampleLanguage] || sampleTranslations.en;
  var sampleHoneypot = document.createElement("input");
  sampleHoneypot.type = "text";
  sampleHoneypot.name = "_honey";
  sampleHoneypot.tabIndex = -1;
  sampleHoneypot.autocomplete = "off";
  sampleHoneypot.setAttribute("aria-hidden", "true");
  sampleHoneypot.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;";
  if (sampleForm) sampleForm.appendChild(sampleHoneypot);
  if (sampleSubmit) sampleSubmit.textContent = sampleMessages.button;
  if (sampleDescription) sampleDescription.textContent = sampleMessages.description;
  if (sampleNote) sampleNote.textContent = sampleMessages.note;

  function setSampleStatus(message, isSuccess) {
    if (!sampleError) return;
    sampleError.textContent = message;
    sampleError.classList.toggle("is-success", Boolean(isSuccess));
  }

  function setSampleSubmitting(isSubmitting) {
    if (sampleSubmit) sampleSubmit.disabled = isSubmitting;
    if (sampleForm) sampleForm.setAttribute("aria-busy", isSubmitting ? "true" : "false");
  }

  function showSubmissionSuccess(message) {
    var existing = document.querySelector(".submission-success-notice");
    if (existing) existing.remove();

    var notice = document.createElement("div");
    notice.className = "submission-success-notice";
    notice.setAttribute("role", "alert");
    notice.setAttribute("aria-live", "assertive");

    var icon = document.createElement("span");
    icon.className = "submission-success-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✓";

    var text = document.createElement("p");
    text.textContent = message;

    var close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.textContent = "×";
    close.addEventListener("click", function () { notice.remove(); });

    notice.appendChild(icon);
    notice.appendChild(text);
    notice.appendChild(close);
    document.body.appendChild(notice);
    window.setTimeout(function () { if (notice.isConnected) notice.remove(); }, 8000);
  }

  function openSampleDialog() {
    if (!sampleDialog) return;
    setSampleStatus("", false);
    if (typeof sampleDialog.showModal === "function") {
      sampleDialog.showModal();
      if (sampleEmail) sampleEmail.focus();
    }
  }

  function closeSampleDialog() {
    if (sampleDialog && sampleDialog.open) sampleDialog.close();
  }

  document.querySelectorAll("[data-sample-open]").forEach(function (button) {
    button.addEventListener("click", openSampleDialog);
  });
  document.querySelectorAll("[data-sample-close]").forEach(function (button) {
    button.addEventListener("click", closeSampleDialog);
  });

  if (sampleDialog) {
    sampleDialog.addEventListener("click", function (event) {
      if (event.target === sampleDialog) closeSampleDialog();
    });
  }

  if (sampleForm) {
    sampleForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = sampleEmail ? sampleEmail.value.trim() : "";
      if (!email || !sampleEmail.checkValidity()) {
        setSampleStatus(sampleMessages.required, false);
        if (sampleEmail) sampleEmail.focus();
        return;
      }

      setSampleStatus(sampleMessages.sending, false);
      setSampleSubmitting(true);
      var styleElement = document.querySelector("[data-template-field='style-number']");
      var productElement = document.querySelector("[data-template-field='product-name']");
      var styleNumber = styleElement ? styleElement.textContent.trim() : "HLC product";
      var productName = productElement ? productElement.textContent.trim() : "Fabric sample";

      fetch("https://formsubmit.co/ajax/sam@hlctex.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          email: email,
          _replyto: email,
          request_type: "Fabric sample request",
          product: productName,
          style_number: styleNumber,
          product_page: window.location.href,
          message: "Please contact the requester regarding sample delivery and freight collect details.",
          _subject: sampleMessages.subject + " - " + styleNumber + " - " + productName,
          _template: "table",
          _honey: sampleHoneypot.value,
          _url: window.location.href
        })
      }).then(function (response) {
        if (!response.ok) throw new Error("Sample request failed with status " + response.status);
        return response.json();
      }).then(function (result) {
        if (result && result.success === false) throw new Error(result.message || "Sample request failed");
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", {
            method: "sample_form",
            lead_source: "sample_request",
            item_name: productName,
            item_id: styleNumber,
            page_language: sampleLanguage
          });
          window.gtag("event", "sample_request_success", {
            form_name: "sample_request",
            item_name: productName,
            item_id: styleNumber,
            page_language: sampleLanguage,
            page_location: window.location.href
          });
        }
        sampleForm.reset();
        setSampleStatus(sampleMessages.success, true);
        showSubmissionSuccess(sampleMessages.success);
      }).catch(function (error) {
        console.error(error);
        setSampleStatus(sampleMessages.error, false);
      }).finally(function () {
        setSampleSubmitting(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeGallery();
      closeSampleDialog();
    }
  });
})();
