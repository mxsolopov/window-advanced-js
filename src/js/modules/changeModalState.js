import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {

    // Поля деталей оформления заказа
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox'),
        calcButton = document.querySelectorAll('[data-calc-button]');

    // Валидация инпутов с численными значениями
    checkNumInputs('#width');
    checkNumInputs('#height');
    
    // Функция записывает в объект modalState выбранные параметры расчёта
    function bindActionToElem(elem, event, prop) {

        elem.forEach((item, i) => {

            // Значения по умолчанию
            if (item.nodeName == 'SPAN') {
                state[prop] = 0;
            } else if (item.nodeName == 'SELECT') {
                state[prop] = item.value;
            }

            // Отсеживать ввод данных
            item.addEventListener(event, () => {
                // В зависимости от типа поля записываются соответствующие данные
                switch (item.nodeName) {
                    // Форма окна - номер изображения
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    // Чекбокс - профиль окна, инпут - размеры
                    case 'INPUT': 
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0  ? state[prop] = "Холодное" : state[prop] = "Тёплое";
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                    // Валидация второго этапа расчёта
                                    calcButton[1].removeAttribute("disabled");
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    // Тип остекления
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                // Валидация первого этапа расчёта
                if (windowWidth[0].value !== '' && windowHeight[0].value !== '') {
                    calcButton[0].removeAttribute("disabled");
                }
            });
        });
    }

    // Обработка всех полей с данными расчёта
    bindActionToElem(windowForm, 'click', 'form');
    bindActionToElem(windowWidth, 'input', 'width');
    bindActionToElem(windowHeight, 'input', 'height');
    bindActionToElem(windowType, 'change', 'type');
    bindActionToElem(windowProfile, 'change', 'profile');
};

export default changeModalState;