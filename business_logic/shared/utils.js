
function stripAllFieldsFrom(entity) {
  return {
    except: function(allowableFields) {
      if (!Array.isArray(allowableFields)) {
        allowableFields = [allowableFields];
      }
      Object.keys(entity).forEach(function(field) {
        if (allowableFields.indexOf(field) === -1) {
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
