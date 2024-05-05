import { createLikeRestoButtonTemplate, createUnlikeRestoButtonTemplate } from '../views/templates/button-favorite';
import { alertError, alertSuccess } from './sweetalert';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteResto, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = data.restaurant;
    this._favoriteResto = favoriteResto;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const { id } = this._restaurant;
      const restaurant = await this._favoriteResto.getResto(id);

      if (restaurant) {
        this._renderLikedButtonTemplate();
      } else {
        this._renderLikeButtonTemplate();
      }
    } catch (error) {
      console.error(error);
      alertError(error.message);
      throw new Error(error);
    }
  },

  _addButtonEventListener(button, action) {
    button.addEventListener('click', async () => {
      await action();
      this._renderButton();
    });
  },

  _renderLikeButtonTemplate() {
    this._likeButtonContainer.innerHTML = createLikeRestoButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    this._addButtonEventListener(likeButton, async () => {
      await this._favoriteResto.putResto(this._restaurant);
      alertSuccess('Resto favorited!');
    });
  },

  _renderLikedButtonTemplate() {
    this._likeButtonContainer.innerHTML = createUnlikeRestoButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    this._addButtonEventListener(likeButton, async () => {
      await this._favoriteResto.deleteResto(this._restaurant.id);
      alertSuccess('Resto unfavorited!');
    });
  },
};

export default LikeButtonPresenter;
