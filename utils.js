const message = require('./custom-message');
const payloadChecker = require('payload-validator');
const ePayload = {
  rule: {},
  data: {},
};

function checkPayload(req, res, next) {
  if (typeof req.body != 'object')
    return res.status(400).json(message(`Invalid JSON payload passed.`));
  const result = payloadChecker.validator(
    req.body,
    ePayload,
    ['rule', 'data'],
    false
  );
  console.log(result);
  if (result.success === true) return next();
  if (result.success === false)
    return res.status(400).json(message(result.response.errorMessage));
  next();
}

function checkSubField(field) {
  if (!field.fields) return `field 'field' is missing from data`;
  if (!field.conditions) return `field condition is missing from data`;
  if (!field.condition_values)
    return `field condition_value is missing from data`;
}

function find(obj, str) {
  return str.split('.').reduce(function (o, x) {
    return o[x];
  }, obj);
}

function validate(data, input, con, conValue) {
  console.log(input, con, conValue);
  console.log(data.rule.fields);
  if (con == 'eq') {
    console.log(input, conValue);
    if (input === conValue) {
      const val = {
        message: `field ${data.rule.fields} successfully validated.`,
        status: 'success',
        data: {
          validation: {
            error: false,
            field: data.rule.fields,
            field_value: input,
            condition: data.rule.conditions,
            condition_value: data.rule.condition_values,
          },
        },
      };
      console.log(val);
    }
  }
}
module.exports = {
  checkPayload,
  checkSubField,
  find,
  validate,
};
