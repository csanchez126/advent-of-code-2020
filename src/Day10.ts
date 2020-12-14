/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';
import { arch } from 'os';

const day10 = () => {
  const str = readFileSync('./src/inputs/day10Input.txt', 'utf8');
  const inputs = str
    .split('\n')
    .map((n) => parseInt(n) || 0)
    .sort((a, b) => a - b);
  const nums = [0, ...inputs, Math.max(...inputs) + 3];
  let ones = 0;
  let threes = 0;
  for (let i = 0; i < nums.length - 1; i += 1) {
    const diff = nums[i + 1] - nums[i];
    ones += diff === 1 ? 1 : 0;
    threes += diff === 3 ? 1 : 0;
  }
  console.log(ones, threes);
  console.log(ones * threes);
};

const day10_2 = () => {
  const str = readFileSync('./src/inputs/day10Input.txt', 'utf8');
  const inputs = str
    .split('\n')
    .map((n) => parseInt(n) || 0)
    .sort((a, b) => a - b);
  const nums = [0, ...inputs, Math.max(...inputs) + 3];
  const mem = {};
  const target = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i -= 1) {
    let iOffSet = 0;
    let count = 0;
    while (i + iOffSet < nums.length && nums[i + iOffSet] - nums[i] <= 3) {
      if (nums[i + iOffSet] === target) {
        count += 1;
      } else if ((i + iOffSet).toString() in mem) {
        count += mem[(i + iOffSet).toString()];
      }
      iOffSet += 1;
    }
    mem[i.toString()] = count;
  }
  console.log(mem['0']);
};

export const runday10 = () => {
  day10();
  day10_2();
};
