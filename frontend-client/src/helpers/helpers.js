const priceFormat = centPrice => `$${(centPrice / 100).toFixed(2)}`;

module.exports = {priceFormat}