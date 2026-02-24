document.querySelector('header').innerHTML = `<a href="/"><h1>Joel Takahashi Olsson</h1></a>
  <nav>
    <a href="/about/"><span data-sv>Om mig</span><span data-en>About me</span></a> <a href="/contact/"><span data-sv>Kontakt</span><span data-en>Contact</span></a> <a href="/experience/"><span data-sv>Erfarenhet</span><span data-en>Experience</span></a> <a href="https://github.com/joeltakahashiolsson">GitHub</a> <a href="https://www.linkedin.com/in/joeltakahashiolsson/">LinkedIn</a>
    <br>
    <br>
  </nav>
  <toggles>
    <button id="theme-toggle" aria-label="växla mörkt läge"></button> <button id="copy-link" aria-label="kopiera sidlänk"></button> <button id="lang-toggle" aria-label="byt språk"></button> <button id="cv-link" target="_blank" rel="noopener noreferrer">CV</button>
  </toggles>`;
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === window.location.pathname) {
    link.classList.add('active');
  }
});

const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');

function applyLang(en) {
  document.documentElement.setAttribute('lang', en ? 'en' : 'sv');
  langToggle.textContent = en ? 'English' : 'Svenska';
  const titleAttr = en ? 'data-title-en' : 'data-title-sv';
  const newTitle = document.documentElement.getAttribute(titleAttr);
  if (newTitle) document.title = newTitle;
  document.getElementById('cv-link').href = en
    ? '/assets/cv/en/cv-joeltkahashiolsson_en.pdf'
    : '/assets/cv/se/cv-joeltakahashiolsson_se.pdf';
}

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeToggle.textContent = dark ? 'Ljust läge' : 'Mörkt läge';
}

const prefersEn = navigator.language.startsWith('en');
const saved_lang = localStorage.getItem('lang');
const isEn = saved_lang ? saved_lang === 'en' : prefersEn;
applyLang(isEn);

langToggle.addEventListener('click', () => {
  const nowEn = document.documentElement.getAttribute('lang') === 'en';
  localStorage.setItem('lang', nowEn ? 'en' : 'sv');
  applyLang(!nowEn);
})

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved_theme = localStorage.getItem('theme');
const isDark = saved_theme ? saved_theme === 'dark' : prefersDark;
applyTheme(isDark);

themeToggle.addEventListener('click', () => {
  const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
  localStorage.setItem('theme', nowDark ? 'light' : 'dark');
  applyTheme(!nowDark);
})

const copyButton = document.getElementById('copy-link');
copyButton.textContent = 'Kopiera sidlänk';
copyButton.addEventListener('click', copyLink);

function copyLink() {
  const link = window.location.href;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link)
      .then(() => {
        showCopyFeedback();
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}