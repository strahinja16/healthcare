const { Router } = require('express');
const diseaseRouter = require('./disease');
const medicationsRouter = require('./medication');
const sideEffectsRouter = require('./side-effects');
const seedRouter = require('./seed');

const router = Router();

router.use('/seed', seedRouter);
router.use('/diseases', diseaseRouter);
router.use('/medications', medicationsRouter);
router.use('/side-effects', sideEffectsRouter);

module.exports = router;
