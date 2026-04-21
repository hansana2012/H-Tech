// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change icon
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    // Active link highlight
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ==================== VIDEO MODAL FUNCTIONS ====================
const modal = document.getElementById('videoModal');
const modalClose = document.querySelector('.modal-close');
const youtubePlayer = document.getElementById('youtubePlayer');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

// YouTube video ID extract karana function eka
function getYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/
  ];
  for (let pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Modal eka open karanna
// Modal eka open karanna - direct video ID ekak use karala
// Modal eka open karanna - YouTube embed with nocookie domain
function openModalWithId(videoId, title, desc) {
  if (videoId) {
    // මේ ලින්ක් එකේ අගට තියෙන පරාමිතීන් (parameters) ටික වැදගත්
    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&mute=0`;
    
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Video ID not found');
  }
}
// Modal eka close karanna
function closeModal() {
  modal.style.display = 'none';
  youtubePlayer.src = ''; // Video eka stop karanna
  document.body.style.overflow = ''; // Scroll eka nathi karaganna
}

// Escape key eken close karanna
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// Modal eka click karaddi content eka click kala nam close wenna epa
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close button click
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// ==================== DYNAMIC VIDEO GALLERY (YouTube style) ====================
const videoData = [
  {
    title: "ඔයාට ගැලපෙන AI එක මොකක්ද?",
    desc: "What is the best AI for you?",
    videoUrl:"https://www.youtube.com/embed/E_5n3U8koE4?si=NXLmeoYlSBOQ8n-m",
    videoId: "E_5n3U8koE4",
    thumbnailIcon: "fas fa-mobile-alt"
  },
  {
    title: "AI කියන්නේ මොකක්ද?",
    desc: "What is AI?",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0?si=xyz789",
    videoId: "9bZkp7q19f0",
    thumbnailIcon: "fas fa-code"
  },
  {
    title: "ChatGPT පාවිච්චි කරන්නේ කොහොමද?",
    desc: "How to use Chat GPT",
    videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ?si=def456",
    videoId: "3JZ_D3ELwOQ",
    thumbnailIcon: "fas fa-microchip"
  },
  {
    title: "AI වලින් Speech හදමු",
    desc: "How to generate speechs using AI?",
    videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU?si=ghi789",
    videoId: "kXYiU_JCYtU",
    thumbnailIcon: "fas fa-laptop"
  },
  {
    title: "AI වලින් Image Generate කරමු",
    desc: "How to Generate Images using AI?",
    videoUrl: "https://www.youtube.com/embed/6Dh-RL__uN4?si=jkl012",
    videoId: "6Dh-RL__uN4",
    thumbnailIcon: "fas fa-podcast"
  },
  {
    title: "AI වලින් වීඩියෝ හදමු",
    desc: "How to generate videos using AI?",
    videoUrl: "https://www.youtube.com/embed/2Qp9iLyNEF0?si=mno345",
    videoId: "2Qp9iLyNEF0",
    thumbnailIcon: "fas fa-home"
  },
  {
    title: "AI වලින් සින්දු හදමු.",
    desc: "How to generate Songs using AI?",
    videoUrl: "https://www.youtube.com/embed/kisNQxDPGOU?si=ZK1oNDkBx79y_lWz",
    videoId: "kisNQxDPGOU",
    thumbnailIcon: "fas fa-home"
  },
    {
    title: "HTML ගැන හැදින්වීමක්",
    desc: "Little introduction about HTML",
    videoUrl: "https://www.youtube.com/embed/2Qp9iLyNEF0?si=mno345",
    videoId: "2Qp9iLyNEF0",
    thumbnailIcon: "fas fa-home"
  },
];

function renderVideoGrid() {
  const gridContainer = document.getElementById('videoGrid');
  if (!gridContainer) return;
  
  gridContainer.innerHTML = videoData.map(video => `
    <div class="video-card" data-videoid="${video.videoId}" data-title="${video.title}" data-desc="${video.desc}">
      <div class="thumbnail">
        <i class="${video.thumbnailIcon}" style="font-size: 4rem; opacity:0.8;"></i>
        <div class="play-overlay">
          <i class="fas fa-play-circle"></i>
        </div>
      </div>
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.desc}</p>
      </div>
    </div>
  `).join('');
  
  // Add click event to each video card -> Open modal with embedded player
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-videoid');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      openModalWithId(videoId, title, desc);
    });
  });
}

// ==================== CONTACT FORM HANDLER ====================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email) {
      feedback.style.color = '#ef4444';
      feedback.textContent = 'Please fill in name and email.';
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      feedback.style.color = '#ef4444';
      feedback.textContent = 'Enter a valid email address.';
      return;
    }
    
    // Simulate successful submission
    feedback.style.color = '#10b981';
    feedback.textContent = `Thanks ${name}! Your message has been sent. We'll reply soon 🚀`;
    form.reset();
    setTimeout(() => {
      feedback.textContent = '';
    }, 4000);
  });
}

// ==================== SMOOTH SCROLL & ACTIVE SECTION HIGHLIGHT ====================
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
  renderVideoGrid();
  initContactForm();
  updateActiveNavOnScroll();
  
  // smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
