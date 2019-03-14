//timer.html
let clock = setTimeout(function timerRun() {
  let date = new Date(),
      h = date.getHours().toString(),
      m = date.getMinutes().toString(),
      s = date.getSeconds().toString(),
      timer = document.querySelector('.timer');
      
  function twoLetter(arg) {
      if (arg.length < 2) {
        arg = '0' + arg;
      } return arg;
    }
      timer.innerHTML = twoLetter(h) + ":" + twoLetter(m) + ":" + twoLetter(s);
      setTimeout(timerRun, 1000);
  });

//function showUser


let age = document.getElementById('age');
 
function showUser(surname, name) {
  alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

showUser.call(age, 'Иванов', 'Иван');

age.onchange = function() {
  showUser.call(age, 'Иванов', 'Иван');
};