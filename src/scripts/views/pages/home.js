import RestaurantSource from '../../data/resource-resto';
import Loading from '../templates/loading';
import restoCard from '../templates/resto-card';
import { alertError } from '../../utils/sweetalert';

const Home = {
  async render() {
    return `
      <section class="container">
        <div tabindex="0" class="container-title">
          <h2>Explore Restaurant</h2>
        </div>
        <div class="loading"></div>
        <div class="cards"></div>
      </section>
    `;
  },

  async afterRender() {
    const mainContainer = document.querySelector('.container');
    const restoContainer = document.querySelector('.cards');
    const loading = document.querySelector('.loading');

    // Jalankan loading
    loading.innerHTML = Loading();

    try {
      const data = await RestaurantSource.listRestaurant(); // Fetch restaurant list

      // Loop restaurants data
      data.restaurants.forEach((restaurant) => {
        restoContainer.innerHTML += restoCard(restaurant);
      });

      // Sembunyikan loading setelah data dimuat
      loading.style.display = 'none';
      // Tampilkan container utama
      mainContainer.style.display = 'block';
    } catch (error) {
      console.error('Failed to fetch restaurant list:', error);
      // Tampilkan pesan kesalahan jika terjadi error
      loading.style.display = 'none';
      mainContainer.style.display = 'block';
      restoContainer.innerHTML = `<h3 class="error">Error: ${error.message}</h3>`;
      // eslint-disable-next-line no-undef
      alertError(err.message);
    }
  },
};

export default Home;
