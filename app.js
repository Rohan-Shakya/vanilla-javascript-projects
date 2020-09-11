const tbody = document.querySelector('tbody');
import { datas } from './datas.js';

let dataHTML = '';

datas.forEach((data) => {
  dataHTML += `
    <tr>
    <td>${data.id}</td>
    <td>${data.title}</td>
    <td><a href=${data.sourceCode}>Code <i class="fab fa-github-square"></i></a></td>
    <td><a href=${data.demo}>Demo <i class="fas fa-external-link-square-alt"></i></a></td>
    </tr>
    `;
});

tbody.innerHTML = dataHTML;
