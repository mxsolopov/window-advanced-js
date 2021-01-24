const tabs = (tabItemBoxSelector, tabItemSelector, tabContentSelector, activeSelector, display = 'block') => {

        const tabItemBox = document.querySelector(tabItemBoxSelector),
              tabItem = document.querySelectorAll(tabItemSelector),
              tabContent = document.querySelectorAll(tabContentSelector);
    
        // Скрыть контент табов
        function hideTabContent() {
            tabContent.forEach(item => {
                item.style.display = 'none';
            });

            tabItem.forEach(item => {
                item.classList.remove(activeSelector);
            });
        }
    
        // Показать контент активной табы
        function showTabContent(i = 0) {
            tabContent[i].style.display = display;
            tabItem[i].classList.add(activeSelector);
        }

        // Показ контента первой табы
        hideTabContent();
        showTabContent();

        // Клик на табу
        tabItemBox.addEventListener('click', function (e) {
            let target = e.target;
            if (target && (target.classList.contains(tabItemSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabItemSelector.replace(/\./, "")))) {
                tabItem.forEach( (item, i) =>  {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
};

export default tabs;