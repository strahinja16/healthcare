const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const { Medication, Disease, SideEffect } = require('models');

const router = Router();

router.get('/', async (req, res) => {
  try {

    const medications = await Medication.findAll();
    const diseases = await Disease.findAll();
    const sideEffects = await SideEffect.findAll();

    await medications[0].setSideEffects([sideEffects[0],sideEffects[1]]);
    await medications[1].setSideEffects([sideEffects[1],sideEffects[2]]);
    await medications[2].setSideEffects([sideEffects[2]]);
    await medications[3].setSideEffects([sideEffects[1]]);
    await medications[4].setSideEffects([sideEffects[0],sideEffects[1], sideEffects[2]]);

    await medications[0].setDiseases([diseases[0],diseases[1]]);
    await medications[1].setDiseases([diseases[1],diseases[2]]);
    await medications[2].setDiseases([diseases[2]]);
    await medications[3].setDiseases([diseases[1]]);
    await medications[4].setDiseases([diseases[0],diseases[1], diseases[2]]);

    return res.status(200).send('Seeds are up');
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send({
      message: responses(500),
    });
  }
});
module.exports = router;
