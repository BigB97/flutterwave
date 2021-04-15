const { errMsg } = require('./custom-message');
const payloadChecker = require('payload-validator');
const ePayload = {
  rule: {},
};

function checkPayload(req, res, next) {
  if (typeof req.body != 'object')
    return res.status(400).json(errMsg(`Invalid JSON payload passed.`));
  const result = payloadChecker.validator(req.body, ePayload, ['rule'], false);
  if (result.success === true) return next();
  if (result.success === false)
    return res.status(400).json(errMsg(result.response.errorMessage));
  next();
}

function checkSubField(field) {
  if (!field.field) return `field 'field' is missing from data`;
  if (!field.condition) return `field condition is missing from data`;
  if (!field.condition_value)
    return `field condition_value is missing from data`;
}

function find(obj, str) {
  return str.split('.').reduce(function (o, x) {
    return o[x];
  }, obj);
}

function validate(data, input, con, conValue) {
  if (con == 'eq') {
    if (input === conValue) {
      return {
        status: 200,
        data,
        input,
      };
    } else {
      return {
        status: 400,
        data,
        input,
      };
    }
  }

  if (con == 'neq') {
    if (input !== conValue) {
      return {
        status: 200,
        data,
        input,
      };
    } else {
      return {
        status: 400,
        data,
        input,
      };
    }
  }

  if (con == 'gt') {
    if (input > conValue) {
      return {
        status: 200,
        data,
        input,
      };
    } else {
      return {
        status: 400,
        data,
        input,
      };
    }
  }
  if (con == 'gte') {
    if (input >= conValue) {
      return {
        status: 200,
        data,
        input,
      };
    } else {
      return {
        status: 400,
        data,
        input,
      };
    }
  }

  if (con == 'contains') {
    const ttt = input.toString().indexOf(`${conValue.toString()}`) > -1; //return true or false contains or not
    if (ttt) {
      return {
        status: 200,
        data,
        input,
      };
    } else {
      return {
        status: 400,
        data,
        input,
      };
    }
  }
}
module.exports = {
  checkPayload,
  checkSubField,
  find,
  validate,
};
