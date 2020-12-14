/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day11 = () => {
  const str = readFileSync('./src/inputs/day11Input.txt', 'utf8');

  let inputs = str.split('\n').map((x) => x.split(''));
  const result: string[][] = [...inputs.map((row) => [...row])]; //Clone array

  let resultStr = '';
  let inputStr = str;

  while (resultStr !== inputStr) {
    inputStr = inputs.map((x) => x.join('')).join('\n');
    inputs.forEach((row, y) => {
      row.forEach((col, x) => {
        if (inputs[y][x] === 'L') {
          result[y][x] = treatEmpty(x, y, inputs);
        } else if (inputs[y][x] === '#') {
          result[y][x] = treatOcc(x, y, inputs);
        }
      });
    });

    resultStr = result.map((x) => x.join('')).join('\n'); // Parse to string for easy diff comparison
    inputs = [...result.map((row) => [...row])]; //Clone for next round
  }
  console.log(resultStr.split('').filter((x) => x === '#').length);
};

const treatEmpty = (x: number, y: number, arr: string[][]) => {
  const adjacentContent = nAdjacencyContents(1, x, y, arr);
  return adjacentContent.content.indexOf('#') > -1 ? 'L' : '#';
};

const treatOcc = (x: number, y: number, arr: string[][]) => {
  const adjacentContent = nAdjacencyContents(1, x, y, arr);
  const occCount = adjacentContent.content.split('').filter((c) => c === '#')
    .length;
  return occCount >= 4 ? 'L' : arr[y][x];
};

// Get contents of adjacent seats with n seat distance
// Covers the 8 possible directions;
// Also returns array of treated directions where L or # was found
// Use this direction array to feed to next nAdjancency round if necessary
const nAdjacencyContents = (
  n: number,
  x: number,
  y: number,
  arr: string[][],
  directions: Direction[] = [],
) => {
  let content = '';
  for (let i = x - n; i <= x + n; i += n) {
    for (let j = y - n; j <= y + n; j += n) {
      if (isValidPos(i, j, arr) && !(x === i && y === j)) {
        const dir = getDirection(x, y, i, j);
        if (arr[j][i] !== '.' && directions.indexOf(dir) === -1) {
          directions.push(dir);
          content += arr[j][i];
        } else if (arr[j][i] === '.') {
          content += arr[j][i];
        }
      }
    }
  }
  return { content, directions };
};

// Is x,y, in bounds of array
const isValidPos = (x: number, y: number, arr: string[][]) => {
  return y >= 0 && y < arr.length && x >= 0 && x < arr[y].length;
};

// direction of (x,y)->(i,j) vector
const getDirection = (x: number, y: number, i: number, j: number) => {
  if (x === i) {
    return j < y ? Direction.Up : Direction.Down;
  } else if (x > i) {
    return j < y
      ? Direction.UpLeft
      : j > y
      ? Direction.DownLeft
      : Direction.Left;
  } else if (x < i) {
    return j < y
      ? Direction.UpRight
      : j > y
      ? Direction.DownRight
      : Direction.Right;
  }
  return null;
};

enum Direction {
  Up,
  Down,
  Left,
  Right,
  UpRight,
  UpLeft,
  DownRight,
  DownLeft,
}

const day11_2 = () => {
  const str = readFileSync('./src/inputs/day11Input.txt', 'utf8');

  let inputs = str.split('\n').map((x) => x.split(''));
  const result: string[][] = [...inputs.map((row) => [...row])]; //Clone array

  let resStr = '';
  let inputStr = str;

  while (resStr !== inputStr) {
    inputStr = inputs.map((x) => x.join('')).join('\n');
    inputs.forEach((row, y) => {
      row.forEach((col, x) => {
        if (inputs[y][x] === 'L') {
          result[y][x] = treatEmpty2(x, y, inputs);
        } else if (inputs[y][x] === '#') {
          result[y][x] = treatOcc2(x, y, inputs);
        }
      });
    });

    resStr = result.map((x) => x.join('')).join('\n');
    inputs = [...result.map((row) => [...row])];
  }
  console.log(resStr.split('').filter((x) => x === '#').length);
};

const treatEmpty2 = (x: number, y: number, arr: string[][]) => {
  let n = 1;
  let nAdjacency = nAdjacencyContents(n, x, y, arr);

  let totalAdjacentContent = nAdjacency.content;
  let leave = totalAdjacentContent.indexOf('#') > -1;
  while (nAdjacency.content.trim() != '' && !leave) {
    n += 1;
    nAdjacency = nAdjacencyContents(n, x, y, arr, nAdjacency.directions);
    totalAdjacentContent += nAdjacency.content;
    leave = totalAdjacentContent.indexOf('#') > -1;
  }

  return leave ? 'L' : '#';
};

const treatOcc2 = (x: number, y: number, arr: string[][]) => {
  let n = 1;
  let nAdjacency = nAdjacencyContents(n, x, y, arr);
  let totalAdjacentContent = nAdjacency.content;
  let occCount = totalAdjacentContent.split('').filter((c) => c === '#').length;
  while (nAdjacency.content !== '' && occCount < 5) {
    n += 1;
    nAdjacency = nAdjacencyContents(n, x, y, arr, nAdjacency.directions);
    totalAdjacentContent += nAdjacency.content;
    occCount = totalAdjacentContent.split('').filter((c) => c === '#').length;
  }
  return occCount >= 5 ? 'L' : arr[y][x];
};

export const runday11 = () => {
  day11();
  day11_2();
};
