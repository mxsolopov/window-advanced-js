// Скрывать все модальные окна
const closeModals = (modals) => {
    
    modals.forEach( item => {
        item.style.display = 'none';
    });

    document.body.style.overflow = '';
};

export default closeModals;