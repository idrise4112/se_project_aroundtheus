import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";
import ModalWithForm from "../components/ModalWithForm.js";
import { config } from "../utils/constants.js";

import "./index.css";
import ModalWithConfirm from "../components/ModalWithConfirm.js";

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                     Elements                                                                                                                                   */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d88a2b9a-3c17-46af-b0b4-5a460d3316a6",
    "Content-Type": "application/json",
  },
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
const openAvatarButton = document.querySelector(".profile__image-btn");
const avatarForm = document.querySelector("#avatar-form");

let cardSection;

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                     Functions                                                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
api
  .getCards()
  .then((initialCards) => {
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
  })
  .catch((err) => console.error(err));

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .getUsers()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => console.error(err));

// Handle profile edit submit
function handleProfileEditSubmit(formValues) {
  const nameInput = formValues.title;
  const descriptionInput = formValues.description;

  profileModal.setLoading(true);

  api
    .editUserInfo(nameInput, descriptionInput)
    .then(() => {
      userInfo.setUserInfo({
        name: nameInput,
        description: descriptionInput,
      });
      profileModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      profileModal.setLoading(false);
    });
}

function handleAddCardSubmit(inputValues) {
  const cardData = {
    name: inputValues.title,
    link: inputValues.url,
  };

  addModal.setLoading(true);
  api
    .addCard(cardData)
    .then((res) => {
      cardSection.addItem(createCard(res));
      addModal.close();
      addCardFormElement.reset();
      addCardValidator.disableButton();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addModal.setLoading(false);
    });
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => card.toggleLikeIcon())
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card._id)
      .then(() => card.toggleLikeIcon())
      .catch((err) => console.error(err));
  }
}

const avatarModal = new ModalWithForm("#avatar-modal", ({ url }) => {
  avatarModal.setLoading(true);
  api
    .updateAvatar(url)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarModal.close();
      avatarForm.reset();
    })
    .catch((err) => console.error(err)) // Catch block placed here
    .finally(() => {
      avatarModal.setLoading(false);
    });
});

avatarModal.setEventListeners();
openAvatarButton.addEventListener("click", () => avatarModal.open());

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                     Event Listener                                                                                       */
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

addNewCardButton.addEventListener("click", () => addModal.open());

const imageModal = new ModalWithImage({ modalSelector: "#modal-preview" });
imageModal.setEventListeners();
function handleImageClick(cardData) {
  imageModal.open({ name: cardData.name, link: cardData.link });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleCardDelete,
    handleLikeClick
  );

  return card.getView();
}

const deleteModal = new ModalWithConfirm("#delete-modal");
deleteModal.setEventListeners();
function handleCardDelete(card) {
  deleteModal.open();
  deleteModal.setSubmitFunction(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.cardElement.remove();
        deleteModal.close();
      })
      .catch((err) => console.error(err));
  });
}

const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();
const editProfileValidator = new FormValidator(config, profileEditForm);
editProfileValidator.enableValidation();
const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();
