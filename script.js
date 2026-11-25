// 1. Scroll Reveal Animation using IntersectionObserver
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

// 2. Sequential Highlight for Business Categories (0:30 - 0:40 style)
const bizItems = Array.from(document.querySelectorAll('.biz-item'));
let bizIndex = 0;
let bizInterval = null;

function highlightBusinessItem(index) {
  bizItems.forEach((item) => item.classList.remove('active-biz'));
  if (bizItems[index]) {
    bizItems[index].classList.add('active-biz');
  }
}

function startBusinessCycle() {
  if (bizItems.length === 0) return;
  stopBusinessCycle();
  bizInterval = setInterval(() => {
    bizIndex = (bizIndex + 1) % bizItems.length;
    highlightBusinessItem(bizIndex);
  }, 950);
}

function stopBusinessCycle() {
  if (bizInterval) {
    clearInterval(bizInterval);
    bizInterval = null;
  }
}

bizItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    bizIndex = idx;
    highlightBusinessItem(bizIndex);
    startBusinessCycle();
  });
});

startBusinessCycle();

// 3. Auto-Showcase Scroll Mode (Video-like automatic scene pacing)
const autoBtn = document.getElementById('autoShowcaseBtn');
const scenes = Array.from(document.querySelectorAll('section.scene'));
let autoTimer = null;
let currentSceneIndex = 0;

function stopAutoShowcase() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  if (autoBtn) {
    autoBtn.textContent = '▶ অটো শোকেস: চালু করুন';
    autoBtn.classList.remove('active');
  }
}

if (autoBtn && scenes.length > 0) {
  autoBtn.addEventListener('click', () => {
    if (autoTimer) {
      stopAutoShowcase();
      return;
    }

    currentSceneIndex = 0;
    autoBtn.textContent = '⏸ অটো শোকেস: চলছে (বন্ধ করুন)';
    autoBtn.classList.add('active');
    scenes[0].scrollIntoView({ behavior: 'smooth' });

    autoTimer = setInterval(() => {
      currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
      scenes[currentSceneIndex].scrollIntoView({ behavior: 'smooth' });
    }, 4200);
  });
}

// 4. Enroll Modal Controls & Form Submission
const modal = document.getElementById('enrollModal');
const openModalBtn = document.getElementById('openEnrollModal');
const closeModalBtn = document.getElementById('closeEnrollModal');
const enrollForm = document.getElementById('enrollForm');

function openModal() {
  if (!modal) return;
  stopAutoShowcase();
  modal.classList.add('open');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
}

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeModal();
  }
});

if (enrollForm) {
  enrollForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('ধন্যবাদ! আপনার এনরোলমেন্ট অনুরোধ গ্রহণ করা হয়েছে।');
    enrollForm.reset();
    closeModal();
  });
}