// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookMark);

// Save Bookmarks
function saveBookMark(e) {
  // prevent form from submitting
  e.preventDefault();

  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;
  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  let bookmark = { name: siteName, url: siteUrl };

  //   local storage text
  if (localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //   get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set book to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // clear form
    document.getElementById('myForm').reset();
    // re-fresh bookmark
    fetchBookmarks();
  }
}

// Delete bookmark
function deleteBookmark(url) {
  // get bookmarks from the local storage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop through bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // remove from the array
      bookmarks.splice(i, 1);
    }
  }
  // re-set book to localstorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //   re-fresh bookmark
  fetchBookmarks();
}

// fetch bookkmark
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //   get output id
  let bookmarksResults = document.getElementById('bookmarkerResults');
  bookmarksResults.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML += `
          <div class='card card-body bg-light'>
              <h3>${name} <a class="btn btn-outline-secondary" target="_blank" href="${url}">Visit</a>
            <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href='#'>Delete</a></h3>

          </div>
      `;
  }
}

// Valid form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL!');
    return false;
  }
  return true;
}
