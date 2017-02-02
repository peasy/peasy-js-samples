
function stripAllFieldsFrom(entity) {
  entity = entity || {};
  return {
    except: function(allowableFields) {
      if (!Array.isArray(allowableFields)) {
        allowableFields = [allowableFields];
      }
      allowableFields.forEach((field, index) => {
        allowableFields[index] = field.toLowerCase();
      });
      Object.keys(entity).forEach(function(field) {
        if (allowableFields.indexOf(field.toLowerCase()) === -1) {
          delete entity[field];
        }
      });
    }
  }
}

function convert(value, prop) {
  function toFloat() {
    var parsed = parseFloat(value[prop]);
    if (parsed) {
      value[prop] = parsed;
    } 
  }

  function toInt() {
    var parsed = parseInt(value[prop], 10);
    if (parsed) {
      value[prop] = parsed;
    } 
  }

  return {
    toFloat: toFloat,
    toInt: toInt
  };
}

module.exports = {
  stripAllFieldsFrom: stripAllFieldsFrom,
  convert: convert
}
