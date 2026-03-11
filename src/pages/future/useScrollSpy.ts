import { useState, useEffect } from 'react';

export const useScrollSpy = (ids: string[], offset: number = 100): string => {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observerOptions: IntersectionObserverInit = {
            rootMargin: `-40% 0px -40% 0px`, // Targets the center 20% of the viewport
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
