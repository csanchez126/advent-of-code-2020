/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day7 = () => {
  const str = readFileSync('./src/inputs/day7Input.txt', 'utf8');
  const rules = generateRules(str);
  let count = 0;
  Object.keys(rules).forEach((key) => {
    if (hasBagToFind(rules, key)) {
      count += 1;
    }
  });
  console.log(count);
};

const hasBagToFind = (rules: any, key: string) => {
  if (rules[key]['shiny gold'] !== undefined) {
    return true;
  } else if (rules[key]['no other'] !== undefined) {
    return false;
  }
  return Object.keys(rules[key]).some((r) => hasBagToFind(rules, r));
};

const generateRules = (str: string) => {
  const rulesStr = str.trim().split('\n');
  const rules = rulesStr.reduce((a, b) => {
    const [color, contentsStr] = b.split('contain');
    const rule = { ...a };
    rule[removeBag(color.trim())] = generateRuleContents(contentsStr.trim());
    return rule;
  }, {});
  return rules;
};

const removeBag = (str: string) => {
  return str.replace(/(bags|bag|\.)/g, '').trim();
};

const generateRuleContents = (str: string) => {
  const subRules = str.split(', ');
  const subRule = {};
  subRules.forEach((sr) => {
    const ruleName = removeBag(sr.match(/[^-\s0-9][a-z\s]+/g)[0]);
    const qtyMatch = sr.match(/[0-9]/g) || ['0'];
    const qty = parseInt(qtyMatch[0]);
    subRule[ruleName] = qty;
  });
  return subRule;
};

const day7_2 = () => {
  const str = readFileSync('./src/inputs/day7Input.txt', 'utf8');
  const rules = generateRules(str);
  let count = getTotalBags(rules, 'shiny gold');
  console.log(count);
};

const getTotalBags = (rules: any, key: string): number => {
  if (key === 'no other') return 0;
  let count = 0;
  const subRules = Object.keys(rules[key]);
  count += (Object.values(rules[key]) as number[]).reduce(
    (a: number, b: number) => a + b,
    0,
  );
  return (
    count +
    subRules
      .map((r) => {
        return (rules[key][r] as number) * getTotalBags(rules, r);
      })
      .reduce((a, b) => a + b)
  );
};

export const runday7 = () => {
  day7();
  day7_2();
};
