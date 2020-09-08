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


var PasswordStrength = function(container, progressbar, password){
  this.options = {};
  this.passwordTxt = $(password);
  this.container = container;
  this.progressbar = progressbar;
  this._setStrength();
}
PasswordStrength.prototype._setStrength = function(){
  var self = this;
  this.options.ui = {
    container: this.container,
    showVerdictsInsideProgressBar:true,
    viewports: {
      progress: this.progressbar
    }
  }
  this.passwordTxt.pwstrength(this.options);
}




const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard__key"
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
  // $('.use-keyboard-input').addEventListener("click", function(){
    
  // })
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
