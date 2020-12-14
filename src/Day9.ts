/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day9 = () => {
  const str = readFileSync('./src/inputs/day9Input.txt', 'utf8');
  const nums = str.split('\n').map((n) => parseInt(n) || 0);
  for (let i = 25; i < nums.length; i += 1) {
    if (!isSumOfPrevious25(nums[i], nums.slice(i - 25, i))) {
      console.log(nums[i]);
    }
  }
};

const isSumOfPrevious25 = (target: number, nums: number[]) => {
  for (let i = 0; i < nums.length; i += 1) {
    const comp = target - nums[i];
    const compI = nums.indexOf(comp);
    if (compI > -1 && nums[i] !== comp) {
      return true;
    }
  }
  return false;
};

const day9_2 = () => {
  const str = readFileSync('./src/inputs/day9Input.txt', 'utf8');
  const nums = str.split('\n').map((n) => parseInt(n) || 0);
  const inv = 14360655;
  for (let i = 0; i < nums.length; i += 1) {
    let count = 0;
    let index = i;
    while (count < inv && index < nums.length) {
      count += nums[index];
      index += 1;
    }

    if (count === inv) {
      const range = nums.slice(i, index);
      console.log(Math.min(...range) + Math.max(...range));
    }
  }
};

export const runday9 = () => {
  day9();
  day9_2();
};
