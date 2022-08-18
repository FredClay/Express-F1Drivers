function reverseFactorialiser(startNum) {
  let numerator = startNum;
  let divider = 1;
  while (numerator >= divider) {
    if (numerator !== Math.floor(numerator)) {
      return 0;
    }
    if (numerator === divider) {
      return divider;
    }
    numerator /= divider;
    divider += 1;
  }
  return 0;
}

module.exports.reverseFactorialOf = reverseFactorialiser;
