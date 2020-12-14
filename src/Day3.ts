import { readFileSync } from 'fs';

const day3 = () => {
  const str = readFileSync('./src/inputs/day3Input.txt', 'utf8');
  const arr = str.split('\n');
  console.log(getTreesForSlope(3, 1, arr));
};

const day3_2 = () => {
  const str = readFileSync('./src/day3Input.txt', 'utf8');
  const arr = str.split('\n');
  const counts: number[] = [];
  counts.push(getTreesForSlope(1, 1, arr));
  counts.push(getTreesForSlope(3, 1, arr));
  counts.push(getTreesForSlope(5, 1, arr));
  counts.push(getTreesForSlope(7, 1, arr));
  counts.push(getTreesForSlope(1, 2, arr));
  const total = counts.reduce((a, b) => a * b);
  console.log(total);
};

const getTreesForSlope = (horMove: number, vertMove: number, arr: string[]) => {
  const mapHeight = arr.length;
  let treeCount = 0;
  if (mapHeight > 0) {
    const mapWidth = arr[0].length;
    let horI = 0;
    for (let vertI = 0; vertI < mapHeight - vertMove; vertI += vertMove) {
      horI += horMove;
      if (arr[vertI + vertMove][horI % mapWidth] === '#') {
        treeCount += 1;
      }
    }
  }
  console.log(treeCount);
  return treeCount;
};

export const runDay3 = () => {
  day3();
  day3_2();
};
