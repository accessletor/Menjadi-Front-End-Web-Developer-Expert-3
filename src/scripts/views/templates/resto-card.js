import CONFIG from '../../global/config';

const restoCard = (resto) => `
<div tabindex =0 class="card">
    <div class="icon" tabindex="0">
        <span class="rate" tabindex="0"><p>★ ${resto.rating || '-'}</p></span>
        <picture>
        <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL + resto.pictureId}">
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name || '-'}">
        </picture>
    </div>
    <div class="text" tabindex="0">
        <p class="title-city resto__title">${resto.name || '-'}</p>
        <p class="description">${resto.description || '-'}</p>
    </div>
    <a href="#/resto/${resto.id || '-'}" class="detail"><div tabindex="0">
        <p><strong>Detail</strong></p>
    </div></a>
</div>
`;

export default restoCard;
