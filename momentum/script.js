// DOM Elements
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');

const btnBackground = document.getElementById('btn-background');
const btnQuote = document.getElementById('btn-quote');

// Show Time
function showTime() {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  // Output Time
  time.innerHTML = new Date().toLocaleString('ru', options);

  setTimeout(showTime, 1000);
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  // четыре времени суток:
  // утро 6:00-12:00,
  // день 12:00-18:00,
  // вечер 18:00-24:00,
  // ночь 24:00-6:00.

  if (hour < 12 && hour >= 6) {
    // Morning
    let ramdomImg = Math.floor(Math.random() * Math.floor(Morning.length));
    document.body.style.backgroundImage = `linear-gradient(rgba(99, 99, 99, 0.6) 0%, rgba(99, 99, 99, 0.6) 100%), url('${Morning[ramdomImg].image}')`;
    greeting.textContent = 'Что-то ранова для того, чтоб вылезти из кроватки, ';
  } else if (hour < 18) {
    // Afternoon
    let ramdomImg = Math.floor(Math.random() * Math.floor(Afternoon.length));
    document.body.style.backgroundImage = `linear-gradient(rgba(99, 99, 99, 0.6) 0%, rgba(99, 99, 99, 0.6) 100%), url('${Afternoon[ramdomImg].image}')`;
    greeting.textContent = 'Уже день, а всё равно хочется спать, ';
  } else if (hour > 18 && hour < 24) {
    // Evening
    let ramdomImg = Math.floor(Math.random() * Math.floor(Evening.length));
    document.body.style.backgroundImage = `linear-gradient(rgba(99, 99, 99, 0.6) 0%, rgba(99, 99, 99, 0.6) 100%), url('${Evening[ramdomImg].image}')`;
    greeting.textContent = 'Уже вечер, скоро спать, ';
  } else {
    // Night
    let ramdomImg = Math.floor(Math.random() * Math.floor(Night.length));
    document.body.style.backgroundImage = `linear-gradient(rgba(99, 99, 99, 0.6) 0%, rgba(99, 99, 99, 0.6) 100%), url('${Night[ramdomImg].image}')`;

    greeting.textContent = 'Задай цель, пойти спать и уйди спать, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (
    localStorage.getItem('name') === null ||
    localStorage.getItem('name') === ''
  ) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (
    e.target.textContent === '' &&
    ((e.type === 'keydown' && (e.which == 13 || e.keyCode == 13)) ||
      e.type === 'blur')
  ) {
    if (
      localStorage.getItem('name') === null ||
      localStorage.getItem('name').trim() === ''
    ) {
      e.target.innerText = '[Enter Name]';
    } else {
      e.target.innerText = localStorage.getItem('name').trim();
    }
  }
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim() === '') {
        localStorage.setItem('name', '[Enter Name]');
      } else {
        localStorage.setItem('name', e.target.innerText);
      }
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (
    e.target.textContent.trim() === '' &&
    ((e.type === 'keydown' && (e.which == 13 || e.keyCode == 13)) ||
      e.type === 'blur')
  ) {
    if (
      localStorage.getItem('focus') === null ||
      localStorage.getItem('focus').trim() === ''
    ) {
      e.target.innerText = '[Enter Focus]';
    } else {
      e.target.innerText = localStorage.getItem('focus').trim();
    }
  }
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim() === '') {
        localStorage.setItem('focus', '[Enter Focus]');
      } else {
        localStorage.setItem('focus', e.target.innerText);
      }
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Delete text on click
function setOnClick(e) {
  e.target.textContent = '';
}

// Run
showTime();
setBgGreet();
getName();
getFocus();

// смена фона каждую минуту
let startScript = (new Date().getMinutes() + 1) % 60; //Берем текущий час например 21 прибавляем 1, 21 + 1 = 22 это час когда нужно запустить скрипт
loop(); //Вызываем наш цикл
function loop() {
  let date = new Date(); //Берем текущее время
  if (date.getMinutes() == startScript) {
    //Если минут равны нулю и текущий час тому в котором нужно запустить скрипт
    startScript = (startScript + 1) % 60; //прибавляем +1 к часу в котором нужно запустить скрипт
    setBgGreet(); // и запускаем скрипт
  }
  setTimeout(loop, 300); //проверка текущего времени 1 раз в 30 секунд, если нужно чтобы скрипт запускался с точностью до секунды (22:00:00) поставить ~500
}

// Цитата

// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked
async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);

focus.addEventListener('click', setOnClick);
name.addEventListener('click', setOnClick);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

btnQuote.addEventListener('click', getQuote); // кнопка смены цитаты
btnBackground.addEventListener('click', setBgGreet); // кнопка смены фона
