//Получаем элементы
const form = document.forms.formOne;
const title = form.elements.title;
const body = form.elements.body;
const button = document.getElementById("btn");

// очищаем (восстанавливаем) поля формы при постановке курсора (отправке)
let placeholderTitle = title.placeholder;
title.addEventListener("focus", function () {
  title.placeholder = "";
});
title.addEventListener("blur", function () {
  title.placeholder = placeholderTitle;
});
let placeholderbody = body.placeholder;
body.addEventListener("focus", function () {
  body.placeholder = "";
});
body.addEventListener("blur", function () {
  body.placeholder = placeholderbody;
});

//Создаем функцию отправки на сервер
function sendPost() {
  //создаем объект для отправки на сервер
  const postData = {
    title: title.value,
    body: body.value,
  };
  // отправляем на сервер методом fetch с параметрами: method, headers и body
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(postData),
  })
    // получаем данные с сервера
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // создаем разметку html
      let newTitle = document.createElement("h2");
      newTitle.textContent = title.value;
      document.querySelector(".posts").appendChild(newTitle);
      let newBody = document.createElement("p");
      newBody.textContent = body.value;
      document.querySelector(".posts").appendChild(newBody);
      // обнуляем поля формы
      title.value = "";
      body.value = "";
    })
    .catch((error) => console.log(error));
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  sendPost();
});
