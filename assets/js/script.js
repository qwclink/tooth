document.addEventListener('DOMContentLoaded', function() {
  // Бургер-меню
  const burgerBtn = document.querySelector(".header__burger");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      
      // Переключаем атрибут hidden
      if (mobileMenu.hidden) {
        mobileMenu.removeAttribute('hidden');
      } else {
        mobileMenu.hidden = true;
      }
      
      this.classList.toggle("active");
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener("click", function(e) {
      if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
        burgerBtn.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        burgerBtn.classList.remove("active");
      }
    });
  }

  // ============ Десктопное выпадающее меню ============
  const dropdownBtn = document.querySelector(".header__dropdown-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");
  
  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      dropdownMenu.classList.toggle("show");
    });
    
    // Закрытие при клике вне меню
    document.addEventListener("click", function() {
      dropdownBtn.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("show");
    });
  }

  // ============ Мобильное выпадающее меню ============
  const mobileDropdownBtn = document.querySelector("#mobile-menu button[aria-haspopup]");
  const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
  
  if (mobileDropdownBtn && mobileDropdownMenu) {
    mobileDropdownBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      mobileDropdownMenu.classList.toggle("show");
    });
  }

  // ============ Слайдер врачей ============
  const doctorsList = document.querySelector(".doctors__list");
  const prevBtn = document.querySelector(".doctors__btn--prev");
  const nextBtn = document.querySelector(".doctors__btn--next");
  
  if (doctorsList && prevBtn && nextBtn) {
    const cards = Array.from(doctorsList.children);
    const visibleCount = 1;
    let currentIndex = 0;

    function updateSlider() {
      const cardStyle = getComputedStyle(cards[0]);
      const cardWidth = cards[0].offsetWidth + parseFloat(cardStyle.marginRight);
      const maxIndex = cards.length - visibleCount;
      
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      
      doctorsList.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === maxIndex;
    }

    prevBtn.addEventListener("click", () => {
      currentIndex--;
      updateSlider();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex++;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();
  }

  // ============ Калькулятор цен ============
  const serviceSelect = document.getElementById("calc-service");
  const urgencySelect = document.getElementById("calc-urgency");
  const ageSelect = document.getElementById("calc-age");
  const resultEl = document.getElementById("calculator-result")?.querySelector("strong");
  
  if (serviceSelect && urgencySelect && ageSelect && resultEl) {
    const servicesPrice = {
      whitening: 5000,
      implant: 25000,
      cleaning: 3000,
    };

    function calculatePrice() {
      let base = servicesPrice[serviceSelect.value] || 0;
      if (urgencySelect.value === "express") base *= 1.5;
      if (ageSelect.value === "child") base *= 0.8;
      resultEl.textContent = `${Math.round(base).toLocaleString("ru-RU")} ₽`;
    }

    serviceSelect.addEventListener("change", calculatePrice);
    urgencySelect.addEventListener("change", calculatePrice);
    ageSelect.addEventListener("change", calculatePrice);
    calculatePrice();
  }

  // ============ Переключение темы ============
  const themeToggleBtn = document.querySelector(".theme-toggle");
  
  if (themeToggleBtn) {
    // Загрузка темы из localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }

    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", 
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  // ============ Кнопки "Подробнее" ============
  document.querySelectorAll(".service-card__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Здесь будет подробное описание услуги.");
    });
  });
});