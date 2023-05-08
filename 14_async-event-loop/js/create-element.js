function createEl(el, elClasses = []) {
  const element = document.createElement(el);

  elClasses.forEach(elClass => {
    element.classList.add(elClass)
  });

  return element;
}

function createSection(data, title) {
  const section = createEl('section', ['section', 'mb-3']);
  const sectionTitle = createEl('h2', ['h2']);
  const sectionList = createList(data);

  sectionTitle.textContent = title;

  section.append(sectionTitle);
  section.append(sectionList);

  return section;
}

function createList(data) {
  const ul = createEl('ul', ['list-group']);

  data.forEach((item) => {
    createListItem(item, ul);
  })
  return ul;
}

function createListItem(item, ul) {
  const li = createEl('li', ['list-group-item']);

  li.textContent = item.name;
  ul.append(li);
}

function createLink(title, url) {
  const link = createEl('a', ['link']);
  link.textContent = title;
  link.href = url;

  return link;
}

export { createEl, createLink, createSection }
