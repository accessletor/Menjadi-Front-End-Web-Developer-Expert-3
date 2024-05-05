/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurant');

// Perintah berjalan sebelum tiap metode tes dijalankan
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Post resto review', async ({ I }) => {
  const reviewName = 'asep sang raja iblis';
  const reviewText = 'hallo saya calon raja iblis';

  // URL: /
  I.seeElement('.detail');
  I.click(locate('.detail').first());

  // URL: /resto/:id
  I.seeElement('#contact form');
  I.fillField('.review-nama', reviewName);
  I.fillField('.review-input', reviewText);
  I.click('#review-button');

  // after submit button
  // I.refreshPage();
  I.waitForResponse('https://restaurant-api.dicoding.dev/review');
  const lastReview = locate('.review-body').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual(reviewText, lastReviewText.trim());
});
