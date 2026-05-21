const base = document.querySelector('base')?.href || '/';
document.querySelector('header').innerHTML = `<br><a href="${base}"><h1>Joel Takahashi Olsson</h1></a><nav>
    <ul><li><a href="${base}about/"><span data-sv>Om mig</span><span data-en>About me</span></a></li>
    <li><a href="${base}experience/"><span data-sv>Erfarenhet</span><span data-en>Experience</span></a></li>
    <li><a href="${base}projects/"><span data-sv>Projekt</span><span data-en>Projects</span></a></li>
    <li><a href="${base}contact/"><span data-sv>Kontakt</span><span data-en>Contact</span></a><li></ul>
  </nav>
  <br>
  <toggles>
    <li><button id="lang-toggle" aria-label="byt språk" data-tooltip="byt språk"></button></li>
    <li><a id="github-link" class="social-link" href="https://github.com/joeltakahashiolsson" target="_blank" rel="noopener noreferrer">GitHub</a></li>
    <li><a id="linkedin-link" class="social-link" href="https://www.linkedin.com/in/joeltakahashiolsson/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
  </toggles>`

const currentPath = window.location.pathname.replace(/\/$/, '');
document.querySelectorAll('nav a').forEach(link => {
  if (link.pathname.replace(/\/$/, '') === currentPath) {
    link.classList.add('active');
  }
});

const langToggle = document.getElementById('lang-toggle');

const githubLink = document.getElementById('github-link');
const linkedinLink = document.getElementById('linkedin-link');

function applyLang(en) {
  document.documentElement.setAttribute('lang', en ? 'en' : 'sv');
  langToggle.textContent = en ? 'Svenska' : 'English';
  langToggle.dataset.tooltip = en ? 'change language' : 'byt språk';
  githubLink.dataset.tooltip = en ? 'GitHub profile' : 'GitHub-profil';
  linkedinLink.dataset.tooltip = en ? 'LinkedIn profile' : 'LinkedIn-profil';
  const titleAttr = en ? 'data-title-en' : 'data-title-sv';
  const newTitle = document.documentElement.getAttribute(titleAttr);
  if (newTitle) document.title = newTitle;
}

const prefersEn = navigator.language.startsWith('en');
const saved_lang = localStorage.getItem('lang');
const isEn = saved_lang ? saved_lang === 'en' : prefersEn;
applyLang(isEn);
requestAnimationFrame(() => { langToggle.style.minWidth = langToggle.offsetWidth + 'px'; });

langToggle.addEventListener('click', () => {
  const nowEn = document.documentElement.getAttribute('lang') === 'en';
  localStorage.setItem('lang', nowEn ? 'sv' : 'en');
  applyLang(!nowEn);
})
