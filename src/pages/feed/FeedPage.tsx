import {MainLayout} from "@shared/layout";
import WritePost from "@pages/feed/component/WritePost.tsx";
import FeedList from "@pages/feed/component/FeedList.tsx";

const FeedPage = () => {
    return (
        <MainLayout>
            <div className="min-h-screen w-full bg-[#F7F7F7]">
                <div className="sticky top-0 z-10">
                    <WritePost />
                </div>
                <FeedList />
            </div>
        </MainLayout>
    );
};


export default FeedPage