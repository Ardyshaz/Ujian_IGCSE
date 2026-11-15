import { dialog, dialogHeader, escapeHtml } from './ui.js';

export const supportMessage = 'Sistem ini adalah 100% percuma untuk kegunaan semua. Sumbangan ikhlas amat digalakkan bagi menyokong projek ini. Saya juga seorang ayah kepada anak Darjah 6 yang akan menduduki ujian IGCSE, dan saya membina sistem ini dengan harapan anak saya dapat masuk ke sekolah pilihannya: MRSM Parit. Semoga aplikasi ini dapat membantu anak-anak tuan/puan juga. Doakan kejayaan anak-anak kita bersama!';

export function showSupport() {
  dialog(`${dialogHeader('Sokong Projek Ini')}<div class="support-modal-body" lang="ms"><img class="support-qr" src="/assets/images/qr-sumbangan.png" width="200" alt="Kod QR untuk sumbangan sukarela bagi menyokong projek ini"><p class="support-message">${escapeHtml(supportMessage)}</p></div><div class="support-modal-actions"><a class="button secondary" href="/assets/images/qr-sumbangan.png" download="QR-Sumbangan-MRSM-IGCSE.png">Simpan QR</a><button class="button dark" type="button" data-close>Tutup</button></div>`, { className: 'support-modal' });
}

export function reserveFooterSpace() {
  const footer=document.querySelector('#support-footer');
  if(!footer)return;
  const measure=()=>document.documentElement.style.setProperty('--support-footer-height',`${Math.ceil(footer.getBoundingClientRect().height)}px`);
  measure();
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(measure).observe(footer);
  else window.addEventListener('resize',measure);
}
