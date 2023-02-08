import { signinUser } from "./baas/auth/signInUser";
import { validateEmail } from "./utils/validation";

const contactForm = document.querySelector("#signin-form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

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

  let isFormValid = isEmail && isValidEmail && isPassword;

  if (isFormValid) {
    console.log("Validation SUCCEEDED!!  🥳");
    const userData = {
      email: email.value,
      password: password.value,
    };
    signInUser(userData.email, userData.password);
  } else {
    console.log("Validation FAILED!! 💩");
  }
});

async function signInUser(email, password) {
  console.log(email);
  console.log(password);
  try {
    const { user, session, msg } = await signinUser(email, password);
    if (user) {
      console.log(session);
      console.log(session.user);
      console.log("SIGN IN SUCCEEDED!!  🥳 🤗🤗");
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
