import { TestWatcher } from "jest";
const formValidationFuncs = require("../components/functions/FormValidation");
// const validEmail = require("../components/functions/FormValidation");
// const validPassword = formValidationFuncs.validPassword;

// validEmail
describe("validEmail", () => {
  test("empty email string", () => {
    expect(formValidationFuncs.validEmail("")).toBeFalsy();
  });

  test("email that looks like username", () => {
    expect(formValidationFuncs.validEmail("kobegatti")).toBeFalsy();
  });

  test("email with no . or com", () => {
    expect(formValidationFuncs.validEmail("nancyjane@")).toBeFalsy();
  });

  test("email with no @ or com", () => {
    expect(formValidationFuncs.validEmail("nancyjane.")).toBeFalsy();
  });

  test("email with no @ or .", () => {
    expect(formValidationFuncs.validEmail("nancyjanecom")).toBeFalsy();
  });

  test("email with no .com", () => {
    expect(formValidationFuncs.validEmail("kgatti@calpoly")).toBeFalsy();
  });

  test("email with no @ or .", () => {
    expect(formValidationFuncs.validEmail("kgattigmail")).toBeFalsy();
  });

  test("email with no com", () => {
    expect(formValidationFuncs.validEmail("kgatti@calpoly.")).toBeFalsy();
  });

  test("email with no .", () => {
    expect(formValidationFuncs.validEmail("kgatti@calpolycom")).toBeFalsy();
  });

  test("email with no @", () => {
    expect(formValidationFuncs.validEmail("kgatticalpoly.com")).toBeFalsy();
  });

  test("good email #1", () => {
    expect(formValidationFuncs.validEmail("kgatti@calpoly.com")).toBeTruthy();
  });

  test("good email #2", () => {
    expect(formValidationFuncs.validEmail("kobegatti@gmail.com")).toBeTruthy();
  });

  test("good email #3", () => {
    expect(
      formValidationFuncs.validEmail("johnsmith@example.net")
    ).toBeTruthy();
  });
});

describe("\nvalidPassword", () => {
  test("password with over 20 chars", () => {
    expect(
      formValidationFuncs.validPassword("abcdefghijklmnopqrstu")
    ).toBeFalsy();
  });

  test("another password with over 20 chars", () => {
    expect(
      formValidationFuncs.validPassword("holycowthisisalongpassword9&%")
    ).toBeFalsy();
  });

  test("Within range with special character, but no number", () => {
    expect(formValidationFuncs.validPassword("password$")).toBeFalsy();
  });

  test("Within range with number, but no special character", () => {
    expect(formValidationFuncs.validPassword("password315")).toBeFalsy();
  });

  test("Valid - within range with number and special character", () => {
    expect(formValidationFuncs.validPassword("#heythere917&#")).toBeTruthy();
  });
});
