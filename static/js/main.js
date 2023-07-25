(function () {
  const btnOpen = document.getElementById('burger');
  const menu = document.querySelector('.header_nav--burger');
  const btnClose = document.getElementById('close');

  btnOpen.addEventListener('click', () => {
    menu.classList.add('show-menu');
  });

  btnClose.addEventListener('click', () => {
    menu.classList.remove('show-menu');
  });



  const itemLinks = document.querySelectorAll(".contact_content .item_link");
  const contentItems = document.querySelectorAll(".contact_content .content_item");

  itemLinks.forEach((itemLink, index) => {
    itemLink.addEventListener("focus", () => {
      contentItems[index].classList.add("focused");
    });

    itemLink.addEventListener("blur", () => {
      contentItems[index].classList.remove("focused");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const errorMessagesContainer = document.getElementById("errorMessages");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Получаем значения полей формы
      const nameInput = form.elements.name;
      const emailInput = form.elements.email;
      const messageInput = form.elements.message;

      // Проверка на заполненность всех обязательных полей
      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        errorMessagesContainer.innerHTML = "<p>Все поля должны быть заполнены.</p>";
        return;
      }

      // Проверка валидности имени
      const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
      if (!nameRegex.test(nameInput.value)) {
        errorMessagesContainer.innerHTML = "<p>Поле 'Фамилия, имя' должно содержать только буквы.</p>";
        return;
      }

      // Проверка валидности email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        errorMessagesContainer.innerHTML = "<p>Пожалуйста, введите корректный email.</p>";
        return;
      }

      // Все проверки прошли, очищаем контейнер с сообщениями об ошибках
      errorMessagesContainer.innerHTML = "";

      // Преобразуем данные формы в объект FormData
      const formData = new FormData(form);

      fetch('http://127.0.0.1:5000/client', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(data => {
          console.log(data);
          form.reset();
          alert('Данные успешно отправлены на сервер!');
        })
        .catch(error => {
          console.error('Ошибка при отправке данных:', error.message);
        });
    });
  });
})();
