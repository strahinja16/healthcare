const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const { SideEffect, Medication } = require('models');

const router = Router();

router.get('/:medication', async (req, res) => {
  try {
    const { medication } = req.params;
    const sideEffects = await SideEffect.findAll({
      include: [
        {
          model: Medication,
          as: 'Medications',
          where: { name: medication },
        },
      ],
    }).map(se => se.description);
    return res.status(200).send(sideEffects);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
