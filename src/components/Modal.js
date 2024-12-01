export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(
      ".modal__close-button"
    );

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
    this._closeButton.addEventListener("click", () => this.close());
    this._modalElement.addEventListener("mousedown", this._handleCloseOverlay);
  }
}
