const checkNumInputs = (selector) => {

    const numInputs = document.querySelectorAll(selector);

    // Валидация полей с телефоном (ввод только цифр)
    numInputs.forEach(item => {
        item.addEventListener('input' , () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

};

export default checkNumInputs;