const translations = {
    fr: { welcome: "Bienvenue", goPage1: "Aller au premier jeu", text: "Bientôt disponible" },
    en: { welcome: "Welcome", goPage1: "Go to first game", text: "Coming soon" },
};

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    document.getElementById('currentLang').innerText = lang.toUpperCase();
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[lang][key];
    });
    document.getElementById('langMenu').style.display = 'none';
}

function toggleLang() { const m = document.getElementById('langMenu'); m.style.display = m.style.display === 'flex' ? 'none' : 'flex' }
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('active') }
function scrollToSection(num) { document.getElementById('section' + num).scrollIntoView({ behavior: 'smooth' }) }
function showHeader() { document.getElementById('mainHeader').classList.remove('hide') }

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    const header = document.getElementById('mainHeader');
    if (current === 0) { header.classList.remove('hide'); return }
    if (current > lastScroll) { header.classList.add('hide'); }
    else { header.classList.remove('hide'); }
    lastScroll = current;
});

window.onclick = function (e) { if (!e.target.closest('.lang-container')) { document.getElementById('langMenu').style.display = 'none' } }

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLang') || 'fr';
    applyLanguage(savedLang);
});
