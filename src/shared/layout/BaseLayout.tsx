import React, { FC } from 'react';
import { Column, Row } from '@shared/ui';

type Props = {
    children: React.ReactNode;
    className?: string;
};
const BaseLayout: FC<Props> = ({ children, className }) => {
    return (
        <Row className={className}>
            <Column lg={2} md={1} span={0} />
            <Column lg={20} md={22} span={24}>
                {children}
            </Column>
            <Column lg={2} md={1} span={0} />
        </Row>
    );
};

export default BaseLayout;
