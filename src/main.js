import { fetchImages } from './js/pixabay-api';
import generateImageMarkup from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryModal = new SimpleLightbox('.photo-link', {
  captionDelay: 250,
  captionsData: 'alt',
});

const galleryEl = document.querySelector('.photo-gallery');
const loadingSpinner = document.querySelector('.loading-indicator');
const loadMoreButton = document.querySelector('.load-more-btn');
const searchFormEl = document.querySelector('.search-form');

const queryParams = {
  page: 1,
  perPage: 15,
  maxPages: 1,
  searchTerm: '',
};

searchFormEl.addEventListener('submit', handleSearchImages);

async function handleSearchImages(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';

  toggleVisibility(loadMoreButton, false);
  queryParams.page = 1;

  const form = event.currentTarget;
  loadingSpinner.style.display = 'block';

  const searchTerm = form.elements.search.value.trim();
  queryParams.searchTerm = searchTerm;

  try {
    const data = await fetchImages(queryParams);

    if (data.total === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
    queryParams.maxPages = Math.ceil(data.totalHits / queryParams.perPage);
    galleryEl.innerHTML = generateImageMarkup(data.hits);
    galleryModal.refresh();

    if (queryParams.maxPages > queryParams.page) {
      toggleVisibility(loadMoreButton, true);
      loadMoreButton.addEventListener('click', paginateImages);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingSpinner.style.display = 'none';
    form.reset();
  }
}

async function paginateImages() {
  loadMoreButton.textContent = 'Loading...';
  queryParams.page += 1;
  loadingSpinner.style.display = 'block';

  try {
    const data = await fetchImages(queryParams);
    const newMarkup = generateImageMarkup(data.hits);

    galleryEl.insertAdjacentHTML('beforeend', newMarkup);
    galleryModal.refresh();

    const firstGalleryItem = document.querySelector('.photo-item');
    const itemRect = firstGalleryItem.getBoundingClientRect();
    window.scrollBy({
      top: 2 * itemRect.height,
      behavior: 'smooth',
    });

    if (queryParams.maxPages === queryParams.page) {
      toggleVisibility(loadMoreButton, false);
      loadMoreButton.removeEventListener('click', paginateImages);
      iziToast.success({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'blue',
        icon: false,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadMoreButton.textContent = 'Load more';
    loadingSpinner.style.display = 'none';
  }
}

function toggleVisibility(element, show) {
  if (show) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}
