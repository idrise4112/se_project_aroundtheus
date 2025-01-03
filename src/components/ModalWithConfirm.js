import Modal from "./Modal.js";

class ModalWithConfirm extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }
  setSubmitFunction(submitFn) {
    this._submitFunction = submitFn;
  }
  setEventListeners() {
    this._modalElement
      .querySelector(".modal__form")
      .addEventListener("submit", this._submitFunction);
  }
}

export default ModalWithConfirm;
