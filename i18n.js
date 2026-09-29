/* =============================================================
   BTG i18n — bilingual content system
   Toggle via [data-lang-toggle]; content marked with
   data-en / data-ko attributes OR <span lang="en"> / <span lang="ko">.
   Persists to localStorage under 'btg-lang'.
   ============================================================= */
(function () {
  const STORE_KEY = 'btg-lang';
  const DEFAULT = 'en';

  function currentLang() {
    return localStorage.getItem(STORE_KEY) || DEFAULT;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';

    // Text nodes with data-en / data-ko attributes
    document.querySelectorAll('[data-en]').forEach(el => {
      const v = el.getAttribute('data-' + lang);
      if (v == null) return;

      // Values that carry their own markup (<b>, <br>, <sub>) replace the subtree.
      if (v.indexOf('<') !== -1) { el.innerHTML = v; return; }

      // Inline badges (the Physics / Zoom chips inside a course title) must survive
      // a language change, so update only the label text node and leave children alone.
      if (el.children.length) {
        const label = Array.prototype.find.call(
          el.childNodes, n => n.nodeType === 3 && n.nodeValue.trim() !== ''
        );
        if (label) label.nodeValue = v;
        return;
      }

      el.textContent = v;
    });

    // Toggle button label
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.setAttribute('aria-pressed', lang === 'ko' ? 'true' : 'false');
      const enChip = btn.querySelector('[data-chip="en"]');
      const koChip = btn.querySelector('[data-chip="ko"]');
      if (enChip) enChip.classList.toggle('is-active', lang === 'en');
      if (koChip) koChip.classList.toggle('is-active', lang === 'ko');
    });

    localStorage.setItem(STORE_KEY, lang);
  }

  function init() {
    // Wire up toggle buttons
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // If click landed on a specific chip, use that chip's value
        const chip = e.target.closest('[data-chip]');
        if (chip) {
          applyLang(chip.getAttribute('data-chip'));
        } else {
          applyLang(currentLang() === 'en' ? 'ko' : 'en');
        }
      });
    });
    applyLang(currentLang());
    wireEmails();
  }

  // Assemble mailto links at runtime (works on any static host, e.g. GitHub Pages;
  // keeps the raw address out of the HTML source to reduce scraping).
  function wireEmails() {
    document.querySelectorAll('[data-email]').forEach(a => {
      const addr = a.getAttribute('data-email') + '@' + a.getAttribute('data-email-domain');
      a.setAttribute('href', 'mailto:' + addr);
      if (a.hasAttribute('data-email-show')) {
        a.innerHTML = a.closest('.foot-col')
          ? addr.replace('@', '@<br>')
          : addr;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for programmatic use
  window.BTG_i18n = { applyLang, currentLang };
})();
