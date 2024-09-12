import { useEffect } from 'react';

const useActiveLink = (listRef) => {
    useEffect(() => {
        const list = listRef.current;

        const activeLink = (event) => {
            list.forEach((item) => {
                item.classList.remove('hovered');
            });
            event.currentTarget.classList.add('hovered');
        };

        list.forEach((item) => item.addEventListener('mouseover', activeLink));

        return () => {
            list.forEach((item) => item.removeEventListener('mouseover', activeLink));
        };
    }, [listRef]);
};

export default useActiveLink;
