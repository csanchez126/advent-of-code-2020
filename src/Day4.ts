/* eslint-disable no-case-declarations */
import { readFileSync } from 'fs';

const day4 = () => {
  const str = readFileSync('./src/inputs/day4Input.txt', 'utf8');
  const passports = parsePassports(str);
  console.log(passports.length);
  const validPassportCount = passports.filter(isPassportValid).length;
  console.log(validPassportCount);
};

const day4_2 = () => {
  const str = readFileSync('./src/inputs/day4Input.txt', 'utf8');
  const passports = parsePassports(str);
  console.log(passports.length);
  const validPassportCount = passports.filter(isPassportExtraValid).length;
  console.log(validPassportCount);
};

const isPassportExtraValid = (pp: Passport) => {
  return Object.keys(pp)
    .filter((key) => key !== 'cid')
    .every((key) => fieldIsValid(key, pp[key]));
};

const isPassportValid = (pp: Passport) => {
  return Object.keys(pp)
    .filter((key) => key !== 'cid')
    .every((key) => pp[key] !== null);
};

const parsePassports = (str: string) => {
  const fileLines = str.split('\n');
  const passports: Passport[] = [];
  let currentPPStr = '';
  fileLines.forEach((line) => {
    if (line.length === 0) {
      const passport = new Passport(currentPPStr.trim());
      passports.push(passport);
      currentPPStr = '';
    } else {
      currentPPStr += `${line} `;
    }
  });
  return passports;
};

class Passport {
  byr: string = null; // (Birth Year)
  iyr: string = null; // (Issue Year)
  eyr: string = null; // (Expiration Year)
  hgt: string = null; // (Height)
  hcl: string = null; // (Hair Color)
  ecl: string = null; // (Eye Color)
  pid: string = null; // (Passport ID)
  cid: string = null; // (Country ID)
  constructor(str = '') {
    str.split(' ').forEach((keyVal) => {
      const [key, val] = keyVal.split(':');
      if (key in this) {
        this[key] = val;
      }
    });
  }
}

const fieldIsValid = (key, value) => {
  if (value !== null) {
    switch (key) {
      case 'byr':
        return isYearValid(value, 1920, 2002);
      case 'iyr':
        return isYearValid(value, 2010, 2020);
      case 'eyr':
        return isYearValid(value, 2020, 2030);
      case 'hgt':
        return isHeightValid(value);
      case 'hcl':
        return value.match(new RegExp('^#[0-9a-f]{6}$'));
      case 'ecl':
        return value.match(new RegExp('^(amb|blu|brn|gry|grn|hzl|oth)$'));
      case 'pid':
        return value.match(new RegExp('^[0-9]{9}$'));
      case 'cid':
        return true;
    }
  }
  return false;
};

const isHeightValid = (value: string) => {
  const strRegex = new RegExp('^\\d*(cm|in)$');
  const validString = value.match(strRegex);
  const height = parseInt(value);
  let validHeight = false;
  if (value.endsWith('cm')) {
    validHeight = height >= 150 && height <= 193;
  } else {
    validHeight = height >= 59 && height <= 76;
  }
  return validString && validHeight;
};

const isYearValid = (value: string, min: number, max: number) => {
  const strRegex = new RegExp('^\\d{4}$'); //4 digit string;
  const validString = value.match(strRegex);
  const year = parseInt(value);
  const validYear = year >= min && year <= max;
  return validString && validYear;
};

export const runday4 = () => {
  day4();
  day4_2();
};
