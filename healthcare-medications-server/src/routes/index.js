const { Router } = require('express');
const diseaseRouter = require('./disease');
const medicationsRouter = require('./medication');
const sideEffectsRouter = require('./side-effects');

const router = Router();

router.use('/diseases', diseaseRouter);
router.use('/medications', medicationsRouter);
router.use('/side-effects', sideEffectsRouter);

module.exports = router;
