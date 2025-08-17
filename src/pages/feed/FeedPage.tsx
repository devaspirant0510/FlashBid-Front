import WritePost from "@pages/feed/component/WritePost.tsx";
import FeedList from "@pages/feed/component/FeedList.tsx";
import React,{useState} from "react";
import {Modal} from "@pages/feed/component/Modal.tsx";
import {Header} from "@widgets/ui";

const FeedPage = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Header />
            <div className="min-h-screen w-full bg-[#F7F7F7]">
                <div className="max-w-[800px] mx-auto px-4">
                    <div className="sticky top-0 z-10">
                        <WritePost onClick={() => setOpenModal(true)} />
                    </div>
                    <FeedList />
                </div>
            </div>
            {openModal && <Modal onClose={() => setOpenModal(false)} />}
        </>
    );
};


export default FeedPage