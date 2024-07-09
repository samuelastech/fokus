const html = document.querySelector('html');
const startPause = document.querySelector('#start-pause');
const timer = document.querySelector('#timer');
const image = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
let activeButton = document.querySelector('.app__card-button.active');
const musicToggle = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const playAudio = new Audio('/sons/play.wav');
const pauseAudio = new Audio('/sons/pause.mp3');
const finshAudio = new Audio('/sons/beep.mp3');
music.loop = true;

const timers = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15* 60,
}

let time = timers.focus;
let intervalId = null;

const showTime = () => {
  const formattedTime = new Date(time * 1000)
    .toLocaleString('pt-Br', {
      minute: '2-digit',
      second: '2-digit',
    });
  timer.innerText = formattedTime;
};

showTime();

const finish = () => {
  finshAudio.play();
  clearInterval(intervalId);
  intervalId = null;
  time = 25 * 60;
  startPause.innerText = 'Começar';
};

const countdown = () => {
  showTime();
  return time-- === 0 && finish();
};

const toggleStart = () => {
  switch (startPause.innerText) {
    case 'Começar':
      intervalId = setInterval(countdown, 1000);
      playAudio.play();
      startPause.innerText = 'Pausar';
      break;
  
    case 'Pausar':
      clearInterval(intervalId);
      pauseAudio.play();
      startPause.innerText = 'Retomar';
      break;

    case 'Retomar':
      playAudio.play();
      intervalId = setInterval(countdown, 1000);
      startPause.innerText = 'Pausar';
      break;
  }
}

startPause.onclick = toggleStart;

musicToggle.onchange = () => music.paused ? music.play() : music.pause();

buttons.forEach((button) => {
  const parseClass = () => button.classList[1].split('--')[1];

  const changeContext = ({ context, title: { content, strong } }) => {
    html.dataset.contexto = context;
    image.setAttribute('src', `/imagens/${context}.png`);
    title.innerHTML = `
      ${content}<br>
      <strong class="app__title-strong">${strong}</strong>
    `;
  };

  button.onclick = function () {
    activeButton.classList.remove('active');
    button.classList.add('active');
    activeButton = this;

    let context = parseClass();

    switch (context) {
      case 'foco':
        changeContext({
          context,
          title: {
            content: 'Otimize sua produtividade,',
            strong: 'mergulhe no que importa.',
          }
        });
        time = timers.focus;
        showTime();
        break;

      case 'curto':
        changeContext({
          context: 'descanso-' + context,
          title: {
            content: 'Que tal dar uma respirada?',
            strong: 'Faça uma pausa curta!',
          }
        });
        time = timers.short;
        showTime();
        break;

      default:
        changeContext({
          context: 'descanso-' + context,
          title: {
            content: 'Hora de voltar a superficíe.',
            strong: 'Faça uma pausa longa.',
          }
        });
        time = timers.long;
        showTime();
        break;
    }
  }
});