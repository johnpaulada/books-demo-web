const server = 'http://localhost:8002';
const processBooks = processResource(`${server}/books`);

function addToList(data) {
  data.forEach((book) => {
    document.querySelector('.list').append(buildCard(book));
  });
  document.querySelector('.list').append(buildPlus());
}

function buildCard(data) {
  const card   = document.createElement('div');
  const title  = document.createElement('h3');
  const author = document.createElement('h4');
  const button = document.createElement('div');
  const label  = document.createElement('p');

  card.classList.add('card');
  title.classList.add('card__title');
  author.classList.add('card__author');
  button.classList.add('card__button', 'card__button--danger');

  button.addEventListener('click', (evt) => {

  }, {'passive': true});

  title.append(data.name);
  author.append(data.author);
  label.append('DELETE');

  button.append(label);
  card.append(title);
  card.append(author);
  card.append(button);

  return card;
}

function buildPlus() {
  const plus = document.createElement('div');
  const sym  = document.createElement('p');

  sym.append('+');
  plus.append(sym);

  plus.classList.add('plus');

  return plus;
}

function classAdder(className) {
  return function(element) {
    element.classList.add(className);
  };
}

function processResource(resource) {
  return function(process) {
    fetch(resource).then((response) => {
      response.json().then((data) => {
        process(data);
      });
    });
  }
}

window.addEventListener('load', () => {
  processBooks(addToList);
}, {once: true, passive: true});
