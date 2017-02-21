const server = 'http://localhost:8002';
const processBooks = processResource(`${server}/books`);

function addToList(data) {
  data.forEach((book) => {
    document.querySelector('.list').prepend(buildCard(book));
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
    // TODO: Implement this
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

  plus.addEventListener('click', () => {
    document.querySelector('.list').classList.add('down');
    document.querySelector('.header').classList.add('down');
    document.querySelector('.add-form').classList.add('down');
  });

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
  document.querySelector('#adder').addEventListener('click', () => {
    const title  = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const data   = new FormData();

    data.append('name', title);
    data.append('author', author);

    fetch('http://localhost:8002/books', {
      method: 'POST',
      body: data
    }).then((response) => {
      response.json().then((book) => {
        document.querySelector('.list').prepend(buildCard(book));
      });
      // processBooks(addToList);
    });

    document.querySelector('.list').classList.remove('down');
    document.querySelector('.header').classList.remove('down');
    document.querySelector('.add-form').classList.remove('down');
  });
  processBooks(addToList);
}, {once: true, passive: true});
