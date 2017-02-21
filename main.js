const server = 'http://localhost:8002';
const processBooks = processResource(`${server}/books`);

function addToList(data) {
  console.log(data);
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
