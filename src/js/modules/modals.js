import closeModals from './closeModals';
import calcScroll from './calcScroll';

const modals = () => {

    // Функция показа модальных окон
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = 'true') {

        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              window = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        // Показать окно при клике на триггер
        for (let key of trigger) {
            key.addEventListener('click', (e) => {

                closeModals(window);

                if (e.target) {
                    e.preventDefault();
                }
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        }

        // Скрыть окно при клике на крестик
        close.addEventListener('click', () => {

            closeModals(window);

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;            
        });

        // Скрыть окно при клике на область вне формы
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {

                closeModals(window);

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    }

    // Показать форму спустя заданное время
    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;
        }, time);
    }

    // Открытие модальных форм проекта
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;