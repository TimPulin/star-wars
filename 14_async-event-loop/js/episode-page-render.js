import { createEl, createSection } from './create-element.js';
import { loadRequiredResources } from './load-resource.js';

export async function render(data, sectionsArr) {
  const [planets, species] = sectionsArr;

  const container = createEl('div', ['container-fluid'])
  const pageTitle = createEl('h1', ['h1']);
  const pageDesription = createEl('p', ['paragraph']);
  const sectionPlanet = createSection(planets, 'Планеты');
  const sectionSpecies = createSection(species, 'Расы');
  const btnGoToMain = createlinkMain();

  pageTitle.textContent = `${data.title}. Эпизод ${data.episode_id}`;
  pageDesription.textContent = data.opening_crawl;

  container.append(pageTitle);
  container.append(pageDesription);
  container.append(sectionPlanet);
  container.append(sectionSpecies);
  container.append(btnGoToMain);

  return container;
}

function createlinkMain() {
  const link = createEl('a', ['btn', 'btn-primary', 'mb-3']);
  const eventLinkMainClick = new CustomEvent('linkMainClick', {bubbles: true});

  link.href = '/';
  link.textContent = 'Главная';

  link.addEventListener('click', (event) => {
    event.preventDefault();
    link.dispatchEvent(eventLinkMainClick);
  })

  return link;
}
