const filterGamesListArray = (state) => {
  console.log("::Input Length", state.gamesList.length);
  const normalizedGamesList = normalizeData(state.gamesList);
  const filteredByPrice = filterByPrice(normalizedGamesList, state.filters.centPrices, state.defaultValues);
  const filteredByRating = filterByRating(filteredByPrice, state.filters.rating, state.defaultValues);
  const filteredByYear = filterByYear(filteredByRating, state.filters.years, state.defaultValues);
  const filteredByGenre = filterByGenre(filteredByYear, state.filters.genres);
  const filteredByOS = filterByOS(filteredByGenre, state.filters.os);
  const filteredByName = filterByName(filteredByOS, state.filters.name);
  console.log("::Output Length", filteredByName.length);
  return filteredByName;
}

const normalizeData = (inputArray) => {
  const outputArray = [];
  inputArray.forEach(game => {
    if (!game.highlight) game.highlight = { user: 1, isHighlighted: false};
    if (!game.metacritic) game.metacritic = { score: 1 };
    outputArray.push(game);   
  });
  return outputArray
}

const filterByPrice = (inputArray, priceFilter, { PRICEFLOOR, PRICECEILING }) => {
  if (priceFilter[0] === PRICEFLOOR && priceFilter[1] === PRICECEILING) return inputArray;  
  const outputArray = [];
  inputArray.forEach(game => {        
    if (game.price_overview && game.price_overview.final >= priceFilter[0] && game.price_overview.final <= priceFilter[1]) {
      outputArray.push(game)
    }
  });
  return outputArray
};

const filterByRating = (inputArray, ratingFilter, { RATINGFLOOR, RATINGCEILING }) => {
  if (ratingFilter[0] === RATINGFLOOR && ratingFilter[1] === RATINGCEILING) return inputArray;
  const outputArray = [];
  inputArray.forEach(game => {         
    if (game.metacritic.score >= ratingFilter[0] && game.metacritic.score <= ratingFilter[1]) {
      outputArray.push(game)
    }
  });
  return outputArray
};

const filterByYear = (inputArray, yearFilter, { YEARFLOOR, YEARCEILING }) => {
  if (yearFilter[0] === YEARFLOOR && yearFilter[1] === YEARCEILING) return inputArray;
  const outputArray = [];
  inputArray.forEach(game => {
    if (game.release_date && game.release_date.date.slice(-4) >= yearFilter[0] && game.release_date.date.slice(-4) <= yearFilter[1]) {
      outputArray.push(game)
    }
  });
  return outputArray
}; 

const filterByGenre = (inputArray, genreFilter) => {
  const selectedGenres = Object.keys(genreFilter).filter(key => genreFilter[key]);
  if (!selectedGenres.length) return inputArray;  
  const outputArray = [];
  inputArray.forEach(game => {
    if (!game.genres) game.genres = [];
    const gameGenres = game.genres.map(genreObj => {
      if (genreObj) return genreObj.description;
    });    
    if (selectedGenres.every(genre => gameGenres.includes(genre))) outputArray.push(game);
  });
  
  return outputArray;
};

const filterByOS = (inputArray, osFilter) => {
  const selectedOS = Object.keys(osFilter).filter(key => osFilter[key]);
  if (!selectedOS.length) return inputArray;  
  const outputArray = [];
  inputArray.forEach(game => {
    if (!game.platforms) game.platforms = {};
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