export const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

export const capitalizeFirstLetterOfWords = s =>
  s &&
  s.replace(
    /(^\w|\s\w)(\S*)/g,
    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
  );

export const titleCase = s => {
  let sentence = s && s.split('_');
  sentence = sentence && sentence.map(se => capitalize(se));

  return sentence && sentence.join(' ');
};

export const addValueBetweenString = (str, value, str2) =>
  `${str} ${value} ${str2}`;

export const removeAllSpacesFromString = s => s && s.replace(/ /g, '');
