'use strict';

const GRADE_MAP = {
  4: [0, 4],
  5: [5, 6],
  6: [7, 8],
  7: [9, 10],
  8: [11, 12],
  9: [13, 15],
  10: [16, Infinity],
  NaN: [NaN, NaN]
};

const grade = score => {
  score = Math.floor(score);

  if (score < 5) {
    score = 4;
  } else if (score > 9) {
    score = 10;
  }

  return GRADE_MAP[score].concat();
}

const formula = (data) => {
    if (data && data.words && data.sentences) {
      let difficultWordsPercentage = ((data.difficultWords || 0) / data.words) * 100
      return ((0.1579 * difficultWordsPercentage) + (0.0496 * data.words / data.sentences)) //+ (difficultWordsPercentage > 5 ? 3.6365 : 0)
    }
    return NaN
}

const dependencies = ['sentences', 'words', 'difficultWords']

module.exports = {
    formula,
    dependencies,
    grade
}