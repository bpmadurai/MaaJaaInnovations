(() => {
  // Mobile Navigation Toggle
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  // Preselect Service in Contact Form
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.getElementById('service-select');
      if (select) {
        const wanted = link.dataset.service;
        const option = Array.from(select.options).find(item => item.value === wanted || item.text === wanted);
        if (option) select.value = option.value || option.text;
      }
    });
  });

  // Enterprise Lead Router
  const form = document.getElementById('enquiry-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = [
        'Maa Jaa Innovations — Campaign Lead Inquiry',
        '--------------------------------------------',
        `Contact Name: ${data.get('name')}`,
        `Company / Brand: ${data.get('company') || 'Direct Client'}`,
        `Corporate Email: ${data.get('email')}`,
        `Direct Phone: ${data.get('phone')}`,
        `Client Profile: ${data.get('enquiryType')}`,
        `Required Solution: ${data.get('service')}`,
        `Target Market: ${data.get('region') || 'National'}`,
        `Preferred Circuit: ${data.get('network') || 'Multi-Chain'}`,
        `Campaign Brief: ${data.get('message')}`
      ].join('\n');

      const whatsappUrl = `https://wa.me/917695831102?text=${encodeURIComponent(message)}`;
      if (status) status.textContent = 'Connecting with the Maa Jaa Innovations media desk...';
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        window.location.href = whatsappUrl;
      }
    });
  }

  // Footer Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Active Link Observer
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  // -------------------------------------------------------------------------
  // THEATRE SCREEN EXPERIENCE SIMULATOR (LOCAL VIDEO PATH)
  // -------------------------------------------------------------------------
  const video = document.getElementById('theatre-video');
  const screenPlayBtn = document.getElementById('screen-play-btn');
  const heroPlayTrigger = document.getElementById('hero-play-trigger');
  const ctrlPlayPause = document.getElementById('ctrl-play-pause');
  const ctrlMute = document.getElementById('ctrl-mute');
  const ctrlLights = document.getElementById('ctrl-lights');
  const ctrlFullscreen = document.getElementById('ctrl-fullscreen');
  const progressBar = document.getElementById('video-progress');
  const progressContainer = document.querySelector('.console-progress');
  const currentTimeEl = document.getElementById('video-current-time');
  const durationEl = document.getElementById('video-duration');
  const ambientGlow = document.getElementById('screen-glow');

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  if (video) {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (ctrlPlayPause) ctrlPlayPause.innerHTML = '<span>⏸</span> Pause';
        if (ambientGlow) ambientGlow.classList.add('active-glow');
      }).catch(() => {
        if (screenPlayBtn) screenPlayBtn.classList.remove('hidden');
      });
    }
  }

  function togglePlay() {
    if (!video) return;
    if (video.paused || video.ended) {
      video.play().then(() => {
        if (screenPlayBtn) screenPlayBtn.classList.add('hidden');
        if (ctrlPlayPause) ctrlPlayPause.innerHTML = '<span>⏸</span> Pause';
        if (ambientGlow) ambientGlow.classList.add('active-glow');
      }).catch(() => {
        video.muted = true;
        video.play();
        if (screenPlayBtn) screenPlayBtn.classList.add('hidden');
        if (ctrlPlayPause) ctrlPlayPause.innerHTML = '<span>⏸</span> Pause';
        if (ctrlMute) ctrlMute.innerHTML = '<span>🔇</span> Unmute';
      });
    } else {
      video.pause();
      if (screenPlayBtn) screenPlayBtn.classList.remove('hidden');
      if (ctrlPlayPause) ctrlPlayPause.innerHTML = '<span>▶</span> Play';
      if (ambientGlow) ambientGlow.classList.remove('active-glow');
    }
  }

  if (screenPlayBtn) screenPlayBtn.addEventListener('click', togglePlay);
  if (ctrlPlayPause) ctrlPlayPause.addEventListener('click', togglePlay);
  if (video) video.addEventListener('click', togglePlay);

  if (heroPlayTrigger) {
    heroPlayTrigger.addEventListener('click', () => {
      if (video) {
        video.muted = false;
        video.play();
        if (ctrlMute) ctrlMute.innerHTML = '<span>🔇</span> Sound On';
        if (ctrlPlayPause) ctrlPlayPause.innerHTML = '<span>⏸</span> Pause';
        if (ambientGlow) ambientGlow.classList.add('active-glow');
        if (screenPlayBtn) screenPlayBtn.classList.add('hidden');
      }
    });
  }

  if (ctrlMute && video) {
    ctrlMute.addEventListener('click', () => {
      video.muted = !video.muted;
      ctrlMute.innerHTML = video.muted ? '<span>🔊</span> Sound On' : '<span>🔇</span> Mute';
    });
  }

  if (ctrlLights) {
    let dimmed = false;
    ctrlLights.addEventListener('click', () => {
      dimmed = !dimmed;
      document.body.classList.toggle('cinema-darkened', dimmed);
      ctrlLights.innerHTML = dimmed ? '<span>💡</span> Restore' : '<span>💡</span> Dim Lights';
    });
  }

  if (ctrlFullscreen && video) {
    ctrlFullscreen.addEventListener('click', () => {
      const showcase = document.querySelector('.hero-theatre-showcase');
      if (!document.fullscreenElement) {
        if (showcase.requestFullscreen) showcase.requestFullscreen();
        else if (video.requestFullscreen) video.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });
  }

  if (video) {
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        if (progressBar) progressBar.style.width = `${percent}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(video.currentTime);
        if (durationEl) durationEl.textContent = formatTime(video.duration);
      }
    });

    video.addEventListener('loadedmetadata', () => {
      if (durationEl) durationEl.textContent = formatTime(video.duration);
    });

    if (progressContainer) {
      progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
      });
    }
  }
})();
