document.querySelector('header').innerHTML = `<a href="/"><h1>Joel Takahashi Olsson</h1></a><nav>
    <ul><li><a href="/about/"><span data-sv>Om mig</span><span data-en>About me</span></a></li>
    <li><a href="/contact/"><span data-sv>Kontakt</span><span data-en>Contact</span></a></li>
    <li><a href="/projects/"><span data-sv>Projekt</span><span data-en>Projects</span></a></li>
    <li><a href="/experience/"><span data-sv>Erfarenhet</span><span data-en>Experience</span></a><li></ul>
  </nav>
  <br>
  <toggles>
    <li><button id="lang-toggle" aria-label="byt språk" data-tooltip="byt språk"></button></li>
    <li><button id="copy-link" aria-label="kopiera sidlänk" data-tooltip="kopiera sidlänk"></button></li>
    <li><a class="social-link" href="https://github.com/joeltakahashiolsson">GitHub</a></li>
    <li><a class="social-link" href="https://www.linkedin.com/in/joeltakahashiolsson/">LinkedIn</a></li>
  </toggles>`

document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === window.location.pathname) {
    link.classList.add('active');
  }
});

const langToggle = document.getElementById('lang-toggle');

function applyLang(en) {
  document.documentElement.setAttribute('lang', en ? 'en' : 'sv');
  langToggle.textContent = en ? 'English' : 'Svenska';
  langToggle.dataset.tooltip = en ? 'change language' : 'byt språk';
  const titleAttr = en ? 'data-title-en' : 'data-title-sv';
  const newTitle = document.documentElement.getAttribute(titleAttr);
  if (newTitle) document.title = newTitle;
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

const copyButton = document.getElementById('copy-link');
copyButton.textContent = 'Kopiera sidlänk';
copyButton.addEventListener('click', () => {
  navigator.clipboard?.writeText(window.location.href).then(() => {
    copyButton.textContent = 'Kopierad!';
    copyButton.dataset.tooltip = 'Kopierad!';
    setTimeout(() => {
      copyButton.textContent = 'Kopiera sidlänk';
      copyButton.dataset.tooltip = 'kopiera sidlänk';
    }, 1500);
  });
});
