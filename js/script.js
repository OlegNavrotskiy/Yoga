window.addEventListener('DOMContentLoaded', function() {

  'use strict';
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

      function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
          tabContent[i].classList.remove('show');
          tabContent[i].classList.add('hide');
        }
      }
      hideTabContent(1);

      function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
          tabContent[b].classList.remove('hide');
          tabContent[b].classList.add('show');
        }
      }

      info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
          for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
              hideTabContent(0);
              showTabContent(i);
              break;
            }
          }
        }
      });

// Timer
let deadline = '2019-03-14:00:00';


function getTimeRemaining(endtime) {
 
  let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60).toString(),
      minutes = Math.floor((t / 1000 / 60) % 60).toString(),
      hours = Math.floor((t / 1000 / 60 / 60) % 24).toString();

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    if (hours.length < 2) {
      hours = "0" + hours;
    }

  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function setClock(id, endtime) {
  let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

      function updateClock() {
        let t = getTimeRemaining(endtime);
        
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;
        

        if (t.total <= 0) {
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
          clearInterval(timeInterval);  
        }
      }
}
setClock('timer', deadline);

//Modal


let more = document.querySelector('.more'),
    tabsBtn = document.querySelector('.description-btn');

/* function modalWindow(btn) {

let overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');


  btn.addEventListener('click', function() {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });
  close.addEventListener('click', function() {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

}
modalWindow(more);
modalWindow(tabsBtn); */

// Modal JS
function modalWindowJs(btn) {
  let overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  btn.addEventListener('click', function() {
    overlay.classList.remove('fade');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

}
modalWindowJs(more);
modalWindowJs(tabsBtn);


//Якорь

function anim(duration) {
  let temp;
  return function(sel) {
      cancelAnimationFrame(temp);
      let start = performance.now();
      let from = window.pageYOffset || document.documentElement.scrollTop,
      to = document.querySelector(sel).getBoundingClientRect().top;
      requestAnimationFrame(function step(timestamp) {
        let progress = (timestamp - start) / duration;
          1 <= progress && (progress = 1);
          window.scrollTo(0, from + to * progress | 0);
          1 > progress && (temp = requestAnimationFrame(step));
      });
  };
}

let scrollMenu = anim(1000);

let aboutBtn = document.querySelector('.menu-about'),
    productsBtn = document.querySelector('.menu-photo'),
    priceBtn = document.querySelector('.menu-price'),
    pontactsBtn = document.querySelector('.menu-contacts');

    aboutBtn.addEventListener('click', function() {
      scrollMenu('#about');
    });
    productsBtn.addEventListener('click', function() {
      scrollMenu('#photo');
    });
    priceBtn.addEventListener('click', function() {
      scrollMenu('#price');
    });
    pontactsBtn.addEventListener('click', function() {
      scrollMenu('#contacts');
    });

}); //конец DOMContentLoaded