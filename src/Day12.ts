/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day12 = () => {
  const str = readFileSync('./src/inputs/day12Input.txt', 'utf8');
  const mov = str.split('\n');
  let currDir = Directions.E;
  // Counters
  let EW = 0;
  let NS = 0;
  mov.forEach((m) => {
    const act = m.slice(0, 1);
    const val = parseInt(m.slice(1));
    switch (act) {
      case 'N':
        NS += val;
        break;
      case 'E':
        EW += val;
        break;
      case 'S':
        NS -= val;
        break;
      case 'W':
        EW -= val;
        break;
      case 'R':
        currDir = rotateR(currDir, val);
        break;
      case 'L':
        currDir = rotateL(currDir, val);
        break;
      case 'F':
        switch (currDir) {
          case Directions.N:
            NS += val;
            break;
          case Directions.E:
            EW += val;
            break;
          case Directions.S:
            NS -= val;
            break;
          case Directions.W:
            EW -= val;
            break;
        }
        break;
    }
  });
  console.log(Math.abs(EW) + Math.abs(NS));
};

enum Directions {
  N,
  E,
  S,
  W,
}

const rotateR = (currDir: Directions, degrees: number) => {
  const rotations = degrees / 90;
  return ((currDir + rotations) % 4) as Directions;
};

const rotateL = (currDir: Directions, degrees: number) => {
  const rotations = (degrees / 90) % 4;
  return ((currDir + (4 - rotations)) % 4) as Directions;
};

const rotateWR = (wNS: number, wEW: number, degrees: number) => {
  const rotations = degrees / 90;
  switch (rotations) {
    case 1:
      return [-wEW, wNS];
    case 2:
      return [-wNS, -wEW];
    case 3:
      return [wEW, -wNS];
  }
  return [wNS, wEW];
};

const rotateWL = (wNS: number, wEW: number, degrees: number) => {
  const rotations = degrees / 90;
  return rotateWR(wNS, wEW, (4 - rotations) * 90);
};

const day12_2 = () => {
  const str = readFileSync('./src/inputs/day12Input.txt', 'utf8');
  const mov = str.split('\n');
  // Counters
  let EW = 0;
  let NS = 0;
  let wEW = 10;
  let wNS = 1;
  mov.forEach((m) => {
    const act = m.slice(0, 1);
    const val = parseInt(m.slice(1));
    switch (act) {
      case 'N':
        wNS += val;
        break;
      case 'E':
        wEW += val;
        break;
      case 'S':
        wNS -= val;
        break;
      case 'W':
        wEW -= val;
        break;
      case 'R':
        [wNS, wEW] = rotateWR(wNS, wEW, val);
        break;
      case 'L':
        [wNS, wEW] = rotateWL(wNS, wEW, val);
        break;
      case 'F':
        NS += val * wNS;
        EW += val * wEW;
        break;
    }
  });
  console.log(Math.abs(EW) + Math.abs(NS));
};

export const runday12 = () => {
  day12();
  day12_2();
};
