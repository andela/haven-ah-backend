/**
 *
 * @param {array} arr
 * @returns {array} processed array
 */
const removeArrayDuplicates = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  arr = arr.sort((a, b) => a - b);
  let currentNum = -Infinity;
  const fixedArr = [];
  arr.map((num) => {
    if (num !== currentNum) {
      currentNum = num;
      fixedArr.push(num);
    }
  });
  return fixedArr;
};

export default removeArrayDuplicates;
