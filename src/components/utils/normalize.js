export const normalize = str => str.replace(/[-*/.,!?;:()\s]/g, '');

export const isNumeric = str =>
  Number.isFinite(Number(normalize(str)));