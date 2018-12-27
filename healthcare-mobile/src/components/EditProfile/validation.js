
export default {
  birthday: {
    presence: {
      allowEmpty: false,
    },
  },

  bloodType: {
    presence: {
      allowEmpty: false,
    },
  },

  height: {
    presence: {
      allowEmpty: false,
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 300,
    },
  },

  weight: {
    presence: {
      allowEmpty: false,
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 200,
    },
  },

  gender: {
    presence: {
      allowEmpty: false,
    },
  },

  lbo: {
    presence: {
      allowEmpty: false,
    },
  },

};
