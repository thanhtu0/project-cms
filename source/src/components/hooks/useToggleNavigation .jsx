import { useEffect } from 'react';

const useToggleNavigation = () => {
    useEffect(() => {
        const toggle = document.querySelector('.toggle');
        const navigation = document.querySelector('.navigation');
        const main = document.querySelector('.main');

        if (toggle && navigation && main) {
            const handleToggleClick = () => {
                navigation.classList.toggle('active');
                main.classList.toggle('active');
            };

            toggle.addEventListener('click', handleToggleClick);

            return () => {
                toggle.removeEventListener('click', handleToggleClick);
            };
        }
    }, []);
};

export default useToggleNavigation;
