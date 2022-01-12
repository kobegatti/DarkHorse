const MAX_PASSWORD_LENGTH = 20;

function validEmail(email) {
  // Regular expression to check if string is email, good for almost all test cases
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  if (!email.includes(".") || email == "" || !email.includes("@")) return false;

  return regexExp.test(email);
}

function hasNumber(s) {
  return /\d/.test(s);
}

function validPassword(password) {
  let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (
    password.length > MAX_PASSWORD_LENGTH ||
    !hasNumber(password) ||
    !spChars.test(password)
  ) {
    return false;
  }

  return true;
}

module.exports = {
  validEmail,
  validPassword,
};
