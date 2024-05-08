const selectForm = document.querySelector("#form");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const passwordconfirm = document.querySelector("#passwordconfirm");
const submitButton = document.querySelector("#submitButton");
const emailError = document.querySelector(".emailError");
const zipcodeError = document.querySelector(".zipcodeError");
const passwordError = document.querySelector(".passwordError");
const passwordconfirmError = document.querySelector(".passwordconfirmError");
// selectForm.style.display = "block";

email.addEventListener("input", (event) => {
  validateEmail();
});

window.onload = () => {
  country.onchange = checkZIP;
  zipcode.oninput = checkZIP;
};

password.addEventListener("input", (event) => {
  validatePassword();
  comparePasswords();
});

passwordconfirm.addEventListener("input", (event) => {
  comparePasswords();
});

selectForm.addEventListener("change", (event) => {
  enableSubmitButton();
});

submitButton.addEventListener("click", (event) => {
  alert("hi five!");
});

function validateEmail() {
  let emailValue = email.value;
  if (emailValue.includes("@") && emailValue.includes(".")) {
    email.setCustomValidity("");
    emailError.textContent = "";
    return;
  } else {
    email.setCustomValidity("Please enter a valid e-mail address");
    emailError.textContent = "Please enter a valid e-mail address";
    return;
  }
}

function validatePassword() {
  let pwdValue = password.value;
  let reg = /[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_\=\+\|]+/;
  if (reg.test(pwdValue) || pwdValue.length < 5) {
    password.setCustomValidity("You must use only the following characters:");
    console.log("works!");
    passwordError.textContent =
      "Password must be at least 5 characters long and only the following special characters are allowed: !@#$%^&*()-_=+";
    return;
  }
  console.log("true");
  password.setCustomValidity("");
  passwordError.textContent = "";
  return true;
}

function comparePasswords() {
  if (password.value === passwordconfirm.value) {
    console.log("passwords match!");
    passwordconfirm.setCustomValidity("");
    passwordconfirmError.textContent = "";
    return;
  } else {
    passwordconfirm.setCustomValidity("Passwords do not match");
    passwordconfirmError.textContent = "Passwords do not match";
    console.log("passwords dont match");
    return;
  }
}

function checkZIP() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const countryValue = country.value;
  const constraint = new RegExp(constraints[countryValue][0], "");
  console.log(constraint);
  if (constraint.test(zipcode.value)) {
    // The ZIP follows the constraint, we use the ConstraintAPI to tell it
    zipcode.setCustomValidity("");
    zipcodeError.textContent = "";
  } else {
    // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    zipcode.setCustomValidity(constraints[countryValue][1]);
    zipcodeError.textContent = constraints[countryValue][1];
  }
}

function enableSubmitButton() {
  if (
    email.validity.customError === false &&
    zipcode.validity.customError === false &&
    password.validity.customError === false &&
    passwordconfirm.validity.customError === false
  ) {
    submitButton.removeAttribute("disabled");
    return;
  } else {
    submitButton.setAttribute("disabled", "");
    return;
  }
}
