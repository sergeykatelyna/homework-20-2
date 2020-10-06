const ENDPOINT = 'https://api.giphy.com/v1/gifs';
const ENDPOINT_TYPE = {
  trending: 'trending',
  search: 'search',
};
const API_KEY = 'D4EUK5TYyx5bYrrOo6wYGFV91OvXIH4J';
const LIMIT = 5;
const defEndpoint = [ENDPOINT_TYPE.trending, null];
const searchInput = document.querySelector('.search__input');
const output = document.querySelector('.gif-container');
const loader = document.querySelector('.loader');


function createURL([endpointType, searchTerm]) {
  const q = (searchTerm) ? `q=${searchTerm.replace(/\s/g, '+')}&` : '';

  return `${ENDPOINT}/${endpointType}?${q}api_key=${API_KEY}&limit=${String(LIMIT)}`;
}

function showLoader() {
  loader.classList.toggle('active');
}

function fetchGifs(endpoint) {
  showLoader();

  const url = createURL(endpoint);

  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (!res.ok) {
        reject(res.status);
      } else {
        resolve(res.json());
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

function setMinHeight(data) {
  const minHeight = Math.min(...data.map(({ images: { original: gif } }) => gif.height));

  document.styleSheets[0].insertRule(
    `.${output.classList[0]} img { height: ${minHeight}px }`,
    document.styleSheets[0].cssRules.length,
  );
}

function renderGifs(resBody) {
  output.innerHTML = '';

  Promise.resolve(resBody)
    .then(({ data }) => {
      data.forEach(({ images, title }) => {
        const { url } = images.original;

        const gifEl = document.createElement('IMG');
        gifEl.src = url;
        gifEl.alt = title;
        output.append(gifEl);
      });
      return data;
    })
    .then(setMinHeight)
    .finally(showLoader)
    .catch((e) => {
      console.log(e);
    });
}

function debounce(func) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, 1000);
  };
}

const searchListener = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const endpoint = (searchTerm !== '')
    ? [ENDPOINT_TYPE.search, searchTerm]
    : defEndpoint;

  fetchGifs(endpoint).then(renderGifs);
};


searchInput.addEventListener('input', debounce(searchListener));

fetchGifs(defEndpoint).then(renderGifs);
