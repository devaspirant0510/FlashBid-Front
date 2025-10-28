import React, { FC } from 'react';
import { Header } from '@widgets/ui';
import Footer from '@widgets/ui/Footer.tsx';

type Props = {
    children: React.ReactNode;
    headerClassName?: string;
    className?: string;
};
const AppLayout: FC<Props> = ({ children, headerClassName, className }) => {
    return (
        <div className={'flex flex-col h-screen'}>
            <div className='relative z-20'>
                <Header className={headerClassName} />
            </div>
            <div className={`flex-grow overflow-y-auto ${className}`}>{children}</div>
            <Footer />
        </div>
    );
};

export default AppLayout;
