// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)


function gallerySlider() {
  const container = document.querySelector('.gallery');

  if (!container) {
    return null
  }

  const swiper = new Swiper('.gallery__slider', {
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 7000,
    slidesPerView: 'auto',
    spaceBetween: 20,
  })
}
gallerySlider();


document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');

  if (!hero) {
    return null
  }
  const countdown = document.querySelector('.countdown');

  // Убедитесь, что элементы занимают всю высоту экрана
  hero.style.minHeight = '100vh';
  countdown.style.minHeight = '100vh';

  // Настройка скролла
  let currentIndex = 0;
  const sections = [hero, countdown];

  const smoothScroll = (targetElement) => {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Длительность в миллисекундах
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * percentage);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      // Скролл вниз
      if (currentIndex < sections.length - 1) {
        currentIndex++;
        smoothScroll(sections[currentIndex]);
      }
    }

  });
});



//плавный скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
};


document.addEventListener('DOMContentLoaded', () => {
  const getStoredEndDate = () => {
    return parseInt(localStorage.getItem('countdownEndDate'), 10);
  };

  const setStoredEndDate = (endDate) => {
    localStorage.setItem('countdownEndDate', endDate);
  };

  const initializeTimer = () => {
    const storedEndDate = getStoredEndDate();
    const now = new Date().getTime();

    if (storedEndDate && storedEndDate > now) {
      return storedEndDate;
    } else {
      const newEndDate = now + 22 * 24 * 60 * 60 * 1000; // 22 days in milliseconds
      setStoredEndDate(newEndDate);
      return newEndDate;
    }
  };

  const endDate = initializeTimer();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      document.querySelector(".countdown__time").innerHTML = "EXPIRED";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  };

  // Обновить таймер каждую секунду
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Инициализировать таймер сразу при загрузке
  updateCountdown();
});
