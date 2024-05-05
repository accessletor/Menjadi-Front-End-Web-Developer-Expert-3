/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty liked resto', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada Restoran Favorit yang tersimpan. Tambahkan satu dengan mengklik tombol hati di halaman detail', '.pesan-favorite');
});
Scenario('liking one resto', async ({ I }) => {
  I.see('Tidak ada Restoran Favorit yang tersimpan. Tambahkan satu dengan mengklik tombol hati di halaman detail', '.pesan-favorite');

  I.amOnPage('/');
  // ... kita akan mengisi uji coba berikutnya ...
  I.seeElement('.detail');
  const firstResto = locate('.detail').first();
  const firstRestoDetail = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const likedResto = await I.grabTextFrom('.detail');

  assert.strictEqual(firstRestoDetail, likedResto);
});
Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada Restoran Favorit yang tersimpan. Tambahkan satu dengan mengklik tombol hati di halaman detail', '.pesan-favorite');

  I.amOnPage('/');
  // ... kita akan mengisi uji coba berikutnya ...
  I.seeElement('.detail');
  const firstResto = locate('.detail').first();
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  I.click('.detail');

  // URL: /resto/:id
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.dontSeeElement('.card');
  I.dontSeeElement('.detail');
});

// searching
Scenario('searching resto', async ({ I }) => {
  I.see('Tidak ada Restoran Favorit yang tersimpan. Tambahkan satu dengan mengklik tombol hati di halaman detail', '.pesan-favorite');

  I.amOnPage('/');

  I.seeElement('.detail');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.detail').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.detail'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedResto = await I.grabNumberOfVisibleElements('.card');
  assert.strictEqual(titles.length, visibleLikedResto);
  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  // mendapatkan daftar resto yang sesuai dengan searchQuery
  const matchingResto = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedResto = await I.grabNumberOfVisibleElements('.card');
  assert.strictEqual(matchingResto.length, visibleSearchedLikedResto);
  for (let i = 0; i < matchingResto.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFromAll('.resto__title');
    assert.notStrictEqual(matchingResto[i], visibleTitle[i]);
  }
});
