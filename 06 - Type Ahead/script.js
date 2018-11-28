const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// ! NOTE: stream.json() return a promise
fetch(endpoint)
  .then(stream => stream.json())
  .then((data) => {
    cities.push(...data);
  });

console.log(cities);

const findMatches = (wordToMatch, cities) => {
  // ! NOTE: 'gi' stands for global and case insensitive
  const regex = new RegExp(wordToMatch, 'gi');
  return cities.filter(place => place.city.match(regex) || place.state.match(regex));
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const displayMatches = (event) => {
  const matchArray = findMatches(event.target.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${event.target.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${event.target.value}</span>`);

      // ! NOTE:
      return `<li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${parseFloat(place.population).toLocaleString('en')}</span>
        </li>`;
    })
    .join('');
  suggestions.innerHTML = html;
};

// searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
