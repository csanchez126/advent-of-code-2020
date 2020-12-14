/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day8 = () => {
  const str = readFileSync('./src/inputs/day8Input.txt', 'utf8');
  const instructions = parseInstr(str);
  instructions.forEach((ins, i, array) => {
    const cloneArr = parseInstr(str);
    if (cloneArr[i].op === 'nop') {
      cloneArr[i].op = 'jmp';
      runScript(cloneArr);
    } else if (cloneArr[i].op === 'jmp') {
      cloneArr[i].op = 'nop';
      runScript(cloneArr);
    }
  });
};

const parseInstr = (str: string) => {
  const instrs = str.split('\n');
  return instrs.map((ins) => {
    const [op, val] = ins.split(' ');
    return new Instruction(op, parseInt(val) || 0);
  });
};

const runScript = (instructions: Instruction[]) => {
  const ex = [];
  let acc = 0;
  let loop = false;
  for (let i = 0; i < instructions.length; i += 1) {
    if (ex.indexOf(i) > -1) {
      loop = true;
      //console.log('loop', acc);
      break;
    }
    ex.push(i);
    switch (instructions[i].op) {
      case 'acc':
        acc += instructions[i].value;
        break;
      case 'jmp':
        i += instructions[i].value - 1;
        break;
      case 'nop':
        break;
    }
  }
  if (!loop) {
    console.log(acc, loop);
  }
  return loop;
};

class Instruction {
  op: string;
  value: number;
  constructor(op: string, value: number) {
    this.op = op;
    this.value = value;
  }
}

const day8_2 = () => {
  const str = readFileSync('./src/inputs/day8Input.txt', 'utf8');
};

export const runday8 = () => {
  day8();
  day8_2();
};
