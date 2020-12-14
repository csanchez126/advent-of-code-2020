/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day6 = () => {
  const str = readFileSync('./src/inputs/day6Input.txt', 'utf8');
  const groupInputs = getGroupInputs(str);
  const groupUniqueInputsLength = groupInputs.map((i) => {
    return new Set(i).size;
  });
  const totalAnswers = groupUniqueInputsLength.reduce((a, b) => a + b);
  console.log(totalAnswers);
};

const getGroupInputs = (str: string) => {
  const fileLines = str.split('\n\n').map((x) => {
    return x.replace(/\n/g, '');
  });
  const groupInputs: string[] = [];
  fileLines.forEach((line) => {
    groupInputs.push(line.trim());
  });
  return groupInputs;
};

const day6_2 = () => {
  const str = readFileSync('./src/inputs/day6Input.txt', 'utf8');
  const groupInputs = getGroupInputs_part2(str);
  const totalAnswers = groupInputs
    .map((s) => s.size)
    .reduce((a, b) => a + b, 0);
  console.log(totalAnswers);
};

const getGroupInputs_part2 = (str: string) => {
  const fileLines = str.split('\n\n').filter((x) => x);

  const groupInputs = fileLines.map((line) => {
    return line
      .trim()
      .split('\n')
      .map((x) => new Set(x))
      .reduce((a, b) => {
        return new Set<string>([...a].filter((x) => b.has(x)));
      });
  });
  return groupInputs;
};

export const runday6 = () => {
  day6();
  day6_2();
};
