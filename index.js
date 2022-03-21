/**
 * Colours code
 * 
 * 0 - Green 
 * 1 - Red
 * 2 - Yellow
 * 3 - Blue
 */

let order = [];
let clickedOrder = [];
let score = 0;


const blue = document.querySelector('div#blue');
const red = document.querySelector('div#red');
const green = document.querySelector('div#green');
const yellow = document.querySelector('div#yellow');


/**
 * Método para criação de nova ordem aleatória de cores
 */
function shuffleOrder () {
  let sortedColour = Math.floor(Math.random() * 4);

  order[order.length] = sortedColour;
  clickedOrder = [];

  for (let i in order) { 
    let elementColour = createColourElement(order[i]); 
    lightColour(elementColour, Number(i) + 1);
  };
}

/**
 * Método para acender os botões
 * 
 * @param {Botão} element Botão do board do Genius
 * @param {Tempo} number Tempo de duração
 */
function lightColour (element, number) {
  number = number * 500;

  setTimeout(() => {
    element.classList.add('selected');
  }, number - 250);

  setTimeout(() => {
    element.classList.remove('selected');
  }, number + 250);
}

/**
 * Método para checar se os botões foram clicados na ordem correta
 */
function checkOrder () {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }

    if (clickedOrder.length == order.length) {
      alert(`Parabéns, vamos ver se consegues passar na próxima fase.\nPontuação: ${score}`); 
      nextLevel();
    } 
  };
}

/**
 * Método para capturar o clique do usuário em um botão
 * 
 * @param {Cor} colour Cor atribuída
 */
function click (colour) {
  clickedOrder[clickedOrder.length] = colour;
  createColourElement(colour).classList.add('selected');

  setTimeout(() => {
    createColourElement(colour).classList.remove('selected');
    checkOrder();
  }, 250);

}

/**
 * Método para retornar uma cor a um elemento
 * 
 * @param {Cor} colour Cor a ser atribuída para um elemento
 */
function createColourElement (colour) {
  if(colour == 0) {
    return green;
  } else if(colour == 1) {
    return red;
  } else if (colour == 2) {
    return yellow;
  } else if (colour == 3) {
    return blue;
  };
}

/**
 * Método para retornar uma nova ordem de cores e aumentar a pontuação do usuário
 */
function nextLevel () {
  score++;
  shuffleOrder();
}

/**
 * Método para retornar uma nova ordem e recomeçar o jogo com pontuação zerada
 */
function gameOver () {
  alert(`Ordem errada.\nPontuação final: ${score}`);

  order = [];
  clickedOrder = [];
  score = 0;

  playGame();
}

/**
 * Método para inicializar uma nova partida do game
 */
function playGame () {
  alert(`Bem-vindo(a) ao Genius!\nRepita a ordem das cores:`);
  
  score = 0;

  nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
