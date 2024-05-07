const selectForm = document.querySelector("#form");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const passwordconfirm = document.querySelector("#passwordconfirm");
let pwdValue = password.value;

// selectForm.style.display = "block";

password.addEventListener("input", (event) => {
  validatePassword();
  comparePasswords();
});

passwordconfirm.addEventListener("input", (event) => {
  comparePasswords();
});

function validatePassword() {
  let pwdValue = password.value;
  let reg = /[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_\=\+\|]+/;
  if (reg.test(pwdValue)) {
    password.setCustomValidity("You must use only the following characters:");
    return;
  }
  console.log("true");
  password.setCustomValidity("");
  return true;
}

function comparePasswords() {
  if (password.value === passwordconfirm.value) {
    console.log("passwords match!");
    passwordconfirm.setCustomValidity("");
    return;
  } else {
    passwordconfirm.setCustomValidity("Passwords do not match");
    console.log("passwords dont match");
    return;
  }
}
