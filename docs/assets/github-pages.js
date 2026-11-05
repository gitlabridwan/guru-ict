/* Adaptasi tautan layanan untuk salinan statis GitHub Pages. */
(function () {
  "use strict";
  var config = window.ZUPERVERSE_CONFIG || {};
  var notice;
  function showNotice(message) {
    if (!notice) {
      notice = document.createElement("dialog");
      notice.setAttribute("aria-label", "Informasi layanan");
      notice.style.cssText = "max-width:460px;width:calc(100% - 40px);box-sizing:border-box;background:#1b204a;color:#fff;border:2px solid #fbbf24;border-radius:18px;padding:24px;font:800 16px/1.6 Nunito,sans-serif;box-shadow:0 20px 80px #0009;";
      var text = document.createElement("p");
      text.style.margin = "0 0 18px";
      notice.appendChild(text);
      var close = document.createElement("button");
      close.textContent = "Mengerti";
      close.className = "btn yel";
      close.style.cssText = "border:0;border-radius:10px;background:#fbbf24;color:#181838;padding:10px 18px;font:900 15px Nunito,sans-serif;cursor:pointer";
      close.addEventListener("click", function () { notice.close(); });
      notice.appendChild(close);
      notice.addEventListener("click", function (e) { if (e.target === notice) notice.close(); });
      document.body.appendChild(notice);
    }
    notice.querySelector("p").textContent = message;
    if (typeof notice.showModal === "function") notice.showModal();
    else window.alert(message);
  }
  document.querySelectorAll('[data-service="billing"]').forEach(function (a) {
    if (/^https:\/\//i.test(config.billingUrl || "")) a.href = config.billingUrl;
  });
  document.querySelectorAll('[data-service="admin"]').forEach(function (a) {
    if (/^\d{8,15}$/.test(config.adminWhatsApp || "")) {
      a.href = "https://wa.me/" + config.adminWhatsApp;
      if (/^0?822[- ]?6626/.test(a.textContent)) a.textContent = "+" + config.adminWhatsApp;
    } else if (/0822-6626-8008/.test(a.textContent)) a.textContent = "Hubungi pengelola situs";
  });
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-service]");
    if (!link || link.getAttribute("href").charAt(0) !== "#") return;
    e.preventDefault();
    showNotice(link.dataset.service === "billing"
      ? "Informasi langganan belum diatur oleh pengelola situs. Permainan dan pembuat soal gratis tetap dapat digunakan."
      : "Kontak admin belum diatur oleh pengelola situs.");
  });
})();
