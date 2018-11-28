const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const middleware = require('middleware');
const validate = require('middleware/validate');
const { Prescription } = require('models');
const prescriptionCreateRequest = require('requests/prescription/create');
const prescriptionUpdateRequest = require('requests/prescription/update');


const router = Router();


router.post('/',
  middleware('auth'),
  middleware('doctor'),
  validate(prescriptionCreateRequest),
  async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      dueDate: new Date(new Date().getTime() + (86400000 * 10)),
    });
    return res.status(201).send({
      data: prescription,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.put('/:prescription',
  middleware('auth'),
  middleware('doctor'),
  validate(prescriptionUpdateRequest),
  async (req, res) => {
    try {
      await req.prescription.update({
        ...req.body,
      });

      return res.send({
        data: req.prescription,
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  },
);

module.exports = router;
