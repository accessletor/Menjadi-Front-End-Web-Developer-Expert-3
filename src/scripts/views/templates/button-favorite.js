const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <p>🤍</p>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <p>❤️</p>
  </button>
`;

export { createLikeRestoButtonTemplate, createUnlikeRestoButtonTemplate };
