const {
  USER,
  FIRST_NAME,
  LAST_NAME,
  CATEGORY,
  PRODUCT,
  ADMIN,
} = require("./constants");

//text validation in form input
exports.validateText = (value, setValue, setError, validateFor) => {
  setError("");
  if (value === "") {
    if (validateFor === USER) {
      setError("user name is required!");
    } else if (validateFor === ADMIN) {
      setError("Admin name is required!");
    } else if (validateFor === FIRST_NAME) {
      setError("first name is required!");
    } else if (validateFor === LAST_NAME) {
      setError("last name is required!");
    } else if (validateFor === CATEGORY) {
      setError("Category name is required!");
    } else if (validateFor === PRODUCT) {
      setError("Product name is required!");
    }
  }
  setValue(value);
};

exports.validateSelect = (value, setValue, setError, validateFor) => {
  console.log(value);
  setError("");
  if (value === "") {
    if (validateFor === CATEGORY) {
      setError("Please select the category");
    } else if (validateFor === PRODUCT) {
      setError("Please select the product");
    }
  }
  setValue(value);
};

exports.validateEmail = (value, setValue, setError, validateFor) => {
  console.log(value);
  setError("");
  if (value === "") {
    if (validateFor === USER) {
      setError("user email is required!");
    } else if (validateFor === ADMIN) {
      setError("Admin email is required!");
    }
  }
  setValue(value);
};

exports.validatePassword = (value, setValue, setError, validateFor) => {
  setError("");
  if (value === "") {
    if (validateFor === USER) {
      setError("user password is required!");
    } else if (validateFor === ADMIN) {
      setError("Admin password is required!");
    }
  }
  setValue(value);
};

exports.validateNumber = (value, setValue, setError, validateFor) => {
  setError("");
  if (value === "") {
    if (validateFor === USER) {
      setError("user password is required!");
    } else if (validateFor === ADMIN) {
      setError("Admin password is required!");
    }
  }
  setValue(value);
};
