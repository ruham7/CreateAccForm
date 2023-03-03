class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }
  initialize() {
    this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnSubmit() {
    let self = this;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
      });
    });
  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);
      input.addEventListener("input", (event) => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    // Check for empty fields
    if (field.value.trim() === "") {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank`,
        "error"
      );
    } else {
      this.setStatus(field, null, "success");
    }
    // Check for email format
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Please enter a valid email address", "error");
      }
    }
    // Check for password
    if (field.id === "password") {
      const passwordField = this.form.querySelector("#password");
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;
      if (passwordField.value.length < 8) {
        this.setStatus(
          field,
          "Password should be more than 8 characters",
          "error"
        );
      } else if (
        passwordField.value.match(lowerCaseLetters) &&
        passwordField.value.match(upperCaseLetters) &&
        passwordField.value.match(numbers)
      ) {
        this.setStatus(field, "null", "success");
      } else {
        this.setStatus(
          field,
          "Password should contain lower case, upper case and numbers. ",
          "error"
        );
      }
    }

    // Check for password confirmation
    if (field.id === "password_confirmation") {
      const passwordField = this.form.querySelector("#password");
      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error");
      } else if (field.value != passwordField.value) {
        this.setStatus(field, "Password does not match", "error");
      } else {
        this.setStatus(field, null, "success");
      }
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector(".icon-success");
    const errorIcon = field.parentElement.querySelector(".icon-error");
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status === "success") {
      if (errorIcon) {
        errorIcon.classList.add("hidden");
      }
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      successIcon.classList.remove("hidden");
      field.classList.remove("input-error");
    }

    if (status === "error") {
      if (successIcon) {
        successIcon.classList.add("hidden");
      }
      field.parentElement.querySelector(".error-message").innerText = message;
      errorIcon.classList.remove("hidden");
      field.classList.add("input-error");
    }
  }
}

const form = document.querySelector(".form");
const fields = ["username", "email", "password", "password_confirmation"];

const validator = new FormValidator(form, fields);

validator.initialize();
