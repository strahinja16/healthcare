
const middleware = require('middleware');
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const { Op } = require('sequelize');
const { User, Prescription, Examination, Measurement } = require('models');

const router = Router();

router.get('/',
  middleware('auth'),
  middleware('doctor'),
  async (req, res) => {
  try {
    const { id } = req.user;
    const data = await User.findAll({ where: { doctorId: id }, raw: true });
    return res.send({
      data,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/:requestedUser',
  middleware('auth'),
  middleware('doctor'),
  async (req, res) => {
  try {
    const { id } = req.user;
    const { doctorId } = req.requestedUser;

    if( id !== doctorId ) {
      return res.status(400).send({ message: responses(400)});
    }
    return res.send({
      data: req.requestedUser,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/:requestedUser/doctor', middleware('auth'), async (req, res) => {
  try {
    const { id } = req.requestedUser;
    const { id: doctorId } = req.user;
    const userResult = await User.update(
      { doctorId },
      { where: { id }, returning: true, raw: true },
    );

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

router.get('/:requestedUser/prescriptions',
  middleware('auth'),
  middleware('doctor'),
  async (req, res) => {
    try {
      const { id } = req.requestedUser;
      const now = new Date();

      const prescriptions = await Prescription.findAll({
        where: {
          userId: id,
          dueDate: { [Op.gte]: now },
        },
        order: [
          [ 'createdAt', 'DESC'],
        ],
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


router.get('/:requestedUser/examinations',
  middleware('auth'),
  middleware('doctor'),
  async (req, res) => {
    try {
      const { id } = req.requestedUser;

      const examinations = await Examination.findAll({
        where: {
          userId: id,
        },
        raw: true,
        limit: 10,
        order: [
          [ 'appointment', 'DESC']
        ],
      });

      return res.send({
        data: examinations,
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  });

router.get('/:requestedUser/measurements',
  middleware('auth'),
  middleware('doctor'),
  async (req, res) => {
    try {
      const { id } = req.requestedUser;

      const measurements = await Measurement.findAll({
        where: {
          userId: id,
        },
        raw: true,
      });

      return res.send({
        data: measurements,
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  });

module.exports = router;
