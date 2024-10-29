class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this.SubmitButttonSelector = config.SubmitButttonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._element = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }


_hideInputError(inputElement) {
  const errorMessage = this._element.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList
}