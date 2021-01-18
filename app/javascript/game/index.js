import Easy from './modules/easy';
// import { setup } from './modules/setup_module';
import Setup from './modules/setup_class';
import { formatCode, levelSelection, getRadioValue, validateCode, capitalize } from '../helpers/index';

import bullSVG from '../images/bull.svg';
import cowSVG from '../images/sacred-cow.svg';

class Play {
  
  start(userCode, levelCode) {

    const setup = new Setup();
    let comp = setup.getComputerCode();
    let numberSet = setup.createNumberSet();
    let player = formatCode(userCode);
    let level = levelSelection(levelCode);
    const computerName = capitalize(levelCode);
    console.log(computerName);
    //let computerName = setup.generateComputerPlayer();

    console.log(comp);
    console.log(numberSet.size);
    console.log(player)
    console.log(level);

    console.log(typeof numberSet);
    const easy = new Easy();
    //const medium = new Medium(numberSet, comp, player);
    //const hard = new Hard(numberSet, comp, player);

    if (level == 1) {
      console.log("easy level selected");
      document.querySelector('#codeForm').classList.add('hidden');
      document.querySelector('#guessForm').classList.remove('hidden');
      document.querySelector('.show-user-code').textContent = `Your secret code is ${userCode}`;
      // document.querySelector('.show-comp-name').textContent = `You are playing against ${computerName}`;
      document.querySelector("label[for=userGuess]").textContent = `Guess ${computerName}'s secret code`;
      document.querySelector('.comp-table--name').textContent = computerName;
      document.querySelector('.players-table--name').textContent = 'Player X';
      easy.playGame(numberSet, comp, player);
    } else if (level == 2) {
      console.log("medium level selected");
      //console.log(medium.playGame());
    } else if (level == 3) {
      console.log("hard level selected");
      //console.log(hard.playGame());
    }

  }
}

document.addEventListener('turbolinks:load', function() {
  const game = new Play();
  const form = document.querySelector('#codeForm');
  const codeInput = document.querySelector('#userCode');
  const errorContainer = document.querySelector('.code-error');
  const playAgain = document.querySelector('.play-again');
  const radioLevel = document.querySelectorAll('[name="level-group"]');
  codeInput.focus();

  /*
  codeInput.addEventListener('keyup', (event) => {
    const validCode = validateCode(event.target.value, errorContainer, codeInput);
    if (validCode) {
      errorContainer.classList.add('hidden');
      codeInput.classList.remove('invalid');
    }
  })
  */

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // This needs to be fixed up
    // const levelCode = event.target[2].value;
    // Add name field?
    const levelCode = getRadioValue(radioLevel);
    console.log(event);
    const userCode = event.target[1].value;
    const validCode = validateCode(userCode, errorContainer, codeInput);
    if (validCode == false) {
      return;
    } else {
      game.start(userCode, levelCode);
    }
  });
  playAgain.addEventListener('click', (event) => {
    event.preventDefault();
    location.reload();
  })
});