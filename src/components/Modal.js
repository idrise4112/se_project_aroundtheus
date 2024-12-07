export default class Modal {
  constructor({ modalSelector }) {
    console.log(modalSelector);
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseOverlay = this._handleCloseOverlay.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleCloseOverlay(event) {
    if (event.target === this._modalElement) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._modalElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());
  }
}
