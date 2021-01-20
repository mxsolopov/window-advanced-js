const forms = () => {
    // Получение всех форм с инпутами
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    // Сообщения для пользователя
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Валидация полей с телефоном (ввод только цифр)
    phoneInputs.forEach(item => {
        item.addEventListener('input' , () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

    // Функция для отправки запроса на сервер
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    // Очистка инпутов
    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    // Перебор всех форм и отправка данных на сервер
    form.forEach( item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;