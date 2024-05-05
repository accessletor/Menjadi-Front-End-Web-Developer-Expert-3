// aku suka apa yang aku lihat
import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter';
import FavoriteRestoView from '../src/scripts/views/pages/liked-resto/favorite-resto-view';

describe('Searching resto', () => {
  let presenter;
  let favoriteResto;
  let view;

  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteResto = {
      getAllResto: jest.fn(),
      searchResto: jest.fn(),
    };
    presenter = new FavoriteRestoSearchPresenter({
      favoriteResto,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      // rev 2
      favoriteResto.searchResto.mockImplementation(() => []);
      searchResto('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });
    it('should ask the model to search for liked restaurant', () => {
      favoriteResto.searchResto.mockImplementation(() => []);
      searchResto('restaurant a');
      expect(favoriteResto.searchResto).toHaveBeenCalledWith('restaurant a');
    });
    it('should show the resto found by Favorite Resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.card').length).toEqual(3);
        done();
      });
      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchResto('restaurant a');
    });
    it('should show the name of the resto found by Favorite Resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__title');
        expect(restoTitles.item(0).textContent).toEqual('restaurant abc');
        expect(restoTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
        expect(restoTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');
        done();
      });
      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchResto('restaurant a');
    });
    it('should show - when the resto returned does not contain a title', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__title');
        expect(restoTitles.item(0).textContent).toEqual('-');
        done();
      });

      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchResto('restaurant a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteResto.getAllResto.mockImplementation(() => []);
      searchResto(' ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchResto('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchResto('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchResto('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite resto', () => {
      favoriteResto.getAllResto.mockImplementation(() => []);
      searchResto('    ');
      expect(favoriteResto.getAllResto).toHaveBeenCalled();
    });
  });
  describe('When no favorite resto could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('resto').addEventListener('resto:updated', () => {
          expect(document.querySelectorAll('.card__not__found').length).toEqual(1);
          done();
        });
      favoriteResto.searchResto.mockImplementation((query) => []);
      searchResto('restaurant a');
    });
    it('should not show any resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.card').length).toEqual(0);
        done();
      });
      favoriteResto.searchResto.mockImplementation((query) => []);
      searchResto('restaurant a');
    });
  });
});
