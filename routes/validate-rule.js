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

router.post('/', checkPayload, async (req, res) => {
  try {
    // Destructure payload
    const { data, rule } = req.body;

    // check if fields are properly received
    const isRequired = await checkSubField(rule);

    // if field is not found in payload send error message
    if (isRequired != undefined || null || '')
      return res.status(400).json(errMsg(isRequired));

    // Get the value of the rule.field in "Data" paylad
    const isValue = find(data, rule.fields);
    const splitString = rule.fields.split('.');
    const fText = splitString[1];
    if (isValue == undefined || null || '') {
      return res
        .status(400)
        .json(errMsg(`field '${fText}' is missing from data.`));
    }

    // After geting the value of the field, let's do some validation
    const isvalidated = validate(
      rule,
      isValue,
      rule.conditions,
      rule.condition_values
    );

    // check validation status and send error or sucess message
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
            'success',
            false,
            isvalidated.data,
            isvalidated.input
          )
        );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
