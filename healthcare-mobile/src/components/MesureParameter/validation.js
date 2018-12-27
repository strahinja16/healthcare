
export default {
  pressure: {
    presence: false,
    format: {
      pattern: /\d{2,3}\/\d{2,3}/,
    },
  },

  pulse: {
    presence: false,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThan: 300,
    },
  },

  temperature: {
    presence: false,
    numericality: {
      onlyInteger: false,
      greaterThanOrEqualTo: 30,
      lessThan: 45,
    },
  },

  sugar: {
    presence: false,
    numericality: {
      onlyInteger: false,
      greaterThan: 0,
      lessThan: 150,
    },
  },
};
