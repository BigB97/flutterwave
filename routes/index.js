var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const data = {
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Yusuf Bolaji',
      github: '@bigb97',
      email: 'ybolaji1@gmail.com',
      mobile: '09026705410',
      twitter: '@Iambigb_',
    },
  };
  if (!data) return res.status(404).json({ message: ' Data not Found' });
  return res.status(200).json(data);
});

module.exports = router;
