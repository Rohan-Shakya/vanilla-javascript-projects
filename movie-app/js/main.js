$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let searchText = $('#searchText').val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=3de104bcfced9c8e2bd59b28618897ee&query=${searchText}`
    )
    .then((response) => {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        if (movie.poster_path) {
          output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a class="btn btn-primary" onclick="movieselected('${movie.id}')" href="#">Movie Details</a>
            </div>
          </div>
        `;
          $('#movies').html(output);
        }

        console.log(movies[1].id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function movieselected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=3de104bcfced9c8e2bd59b28618897ee`
    )
    .then((response) => {
      let movie = response.data;
      let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/original/${
                movie.poster_path
              }" class="thumbanil">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${
                  movie.genres[0].name
                }</li>
                <li class="list-group-item"><strong>Released:</strong> ${
                  movie.release_date
                }</li>
                <li class="list-group-item"><strong>Rated:</strong> ${
                  movie.vote_average
                }</li>
                <li class="list-group-item"><strong>Status:</strong> ${
                  movie.status
                }</li>
                <li class="list-group-item"><strong>Tagline:</strong> ${
                  movie.tagline
                }</li>
                <li class="list-group-item"><strong>Budger:</strong> ${movie.budget.toLocaleString()}</li>
                </li>
                <li class="list-group-item"><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</li>
              </ul>
            </div>
          </div>
  
          <div class='row'>
          <div class="well">
                <h3>Overview</h3>
                ${movie.overview}
                <hr>
                <a href="http://www.furious7.com/" class="btn btn-primary">Go To The Homepage</a>
                <a href="index.html" class="btn btn-default">Go Back</a>
          </div>
          </div>
        `;
      $('#movie').html(output);

      console.log(movie);
    })
    .catch((error) => {
      console.log(error);
    });
}
