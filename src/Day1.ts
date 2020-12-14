// --- Day 1: Report Repair ---
// After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island.
//Surely, Christmas will go on without you.

// The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture
// of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but
// somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

// To save your vacation, you need to get all fifty stars by December 25th.

// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar;
// the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

// Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

// Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

// For example, suppose your expense report contained the following:

// 1721
// 979
// 366
// 299
// 675
// 1456
// In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

// Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?

const day1 = (input: number[]): number => {
  const nums = findTwoNumbersThatSumTo(2020, input);
  const result = nums.reduce((a, b) => a * b);
  console.log(result);
  return result;
};

const findTwoNumbersThatSumTo = (sum: number, input: number[]): number[] => {
  for (let i = 0; i < input.length; i += 1) {
    const val = input[i];
    const complementIndex = input.indexOf(sum - val);

    // If value is the complement to a previously treated value
    if (complementIndex > -1) {
      return [val, input[complementIndex]];
    }
  }
  return [];
};

const day1_2 = (input: number[]): number => {
  for (let i = 0; i < input.length; i += 1) {
    const val = input[i];
    const diff = 2020 - val;
    const numbersThatSumToDiff = findTwoNumbersThatSumTo(diff, input);
    if (numbersThatSumToDiff.length > 0) {
      const result = [val, ...numbersThatSumToDiff].reduce((a, b) => a * b);
      console.log(result);
      return result;
    }
  }
  return null;
};

const testInput: number[] = [
  1028,
  1987,
  1938,
  1136,
  1503,
  1456,
  1107,
  1535,
  1946,
  1986,
  855,
  1587,
  1632,
  1548,
  1384,
  1894,
  1092,
  1876,
  1914,
  1974,
  1662,
  1608,
  2004,
  1464,
  1557,
  1485,
  1267,
  1582,
  1307,
  1903,
  1102,
  1578,
  1421,
  1184,
  1290,
  1786,
  1295,
  1930,
  1131,
  1802,
  1685,
  1735,
  1498,
  1052,
  1688,
  990,
  1805,
  1768,
  1922,
  1781,
  1897,
  1545,
  1591,
  1393,
  1186,
  149,
  1619,
  1813,
  1708,
  1119,
  1214,
  1705,
  1942,
  1684,
  1460,
  1123,
  1439,
  1672,
  1980,
  1337,
  1731,
  1203,
  1481,
  2009,
  1110,
  1116,
  1443,
  1957,
  1891,
  1595,
  1951,
  1883,
  1733,
  1697,
  1321,
  1689,
  1103,
  1300,
  1262,
  1190,
  1667,
  1843,
  1544,
  1877,
  1718,
  1866,
  1929,
  1169,
  1693,
  1518,
  1375,
  1477,
  1222,
  1791,
  1612,
  1373,
  1253,
  1087,
  1959,
  1970,
  1112,
  1778,
  1412,
  1127,
  1767,
  1091,
  1653,
  1609,
  1810,
  1912,
  1917,
  935,
  1499,
  1878,
  1452,
  1935,
  1937,
  968,
  1905,
  1077,
  1701,
  1789,
  1506,
  1451,
  1125,
  1686,
  1117,
  1991,
  1215,
  1776,
  1976,
  846,
  1923,
  1945,
  1888,
  1193,
  1146,
  1583,
  1315,
  1372,
  1963,
  1491,
  1777,
  1799,
  1363,
  1579,
  1367,
  1863,
  1983,
  1679,
  1944,
  1654,
  1953,
  1297,
  530,
  1502,
  1738,
  1934,
  1185,
  1998,
  1764,
  1856,
  1207,
  1181,
  1494,
  1676,
  1900,
  1057,
  339,
  1994,
  2006,
  1536,
  2007,
  644,
  1173,
  1692,
  1493,
  1756,
  1916,
  1890,
  1908,
  1887,
  1241,
  1447,
  1997,
  1967,
  1098,
  1287,
  1392,
  1932,
];

export const runDay1 = () => {
  day1(testInput);
  day1_2(testInput);
};
