import { getImages } from './js/pixabay-api';
import { createCardsMarkup, initSimpleLightbox, refreshGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let searchQuery = '';
const imagesPerPage = 15;

initSimpleLightbox();

const searchForm = document.querySelector('.form');
searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

function handleSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  searchQuery = form.elements.search.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  currentPage = 1; // Reset page for new query
  loadMoreBtn.classList.add('hidden'); // Hide button initially
  showLoader(); // Show the loader

  fetchImages(); // Fetch images for the new search
}

function fetchImages() {
  getImages(searchQuery, currentPage, imagesPerPage)
    .then(data => {
      if (data.totalHits === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      gallery.insertAdjacentHTML('beforeend', createCardsMarkup(data.hits));
      refreshGallery();

      if (data.totalHits > currentPage * imagesPerPage) {
        loadMoreBtn.classList.remove('hidden'); // Show button if more images exist
      } else {
        loadMoreBtn.classList.add('hidden'); // Hide button if no more images
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      iziToast.error({
        message: 'An error occurred. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader(); // Hide the loader after fetching images
    });
}

function loadMoreImages() {
  currentPage += 1; // Increment page number
  loadMoreBtn.classList.add('hidden'); // Hide Load More button
  showLoader(); // Show loader while fetching new images

  getImages(searchQuery, currentPage, imagesPerPage)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', createCardsMarkup(data.hits));
      refreshGallery();

      // Check if there are more images to load
      if (data.totalHits > currentPage * imagesPerPage) {
        loadMoreBtn.classList.remove('hidden'); // Show button if more images exist
      } else {
        loadMoreBtn.classList.add('hidden'); // Hide button if no more images
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      iziToast.error({
        message: 'An error occurred. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader(); // Hide loader after images are loaded
    });
}

function showLoader() {
  console.log('Showing loader...');
  loader.style.display = 'block';
  loader.style.visibility = 'visible';
  loader.style.opacity = '1';
  loader.textContent = 'Loading...';
}

function hideLoader() {
  console.log('Hiding loader...');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 300);
}

function showLoaderWithDelay() {
  setTimeout(() => {
    showLoader(); // Only show loader after delay
  }, 500); // Delay of 500ms before showing the loader
}
