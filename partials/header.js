document.querySelector('header').innerHTML = `<a href="/"><h1>Joel Takahashi Olsson</h1></a>
  <nav>
    <a href="/about/">Om mig</a>
    <a href="/contact/">Kontakt</a>
    <a href="/experience/">Erfarenhet</a>
  </nav>
  <button id="theme-toggle" aria-label="växla mörkt läge"></button>
  <button id="copy-link" aria-label="kopiera länk"></button>`

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeToggle.textContent = dark ? 'ljust läge' : 'mörkt läge';
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
const isDark = saved ? saved === 'dark' : prefersDark;
applyTheme(isDark);

themeToggle.addEventListener('click', () => {
  const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
  localStorage.setItem('theme', nowDark ? 'light' : 'dark');
  applyTheme(!nowDark);
})

const copyButton = document.getElementById('copy-link');
copyButton.textContent = 'kopiera länk';
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


function showCopyFeedback() {
  const copyButton = document.getElementById('copy-link');
  if (!copyButton) return;
  
  const originalText = copyButton.textContent;
  copyButton.textContent = 'länk kopierad';
  
  setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.style.backgroundColor = '';
  }, 2000);
}