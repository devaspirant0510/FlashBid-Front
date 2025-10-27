import React, { FC } from 'react';
import { Header } from '@widgets/ui';
import Footer from '@widgets/ui/Footer.tsx';

type Props = {
    children: React.ReactNode;
};
const AppLayout: FC<Props> = ({ children }) => {
    return (
        <div className={'flex flex-col h-screen'}>
            <Header />
            <div className={'flex-grow overflow-y-auto'}>{children}</div>
            <Footer />
        </div>
    );
};

export default AppLayout;
