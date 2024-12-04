import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  // getInputValues
  // iterate through the inputs in the form
  //   for each input, add the valu to an object
  //   obj[input.name] = input.value;

  setEventListeners() {
    super.setEventListeners();

    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // call getInputValues and pass the result to handleFormSubmit
      this._handleFormSubmit();
    });
  }
}

export default ModalWithForm;
