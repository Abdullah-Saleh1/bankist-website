'use strict';

// Elemenets
const header = document.querySelector('.header'); 

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnMode = document.querySelector('.btn--mode'); 
const body = document.body; 

const menuToggler = document.querySelector('.nav__menu'); 
const navLinks = document.querySelector('.nav__links'); 

const logo = document.querySelector('.nav__logo')
const navItems = document.querySelectorAll('.nav__item'); 

const btnScrollTo = document.querySelector('.btn--scroll-to'); 
const section1 = document.querySelector('#section--1'); 

const nav = document.querySelector('.nav'); 

const operationsTapContainer = document.querySelector('.operations__tab-container'); 

const allSections = document.querySelectorAll('.section'); 
const footer = document.querySelector('.footer'); 

const allFeatures = document.querySelectorAll('.features > *'); 
const featureImages = document.querySelectorAll('img[data-src]'); 

const sliderContainer = document.querySelector('.slider-container'); 
const slides = document.querySelectorAll('.slide'); 
const btnLeft = document.querySelector('.slider__btn--left'); 
const btnRight = document.querySelector('.slider__btn--right'); 
const maxSlide = slides.length - 1; // To Make It Zero Based
const dotContainer = document.querySelector('.dots'); 
let curSlide = 0; 

const goUpBtn = document.querySelector('.goUp');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault(); 
  
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  body.style.overflow = 'hidden'; 
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  body.style.overflowY = 'auto'; 
};

for (let i = 0; i < btnsOpenModal.length; i++)
btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Mode Btn 
let darkmode = true; 
btnMode.addEventListener('click', (e) => {
  e.preventDefault(); 
  body.classList.toggle('darkmode'); 
  
  if (!darkmode) {
    btnMode.classList.remove('fa-sharp', 'fa-moon'); 
    btnMode.classList.add('fa-sun'); 
    darkmode = !darkmode;
  } else {
    btnMode.classList.add('fa-sharp', 'fa-moon'); 
    btnMode.classList.remove('fa-sun'); 
    darkmode = !darkmode;
  }
})


// Menu Fade Animation 
const changeOpacity = function(e) {
  const link = e.target; 
  if (link.classList.contains('nav__link') || link === btnMode) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); 

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = logo.style.opacity = btnMode.style.opacity = this;
      if (link === btnMode) btnMode.style.opacity = 1; 
    })
  }
}
if (window.matchMedia('(max-width: 992px)').matches) {
  document.querySelectorAll('.cta')[1].classList.remove('cta'); 
}
if (window.matchMedia('(min-width: 992px)').matches) {
  nav.addEventListener('mouseover', changeOpacity.bind(.45))
  
  nav.addEventListener('mouseout', changeOpacity.bind(1))
} else {
  nav.removeEventListener('mouseover', changeOpacity)
  nav.removeEventListener('mouseout', changeOpacity); 
}

// Menu On Mobile
let isOpen = false; 
menuToggler.addEventListener('click', function (e) {
  this.classList.toggle('active'); 
  if (isOpen) {
    navLinks.style.maxHeight = '0px'; 
    isOpen = !isOpen; 
  } else {
    navLinks.style.maxHeight = '260px'; 
    isOpen = !isOpen; 
  }
})

// Sticky Navigation && goUp Button 
const observer = new IntersectionObserver(entries => {
  nav.classList.toggle('sticky', !entries[0].isIntersecting); 
  goUpBtn.classList.toggle('goUp--hidden', entries[0].isIntersecting); 
}, {
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
}); 


observer.observe(header); 


// Btn Scrolling
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect(); 
  section1.scrollIntoView({behavior: 'smooth'}); 
})

// Page Navigation
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault(); 
  if (!e.target.classList.contains('btn--show-modal') && e.target.classList.contains('nav__link')) {
    // Matching Strategy
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  }
})

