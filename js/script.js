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

function modalWindow(btn) {

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
modalWindow(tabsBtn);
    
//Якорь

let aboutBtn = document.querySelector('.menu-about'),
    photoBtn = document.querySelector('.menu-photo'),
    priceBtn = document.querySelector('.menu-price'),
    contactsBtn = document.querySelector('.menu-contacts');

aboutBtn.onclick = function() {
  animate(function(timePassed) {
    let k = timePassed / (200 / 650);
    window.scroll(0, k);

  }, 200);
};
photoBtn.onclick = function() {
  animate(function(timePassed) {
    let k = timePassed / (500 / 1907);
    window.scroll(0, k);

  }, 500);
};
priceBtn.onclick = function() {
  animate(function(timePassed) {
    let k = timePassed / (400 / 2409);
    window.scroll(0, k);

  }, 760);
};
contactsBtn.onclick = function() {
  animate(function(timePassed) {
    let k = timePassed / (400 / 3003);
    window.scroll(0, k);

  }, 700);
};

function animate(draw, duration) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timePassed = time - start;
    if (timePassed > duration) {
      timePassed = duration;
    }
    draw(timePassed);
    if (timePassed < duration) {
      requestAnimationFrame(animate);
    }
  });
}

}); //конец DOMContentLoaded