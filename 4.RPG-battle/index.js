/* eslint-disable no-unused-vars */
import readlineSync from 'readline-sync';
import { monster, mage } from './players.js';
import { getRandomInt, getHealthDifficulty } from './common.js';

// create state for players
const computer = { ...monster };
const player = { ...mage };

// add currentCooldown, isOnCooldown properties for each player
player.moves.forEach((el) => {
  el.currentCooldown = 0;
  el.isOnCooldown = false;
});

computer.moves.forEach((el) => {
  el.currentCooldown = 0;
  el.isOnCooldown = false;
});

// create temp list for prompting user
function createChoiceArray(arr) {
  const newArr = [];
  arr.forEach((el) => {
    if (el.isOnCooldown === false) {
      newArr.push(el.name);
    }
  });
  return newArr;
}

const checkCooldown = (movesArr, id) => {
  movesArr.forEach((el) => {
  // set cooldown
    if (movesArr.find((x) => x.name === id).cooldown > 0) {
      movesArr.find((x) => x.name === id).isOnCooldown = true;
    }
    // reset cooldown
    if (el.currentCooldown === el.cooldown) {
      el.isOnCooldown = false;
      el.currentCooldown = 0;
    }
    // increment currentCooldown
    if (el.isOnCooldown === true) {
      el.currentCooldown += 1;
    }
  });
};

function startGame() {
  // set player health
  console.log('Выберите свое здоровье');
  player.maxHealth = getHealthDifficulty();

  // create abilities state object
  const computerMoves = [...computer.moves];
  const mageMoves = [...player.moves];

  // set func variables
  let move = 0; // computer's first
  let round = 1;
  let computerMoveID;
  let playerMoveID;
  console.log('ИГРА НАЧАЛАСЬ \nПервым ходит компьютер');

  while (computer.maxHealth > 0 || player.maxHealth > 0) {
    console.log(`(РАУНД ${round})`);

    if (move % 2 === 0) { // computer's turn
      console.log(`Ходит ${computer.name}. Здоровье: ${computer.maxHealth}`);
      const tempComputerMoves = createChoiceArray(computerMoves);
      const index = getRandomInt(tempComputerMoves.length);
      computerMoveID = tempComputerMoves[index];
      console.log(`${computer.name} выбрал "${computerMoveID}".\n`);
      move += 1;
    } else if (move % 2 === 1) { // player's turn
      console.log(`Ходит ${player.name}. Здоровье: ${player.maxHealth}\n`);
      const tempMageMoves = createChoiceArray(mageMoves);
      // get action from player
      const index = readlineSync.keyInSelect(tempMageMoves, 'Выберите ход:');
      // get move id
      if (index === -1) {
        console.log('ВЫ ВЫШЛИ ИЗ ИГРЫ');
        process.exit();
      }
      playerMoveID = tempMageMoves[index];
      console.log(`${player.name} выбрал "${playerMoveID}".\n`);
      move += 1;
    }

    if (move % 2 === 0 && move !== 0) {
      // damage to computer
      computer.maxHealth -= mageMoves.find((x) => x.name === playerMoveID).physicalDmg * (1 - computerMoves.find((x) => x.name === computerMoveID).physicArmorPercents / 100);
      computer.maxHealth -= mageMoves.find((x) => x.name === playerMoveID).magicDmg * (1 - computerMoves.find((x) => x.name === computerMoveID).magicArmorPercents / 100);
      // damage to player
      player.maxHealth -= computerMoves.find((x) => x.name === computerMoveID).physicalDmg * (1 - mageMoves.find((x) => x.name === playerMoveID).physicArmorPercents / 100);
      player.maxHealth -= computerMoves.find((x) => x.name === computerMoveID).magicDmg * (1 - mageMoves.find((x) => x.name === playerMoveID).magicArmorPercents / 100);
      // round the results
      computer.maxHealth = Math.round(computer.maxHealth);
      player.maxHealth = Math.round(player.maxHealth);

      checkCooldown(mageMoves, playerMoveID);
      checkCooldown(computerMoves, computerMoveID);

      if (computer.maxHealth > 0 && player.maxHealth > 0) {
        console.log(`Был нанесен урон. \nЗдоровье Лютого теперь: ${computer.maxHealth}, Здоровье Евстафия теперь ${player.maxHealth}\n`);
        round += 1;
      } else if (player.maxHealth <= 0) {
        console.log(`Победил ${computer.name}`);
        process.exit();
      } else if (computer.maxHealth <= 0) {
        console.log(`Победил ${player.name}`);
        process.exit();
      }
    }
  }
}

startGame();
