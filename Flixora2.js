  document.addEventListener('DOMContentLoaded', () => {
      // Movie card trailer logic
      const cards = document.querySelectorAll('.movie-card');
      const overlay = document.getElementById('trailerOverlay');
      const video = document.getElementById('trailerVideo');
      const close = document.getElementById('closeTrailer');

      cards.forEach(card => {
        card.addEventListener('click', (event) => {
          event.preventDefault();
          const src = card.getAttribute('data-trailer');
          video.src = src;
          video.muted = true;
          video.autoplay = true;
          video.loop = true;
          overlay.style.display = 'flex';
        });
      });

      if (close) close.addEventListener('click', (event) => {
        event.preventDefault();
        video.pause();
        video.src = '';
        overlay.style.display = 'none';
      });

      // Navbar scroll effect
      window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 20) {
          nav.style.backgroundColor = '#000';
          nav.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)';
        } else {
          nav.style.boxShadow = 'none';
        }
      });

      // Reveal elements on scroll
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

      // Search functionality with autocomplete
      const searchInput = document.getElementById('searchInput');
      const movieTitles = Array.from(document.querySelectorAll('.movie-title')).map(title => title.innerText); // Get all movie titles for suggestions
      const suggestionsList = document.createElement('ul');
      suggestionsList.className = 'autocomplete-suggestions';
      if (searchInput) searchInput.parentNode.appendChild(suggestionsList);

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase();
          suggestionsList.innerHTML = '';
          if (query) {
            const suggestions = movieTitles.filter(title => title.toLowerCase().includes(query));
            suggestions.forEach(suggestion => {
              const li = document.createElement('li');
              li.textContent = suggestion;
              li.addEventListener('click', () => {
                searchInput.value = suggestion;
                suggestionsList.innerHTML = '';
                cards.forEach(card => {
                  const title = card.querySelector('.movie-title')?.innerText.toLowerCase() || '';
                  card.style.display = title.includes(query) ? 'block' : 'none';
                });
              });
              suggestionsList.appendChild(li);
            });
          }
          cards.forEach(card => {
            const title = card.querySelector('.movie-title')?.innerText.toLowerCase() || '';
            card.style.display = title.includes(query) ? 'block' : 'none';
          });
        });
      }

      // Voice search
      const voiceBtn = document.getElementById('voiceSearchBtn');
      if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        if (voiceBtn) voiceBtn.addEventListener('click', () => {
          recognition.start();
          voiceBtn.textContent = '🎙️ Listening...';
        });
        recognition.onresult = event => {
          const transcript = event.results[0][0].transcript;
          searchInput.value = transcript;
          const query = transcript.toLowerCase();
          cards.forEach(card => {
            const title = card.querySelector('.movie-title')?.innerText.toLowerCase() || '';
            card.style.display = title.includes(query) ? 'block' : 'none';
          });
          voiceBtn.textContent = '🎤';
        };
        recognition.onerror = () => {
          voiceBtn.textContent = '🎤';
          alert('Voice recognition error, try again!');
        };
        recognition.onend = () => {
          voiceBtn.textContent = '🎤';
        };
      } else {
        if (voiceBtn) voiceBtn.style.display = 'none';
      }

      // Hero background slideshow
      const heroo = document.querySelector('.heroo');
      const images = [
        'images/pushpa.jpg', 'images/lucky.jpg', 'images/dhoom.jpg', 'images/daaku.jpg',
        'images/venom.jpg', 'images/spider.jpg', 'images/venom1.jpg', 'images/flash.jpg',
        'images/leo.jpg', 'images/meg.jpg', 'images/sikandar.jpg', 'images/mowgli.jpg',
        'images/goat.jpg', 'images/maharaj.jpg', 'images/thagalaan.jpg', 'images/indian2.jpg',
        'images/article 370.jpg', 'images/guntur.jpg', 'images/jodhaa.jpg', 'images/thalavii.jpg',
        'images/mowgli.jpg', 'images/goosebumbs.jpg', 'images/snow.jpg', 'images/lyle.jpg'
      ];
      let currentIndex = 0;
      if (heroo) heroo.style.backgroundImage = `url(${images[currentIndex]})`;
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        if (heroo) heroo.style.backgroundImage = `url(${images[currentIndex]})`;
      }, 3000);

      // Theme toggle
      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.textContent = isLight ? '🌞 Light Mode' : '🌙 Dark Mode';
      });
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.textContent = '🌞 Light Mode';
      } else {
        document.body.classList.remove('light-theme');
        if (themeToggle) themeToggle.textContent = '🌙 Dark Mode';
      }

      // Tab navigation
      const tabButtons = document.querySelectorAll('.tab-btn');
      const tabContents = document.querySelectorAll('.tab-content');
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          button.classList.add('active');
          const target = button.getAttribute('data-tab');
          document.getElementById(target).classList.add('active');
        });
      });

      // Additional tab container
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
      sections.forEach(section => section.style.display = 'block');
      document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const tabVal = tab.dataset.tab;
          sections.forEach((section, i) => {
            section.style.display = tabVal === 'all' ? 'block' : i == tabVal ? 'block' : 'none';
          });
        });
      });

      // FAQ toggle
      const faqs = document.querySelectorAll('.faq-question');
      faqs.forEach(faq => {
        faq.addEventListener('click', () => {
          const answer = faq.nextElementSibling;
          if (answer.style.display === 'block') {
            answer.style.display = 'none';
            faq.querySelector('span').textContent = '+';
          } else {
            answer.style.display = 'block';
            faq.querySelector('span').textContent = '–';
          }
        });
      });

      // Modal logic (combined and fixed)
      const joinBtns = document.querySelectorAll('.join, .joinn');
      const planModal = document.getElementById('planModal');
      const trialTimer = document.getElementById('trialTimer');
      const progressBar = document.getElementById('progressBar');
      const closePlan = document.getElementById('closePlan');
      const planButtons = document.querySelectorAll('.plan-btn');
      const paymentModal = document.getElementById('paymentModal');
      const selectedPlan = document.getElementById('selectedPlan');
      const selectedPrice = document.getElementById('selectedPrice');
      const payNow = document.getElementById('payNow');
      const closePayment = document.getElementById('closePayment');
      const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
      const upiInput = document.getElementById('upiInput');
      const cardInput = document.getElementById('cardInput');

      let timerInterval;

      // Open plan modal
      joinBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('Join button clicked');
          if (planModal) {
            planModal.classList.add('show');
            planModal.style.display = 'flex';
            let totalSeconds = 8 * 60;
            if (trialTimer) trialTimer.textContent = '08:00';
            if (progressBar) progressBar.style.width = '100%';
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
              totalSeconds--;
              const minutes = Math.floor(totalSeconds / 60);
              const seconds = totalSeconds % 60;
              if (trialTimer) trialTimer.textContent = `${minutes}:${seconds.toString().padStart(2,'0')}`;
              if (progressBar) progressBar.style.width = `${(totalSeconds / (8 * 60)) * 100}%`;
              if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                if (trialTimer) trialTimer.textContent = "00:00";
                alert("Your free trial has ended! Choose a plan to continue.");
              }
            }, 1000);
          }
        });
      });

      // Close plan modal
      if (closePlan) {
        closePlan.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('Close plan clicked');
          planModal.classList.remove('show');
          setTimeout(() => {
            planModal.style.display = 'none';
          }, 300);
          clearInterval(timerInterval);
        });
      }

      // Open payment modal
      planButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('Plan button clicked:', btn.getAttribute('data-plan'));
          if (paymentModal && selectedPlan && selectedPrice) {
            const plan = btn.getAttribute('data-plan');
            const price = btn.getAttribute('data-price');
            selectedPlan.textContent = plan;
            selectedPrice.textContent = price;
            paymentModal.classList.add('show');
            paymentModal.style.display = 'flex';
            planModal.classList.remove('show');
            setTimeout(() => {
              planModal.style.display = 'none';
            }, 300);
          } else {
            console.warn('Payment modal or elements not found');
          }
        });
      });

      // Toggle payment inputs
      paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
          console.log('Payment option selected:', option.value);
          if (option.value === 'UPI' || option.value === 'PhonePe') {
            if (upiInput) upiInput.style.display = 'block';
            if (cardInput) cardInput.style.display = 'none';
          } else if (option.value === 'Card') {
            if (upiInput) upiInput.style.display = 'none';
            if (cardInput) cardInput.style.display = 'block';
          }
        });
      });

      // Simulate payment
      if (payNow) {
        payNow.addEventListener('click', (event) => {
          event.preventDefault();
          const plan = selectedPlan.textContent;
          alert(`Payment successful for ${plan} plan! 🎉 Welcome to Flixora!`);
          launchConfetti();
          paymentModal.classList.remove('show');
          setTimeout(() => {
            paymentModal.style.display = 'none';
            planModal.style.display = 'none';
          }, 300);
        });
      }

      // Close payment modal
      if (closePayment) {
        closePayment.addEventListener('click', (event) => {
          event.preventDefault();
          console.log('Close payment clicked');
          paymentModal.classList.remove('show');
          setTimeout(() => {
            paymentModal.style.display = 'none';
            planModal.classList.add('show');
            planModal.style.display = 'flex';
          }, 300);
        });
      }

      // Confetti animation
      function launchConfetti() {
        const duration = 2 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
          const confetti = document.createElement('div');
          confetti.style.position = 'fixed';
          confetti.style.top = '0';
          confetti.style.left = Math.random() * window.innerWidth + 'px';
          confetti.style.width = '10px';
          confetti.style.height = '10px';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.opacity = Math.random();
          confetti.style.zIndex = 12000;
          confetti.style.pointerEvents = 'none';
          document.body.appendChild(confetti);
          const fall = setInterval(() => {
            confetti.style.top = (parseFloat(confetti.style.top) + 5) + 'px';
            if (parseFloat(confetti.style.top) > window.innerHeight) {
              confetti.remove();
              clearInterval(fall);
            }
          }, 20);
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }

      // Favorites logic
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const favoritesSection = document.getElementById('favoritesSection');
      const favoritesGrid = document.getElementById('favoritesGrid');

      function updateFavorites() {
        favoritesGrid.innerHTML = '';
        if (favorites.length > 0) {
          favoritesSection.style.display = 'block';
          favorites.forEach(title => {
            const movie = movies.find(m => m.title === title);
            if (movie) {
              const card = document.createElement('div');
              card.className = 'movie-card';
              card.setAttribute('data-trailer', movie.trailer);
              card.setAttribute('data-title', movie.title);
              card.style.backgroundImage = `url('${movie.image}')`;
              card.innerHTML = `
                <p class="movie-title">${movie.title}</p>
                <i class="fas fa-play play-btn" aria-hidden="true"></i>
                <i class="fas fa-heart favorite-btn favorited" aria-label="Remove from favorites"></i>
              `;
              favoritesGrid.appendChild(card);
            }
          });
        } else {
          favoritesSection.style.display = 'none';
        }
      }

      movieCards.forEach(card => {
        const title = card.getAttribute('data-title');
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favorites.includes(title)) {
          favoriteBtn.classList.add('favorited');
        }
        favoriteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (favorites.includes(title)) {
            favorites = favorites.filter(t => t !== title);
            favoriteBtn.classList.remove('favorited');
          } else {
            favorites.push(title);
            favoriteBtn.classList.add('favorited');
          }
          localStorage.setItem('favorites', JSON.stringify(favorites));
          updateFavorites();
        });
      });

      updateFavorites();
    });

























    document.addEventListener('DOMContentLoaded', () => {
  // Movie cards and trailer overlay
  const cards = document.querySelectorAll('.movie-card');
  const overlay = document.getElementById('trailerOverlay');
  const video = document.getElementById('trailerVideo');
  const close = document.getElementById('closeTrailer');

  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      const src = card.getAttribute('data-trailer');
      video.src = src;
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      overlay.style.display = 'flex';
    });
  });

  if (close) close.addEventListener('click', (event) => {
    event.preventDefault();
    video.pause();
    video.src = '';
    overlay.style.display = 'none';
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      nav.style.backgroundColor = '#000';
      nav.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  // Reveal elements on scroll
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

  // Tab navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      const target = button.getAttribute('data-tab');
      document.getElementById(target).classList.add('active');
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.classList.toggle('dark-mode', savedTheme === 'dark');
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  if (themeToggle) themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // Search autocomplete and filtering
  const searchInput = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const movies = Array.from(cards).map(card => card.getAttribute('data-title'));
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      searchSuggestions.innerHTML = '';
      if (query) {
        const filtered = movies.filter(movie => movie.toLowerCase().includes(query));
        filtered.forEach(movie => {
          const div = document.createElement('div');
          div.textContent = movie;
          div.addEventListener('click', () => {
            searchInput.value = movie;
            searchSuggestions.style.display = 'none';
            filterMovies(movie.toLowerCase());
          });
          searchSuggestions.appendChild(div);
        });
        searchSuggestions.style.display = filtered.length ? 'block' : 'none';
      } else {
        searchSuggestions.style.display = 'none';
        showAllMovies();
      }
      filterMovies(query);
    });
  }

  function filterMovies(query) {
    cards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
  }
  function showAllMovies() {
    cards.forEach(card => (card.style.display = 'block'));
  }

  // Voice Search
  const voiceBtn = document.getElementById('voiceSearchBtn');
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.textContent = '🎙️ Listening...';
      });
    }
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      filterMovies(transcript.toLowerCase());
      voiceBtn.textContent = '🎤';
    };
    recognition.onerror = () => {
      voiceBtn.textContent = '🎤';
      alert('Voice recognition error, try again!');
    };
    recognition.onend = () => { voiceBtn.textContent = '🎤'; };
  } else {
    if (voiceBtn) voiceBtn.style.display = 'none';
  }

  // Login modal toggle
  const signModalBtn = document.getElementById('signModalBtn');
  const loginModal = document.getElementById('loginModal');
  if (signModalBtn) {
    signModalBtn.addEventListener('click', () => {
      if (loginModal) loginModal.style.display = 'flex';
    });
  }
  loginModal?.addEventListener('click', e => {
    if (e.target === loginModal) loginModal.style.display = 'none';
  });

  // Join buttons open plan modal with timer
  const joinBtns = document.querySelectorAll('.join, .joinn');
  const planModal = document.getElementById('planModal');
  const trialTimer = document.getElementById('trialTimer');
  const progressBar = document.getElementById('progressBar');
  const closePlan = document.getElementById('closePlan');
  const planButtons = document.querySelectorAll('.plan-btn');
  const paymentModal = document.getElementById('paymentModal');
  const selectedPlan = document.getElementById('selectedPlan');
  const selectedPrice = document.getElementById('selectedPrice');
  const payNow = document.getElementById('payNow');
  const closePayment = document.getElementById('closePayment');
  const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
  const upiInput = document.getElementById('upiInput');
  const cardInput = document.getElementById('cardInput');

  let timerInterval;

  joinBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (planModal) {
        planModal.classList.add('show');
        planModal.style.display = 'flex';
        let totalSeconds = 8 * 60;
        if (trialTimer) trialTimer.textContent = '08:00';
        if (progressBar) progressBar.style.width = '100%';
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          totalSeconds--;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          if (trialTimer) trialTimer.textContent = `${minutes}:${seconds.toString().padStart(2,'0')}`;
          if (progressBar) progressBar.style.width = `${(totalSeconds / (8 * 60)) * 100}%`;
          if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            if (trialTimer) trialTimer.textContent = "00:00";
            alert("Your free trial has ended! Choose a plan to continue.");
          }
        }, 1000);
      }
    });
  });

  if (closePlan) {
    closePlan.addEventListener('click', e => {
      e.preventDefault();
      planModal.classList.remove('show');
      setTimeout(() => {
        planModal.style.display = 'none';
      }, 300);
      clearInterval(timerInterval);
    });
  }

  planButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (paymentModal && selectedPlan && selectedPrice) {
        const plan = btn.getAttribute('data-plan');
        const price = btn.getAttribute('data-price');
        selectedPlan.textContent = plan;
        selectedPrice.textContent = price;
        paymentModal.classList.add('show');
        paymentModal.style.display = 'flex';
        planModal.classList.remove('show');
        setTimeout(() => {
          planModal.style.display = 'none';
        }, 300);
      }
    });
  });

  paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
      if (option.value === 'UPI' || option.value === 'PhonePe') {
        if (upiInput) upiInput.style.display = 'block';
        if (cardInput) cardInput.style.display = 'none';
      } else if (option.value === 'Card') {
        if (upiInput) upiInput.style.display = 'none';
        if (cardInput) cardInput.style.display = 'block';
      }
    });
  });

  if (payNow) {
    payNow.addEventListener('click', e => {
      e.preventDefault();
      const plan = selectedPlan.textContent;
      alert(`Payment successful for ${plan} plan! 🎉 Welcome to Flixora!`);
      launchConfetti();
      paymentModal.classList.remove('show');
      setTimeout(() => {
        paymentModal.style.display = 'none';
        planModal.style.display = 'none';
      }, 300);
    });
  }

  if (closePayment) {
    closePayment.addEventListener('click', e => {
      e.preventDefault();
      paymentModal.classList.remove('show');
      setTimeout(() => {
        paymentModal.style.display = 'none';
        planModal.classList.add('show');
        planModal.style.display = 'flex';
      }, 300);
    });
  }

  function launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.top = '0';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = Math.random();
      confetti.style.zIndex = 12000;
      confetti.style.pointerEvents = 'none';
      document.body.appendChild(confetti);
      const fall = setInterval(() => {
        confetti.style.top = (parseFloat(confetti.style.top) + 5) + 'px';
        if (parseFloat(confetti.style.top) > window.innerHeight) {
          confetti.remove();
          clearInterval(fall);
        }
      }, 20);
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  // Favorites logic
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesSection = document.getElementById('favoritesSection');
  const favoritesGrid = document.getElementById('favoritesGrid');

  function updateFavorites() {
    favoritesGrid.innerHTML = '';
    if (favorites.length > 0) {
      favoritesSection.style.display = 'block';
      favorites.forEach(title => {
        const movieCard = Array.from(cards).find(card => card.getAttribute('data-title') === title);
        if (movieCard) {
          const card = movieCard.cloneNode(true);
          const favBtn = card.querySelector('.favorite-btn');
          favBtn.classList.add('favorited');
          favoritesGrid.appendChild(card);
        }
      });
    } else {
      favoritesSection.style.display = 'none';
    }
  }

  cards.forEach(card => {
    const title = card.getAttribute('data-title');
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favorites.includes(title)) {
      favoriteBtn.classList.add('favorited');
    }
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (favorites.includes(title)) {
        favorites = favorites.filter(t => t !== title);
        favoriteBtn.classList.remove('favorited');
      } else {
        favorites.push(title);
        favoriteBtn.classList.add('favorited');
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavorites();
    });
  });

  updateFavorites();
});




document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(sec => sec.style.display = "none");

      // Add active to clicked
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).style.display = "block";
    });
  });
});
