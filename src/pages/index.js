import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";
import ModalWithForm from "../components/ModalWithForm.js";
import { config } from "../utils/constants.js";

import "./index.css";

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Elements                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "d88a2b9a-3c17-46af-b0b4-5a460d3316a6",
});

let cardSection;

api.getCards().then((initialCards) => {
  console.log(initialCards);
  cardSection = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
});

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-new-card-modal");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

/* function handleCardSubmit(evt) {
  evt.preventDefault();

  // Could be improved: use `[...evt.target.elements]` instead.
  const formData = getInputValues(cardModalInputs);

  // Could be improved: use `const button = evt.submitter` instead.
  const button = evt.target.querySelector(".modal__button");
  setButtonText(button, true);

api
    .addCard(formData)
    .then((res) => {
      // renderCard(res, "prepend"); // optional
      const cardEl = getCardElement(res);
      cardList.prepend(cardEl);
      closeModal(cardModal);
      cardForm.reset();
      disableButton(button, validationConfig);
    })
    .catch(console.error)
    .finally(() => setButtonText(button, false));
} */

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Functions                                                                                                                                                */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

const previewImageModal = document.querySelector("#modal-preview");

const previewModalCloseButton =
  previewImageModal.querySelector(".modal__close");

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Handlers                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function handleProfileEditSubmit(formValues) {
  const nameInput = formValues.title;
  const descriptionInput = formValues.description;

  api.editUserInfo(nameInput, descriptionInput);
  // call editUserUnfo method to fetch to the server and update the userInfo on the server
  userInfo.setUserInfo({
    name: nameInput,
    description: descriptionInput,
  });
  profileModal.close();
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

api.getUsers().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
});

const deleteModal = new ModalWithForm( {

function handleCardDelete(card, cardId) {
  confirmDelete.setEventListener(() => {
    // in here you handle the whole api delete functionality
  });
  confirmDelete.open();
}
}

function handleAddCardSubmit(inputValues) {
  const cardData = {
    name: inputValues.title,
    link: inputValues.url,
  };

  const cardView = createCard(cardData);
  api.addCard(cardData).then((res) => {
    cardSection.addItem(cardView);
  });

  addModal.close();
  addCardFormElement.reset();
  addCardValidator.disableButton();
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Listener                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileModal.setEventListeners();

const addModal = new ModalWithForm("#add-new-card-modal", handleAddCardSubmit);
addModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileModal.open();
});

addNewCardButton.addEventListener("click", () => {
  addModal.open();
});

const imageModal = new ModalWithImage({ modalSelector: "#modal-preview" });
imageModal.setEventListeners();
function handleImageClick(cardData) {
  imageModal.open({ name: cardData.name, link: cardData.link });
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();
const editProfileValidator = new FormValidator(config, profileEditForm);
editProfileValidator.enableValidation();
