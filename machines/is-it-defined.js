module.exports = {
  "friendlyName": "Is it defined?",
  "inputs": {
    "value": {
      "extendedDescription": "A value of any type may be provided.  If it evaluates to \"undefined\", the \"fail\" exit will be triggered.  Otherwise the \"pass\" exit will be triggered.",
      "friendlyName": "value",
      "description": "The value to check.",
      "typeclass": "*"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "id": "success",
      "friendlyName": "pass",
      "description": "The value is defined.",
      "getExample": function(inputs, env, input) {
        return inputs.value;
      }
    },
    "fail": {
      "friendlyName": "fail",
      "description": "The value is undefined."
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    if (typeof(inputs.value) === 'undefined') {
      return exits.fail();
    }
    return exits.success(inputs.value);
  },
  "identity": "Isitdefined_question"
};
