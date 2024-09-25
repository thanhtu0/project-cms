import { useEffect } from 'react';

const useActiveLink = (listRef) => {
    useEffect(() => {
        const list = listRef.current;

        const activeLink = (event) => {
            list.forEach((item) => {
                if (item) item.classList.remove('hovered');
            });
            event.currentTarget.classList.add('hovered');
        };

        list.forEach((item) => {
            if (item) {
                item.addEventListener('mouseover', activeLink);
            }
        });

        return () => {
            list.forEach((item) => {
                if (item) {
                    item.removeEventListener('mouseover', activeLink);
                }
            });
        };
    }, [listRef]);
};

export default useActiveLink;
