import React, { FC, ReactNode } from 'react';


type ColProps = {
    span?: number; // default: 12
    children: ReactNode;
};

const Col: FC<ColProps> = ({ span = 24, children }) => {
    const width = `${(span / 24) * 100}%`;

    return (
        <div style={{ width, padding: '8px', boxSizing: 'border-box' }}>
            {children}
        </div>
    );
};

export default Col;