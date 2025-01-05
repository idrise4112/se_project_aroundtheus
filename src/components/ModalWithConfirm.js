import Modal from "./Modal.js";

class ModalWithConfirm extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
  }

  setSubmitFunction(submitFn) {
    this._submitFunction = submitFn;
  }

  setEventListeners() {
    console.log(123);
    this._modalElement
      .querySelector(".modal__form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this._submitFunction();
      });
  }
}

export default ModalWithConfirm;
