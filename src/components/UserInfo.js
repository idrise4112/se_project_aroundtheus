export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.getElementById(nameSelector);
    this._descriptionElement = document.getElementById(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._nameElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}
