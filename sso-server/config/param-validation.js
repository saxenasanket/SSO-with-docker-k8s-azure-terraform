const { Joi } = require("express-validation");

module.exports = {
  // POST /api/users
  createUser: {
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
    }),
  },

  // POST /api/users
  createPerson: {
    body: {
      name: Joi.string().required(),
      age: Joi.string().required(),
    },
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
    },
    params: {
      userId: Joi.string().hex().required(),
    },
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
