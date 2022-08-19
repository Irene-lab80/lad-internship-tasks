import readlineSync from 'readline-sync';

const generateNumber = (reqLength) => {
  const result = [];
  while (result.length < reqLength) {
    const random = Math.floor(Math.random() * 10);
    if (result.indexOf(random) === -1) {
      result.push(random);
    }
  }
  return result.join('');
};

function compare(str1, str2) {
  const input = str1;
  const answer = str2;
  const matchesNumber = [];
  const rigthNumbers = [];
  const wrongNumbers = [];
  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < answer.length; j += 1) {
      if (!input[i].indexOf(answer[j])) {
        matchesNumber.push(input[i]);
        if (i === j && input[i] === answer[j]) {
          rigthNumbers.push(input[i]);
        } else {
          wrongNumbers.push(input[i]);
        }
      }
    }
  }
  console.log(`всего совпавших ${matchesNumber.length}`);
  console.log(`из них на своих местах ${rigthNumbers.length} (${rigthNumbers})`);
  console.log(`из них не на своих местах ${wrongNumbers.length} (${wrongNumbers})`);
}

const checkInput = () => {
  const separator1 = '~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*';
  const separator2 = '..............................';
  console.log('\n~~~ ИГРА НАЧАЛАСЬ ~~~ \n');
  const length = +readlineSync.question('Выберите сложность: \nновичок(3) \nлюбитель(4) \nпрофессионал(5) \nэксперт(6) \n');
  const number = generateNumber(length);
  const difficulty = 5;
  for (let i = difficulty + 1; i > 0; i -= 1) {
    console.log(`\nОсталось ${i} попыток`);
    const numberInput = readlineSync.question(`Угадайте число ${'[]'.repeat(length)} `);
    if (numberInput.length === length) {
      if (numberInput === number) {
        console.log(`\n${separator1}\n\n ВЫ УГАДАЛИ! \n\n${separator1}`);
        process.exit();
      } else {
        compare(numberInput, number);
      }
    } else {
      console.log(`\n!!!!! число должно состоять из ${length} символов !!!!!`);
    }
  }
  console.log(`\n${separator2}\n\n...ВЫ НЕ УГАДАЛИ ¯\\_(ツ)_/¯... \n\n${separator2}`);
};

checkInput();
