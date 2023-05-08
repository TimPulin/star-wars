import { createEl } from './create-element.js';

const cssPromises = [];

export function loadRequiredResources(resourcesArr) {
  return Promise.all(
    resourcesArr.map((src) => {
      return loadResource(src)
    })
  )
    .then(response => response)
    .catch(error => console.log(error))
}

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src) ;
  }

  if (src.endsWith('.css')){
    if(!cssPromises[src]) {
      const link = createEl('link');
      link.rel = 'stylesheet';
      link.href = src;
      document.head.append(link);
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => {
          resolve()
        })
      });
    }
    return cssPromises[src];
  }
  return fetch(src).then(response => response.json())
}
