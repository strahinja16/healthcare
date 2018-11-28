
const middleware = require('middleware');
const validate = require('middleware/validate');
const { Op } = require('sequelize');
const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const editUserRequest = require('requests/user/edit');
const { User, Prescription, Measurement, Examination, Contact } = require('models');

const router = Router();

router.post('/edit', middleware('auth'), validate(editUserRequest), async (req, res) => {
  try {
    const { id } = req.user;
    const { emergency, ...userUpdate } = req.body;

    const userResult = await User.update(
      { ...userUpdate },
      { where: { id }, returning: true, raw: true },
    );

    if (emergency) {
      await Contact.create({
        number: emergency,
        userId: id,
      });
    }

    if (!userResult[1][0]) {
      return res.status(400).send({message: responses(400)});
    }
    return res.send({
      data: userResult[1][0],
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/prescriptions',
  middleware('auth'),
  async (req, res) => {
    try {
      const { id } = req.user;
      const now = new Date();

      const prescriptions = await Prescription.findAll({
        where: {
          userId: id,
          dueDate: { [Op.gte]: now },
        },
        raw: true,
      });

      return res.send({
        data: prescriptions,
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  });

router.get('/upcoming-examination',
  middleware('auth'),
  async (req, res) => {
    try {
      const { id } = req.user;
      const now = new Date();

      const examination = await Examination.findAll({
        where: {
          userId: id,
          appointment: { [Op.gte]: now },
        },
        orderBy: [
          ['appointment', 'ASC'],
        ],
        limit: 1,
        raw: true,
      });

      return res.send({
        data: examination[0],
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  });

module.exports = router;
