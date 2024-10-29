class formValidator {
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
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  /*
  FormValidaor needs to know about all forms and all input fields inside them.
  FormValidator knows about all changes inside input fields. To provitde it we need to create event listener for keydown.
  AND! you need to run the same mechanism like on keydown for modal OPEN, otherwise if user does an error, after modal close, error will stay.

  */
}

export default formValidator;
