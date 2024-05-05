import RestaurantSource from '../data/resource-resto';

const reviewUsers = async (url, name, review) => {
  const dataInput = {
    id: url.id,
    name,
    review,
  };

  try {
    // POST review
    const reviewResponse = await RestaurantSource.reviewRestaurant(dataInput);
    console.log('Review successfully posted:', reviewResponse);

    const date = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newReviewHTML = `
      <div class="detail-review-item">
        <div class="review-header">
          <p tabindex="0" class="review-name">${name}</p>
          <p tabindex="0" class="review-date">${date}</p>
        </div>
        <div tabindex="0" class="review-body">${review}</div>
      </div>
    `;

    const reviewContainer = document.querySelector('.detail-review');
    reviewContainer.insertAdjacentHTML('beforeend', newReviewHTML);
  } catch (error) {
    console.error('Error posting review:', error);
  }
};

export default reviewUsers;
