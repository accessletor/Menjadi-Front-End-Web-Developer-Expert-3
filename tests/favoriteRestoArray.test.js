/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    return favoriteRestos.find((restaurant) => restaurant.id === id);
  },

  getAllResto() {
    return favoriteRestos;
  },

  putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    if (this.getResto(resto.id)) {
      return;
    }

    favoriteRestos.push(resto);
  },

  deleteResto(id) {
    // cara boros menghapus restaurant dengan meng-copy restaurant yang ada
    // kecuali restaurant dengan id === id
    favoriteRestos = favoriteRestos.filter((resto) => resto.id !== id);
  },
  searchResto(query) {
    return this.getAllResto()
      .filter((resto) => {
        const loweredCaseRestoTitle = (resto.name || '-').toLowerCase();
        const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestoTitle.indexOf(jammedQuery) != -1;
      });
  },
};

describe('Favorite resto array contract test', () => {
  // eslint-disable-next-line no-return-assign
  afterEach(() => (favoriteRestos = []));

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
