import readlineSync from 'readline-sync';

export const createAbilitiesArray = (initialObj) => {
  const obj = initialObj;
  let newObj;
  if (obj.moves) {
    newObj = obj.moves.map((el) => el.name);
  } else {
    console.log("Object does not contain 'moves'");
  }
  return newObj;
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getHealthDifficulty() {
  const MAX = 60;
  const MIN = 0;
  let value = 10;
  let key;
  console.log(`\n\n${(new Array(20)).join(' ')}[Z] <- -> [X]  FIX: [SPACE]\n`);
  while (true) {
    console.log(`\x1B[1A\x1B[K|${
      (new Array(value + 1)).join('-')}O${
      (new Array(MAX - value + 1)).join('-')}| ${value}`);
    key = readlineSync.keyIn('', { hideEchoBack: true, mask: '', limit: 'zx ' });
    if (key === 'z') { if (value > MIN) { value--; } } else if (key === 'x') { if (value < MAX) { value++; } } else { break; }
  }
  console.log(`\nВаше выбранное здоровье: ${value}`);
  return value;
}
