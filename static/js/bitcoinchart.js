const labels = [
    'EUR',
    'GBP',
    'USD'
  ];

  console.log(parseInt(eurrate))
const data = {
labels: labels,
datasets: [{
label: 'Code Immersives Bitcoin chart',
backgroundColor: 'rgb(255, 99, 132)',
borderColor: 'rgb(255, 99, 132)',
data: [parseInt(eurrate),parseInt(gbprate),parseInt(usdrate)],
}     ]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
