import FavoriteRestView from '../src/scripts/views/pages/liked-resto/favorite-resto-view';
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-show-presenter';

describe('Showing all favorite resto', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });
  describe('When no resto have been liked', () => {
    it('should ask for the favorite resto', () => {
      const favoriteResto = {
        getAllResto: jest.fn().mockImplementation(() => []),
      };
      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
      expect(favoriteResto.getAllResto).toHaveBeenCalledTimes(1);
    });
    it('should show the information that no resto have been liked', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.card__not__found').length).toEqual(1);
        done();
      });

      const favoriteResto = {
        getAllResto: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });
  describe('When favorite resto exist', () => {
    it('should show the resto', (done) => {
      document.getElementById('resto').addEventListener('resto:updated', () => {
        expect(document.querySelectorAll('.card').length).toEqual(2);
        done();
      });
      const favoriteResto = {
        getAllResto: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            vote_average: 3,
            overview: 'Sebuah restaurant A',
          },
          {
            id: 22,
            name: 'B',
            vote_average: 4,
            overview: 'Sebuah restaurant B',
          },
        ]),
      };
      new FavoriteRestoShowPresenter({
        view,
        favoriteResto,
      });
    });
  });
});
