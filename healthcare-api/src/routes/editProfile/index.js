const Router = require('services/modelBindings');
const omit = require('lodash/omit');
const { encrypt, hashPassword } = require('services/auth');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const validate = require('middleware/validate');
const editProfileRequest = require('requests/user/editProfile.js');
const { User } = require('models');

const router = Router();

router.put('/', middleware('auth'), validate(editProfileRequest), async (req, res) => {
  try {
    const {
      user: { id },
    } = req;

    const { password, ...update } = req.body;

    if (password) {
      update.password = hashPassword(password);
    }

    const userResult = await User.update(
      { ...update },
      { where: { id }, returning: true, raw: true },
    );

    if (!userResult[1][0]) {
      return res.status(400).send({ message: responses(400) });
    }

    const user = omit(userResult[1][0], ['password']);
    const userToken = encrypt(user);

    return res.status(200).send({
      data: {
        ...user,
        token: userToken,
      },
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
