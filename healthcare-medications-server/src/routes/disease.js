const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const { Disease } = require('models');
const { Op } = require('sequelize');

const router = Router();

router.get('/search/:like', async (req, res) => {
  try {
    const { like } = req.params;
    const diseases = await Disease.findAll({
      where: {
        name: {
          [Op.like]: `${like}%`,
        }
      }
    }).map(disease => disease.name);

    return res.status(200).send(diseases);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
