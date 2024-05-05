import CONFIG from '../../global/config';

const generateCategoryList = (categories) => categories.map((category) => `
    <span tabindex="0" class="category">${category.name}</span>
  `).join('');

const generateMenuList = (items) => items.map((item, index) => `
    <li><p tabindex="0" >${index + 1}) ${item.name}</p></li>
  `).join('');

const generateReviewList = (reviews) => reviews.map((review) => `
    <div class="detail-review-item">
      <div class="review-header">
        <p tabindex="0" class="review-name">${review.name}</p>
        <p tabindex="0" class="review-date">${review.date}</p>
      </div>
      <div tabindex="0" class="review-body">${review.review}</div>
    </div>
  `).join('');

const restoDetail = (resto) => `
  <div class="detail">
    <div tabindex="0" class="img-container">
    <picture>
        <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + resto.pictureId}">
        <img class="detail-img lazyload" alt="${resto.name}" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}"/>
        </picture>
    </div>
    <div class="info">
      <h3 tabindex="0" class="nama-resto">🏦${resto.name}</h3>
      <i tabindex="0">${resto.address}, ${resto.city}</i>
      <p tabindex="0" class="rating-detail">★ ${resto.rating}</p>
      <p tabindex="0" class="detail-description">${resto.description}</p>
      <div class="categories">
        ${generateCategoryList(resto.categories)}
      </div>
    </div>

    <h3 tabindex="0" class="garis-bawah">Menu</h3>

    <div tabindex="0" class="detail-menu">
      <div tabindex="0" class="detail-food">
        <h4 tabindex="0" >Food</h4>
        <ul class="cool-list">
          ${generateMenuList(resto.menus.foods)}
        </ul>
      </div>

      <div tabindex="0" class="detail-drink">
        <h4 tabindex="0" >Drink</h4>
        <ul class="cool-list">
          ${generateMenuList(resto.menus.drinks)}
        </ul>
      </div>
    </div>

    <h3 class="garis-bawah" tabindex="0">Reviews</h3>

    <div tabindex="0" class="detail-review">
      ${generateReviewList(resto.customerReviews)}
    </div>
    <div  id="contact">
    <form tabindex="0" action="">
      <label tabindex="0" for="nama">Nama</label>
      <input tabindex="0" type="text" id="nama" name="nama" class="review review-nama" placeholder="masukan nama">
      <label tabindex="0" for="review">Review</label>
      <input tabindex="0" type="text" id="review" name="review" class="review review-input" placeholder="masukan review">
      <button tabindex="0" id="review-button" class="review" type="submit">Submit</button>
    </form>
  </div>
  </div>
`;

export default restoDetail;
