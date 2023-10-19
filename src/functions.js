// Real ==> Int
export const realToInt = (realNum, a, b, l) => {
  return Math.floor((1 / (b - a)) * (realNum - a) * (Math.pow(2, l) - 1));
};

// Real to Bin
export const realToBin = (realNum) => {
  return intToBin(realToInt(realNum));
};

// Int ==> Real
export const intToReal = (intNum, a, b, l) => {
  return (intNum * (b - a)) / (Math.pow(2, l) - 1) + parseInt(a);
};

// Int ==> Bin
export const intToBin = (intNum, l) => {
  return formatBinNumber(intNum.toString(2), l);
};

// Bin ==> Int
export const binToInt = (binNum) => {
  return parseInt(binNum, 2);
};

// Bin ==> Real
export const binToReal = (binNum) => {
  return intToReal(binToInt(binNum));
};

// Get L
export const getL = (a, b, d) => {
  return Math.ceil(Math.log2((b - a) / d + 1));
};

export const formatBinNumber = (binStr, l) => {
  while (binStr.length < l) {
    binStr = "0" + binStr;
  }
  return binStr;
};
