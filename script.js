const html = document.querySelector('html');
const image = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
let activeButton = document.querySelector('.app__card-button.active');
const musicToggle = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
music.loop = true;

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
      case 'foco': changeContext({
        context,
        title: {
          content: 'Otimize sua produtividade,',
          strong: 'mergulhe no que importa.',
        }
      }); break;

      case 'curto': changeContext({
        context: 'descanso-' + context,
        title: {
          content: 'Que tal dar uma respirada?',
          strong: 'Faça uma pausa curta!',
        }
      }); break;

      default: changeContext({
        context: 'descanso-' + context,
        title: {
          content: 'Hora de voltar a superficíe.',
          strong: 'Faça uma pausa longa.',
        }
      }); break;
    }
  }
});