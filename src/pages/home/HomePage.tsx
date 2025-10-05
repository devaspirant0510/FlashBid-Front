import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@shared/components/ui/button.tsx';
import { Car } from 'lucide-react';
import { Card } from '@shared/components/ui/card.tsx';
import { Link } from 'react-router';
import { MainLayout } from '@shared/layout';
import AuthUser from '@/features/user/ui/AuthUser.tsx';
import HotAuctionList from '@/features/main/ui/HotAuctionList.tsx';
import { Row } from '@shared/ui';
import Col from '@shared/ui/grid/Column.tsx';
import React from 'react';
import HotFeedList from '@/features/feed/ui/HotFeedList.tsx';

type TodoItem = {
    userId: number;
    id: number;
    title: string;
    completed: false;
};
const HomePage = () => {
    return (
        <div>
            <MainLayout isBanner={true}>
                <HotAuctionList />
            </MainLayout>
            <img className={'my-20'} src={'/img/eventbanner.png'} />
            <Row>
                <Col span={2} />
                <Col span={20}>
                    <HotFeedList />
                </Col>
                <Col span={2} />
            </Row>
        </div>
    );
};
export default HomePage;
