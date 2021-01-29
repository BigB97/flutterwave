require('express-async-errors');
const express = require('express');
const router = express.Router();
// const payloadChecker = require('payload-validator');
const { checkPayload, checkSubField, find, validate } = require('../utils');
const { errMsg, successMsg } = require('../custom-message');
// expected payload
const ePayload = {
  rule: {},
  data: {},
};

/* GET users listing. */
router.post('/', checkPayload, async (req, res) => {
  const { data, rule } = req.body;
  try {
    const isRequired = await checkSubField(rule);
    if (isRequired != undefined || null || '')
      return res.status(400).json(errMsg(isRequired));
    // console.log(found);
    if (rule.fields.includes('.')) {
      const splitString = rule.fields.split('.');
      // console.log(splitString);
      const fText = splitString[0];
      const lText = splitString[1];
      const ischeck = data.hasOwnProperty(fText);
      if (ischeck) {
        const isfound = find(data, rule.fields);
        if (isfound == undefined || null || '') {
          return res
            .status(400)
            .json(
              errMsg(`field '${lText}' in '${fText}' is missing from data.`)
            );
        }
        const isvalidated = validate(
          rule,
          isfound,
          rule.conditions,
          rule.condition_values
        );
        console.log(isvalidated);
        if (isvalidated.status === 400) {
          return res
            .status(400)
            .json(
              successMsg(
                `field ${isvalidated.data.fields} failed validation.`,
                'error',
                true,
                isvalidated.data,
                isvalidated.input
              )
            );
        }
        if (isvalidated.status == 200) {
          return res
            .status(200)
            .json(
              successMsg(
                `field ${isvalidated.data.fields} successfully validated.`,
                'error',
                true,
                isvalidated.data,
                isvalidated.input
              )
            );
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
