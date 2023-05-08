// import { createEl } from './utils/create-element';
import { loadRequiredResources } from './load-resource.js';

const containerApp = document.getElementById('app');

const bootstrap = '	https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';
const BASE_URL = 'https://swapi.dev/api/';
const FILMS_URL = `${BASE_URL}films/`;
const mainPageModuleUrl = './main-page-render.js';
const episodePageModuleUrl = './episode-page-render.js';

renderMainPage();

document.addEventListener('linkMainClick', () => {
  history.pushState({}, '', `/`)
  renderMainPage();
})

document.addEventListener('linkEpisodeClick', (event) => {
  history.pushState({}, '', `/episode/${event.detail.episodeNumber}`)
  renderEpisodePage(event.detail.episodeNumber);
})

async function renderMainPage() {
  const [pageModule, data] = await loadRequiredResources([mainPageModuleUrl, FILMS_URL, bootstrap]);
  const page = await pageModule.render(data);
  containerApp.innerHTML = '';
  containerApp.append(page);
}

async function renderEpisodePage(episodeNumber) {
  const [pageModule, data] = await loadRequiredResources([episodePageModuleUrl, `${FILMS_URL}${episodeNumber}/`, bootstrap]);
  const sectionsArr = await loadData([data.planets, data.species])
  const page = await pageModule.render(data, sectionsArr);
  containerApp.innerHTML = '';
  containerApp.append(page);
}

function loadData(srcArr) {
  return Promise.all(
    srcArr.map((src) => {
      return loadRequiredResources(src);
    })
  )
    .then((response) => response)
}


