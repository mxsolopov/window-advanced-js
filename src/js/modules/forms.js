import checkNumInputs from './checkNumInputs';
import closeModals from './closeModals';

const forms = (state) => {
    // Получение всех форм с инпутами
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          popup = document.querySelectorAll('[data-modal]');

    // Сообщения для пользователя
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Валидация полей с телефоном (ввод только цифр)
    checkNumInputs('input[name="user_phone"]');

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
            
            // Создание блока для вывода статуса отправки формы
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            // Добавление деталей заказа к отправляемой форме
            if(item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // Отправка данных
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
                    setTimeout(() => {
                        closeModals(popup);
                    }, 7000);
                });
        });
    });
};

export default forms;