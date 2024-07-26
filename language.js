const languageKey = 'preferredLanguage';

function changeLanguage() {
  const currentLanguage = getCurrentLanguage();
  const newLanguage = currentLanguage === 'en' ? 'id' : 'en';

  setLanguage(newLanguage);
  loadContent(newLanguage);
}

function getCurrentLanguage() {
  return localStorage.getItem(languageKey) || 'en';
}

function setLanguage(language) {
  localStorage.setItem(languageKey, language);
}

function loadContent(language) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log('Data loaded successfully:', data);
        renderContent(data);
      } else {
        console.error('Failed to load content. HTTP status:', xhr.status);
      }
    }
  };

  xhr.open('GET', `content_${language}.json`, true);
  xhr.send();
}

function renderContent(data) {
  const titleElement = document.getElementById('title');
  const descriptionElement = document.getElementById('description');

  titleElement.textContent = data.title;
  descriptionElement.textContent = data.description;
}

document.addEventListener('DOMContentLoaded', function () {
  const currentLanguage = getCurrentLanguage();
  console.log('Current language:', currentLanguage);
  loadContent(currentLanguage);
});
