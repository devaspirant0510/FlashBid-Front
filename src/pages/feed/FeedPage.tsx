import WritePost from '@pages/feed/component/WritePost.tsx';
import FeedList from '@pages/feed/component/FeedList.tsx';
import React, { useState } from 'react';
import { Modal } from '@pages/feed/component/Modal.tsx';
import { Header } from '@widgets/ui';
import { AppLayout, BaseLayout } from '@shared/layout';
import { Column, Row } from '@shared/ui';

const FeedPage = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <AppLayout>
            <Row>
                <Column md={5} xs={0} />
                <Column md={14} xs={24}>
                    <div className=' top-0 z-10 '>
                        <WritePost onClick={() => setOpenModal(true)} />
                    </div>
                    <FeedList />
                </Column>
                <Column md={5} xs={0} />
            </Row>
            {openModal && <Modal onClose={() => setOpenModal(false)} />}
        </AppLayout>
    );
};

export default FeedPage;
