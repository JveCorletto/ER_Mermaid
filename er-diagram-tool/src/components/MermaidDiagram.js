import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart }) => {
    const ref = useRef(null);

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false });

        if (ref.current && chart) {
            mermaid.render('mermaidDiagram', chart, (svgCode) => {
                if (ref.current) {
                    ref.current.innerHTML = svgCode;
                }
            });
        }
    }, [chart]);

    return <div ref={ref}></div>;
};

export default MermaidDiagram;