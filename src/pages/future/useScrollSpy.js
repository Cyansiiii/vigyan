import { useState, useEffect } from 'react';

export const useScrollSpy = (ids, offset = 100) => {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observers = [];

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observerOptions = {
            rootMargin: `-${offset}px 0px -40% 0px`,
            threshold: 0,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [ids, offset]);

    return activeId;
};
