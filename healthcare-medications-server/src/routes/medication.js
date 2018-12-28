const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const { Medication } = require('models');

const router = Router();

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { description } = await Medication.findOne({ where: { name } });
    return res.status(200).send(description);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
