
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

var functions = {
  stripAllFieldsFrom: stripAllFieldsFrom
}

module.exports = functions;
