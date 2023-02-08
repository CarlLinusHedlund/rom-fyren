import { signupUser } from "./baas/auth/signupUser.js";
import { validatePassword, validateEmail } from "./utils/validation";

const contactForm = document.querySelector("#signup-form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

const confirmPasswordErrorNotMatching = document.querySelector(
  "#confirmPasswordErrorNotMatching"
);
const generalErrorMessage = document.querySelector("#general-error-message");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailError.classList.add("hidden");
    isEmail = true;
  } else {
    emailError.classList.remove("hidden");
  }

  let isValidEmail = false;
  if (email.value.trim().length && validateEmail(email.value) === true) {
    emailErrorNotValid.classList.add("hidden");
    isValidEmail = true;
  } else if (email.value.trim().length && validateEmail(email.value) !== true) {
    emailErrorNotValid.classList.remove("hidden");
  }

  let isPassword = false;

  if (password.value.trim().length >= 8) {
    passwordError.classList.add("hidden");
    isPassword = true;
  } else {
    passwordError.classList.remove("hidden");
  }

  let isConfirmPassword = false;
  if (confirmPassword.value.trim().length >= 8) {
    confirmPasswordError.classList.add("hidden");
    isConfirmPassword = true;
  } else {
    confirmPasswordError.classList.remove("hidden");
  }

  let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword(
    password.value,
    confirmPassword.value
  ); // true // false
  if (isValidPasswordMatch) {
    confirmPasswordErrorNotMatching.classList.add("hidden");
    isValidPasswordMatch = true;
  } else {
    confirmPasswordErrorNotMatching.classList.remove("hidden");
  }
  let isFormValid =
    isEmail &&
    isValidEmail &&
    isPassword &&
    isConfirmPassword &&
    isValidPasswordMatch;

  if (isFormValid) {
    console.log("Validation SUCCEEDED!!  🥳");
    const userData = {
      email: email.value,
      password: password.value,
    };

    signUpUser(userData.email, userData.password);
  } else {
    console.log("Validation FAILED!! 💩");
  }
});

async function signUpUser(email, password) {
  console.log(email);
  console.log(password);
  try {
    const { user, msg } = await signupUser(email, password);
    if (user) {
      console.log(user);
      console.log("POST REQUEST SUCCEEDED!!  🥳 🤗🤗");
      // location.replace("/")
    } else {
      // case error
      console.log(msg);
      // generalErrorMessage.innerHTML = `Sorry !! ${data.message}`
    }
  } catch (e) {
    console.log(e);
  }
}
