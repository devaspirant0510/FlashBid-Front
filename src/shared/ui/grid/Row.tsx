import React, { FC, ReactNode } from 'react';

type RowProps = {
    children: ReactNode;
    className?: string;
};

const Row: FC<RowProps> = ({ children, className }) => {
    return (
        <div className={className} style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {children}
        </div>
    );
};

export default Row;
