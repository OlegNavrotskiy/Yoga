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
  loading: `<img src='icons/loading.gif'> - загрузка`,
  success: `<img src='icons/success.png'> - скоро мы с Вами свяжемся`,
  failure: `<img src='icons/failure.png'> - что-то пошло не так`
};

  let mainForm = document.querySelector('.main-form'),
    contactForm = document.querySelector("#form"),
    statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  function sendForm(form) {
    let input = form.getElementsByTagName('input');
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.appendChild(statusMessage);
      let formData = new FormData(form);


      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();

          request.open("POST", "server.php");

          request.setRequestHeader(
            "Content-Type",
            "application/json; charset=utf-8"
          );
          let obj = {};
          data.forEach(function (value, key) {
            obj[key] = value;
          });
          let json = JSON.stringify(obj);
          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200 && request.status < 3) {
                resolve();
              } else {
                reject();
              }
            }
          };
          request.send(json);
        });
      } // End postData
      function clearInputs() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = "";
        }
      }
      postData(formData)
        .then(() => (statusMessage.innerHTML = message.loading))
        .then(() => (statusMessage.innerHTML = message.success))
        .catch(() => (statusMessage.innerHTML = message.failure))
        .then(clearInputs);
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


// Slider
let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

showSlides(slideIndex);

function showSlides(n) {

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((item) => item.style.display = 'none');
  dots.forEach((item) => item.classList.remove('dot-active'));

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('dot-active');
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}

prev.addEventListener('click', function() {
  plusSlides(-1);
});
next.addEventListener('click', function() {
  plusSlides(1);  
});

dotsWrap.addEventListener('click', function(event) {
  for(let i = 0; i < dots.length + 1; i++) {
    if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
      currentSlide(i);
    }
  }
});


//Calc
let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.innerHTML = 0;

persons.addEventListener('change', function() {
  personSum = +this.value;
  total = (personSum + daysSum) * 4000;

  if (restDays.value == '' || persons.value == '') {
    totalValue.innerHTML = 0;
  } else {
    totalValue.innerHTML = total;
  }
});

restDays.addEventListener('change', function() {
  daysSum = +this.value;
  total = (personSum + daysSum) * 4000;

  if (persons.value == '' || restDays.value == '') {
    totalValue.innerHTML = 0;
  } else {
    totalValue.innerHTML = total;
  }
});

place.addEventListener('change', function() {
  if (restDays.value == '' || persons.value == '') {
    totalValue.innerHTML = 0;
  } else {
    let a = total;
    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
  }
});

// Ввод только цифр в калькуляторе
const inputsCalc = document.querySelectorAll('.counter-block-input');

    function onlyNumberCalc(input) {
        input.onkeyup = function () {
            return (this.value = this.value.replace(/[^0-9]/g, ""));
        };
    }
    [...inputsCalc].forEach(elem => onlyNumberCalc(elem));

}); //конец DOMContentLoaded