import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._modalForm.querySelector(".modal__button"); // double check that this is the selector for the submit buttons
    // we save the initial text content to be able to set it back to normal while loading
    this._submitButtonTextContent = this._submitButton.textContent;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }

  close() {
    super.close();
  }

  getInputValues() {
    const inputs = this._modalForm.querySelectorAll("input");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the default form submission
      const formData = this.getInputValues();
      this._handleFormSubmit(formData); // Correctly pass formData to the submission handler
      this._modalForm.reset();
    });

    super.setEventListeners();
  }
}

export default ModalWithForm;
