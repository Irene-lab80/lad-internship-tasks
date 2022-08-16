const daysRUS = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
  "ВОСКРЕСЕНЬЕ"
];

const daysENG = [
  "MONDAY",
  "TUESDAY",
  "THURSDAY",
  "WENDSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];

let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;


const StrReplace = (str, substrArr, SubstrReplaceWithArr) => {
  let newStr = str;
  substrArr.forEach((el, index) => {
    return (newStr = newStr.replace(el, SubstrReplaceWithArr[index]));
  });
  return newStr;
};

// const StrReplace = (str, substrArr, SubstrReplaceWith) => {
//   const newStr = str.split(" ");
//   return newStr;
// };

console.log(StrReplace(str, daysRUS, daysENG));