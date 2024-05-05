/* eslint-disable no-new */
import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import FavoriteRestoView from './liked-resto/favorite-resto-view';
import FavoriteRestoShowPresenter from './liked-resto/favorite-resto-show-presenter';
import FavoriteRestoSearchPresenter from './liked-resto/favorite-resto-search-presenter';

const view = new FavoriteRestoView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const data = await FavoriteRestoIdb.getAllResto();

    if (data.length > 0) {
      // Jika ada data, tampilkan semua kartu restoran favorit
      new FavoriteRestoShowPresenter({ view, favoriteResto: FavoriteRestoIdb });
      new FavoriteRestoSearchPresenter({ view, favoriteResto: FavoriteRestoIdb });
      // Sembunyikan pesan favorite jika ada data
      document.querySelector('.pesan-favorite').style.display = 'none';
    } else {
      // Tampilkan pesan favorite jika tidak ada data
      document.querySelector('.pesan-favorite').style.display = 'block';
    }
  },
};

export default Favorite;
