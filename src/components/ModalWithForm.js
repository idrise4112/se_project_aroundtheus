import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
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
    super.setEventListeners();

    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the default form submission
      const formData = this.getInputValues();
      this._handleFormSubmit(formData); // Correctly pass formData to the submission handler
      this._modalForm.reset();
    });
  }
}

export default ModalWithForm;
