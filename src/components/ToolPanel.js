import React, { useEffect, useRef, useState } from 'react';

export default function ToolPanel({ children }) {
    const toolPanel = useRef(null);
    const [justifyStyle, setJustifyStyle] = useState({});

    const checkOverflow = () => {
        if (toolPanel.current && toolPanel.current.scrollWidth <= toolPanel.current.clientWidth) {
            if (justifyStyle.justifyContent !== "center") {
                setJustifyStyle({justifyContent: "center"});
            }
        } else {
            if (justifyStyle.justifyContent !== "flex-start") {
                setJustifyStyle({justifyContent: "flex-start"});
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(checkOverflow, 500);
        return () => {
            clearInterval(intervalId);
        };
    }, [toolPanel]);
    
    return (
        <div ref={toolPanel} className="tool-panel" style={justifyStyle}>
            {children}
        </div>
    )
}
