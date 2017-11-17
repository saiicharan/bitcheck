const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ response: "Say hello to my little friend" }).status(200);
})

module.exports = router;