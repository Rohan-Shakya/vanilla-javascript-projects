document.addEventListener('DOMContentLoaded', () => {
    const searchUser = document.querySelector('#searchUser');
    const profile = document.querySelector('#profile');
    const repos_data = document.querySelector('#repos-list');
    const client_id = 'cfe14376beeb32d76ddc';
    const client_secret = '022eead02867ef920d6ef750cd6725e563676b96';
    searchUser.addEventListener('keyup', (e) => {
      let userName = e.target.value;
  
      // make request to github
      const fetchUsers = async (user) => {
        const fetching = await fetch(
          `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}&sort: 'created=asc&per-page=5`
        );
        const data = await fetching.json();
  
        profile.innerHTML = `
        <div class="profile-details">
        <div class="heading">${data.name}</div>
        <div class="details">
          <div class="user-img">
            <img
              src="${data.avatar_url}"
              alt=""
            />
            <a target="_blank" class="btn-block" href="${data.html_url}">View Profile</a>
          </div>
          <div class="user-detail">
            <div class="badge">
              <span>Public Repos: ${data.public_repos}</span>
              <span>Public Gists: ${data.public_gists}</span>
              <span>Followers: ${data.followers}</span>
              <span>Following: ${data.following}</span>
            </div>
            <ul class="list-group">
              <li class="list">Company: ${data.company}</li>
              <li class="list">
                Website/blog:
                <a href="${data.blog}" target="_blank">${data.blog}</a>
              </li>
              <li class="list">Location: ${data.location}</li>
              <li class="list">Member Since: ${data.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
        `;
        const api_call = await fetch(
          `https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}&sort=created:asc&per-page=5`
        );
        const repos = await api_call.json();
        for (let i = 0; i < repos.length; i++) {
          repos_data.innerHTML = `
          <div class="repo-desc">
          <div class="repo-title">
            ${repos[i].name} :
            <span>${repos[i].desc}</span>
          </div>
  
          <div class="repo-detail">
            <div class="badge">
              <span>Forks: ${repos[i].forks_count}</span>
              <span>Watchers: ${repos[i].watchers_count}</span>
              <span>Stars: ${repos[i].stargazers_count}</span>
            </div>
            <a href="${repos[i].html_url}" target="_blank" class="#visit-repo">Repo Page</a>
          </div>
        </div>
          `;
        }
      };
      fetchUsers(userName);
    });
  });
  