const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    console.log(req);
    return res.status(200).send("Helloo");
  } catch (e) {
    console.log(e);
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});
module.exports = router;
