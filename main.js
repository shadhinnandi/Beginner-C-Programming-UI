// ===== Chapter data =====
const CHAPTERS = [
  { id: '00', name: 'Introduction' },
  { id: '01', name: 'Basics' },
  { id: '02', name: 'Variables & Data Types' },
  { id: '03', name: 'Input & Output' },
  { id: '04', name: 'Operators' },
  { id: '05', name: 'Conditional Statements' },
  { id: '06', name: 'Loops' },
  { id: '07', name: 'Pattern Problems' },
  { id: '08', name: 'Functions' },
  { id: '09', name: 'Arrays' },
  { id: '10', name: 'Strings' },
  { id: '11', name: 'Basic Projects' },
  { id: '12', name: 'File Handling' },
  { id: '13', name: 'Mindset & Problem Solving' },
  { id: '14', name: 'Practice Problem Bank' },
];

// ===== Scroll progress + nav =====
const progress = document.getElementById('scrollProgress');
const nav = document.getElementById('nav');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = pct + '%';
  nav.classList.toggle('scrolled', scrollTop > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(
  '.section__head, .card, .pillar, .course-card, .timeline__item, .note, .check-list li, .quote blockquote, .source, .flow'
);
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => io.observe(el));

// ===== Smooth anchor offset =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== Chapter Reader =====
const reader = document.getElementById('reader');
const readerContent = document.getElementById('readerContent');
const readerNav = document.getElementById('readerNav');
const readerCounter = document.getElementById('readerCounter');
const prevBtn = document.getElementById('prevChapter');
const nextBtn = document.getElementById('nextChapter');
const sidebar = document.getElementById('readerSidebar');
let currentChapter = 0;
const chapterCache = {};

// Build sidebar nav
CHAPTERS.forEach((ch, i) => {
  const btn = document.createElement('button');
  btn.className = 'reader__nav-item';
  btn.dataset.chapter = i;
  btn.innerHTML = `<span class="reader__nav-idx">${ch.id}</span><span class="reader__nav-name">${ch.name}</span>`;
  btn.addEventListener('click', () => loadChapter(i));
  readerNav.appendChild(btn);
});

async function loadChapter(idx) {
  currentChapter = idx;
  const ch = CHAPTERS[idx];

  // Update active nav item
  document.querySelectorAll('.reader__nav-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });

  // Update counter + buttons
  readerCounter.textContent = `${idx + 1} / ${CHAPTERS.length}`;
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === CHAPTERS.length - 1;

  // Close sidebar on mobile
  sidebar.classList.remove('open');

  // Scroll to top
  readerContent.scrollTop = 0;

  // Show loading
  readerContent.innerHTML = '<div class="reader__loading">Loading chapter</div>';

  // Fetch markdown
  let md;
  if (chapterCache[idx]) {
    md = chapterCache[idx];
  } else {
    try {
      const resp = await fetch(`content/${ch.id}.md`);
      if (!resp.ok) throw new Error('Failed to load');
      md = await resp.text();
      chapterCache[idx] = md;
    } catch (err) {
      readerContent.innerHTML = '<div class="reader__loading" style="color:var(--error)">Failed to load chapter. Make sure the content/ folder is deployed.</div>';
      return;
    }
  }

  // Render markdown
  const html = marked.parse(md, { breaks: false, gfm: true });
  readerContent.innerHTML = `<article class="reader__article">${html}</article>`;

  // Highlight code blocks
  readerContent.querySelectorAll('pre code').forEach((block) => {
    try { hljs.highlightElement(block); } catch (e) {}
  });
}

function openReader(idx) {
  loadChapter(idx);
  reader.classList.add('open');
  reader.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeReader() {
  reader.classList.remove('open');
  reader.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Timeline clicks
document.querySelectorAll('.timeline__item').forEach((el) => {
  el.addEventListener('click', () => {
    const idx = parseInt(el.dataset.chapter, 10);
    openReader(idx);
  });
});

// Close button
document.getElementById('readerClose').addEventListener('click', closeReader);
document.getElementById('readerBackdrop').addEventListener('click', closeReader);

// Prev/Next
prevBtn.addEventListener('click', () => {
  if (currentChapter > 0) loadChapter(currentChapter - 1);
});
nextBtn.addEventListener('click', () => {
  if (currentChapter < CHAPTERS.length - 1) loadChapter(currentChapter + 1);
});

// Sidebar toggle (mobile)
document.getElementById('sidebarToggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!reader.classList.contains('open')) return;
  if (e.key === 'Escape') closeReader();
  if (e.key === 'ArrowLeft' && currentChapter > 0) loadChapter(currentChapter - 1);
  if (e.key === 'ArrowRight' && currentChapter < CHAPTERS.length - 1) loadChapter(currentChapter + 1);
});
