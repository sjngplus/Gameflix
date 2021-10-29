const filterGamesListArray = (inputList, filters) => {
  console.log("::Input Length", inputList.length);
  const filteredByPrice = filterByPrice(inputList, filters.centPrices);
  const filteredByRating = filterByRating(filteredByPrice, filters.rating);
  const filteredByYear = filterByYear(filteredByRating, filters.years);
  const filteredByGenre = filterByGenre(filteredByYear, filters.genres);
  const filteredByOS = filterByOS(filteredByGenre, filters.os);
  const filteredByName = filterByName(filteredByOS, filters.name);
  console.log("::Output Length", filteredByName.length);
  return filteredByName;
} 

const filterByPrice = (inputArray, priceFilter) => {
  const outputArray = [];
  inputArray.forEach(game => {
    if (game.price_overview && game.price_overview.final >= priceFilter[0] && game.price_overview.final <= priceFilter[1]) {
      outputArray.push(game)
    }
  });
  return outputArray
};

const filterByRating = (inputArray, ratingFilter) => {
  const outputArray = [];
  inputArray.forEach(game => {
    if (!game.metacritic) game.metacritic = { score: 1 };      
    if (game.metacritic && game.metacritic.score >= ratingFilter[0] && game.metacritic.score <= ratingFilter[1]) {
      outputArray.push(game)
    }
  });
  return outputArray
};

const filterByYear = (inputArray, yearFilter) => {
  const outputArray = [];
  inputArray.forEach(game => {
    if (game.release_date && game.release_date.date.slice(-4) >= yearFilter[0] && game.release_date.date.slice(-4) <= yearFilter[1]) {
      outputArray.push(game)
    }
  });
  return outputArray
}; 

const filterByGenre = (inputArray, genreFilter) => {
  const outputArray = [];
  const selectedGenres = Object.keys(genreFilter).filter(key => genreFilter[key]);
  if (!selectedGenres.length) return inputArray;
  inputArray.forEach(game => {
    const gameGenres = game.genres.map(genreObj => genreObj.description);      
    if (selectedGenres.every(genre => gameGenres.includes(genre))) outputArray.push(game);
  });
  
  return outputArray;
};

const filterByOS = (inputArray, osFilter) => {
  const outputArray = [];
  const selectedOS = Object.keys(osFilter).filter(key => osFilter[key]);
  if (!selectedOS.length) return inputArray;
  inputArray.forEach(game => {
    const gameListedOS = Object.keys(game.platforms).filter(key => game.platforms[key])
    if (selectedOS.every(OS => gameListedOS.includes(OS))) outputArray.push(game);
  })
  return outputArray;
};

const filterByName = (inputArray, nameFilter) => {    
  if (!nameFilter) return inputArray;
  const searchName = nameFilter.toLowerCase().trim();
  const outputArray = inputArray.filter(game => {
    const gameName = game.name.toLowerCase();
    return gameName.includes(searchName);
  })
  return outputArray;
};

module.exports = {
  filterGamesListArray
}