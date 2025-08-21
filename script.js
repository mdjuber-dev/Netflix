const cards = document.querySelectorAll('.movie-card');
const overlay = document.getElementById('trailerOverlay');
const video = document.getElementById('trailerVideo');
const close = document.getElementById('closeTrailer');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const src = card.getAttribute('data-trailer');
    video.src = src;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    overlay.style.display = 'flex';
  });
});

close.addEventListener('click', () => {
  video.pause();
  video.src = "";
  overlay.style.display = 'none';
});


window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    nav.style.backgroundColor = '#000';
    nav.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


const revealElements = document.querySelectorAll('.movie-card, .section-title');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


const joinBtn = document.querySelector('.join');
const signBtn = document.querySelector('.sign');
const joinNow = document.querySelector('.joinn');

[joinBtn, joinNow].forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Thank you for joining Netflix! 🎬');
  });
});

signBtn.addEventListener('click', () => {
  const name = prompt("Enter your name to sign up:");
  if (name) alert(`Welcome to Netflix, ${name}!`);
});


const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector('.movie-title')?.innerText.toLowerCase() || "";
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
  });
}


const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  const words = typewriter.dataset.words.split(',');
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  let isDeleting = false;

  const type = () => {
    const fullWord = words[wordIndex];
    currentWord = isDeleting ? fullWord.substring(0, charIndex--) : fullWord.substring(0, charIndex++);
    typewriter.innerText = currentWord;

    if (!isDeleting && charIndex === fullWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 60 : 120);
    }
  };

  type();
}


const themeBtn = document.createElement('button');
themeBtn.textContent = "🌗 Theme";
themeBtn.style.position = 'fixed';
themeBtn.style.bottom = '20px';
themeBtn.style.right = '20px';
themeBtn.style.padding = '10px 15px';
themeBtn.style.zIndex = 10000;
themeBtn.style.backgroundColor = '#e50914';
themeBtn.style.color = '#fff';
themeBtn.style.border = 'none';
themeBtn.style.borderRadius = '5px';
themeBtn.style.cursor = 'pointer';
document.body.appendChild(themeBtn);

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

const sections = document.querySelectorAll('.section');
const tabContainer = document.createElement('div');
tabContainer.className = 'tab-container';
tabContainer.innerHTML = `
  <button class="tab active" data-tab="all">All</button>
  <button class="tab" data-tab="0">Trending</button>
  <button class="tab" data-tab="1">Sci-Fi</button>
  <button class="tab" data-tab="2">Suspense</button>
  <button class="tab" data-tab="3">Tamil-Movies</button>
  <button class="tab" data-tab="4">Political</button>
`;

document.querySelector('.hero')?.after(tabContainer);
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach(section => section.style.display = 'block'); // show all by default
});
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabVal = tab.dataset.tab;
    sections.forEach((section, i) => {
      if (tabVal === 'all') {
        section.style.display = 'block';
      } else {
        section.style.display = i == tabVal ? 'block' : 'none';
      }
    });
  });
});

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  }
});

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    themeToggle.innerText = '🌞 Light Mode';
  } else {
    themeToggle.innerText = '🌙 Dark Mode';
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.innerText = isLight ? '🌞 Light Mode' : '🌙 Dark Mode';
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerText = '🌞 Light Mode';
  }
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    tabContents.forEach(section => {
      if (section.getAttribute('data-category') === category) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});


themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "🌞 Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

const movieCards = document.querySelectorAll(".movie-card");
const trailerOverlay = document.getElementById("trailerOverlay");
const trailerVideo = document.getElementById("trailerVideo");
const closeTrailer = document.getElementById("closeTrailer");

movieCards.forEach(card => {
  card.addEventListener("click", () => {
    const trailer = card.getAttribute("data-trailer");
    trailerVideo.src = trailer;
    trailerOverlay.style.display = "flex";
  });
});

closeTrailer.addEventListener("click", () => {
  trailerOverlay.style.display = "none";
  trailerVideo.pause();
  trailerVideo.src = "";
});


tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    const target = button.getAttribute("data-tab");
    document.getElementById(target).classList.add("active");
  });
});


searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach(card => {
    const title = card.textContent.toLowerCase();
    card.style.display = title.includes(searchValue) ? "block" : "none";
  });
});

document.getElementById("startBtn").addEventListener("click", () => {
  const video = document.getElementById("welcomeVideo");
  const overlay = document.getElementById("welcomeOverlay");
  const button = document.getElementById("startBtn");

  button.style.display = "none";
  video.style.display = "block";
  video.play();

  setTimeout(() => {
    overlay.style.display = "none";
  }, 5000);
});




const faqs = document.querySelectorAll(".faq-question");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    const answer = faq.nextElementSibling;

    // Toggle open/close
    if (answer.style.display === "block") {
      answer.style.display = "none";
      faq.querySelector("span").textContent = "+";
    } else {
      answer.style.display = "block";
      faq.querySelector("span").textContent = "–";
    }
  });
});




// Voice Search Feature
const voiceBtn = document.getElementById("voiceSearchBtn");

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  voiceBtn.addEventListener("click", () => {
    recognition.start();
    voiceBtn.textContent = "🎙️ Listening...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript; // fill search box
    voiceBtn.textContent = "🎤";
    // Automatically trigger search filter
    filterMovies(transcript.toLowerCase());
  };

  recognition.onerror = () => {
    voiceBtn.textContent = "🎤";
    alert("Voice recognition error, try again!");
  };
} else {
  voiceBtn.style.display = "none"; // hide if not supported
}



// Hero section ke liye image slideshow
const heroo = document.querySelector('.heroo');

// Aapke 24 images ka array
const images = [
  'images/pushpa.jpg',
  'images/lucky.jpg',
  'images/dhoom.jpg',
  'images/daaku.jpg',
  'images/venom.jpg',
  'images/spider.jpg',
  'images/venom1.jpg',
  'images/flash.jpg',
  'images/leo.jpg',
  'images/meg.jpg',
  'images/sikandar.jpg',
  'images/mission manju.jpg',
  'images/goat.jpg',
  'images/maharaj.jpg',
  'images/thagalaan.jpg',
  'images/indian2.jpg',
  'images/article 370.jpg',
  'images/guntur.jpg',
  'images/jodhaa.jpg',
  'images/thalavii.jpg',
  'images/mowgli.jpg',
  'images/goosebumbs.jpg',
  'images/snow.jpg',
  'images/lyle.jpg'
];

let currentIndex = 0;

// Initial background
heroo.style.backgroundImage = `url(${images[currentIndex]})`;

// Function to change image every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length; // loop back to 0 after last image
  heroo.style.backgroundImage = `url(${images[currentIndex]})`;
}, 3000); // 3000ms = 3 seconds
