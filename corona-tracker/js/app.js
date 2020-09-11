// ####### LOAD AFTER WINDOW
window.onload = function () {
  getCovidStats();
};
function getCovidStats() {
  fetch('https://api.covid19api.com/summary')
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      const nepal = data.Countries[118];
      const countryName = nepal.Country;
      const update = nepal.Date.slice(0, 10);
      const confirmedCases = nepal.TotalConfirmed;
      const deaths = nepal.TotalDeaths;
      const recovered = nepal.TotalRecovered;

      document.getElementById('country').innerHTML = countryName;
      document.getElementById('update').innerHTML = update;
      document.getElementById(
        'cases'
      ).innerHTML = confirmedCases.toLocaleString('en');
      document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
      document.getElementById('recovered').innerHTML = recovered.toLocaleString(
        'en'
      );
      document.getElementById('percent').innerHTML =
        ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString('en', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + '%';
    })
    .catch(function () {
      console.log('error');
    });
  setTimeout(getCovidStats, 43200000); // update every 12 hours
}
