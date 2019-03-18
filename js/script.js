window.addEventListener('DOMContentLoaded', () => {
  
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

  info.addEventListener('click', event => {
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
        seconds = `0${seconds}`;
      }
      if (minutes.length < 2) {
        minutes = `0${minutes}`;
      }
      if (hours.length < 2) {
        hours = `0${hours}`;
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
    tabsBtn = document.querySelector('.description-btn'),
    browser = getNameBrowser();

  if (browser == 'EDGE' || browser == 'MSIE') {
    modalWindow(more);
    modalWindow(tabsBtn);
  } else {
    if (!isMobile()) {
      modalWindowJs(more);
      modalWindowJs(tabsBtn);
    } else {
      if (isMobile()) {
        modalMobileWindow(more);
        modalMobileWindow(tabsBtn);
      }
    }

  }
  // Modal CSS

  function modalWindow(btn) {

    let overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

    btn.addEventListener('click', () => {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', () => {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    });
  }

  //Modal mobile
  function modalMobileWindow(btn) {

    let overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

    btn.addEventListener('click', () => {
      overlay.classList.remove('fade');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    });
  }


  // Modal JS
  function modalWindowJs(btn) {
    let overlay = document.querySelector('.overlay'),
      popup = document.querySelector('.popup'),
      close = document.querySelector('.popup-close');

    btn.addEventListener('click', () => {
      overlay.classList.remove('fade');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      animate(timePassed => {
        popup.style.top = `${timePassed / 5}px`;
      }, 600);

    });

    close.addEventListener('click', () => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    });

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
  }

  // Проверка браузера
  function getNameBrowser() {
    const ua = navigator.userAgent;
    if (ua.search(/EDGE/) > 0) {
      return 'EDGE';
    }
    if (ua.search(/MSIE/) > 0) {
      return 'MSIE';
    }
  }

  //Проверка на моб.версию
  function isMobile() {
    if (navigator.userAgent.match(/Android|Mobile|IEMobile|Opera Mini|iPhone|iPad|iPod/i) == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //Якорь

  function anim(duration) {
    let temp;
    return sel => {
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

  let li = document.querySelectorAll('li');

  li.forEach((item) => {
    item.addEventListener('click', () => {
      scrollMenu((item.firstChild.getAttribute('href')));
    });
  });

// Form 
let message = {
  loading: "Загрузка...",
  success: "Спасибо! Скоро мы с вами свяжемся!",
  failure: "Что-то пошло не так"
};

let mainForm = document.querySelector('.main-form'),
    contactForm = document.querySelector("#form"),
    statusMessage = document.createElement('div');

statusMessage.classList.add('status');

function sendForm(form) {
  let  input = form.getElementsByTagName('input');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.appendChild(statusMessage);
  
    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    let formData = new FormData(form);
    request.send(formData);
  
    request.addEventListener('readystatechange', function() {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });
  
    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
    }
  });
}
sendForm(mainForm);
sendForm(contactForm);

//Номер телефона
const inputsPhone = document.querySelectorAll('input[name="phone"]');

    function onlyNumber(input) {
        input.onkeyup = function () {
            return (this.value = this.value.replace(/[^0-9,+]/g, ""));
        };
    }
    [...inputsPhone].forEach(elem => onlyNumber(elem));


}); //конец DOMContentLoaded