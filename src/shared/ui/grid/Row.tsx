import React, { FC, ReactNode } from 'react';

type RowProps = {
    children: ReactNode;
};

const Row: FC<RowProps> = ({ children }) => {
    return <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{children}</div>;
};

export default Row;
