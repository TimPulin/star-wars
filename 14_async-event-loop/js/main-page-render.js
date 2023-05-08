import { createEl, createLink } from './create-element.js';

export function render(data) {
  const container = createEl('div', ['container-fluid']);
  const pageTitle = createEl('h1', ['h1']);

  const listEpisodes = createEl('ul', ['list-group-item']);

  data.results.forEach((item, index) => {
    const li = createEl('li', ['list-group-item']);
    const link = createlinkEpisode(item, index);

    li.append(link);
    listEpisodes.append(li);
  });


  pageTitle.textContent = 'Звёздные войны';

  container.append(pageTitle);
  container.append(listEpisodes);

  return container;
}

function createlinkEpisode(item, index) {
  const link = createLink(`${item.title}. Эпизод ${item.episode_id}`, `/?episodeNumber=${index+1}`);
  const eventLinkEpisodeClick = new CustomEvent('linkEpisodeClick',
    {
      bubbles: true,
      detail: {episodeNumber: index+1}
    });

  link.addEventListener('click', (event) => {
    event.preventDefault();
    link.dispatchEvent(eventLinkEpisodeClick);
  })

  return link;
}
