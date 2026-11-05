/* Alamat server milik Anda. Diisi dengan scripts/configure.mjs atau diedit langsung.
 * Semua nilai di sini bersifat publik. Jangan masukkan kata sandi atau ADMIN_TOKEN.
 */
window.ZUPERVERSE_CONFIG = {
  independentBackend: true,
  apiBaseUrl: "",
  realtimeUrl: "",
  billingUrl: "",
  adminWhatsApp: ""
};
if (["localhost", "127.0.0.1"].includes(location.hostname)) {
  window.ZUPERVERSE_CONFIG.apiBaseUrl = location.origin;
  window.ZUPERVERSE_CONFIG.realtimeUrl = location.origin.replace(/^http/, "ws");
}
