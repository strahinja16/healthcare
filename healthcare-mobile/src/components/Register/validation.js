
export default {
  name: {
    presence: {
      allowEmpty: false,
    },
  },

  email: {
    email: true,
    presence: {
      allowEmpty: false,
    },
  },

  password: {
    presence: {
      allowEmpty: false,
    },
  },
};
