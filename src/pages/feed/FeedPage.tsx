import WritePost from '@pages/feed/component/WritePost.tsx';
import FeedList from '@pages/feed/component/FeedList.tsx';
import React, { useState } from 'react';
import { Modal } from '@pages/feed/component/Modal.tsx';
import { Header } from '@widgets/ui';
import { AppLayout, BaseLayout } from '@shared/layout';

const FeedPage = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <AppLayout>
            <BaseLayout>
                <div className=' top-0 z-10 '>
                    <WritePost onClick={() => setOpenModal(true)} />
                </div>
                <FeedList />
            </BaseLayout>
            {openModal && <Modal onClose={() => setOpenModal(false)} />}
        </AppLayout>
    );
};

export default FeedPage;
