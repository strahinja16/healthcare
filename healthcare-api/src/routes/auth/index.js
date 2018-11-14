const {
  mail: { account },
  domains: { frontend },
} = require('config');
const moment = require('moment');
const uuid = require('uuid/v4');
const Router = require('services/modelBindings');
const { encrypt, comparePasswords, hashPassword } = require('services/auth');
const logger = require('services/logger');
const responses = require('services/responses');
const validate = require('middleware/validate');
const loginRequest = require('requests/auth/login');
const forgotPasswordRequest = require('requests/auth/forgotPassword');
const verifyTokenRequest = require('requests/auth/verifyToken');
const resetPasswordRequest = require('requests/auth/resetPassword');
const registerRequest = require('requests/auth/register');
const emailService = require('services/email');
const ForgotPasswordMail = require('resources/mails/forgotPasswordMail');
const WelcomeMail = require('resources/mails/welcomeMail');
const { updatePassword } = require('repositories/user');
const { getPasswordRecoveryWithUser } = require('repositories/auth');
const { User, PasswordRecovery } = require('models');

const router = Router();

const responseInvalidToken = res => res.status(400).send({ message: 'invalid token.' });
const responseWrongPass = res => res.status(400).send({ message: 'Invalid email/password.' });
const responseUserExists = res => res.status(400).send({ message: 'User already exists.' });
const responseUserCreated = res => res.status(200).send({ messsage: 'User successfully created'});
const responseNoUserFound = res => res.status(404).send({ message: 'User with given email does not exist.' });
const responseForgotPasswordEmailSent = res => res.status(200).send({ message: 'Email successfully sent.' });
const responseBadRequest = res => res.status(400).send({ message: responses(400) });
const responseNotFound = res => res.status(404).send({ message: responses(404) });

const EXPIRATION_TIME = 6;

router.post('/login', validate(loginRequest), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return responseWrongPass(res);
    }
    if (!(await comparePasswords(password, user.password))) {
      return responseWrongPass(res);
    }

    delete user.password;
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

router.post('/register', validate(registerRequest), async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({
      where: { email },
      raw: true,
    });

    if (userExists) {
      return responseUserExists(res);
    }

    const user = await User.create({
      email,
      name,
      password: hashPassword(password),
      status: 'inactive',
      registerToken: uuid(),
    });

    const subject = 'Registration confirmation';
    const mail = new WelcomeMail(account, email, subject, user.registerToken);
    await emailService.sendEmail(mail);

    return responseUserCreated(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/forgot-password', validate(forgotPasswordRequest), async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      return responseNoUserFound(res);
    }

    const token = uuid();
    const subject = 'Password recovery';
    const mail = new ForgotPasswordMail(account, email, subject, token);

    await PasswordRecovery.create({
      token,
      userId: user.id,
    });
    await emailService.sendEmail(mail);

    return responseForgotPasswordEmailSent(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/verify-token', validate(verifyTokenRequest), async (req, res) => {
  try {
    const { token } = req.body;

    const passwordRecoveryWithUser = await getPasswordRecoveryWithUser(token);
    if (!passwordRecoveryWithUser) {
      return responseNotFound(res);
    }

    const { createdAt } = passwordRecoveryWithUser;

    const difference = moment.duration(moment().diff(moment(createdAt))).asHours();

    if (difference > EXPIRATION_TIME) {
      return responseBadRequest(res);
    }

    return res.status(200).send({ message: 'Token is valid.' });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/reset-password', validate(resetPasswordRequest), async (req, res) => {
  try {
    const { password, token } = req.body;

    const passwordRecoveryWithUser = await getPasswordRecoveryWithUser(token);

    if (!passwordRecoveryWithUser) {
      return responseInvalidToken(res);
    }

    const {
      User: { id },
    } = passwordRecoveryWithUser;

    const update = await updatePassword(id, password);
    if (!update) {
      return responseBadRequest(res);
    }

    return res.status(200).send({ message: 'Password successfully changed.' });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/confirm/:token', async (req, res) => {
  try {
    const { token: registerToken } = req.params;

    const user = await User.findOne({
      where: { registerToken },
      raw: true,
    });

    user.registerToken = null;
    user.status = 'active';

    await User.update({...user}, { where: { id: user.id }});

    res.set('location', frontend);
    res.status(301).send();
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
