const apiKey = '6137VTA4YKCBEZSV'; // Replace with your stock API key
const apiUrl = 'https://www.alphavantage.co/query';

document.getElementById('getStock').addEventListener('click', async () => {
  const symbol = document.getElementById('stockSymbol').value.trim().toUpperCase();
  if (!symbol) {
    displayData('Please enter a stock symbol!');
    return;
  }

  const url = `${apiUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data['Global Quote'] && data['Global Quote']['01. symbol']) {
      const stockInfo = data['Global Quote'];
      displayData(`
        <h2>${stockInfo['01. symbol']}</h2>
        <p>Price: $${parseFloat(stockInfo['05. price']).toFixed(2)}</p>
        <p>Change: ${stockInfo['09. change']} (${stockInfo['10. change percent']})</p>
        <p>Last Updated: ${stockInfo['07. latest trading day']}</p>
      `);
    } else {
      displayData('Stock data not found. Please check the symbol and try again.');
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    displayData('Error fetching stock data. Please try again later.');
  }
});

function displayData(html) {
  document.getElementById('stockData').innerHTML = html;
}
