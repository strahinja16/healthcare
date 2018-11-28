const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const middleware = require('middleware');
const validate = require('middleware/validate');
const { Examination } = require('models');
const examinationCreateRequest = require('requests/examination/create');

const router = Router();

router.post('/',
  middleware('auth'),
  middleware('doctor'),
  validate(examinationCreateRequest),
  async (req, res) => {
    try {
      const examination = await Examination.create({
        ...req.body,
        appointment: new Date(new Date().getTime() + (86400000 * 10)),
      });
      return res.status(201).send({
        data: examination,
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  });

router.put('/:id',
  middleware('auth'),
  middleware('doctor'),
  async (req, res) => {
    try {
      const examination = await Examination.findById(req.params.id);
      if (!examination) {
        return res.status(404).send({message: responses(404)});
      }

      await examination.update({
        showed: true,
      });

      return res.send({ data: req.params.id });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  },
);

module.exports = router;
