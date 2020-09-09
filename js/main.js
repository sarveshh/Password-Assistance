const results = document.querySelector("#result");
const UNInum = [48, 57];
const UNIupper = [65, 90];
const UNIlower = [97, 122];
const UNIsym = [33, 47];
const clipboard = document.getElementById('clipboard');

clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = results.innerText;

  if (!password) { return; }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});



document.querySelector("#generate").addEventListener('click', () => {
  const length = document.querySelector("#length").value;
  const upper = document.querySelector("#uppercase").checked;
  const lower = document.querySelector("#lowercase").checked;
  const numbers = document.querySelector("#numbers").checked;
  const symbols = document.querySelector("#symbols").checked;

  const selector = [];
  const password = [];
  //String.fromCharCode();
  if (upper === true) {
    for (let i = UNIupper[0]; i <= UNIupper[1]; i++) {
      selector.push(i);
    }
  }
  if (numbers === true) {
    for (let i = UNInum[0]; i <= UNInum[1]; i++) {
      selector.push(i);
    }
  }
  if (symbols === true) {
    for (let i = UNIsym[0]; i <= UNIsym[1]; i++) {
      selector.push(i);
    }
  }
  if (lower === true) {
    for (let i = UNIlower[0]; i <= UNIlower[1]; i++) {
      selector.push(i);
    }
  }

  for (let i = 0; i < length; i++) {
    password.push(String.fromCharCode(selector[Math.floor(Math.random() * selector.length)]))
  }
  results.textContent = password.join("");
})

function showGenerate() {
  var x = document.getElementById("generateDiv");
  $('#generateDiv').toggle(1000);
}

function _id(name) {
  return document.getElementById(name);
}
function _class(name) {
  return document.getElementsByClassName(name);
}
_class("toggle-password")[0].addEventListener("click", function () {
  _class("toggle-password")[0].classList.toggle("active");
  if (_id("password-field").getAttribute("type") == "password") {
    _id("password-field").setAttribute("type", "text");
  } else {
    _id("password-field").setAttribute("type", "password");
  }
});

_id("password-field").addEventListener("focus", function () {
  _class("password-policies")[0].classList.add("active");
});
_id("password-field").addEventListener("blur", function () {
  _class("password-policies")[0].classList.remove("active");
});


_id("eye-button").addEventListener("click", function () {
  _class("password-policies")[0].classList.add("active");
  _class("password-policies")[0].classList.remove("active");
  _class("password-policies")[0].classList.add("active");
});
// _id("eye").addEventListener("click",function(){
//   _class("password-policies")[0].classList.remove("active");
// });



_id("password-field").addEventListener("keyup", function () {
  let password = _id("password-field").value;

  if (/[A-Z]/.test(password)) {
    _class("policy-uppercase")[0].classList.add("active");
  } else {
    _class("policy-uppercase")[0].classList.remove("active");
  }

  if (/[0-9]/.test(password)) {
    _class("policy-number")[0].classList.add("active");
  } else {
    _class("policy-number")[0].classList.remove("active");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    _class("policy-special")[0].classList.add("active");
  } else {
    _class("policy-special")[0].classList.remove("active");
  }

  if (password.length > 7) {
    _class("policy-length")[0].classList.add("active");
  } else {
    _class("policy-length")[0].classList.remove("active");
  }
});


var PasswordStrength = function (container, progressbar, password) {
  this.options = {};
  this.passwordTxt = $(password);
  this.container = container;
  this.progressbar = progressbar;
  this._setStrength();
}
PasswordStrength.prototype._setStrength = function () {
  var self = this;
  this.options.ui = {
    container: this.container,
    showVerdictsInsideProgressBar: true,
    viewports: {
      progress: this.progressbar
    }
  }
  this.passwordTxt.pwstrength(this.options);
}
