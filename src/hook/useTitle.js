import { useEffect } from 'react';

export default function useTitle(text, defaultText = "объяви.site") {
    useEffect(() => {
        document.title = text ?? defaultText;

        return () => {
            document.title = defaultText;
        }
    }, []);
}

export function useTitleWithDeps({ text, defaultText = "объяви.site", deps = [] }) {
    useEffect(() => {
        document.title = text ?? defaultText;

        return () => {
            document.title = defaultText;
        }
    }, deps);
}