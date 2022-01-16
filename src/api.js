export const loadTickers = async (tickersList) => {
  const tickersString = tickersList.join(",");
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickersString}&tsyms=USD`;

  return await fetch(url)
    .then((res) => res.json())
    .then((rawData) =>
      Object.entries(rawData).map(([key, value]) => [key, value.USD])
    )
    .then((data) => Object.fromEntries(data));
};
