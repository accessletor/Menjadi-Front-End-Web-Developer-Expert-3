/* eslint-disable no-underscore-dangle */
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/resource-resto';
import restoDetail from '../templates/resto-detail';
import Loading from '../templates/loading';
import reviewUsers from '../../utils/review-users';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { sendDataToWebsocket } from '../../utils/websocket-initiator';
import { alertSuccess, alertError } from '../../utils/sweetalert';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
      <section class="container">
        <div tabindex="0" class="container-title">
          <h2>Detail Restaurant</h2>
        </div>
        <div class="loading"></div> <!-- Tambahkan elemen loading -->
        <div class="like" id="likeButtonContainer"></div>
        <div class="details"></div>
      </section>
    `;
  },

  async afterRender() {
    this._displayLoading();

    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const data = await RestaurantSource.detailRestaurant(url.id);

      this._hideLoading();
      this._showMainContainer();

      this._displayRestoDetail(data.restaurant);
      this._addSubmitReviewListener(url);
      // tombol like
      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteResto: FavoriteRestoIdb,
        data,
      });
    } catch (error) {
      console.error('Failed to fetch restaurant detail:', error);
      this._hideLoading();
      this._showMainContainer();
      this._displayErrorMessage(error.message);
      // Tambahkan Sweet Alert untuk memberi tahu pengguna tentang kesalahan
      // eslint-disable-next-line no-undef
      alertError(error.message);
    }
  },

  _displayLoading() {
    const loading = document.querySelector('.loading');
    loading.innerHTML = Loading();
    loading.style.display = 'block';
  },

  _hideLoading() {
    const loading = document.querySelector('.loading');
    loading.style.display = 'none';
  },

  _showMainContainer() {
    const mainContainer = document.querySelector('.container');
    mainContainer.style.display = 'block';
  },

  _displayRestoDetail(restaurant) {
    const restoContainer = document.querySelector('.details');
    restoContainer.innerHTML = restoDetail(restaurant);
  },

  _addSubmitReviewListener(url) {
    const submitReviewHandler = async (e) => {
      e.preventDefault();
      const nameInput = document.querySelector('.review-nama');
      const reviewInput = document.querySelector('.review-input');

      try {
        await reviewUsers(url, nameInput.value, reviewInput.value);
        sendDataToWebsocket({
          name: nameInput.value,
          review: reviewInput.value,
        });
        // Jika berhasil, tampilkan Sweet Alert berhasil
        alertSuccess('Review added successfully');
      } catch (error) {
        console.error('Failed to add review:', error);
        // Jika gagal, tampilkan Sweet Alert gagal
        alertError(error.message);
      }

      nameInput.value = '';
      reviewInput.value = '';
    };

    document.querySelector('#review-button').addEventListener('click', submitReviewHandler);
  },

  _displayErrorMessage(message) {
    const restoContainer = document.querySelector('.details');
    restoContainer.innerHTML = `<h3 class="error">Error: ${message}</h3>`;
  },
};

export default Detail;
