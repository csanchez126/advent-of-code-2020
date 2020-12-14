/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day5 = () => {
  const seatIDs = getSeatIDs();
  console.log(seatIDs.filter((x) => isNaN(x)));
  console.log(Math.max(...seatIDs));
};

const getSeatIDs = (): number[] => {
  const str = readFileSync('./src/inputs/day5Input.txt', 'utf8');
  const inputs = str.split('\n');
  return inputs.map((str) => {
    const binStr = str
      .replace(/B/g, '1')
      .replace(/F/g, '0')
      .replace(/R/g, '1')
      .replace(/L/g, '0');
    if (isNaN(parseInt(binStr, 2))) {
      console.log(str, binStr);
    }
    return parseInt(binStr, 2);
  });
};

const day5_2 = () => {
  const seatIDs = getSeatIDs();
  const allIDs = [];

  for (let i = 0; i < 1024; i += 1) {
    allIDs.push(i);
  }

  const missingIDs = allIDs.filter(
    (id) => seatIDs.indexOf(id) === -1 && id > 8 && id < 1016,
  );

  const mySeatID = missingIDs.filter((id, i, arr) => {
    return arr.some((x) => x === id + 1) && arr.some((x) => x === id - 1);
  });

  console.log(mySeatID);
};

export const runday5 = () => {
  day5();
  day5_2();
};
