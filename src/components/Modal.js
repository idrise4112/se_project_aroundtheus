export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
  }

  _handleEscClose() {}

  setEventListeners() {}
}
