import calcScroll from './calcScroll';

const images = () => {

    // Создание блока модального изображения
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        // Создание модального изображения
        bigImage = document.createElement('img'),
        scroll = calcScroll();

    // Стилизация и добавление в вёрстку модального изображения
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);
    imgPopup.appendChild(bigImage);
    imgPopup.style.cssText = `
        display: none;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `;
    bigImage.style.cssText = `
        max-height: 90vh;
    `;

    // Клик по миниатюре изображения
    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        // Открытие изображения в полном размере
        if (target && target.classList.contains('preview')) {

            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }

        // Закрытие изображения при клике на подложку
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
    });
};

export default images;