import readlineSync from 'readline-sync';
import { monster, mage } from './players.js';
import { createAbilitiesArray, getRandomInt, getHealthDifficulty } from './common.js';

function startGame(player1, player2) {
  const computer = player1;
  const player = player2;

  player.maxHealth = getHealthDifficulty();

  const mageMoves = createAbilitiesArray(player);
  const computerMoves = createAbilitiesArray(computer);

  let move = 0; // computer's first
  let round = 1;
  let compActionIndex;
  let playerActionIndex;

  console.log('ИГРА НАЧАЛАСЬ \nПервым ходит компьютер');

  while (computer.maxHealth > 0 || player.maxHealth > 0) {
    console.log(`(РАУНД ${round})`);

    if (move % 2 === 0) { // computer's turn
      console.log(`Ходит ${computer.name}. Здоровье: ${computer.maxHealth}`);
      compActionIndex = getRandomInt(computerMoves.length);
      computer.currentHealth = computer.maxHealth;
      console.log(`${computer.name} выбрал "${computerMoves[compActionIndex]}".\n`);
      move += 1;
    } else { // player's turn
      console.log(`Ходит ${player.name}. Здоровье: ${player.maxHealth}\n`);
      playerActionIndex = readlineSync.keyInSelect(mageMoves, 'Выберите ход:');
      console.log(`${player.name} выбрал "${mageMoves[playerActionIndex]}".\n`);
      move += 1;
    }

    if (move % 2 === 0 && move !== 0) {
      // damage to computer
      computer.maxHealth -= player.moves[playerActionIndex].physicalDmg * (1 - computer.moves[compActionIndex].physicArmorPercents / 100);
      computer.maxHealth -= player.moves[playerActionIndex].magicDmg * (1 - computer.moves[compActionIndex].magicArmorPercents / 100);
      // damage to player
      player.maxHealth -= computer.moves[compActionIndex].physicalDmg * (1 - player.moves[playerActionIndex].physicArmorPercents / 100);
      player.maxHealth -= computer.moves[compActionIndex].magicDmg * (1 - player.moves[playerActionIndex].magicArmorPercents / 100);
      // round the results
      computer.maxHealth = Math.round(computer.maxHealth);
      player.maxHealth = Math.round(player.maxHealth);

      if (computer.maxHealth > 0 && player.maxHealth > 0) {
        console.log(`Был нанесен урон. \nЗдоровье Лютого теперь: ${computer.maxHealth}, Здоровье Евстафия теперь ${player.maxHealth}\n`);
        round += 1;
      } else if (player.maxHealth <= 0) { // т.к. теоретически компьютер первым наносит удар
        console.log(`Победил ${computer.name}`);
        process.exit();
      } else if (computer.maxHealth <= 0) {
        console.log(`Победил ${player.name}`);
        process.exit();
      }
    }
  }
}

startGame(monster, mage);
