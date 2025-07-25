
import {BrowserRouter, Routes} from "react-router";
import {Route} from "react-router-dom";
import {HomePage} from "@pages/home";
import {RQProvider} from "@app/provider";
import {AuctionList} from "@pages/auction";
import FeedPage from "@pages/feed/FeedPage.tsx";
import LoginPage from "@pages/login/LoginPage.tsx";
import ProfilePage from "@pages/profile/ProfilePage.tsx";

import {LiveAuctionInfoPage, LiveAuctionPage} from "@pages/auction/realtime";
import {ProductUploadPage} from "@pages/ProductUpload";
import "./global.css"
import FeedInfo from "@pages/feed/component/FeedInfo.tsx";
import RegisterPage from "@/pages/register/RegisterPage";
import AuctionChatPage from "@pages/auction/chat/AuctionChatPage.tsx";
import BlindAuctionPage from "@pages/auction/blind/BlindAuctionPage.tsx";


function App() {
    return (
        <RQProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/auction-list" element={<AuctionList/>}/>
                    <Route path="/community" element={<FeedPage/>}/>
                    <Route path="/Login" element={<LoginPage/>}/>
                    <Route path="/auction/live" element={<LiveAuctionPage/>}/>
                    <Route path="/auction/live/:id" element={<LiveAuctionInfoPage/>}/>
                    <Route path="/auction/blind" element={<AuctionList/>}/>      
                    <Route path="/auction-list" element={<AuctionList/>}/>
                    <Route path={"/blind"} element={<BlindAuctionPage/>}/>
                    <Route path="/Login" element={<LoginPage/>}/>
                    <Route path="/Profile" element={<ProfilePage/>}/>
                    <Route path="/auction/productUpload" element={<ProductUploadPage/>}/>
                    <Route path="/auction/chat/:id" element={<AuctionChatPage/>}/>
                    <Route path="/FeedInfo/:id" element={<FeedInfo />} />
                    <Route path={"/register"} element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </RQProvider>
    )
}

export default App
