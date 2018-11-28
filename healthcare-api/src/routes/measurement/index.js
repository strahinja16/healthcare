
const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const middleware = require('middleware');
const validate = require('middleware/validate');
const { Measurement } = require('models');
const measurementCreateRequest = require('requests/measurement/create');

const router = Router();

router.post('/',
  middleware('auth'),
  validate(measurementCreateRequest),
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const measurement = await Measurement.create({
        ...req.body,
        userId,
      });
      return res.status(201).send({
        data: measurement,
      });
    } catch (ex) {
      logger.error(ex);
      return res.status(500).send({
        message: responses(500),
      });
    }
  });

module.exports = router;
