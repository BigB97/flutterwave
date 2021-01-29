/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */

function errMsg(message, success, data) {
  return {
    message: formatMesaage(message),
    success: success || 'error',
    data: data || null,
  };
}

function successMsg(message, success, error, field, value) {
  return {
    message: formatMesaage(message),
    status: success || 'error',
    data: {
      validation: {
        error: error || false,
        field: field.fields || '',
        field_value: value || '',
        condition: field.conditions || '',
        condition_value: field.condition_values || '',
      },
    },
  };
}

function formatMesaage(str) {
  if (!str) return '';

  // Make first letter capitial
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  errMsg,
  successMsg,
};
