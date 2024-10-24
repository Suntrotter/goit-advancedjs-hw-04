import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryLink;

function createCardsMarkup(cards) {
  return cards
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class='gallery-item'>
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" width='358' height='200'/>
          </a>
          <ul class='img-info'>
            <li><p>Likes</p><p>${likes}</p></li>
            <li><p>Views</p><p>${views}</p></li>
            <li><p>Comments</p><p>${comments}</p></li>
            <li><p>Downloads</p><p>${downloads}</p></li>
          </ul>
        </li>`
    )
    .join('');
}

function initSimpleLightbox() {
  galleryLink = new SimpleLightbox('.gallery-link', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}

function refreshGallery() {
  if (galleryLink) {
    galleryLink.refresh();
  }
}

export { createCardsMarkup, initSimpleLightbox, refreshGallery };