// Tabbed Component
operationsTapContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab'); // To Fix When Click On The Span

  // Guard Clause 
  if (!clicked) return; // Terminate The Function If The Value Is Null

  // Active Tab
  [...this.children].forEach(btn => {
    btn.classList.remove('operations__tab--active'); 
  })
  clicked.classList.add('operations__tab--active'); 

  // Active Content
  document.querySelectorAll('.operations__content').forEach(el => {
    el.classList.remove('operations__content--active'); 
  }); 

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 

})
// - Apperance 
const update = _ => {
  const operationsActive = document.querySelector('.operations__content--active');

  operationsTapContainer.style.margin = `0 0 ${getComputedStyle(operationsActive).height}`; 
}
update(); 

// Adapt Margin When Resizing 
window.addEventListener('resize', update); 


// Reveal Section: AOS
const sectionObserver = new IntersectionObserver(entries => {
  const [entry] = entries; 
  // Guard Clause
  if (!entry.isIntersecting) return; 

  entry.target.classList.remove('section--hidden'); 
  sectionObserver.unobserve(entry.target);
}, {
  threshold: .2, 
})

allSections.forEach(section => {
  section.classList.add('section--hidden'); 
  sectionObserver.observe(section); 
})
footer.classList.add('section--hidden'); 
sectionObserver.observe(footer); 

// Reveal Features: AOS
const featureObserver = new IntersectionObserver(entries => {
  const [entry] = entries; 
  if (!entry.isIntersecting) return; 

  entry.target.classList.remove('feature--hidden'); 
  featureObserver.unobserve(entry.target); 
}, {
  threshold: .15, // Because You Dissappear 85% Of The Feature 
}); 
allFeatures.forEach(feature => {
  feature.classList.add('feature--hidden'); 
  featureObserver.observe(feature); 
}); 
if (window.matchMedia('(max-width: 767px)').matches) {
  document.querySelector('.third').style.setProperty('--x', '-85%');
  document.querySelector('.fourth').style.setProperty('--x', '85%'); 
}


// Lazy Loading Images
const imageObserver = new IntersectionObserver(entries => {
  const [entry] = entries; 
  if (!entry.isIntersecting) return; 
  const img = entry.target; 

  img.src = img.dataset.src; 
  img.addEventListener('load', function () {
    img.classList.remove('lazy-img'); 
  })
  imageObserver.unobserve(img); 
}, {
  threshold: 0, 
  rootMargin: '-50px',
}); 

featureImages.forEach(img => imageObserver.observe(img)); 

// Slider 
// Functions 
const showSlide = function(curSlide) {
  sliderContainer.scrollTo({
    left: curSlide * slides[0].clientWidth, 
    behavior: 'smooth',
  })
}

const activeDot = function(curSlide) {
  [...dotContainer.children].forEach(dot => {
    dot.classList.toggle('dots__dot--active', +dot.dataset.slide === curSlide); 
  })
}
// Next Slide
const nextSlide = function() {
  curSlide === maxSlide ? curSlide = 0 : curSlide++; 
  showSlide(curSlide); 
  activeDot(curSlide); 
}
// Previos Slide 
const prevSlide = function() {
  curSlide === 0 ? curSlide = maxSlide : curSlide--; 
  showSlide(curSlide); 
  activeDot(curSlide); 
}

showSlide(0); // 0% 100% 200% 300% 
window.addEventListener('DOMContentLoaded', function () {
  activeDot(0); 
})

// Create The Dots 
slides.forEach((_, i) => {
  const html = `<button class='dots__dot' data-slide='${i}'></button>`; 
  dotContainer.insertAdjacentHTML('beforeend', html); 
}); 
dotContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    const {slide: s} = e.target.dataset; // An Object 
    activeDot(+s); 
    showSlide(+s); 
  }
})

// Event Listeners 
btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') nextSlide(curSlide); 
  e.key === 'ArrowLeft' && prevSlide(curSlide); 
})

// Slider On Mobile 
sliderContainer.addEventListener('scroll', function() {
  const slideWidth = slides[0].clientWidth; 
  const scrollX = this.scrollLeft; 
  if (scrollX === 0) curSlide = 0; 
  if (slideWidth === scrollX || slideWidth + 1 === scrollX || slideWidth - 1 === scrollX) curSlide = 1; 
  if (slideWidth * 2 - 1 <= scrollX) curSlide = 2; 
  activeDot(curSlide); 
})

// goUp Btn 
goUpBtn.addEventListener('click', function() {
  header.scrollIntoView({behavior: 'smooth'})
})