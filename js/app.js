/* ==========================================================================
   1 CRORE COACH - Interactive Application Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Live Countdown Timer (Esckul Urgency style)
  initCountdownTimer();

  // 2. Interactive Blueprint Tabs (Day 1 / Day 2 / Day 3)
  initBlueprintTabs();

  // 3. FAQ Accordion Toggle
  initFaqAccordion();

  // 4. Video Modal Popup
  initVideoModal();

  // 5. Sticky Bottom Bar on Scroll
  initStickyBottomBar();

  // 6. Lead Capture Form Handling
  initBookingForm();
});

/* Countdown Timer */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll(".live-timer");
  if (!timerElements.length) return;

  // Set 14 minutes 50 seconds initial timer for real urgency
  let totalSeconds = 14 * 60 + 50;

  function updateTimer() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatted = 
      String(hours).padStart(2, '0') + "h : " +
      String(minutes).padStart(2, '0') + "m : " +
      String(seconds).padStart(2, '0') + "s";

    timerElements.forEach(el => el.textContent = formatted);

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 15 * 60; // reset
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* Blueprint Tabs */
function initBlueprintTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabCards = document.querySelectorAll(".blueprint-content-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetDay = btn.getAttribute("data-day");

      tabBtns.forEach(b => b.classList.remove("active"));
      tabCards.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetCard = document.getElementById(`day-${targetDay}-card`);
      if (targetCard) {
        targetCard.classList.add("active");
      }
    });
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      
      // Close others
      faqItems.forEach(i => i.classList.remove("open"));

      // Toggle clicked
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

/* Video Modal */
function initVideoModal() {
  const openBtn = document.getElementById("vsl-play-trigger");
  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("video-modal-close");
  const videoFrame = document.getElementById("vsl-iframe");

  if (!openBtn || !modal) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
    if (videoFrame && !videoFrame.src) {
      videoFrame.src = "https://www.youtube.com/embed/aQP9wY3Rtjo?autoplay=1";
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      if (videoFrame) videoFrame.src = "";
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      if (videoFrame) videoFrame.src = "";
    }
  });
}

/* Sticky Bottom Bar */
function initStickyBottomBar() {
  const stickyBar = document.getElementById("sticky-bottom-cta");
  const heroSection = document.querySelector(".hero-section");

  if (!stickyBar || !heroSection) return;

  window.addEventListener("scroll", () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  });
}

/* Booking Form */
function initBookingForm() {
  const form = document.getElementById("checkout-ticket-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = "Processing Ticket... ⏳";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = "Ticket Reserved! 🎉";
      btn.style.background = "#10b981";
      alert(`🎉 Congratulations ${name}!\n\nYour 3-Day Live Build Ticket for "The 1 Crore Coach" has been confirmed for ₹99.\n\nWe have dispatched your access links and bonuses worth ₹27,000 to:\n📧 ${email}\n📱 WhatsApp: ${phone}\n\nSee you live on Day 1!`);
    }, 1200);
  });
}
