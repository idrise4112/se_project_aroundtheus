export default class Modal {
  constructor({ modalSelector }) {
    this._popupElement = document.querySelector(modalSelector);
  }

  open() {}

  close() {}

  _handleEscClose() {}

  setEventListeners() {}
}
