import React, { FC, ReactNode } from 'react';

type ColProps = {
    span?: number; // 기본 24분할
    sm?: number;
    md?: number;
    lg?: number;
    children?: ReactNode;
};

const Column: FC<ColProps> = ({ span = 24, sm, md, lg, children }) => {
    // 브라우저 너비에 따라 span 결정
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let currentSpan = span;
    if (windowWidth >= 1024 && lg !== undefined) {
        currentSpan = lg;
    } else if (windowWidth >= 768 && md !== undefined) {
        currentSpan = md;
    } else if (windowWidth >= 640 && sm !== undefined) {
        currentSpan = sm;
    }

    const width = `${(currentSpan / 24) * 100}%`;

    return <div style={{ width, padding: '8px', boxSizing: 'border-box' }}>{children}</div>;
};

export default Column;
