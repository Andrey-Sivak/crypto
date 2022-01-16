const tickerHandlers = new Map();

const loadTickers = () => {
  if (!tickerHandlers.size) return;

  const tickersString = [...tickerHandlers.keys()].join(",");
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickersString}&tsyms=USD`;

  fetch(url)
    .then((res) => res.json())
    .then((rawData) =>
      Object.entries(rawData).map(([key, value]) => [key, value.USD])
    )
    .then((data) => {
      data.forEach(([name, price]) => {
        const handlers = tickerHandlers.get(name) || [];

        handlers.forEach((fn) => fn(price));
      });
    });
};

// console.log(loadTickers() || '');

setInterval(loadTickers, 3000);

export const subscribeToUpdate = (ticker, cb) => {
  const subscribers = tickerHandlers.get(ticker) || [];
  tickerHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeToUpdate = (ticker) => {
  tickerHandlers.delete(ticker);
};

window.tickers = tickerHandlers;
