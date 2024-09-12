import { useEffect } from 'react';

const useToggleNavigation = () => {
    useEffect(() => {
        const toggle = document.querySelector('.toggle');
        const navigation = document.querySelector('.navigation');
        const main = document.querySelector('.main');
        const content = document.querySelector('.content');

        if (toggle && navigation && main) {
            const handleToggleClick = () => {
                navigation.classList.toggle('active');
                main.classList.toggle('active');
                content.classList.toggle('active');
            };

            toggle.addEventListener('click', handleToggleClick);

            return () => {
                toggle.removeEventListener('click', handleToggleClick);
            };
        }
    }, []);
};

export default useToggleNavigation;
