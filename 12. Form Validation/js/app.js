const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  // get the values from the inputs
  const usernameValues = username.value.trim();
  const emailValues = email.value.trim();
  const passwordValues = password.value.trim();
  const password2Values = password2.value.trim();

  // username
  if (usernameValues === '') {
    //   show error
    // add error class
    setErrorFor(username, 'Username cannot be blank');
  } else if (!isUsername(usernameValues)) {
    setErrorFor(password, 'Username is not valid');
  } else {
    //   add success class
    setSuccessFor(username);
  }

  // password
  if (passwordValues === '') {
    setErrorFor(password, 'Password cannot be blank');
  } else if (!isPassword(passwordValues)) {
    setErrorFor(password, 'Password is not valid');
  } else {
    setSuccessFor(password);
  }

  // password2
  if (password2Values === '') {
    setErrorFor(password2, 'Password2 cannot be blank');
  } else if (passwordValues !== password2Values) {
    setErrorFor(password2, 'Password is not match');
  } else {
    setSuccessFor(password2);
  }

  // email
  if (emailValues === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValues)) {
    setErrorFor(email, 'Email is not valid');
  } else {
    setSuccessFor(email);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.children[4];
  console.log(small);
  // add error message inside small
  small.innerText = message;
  //   add error class
  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
function isEmail(email) {
  return /^([a-z\d\.-]+)@([a-z\d-]+)?\.?([a-z]{2,8})\.([a-z]{2,8})?$/.test(
    email
  );
}
function isUsername(username) {
  return /^[a-z\d]{5,12}$/i.test(username);
}
function isPassword(password) {
  return /^[\w@_]{8,20}$/.test(password);
}
