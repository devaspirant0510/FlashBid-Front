import React, { FC } from 'react';
import { Column, Row } from '@shared/ui';

type Props = {
    children: React.ReactNode;
    className?: string;
};
const BaseLayout: FC<Props> = ({ children, className }) => {
    return (
        <Row className={className}>
            <Column xxl={3} xl={2} lg={2} md={3} span={0} />
            <Column xxl={18} xl={20} lg={20} md={18} span={24}>
                {children}
            </Column>
            <Column xxl={3} xl={2} lg={2} md={3} span={0} />
        </Row>
    );
};

export default BaseLayout;
