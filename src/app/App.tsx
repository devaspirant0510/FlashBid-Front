import "./global.css"
import React, {Suspense} from 'react';

import {BrowserRouter, Routes} from "react-router";
import {Route} from "react-router-dom";
import {RQProvider} from "@app/provider";
import {LoadingPage} from "@pages/common";
import BlindAuctionInfoPage from "@pages/auction/blind/BlindAuctionInfoPage.tsx";


const HomePage = React.lazy(() => import("@pages/home/HomePage.tsx"));
const FeedPage = React.lazy(() => import("@pages/feed/FeedPage.tsx"));
const LoginPage = React.lazy(() => import("@pages/login/LoginPage.tsx"));
const ProfilePage = React.lazy(() => import("@pages/profile/ProfilePage.tsx"));
const LiveAuctionPage = React.lazy(() => import("@pages/auction/realtime/LiveAuctionPage.tsx"));
const LiveAuctionInfoPage = React.lazy(() => import("@pages/auction/realtime/LiveAuctionInfoPage.tsx"));
const ProductUploadPage = React.lazy(() => import("@pages/ProductUpload/ProductUploadPage.tsx"));
const FeedInfo = React.lazy(() => import("@pages/feed/component/FeedInfo.tsx"));
const RegisterPage = React.lazy(() => import("@pages/register/RegisterPage.tsx"));
const AuctionChatPage = React.lazy(() => import("@pages/auction/chat/AuctionChatPage.tsx"));
const BlindAuctionPage = React.lazy(() => import("@pages/auction/blind/BlindAuctionPage.tsx"));
const LiveAuctionBidHistoryPage = React.lazy(() => import("@pages/auction/realtime/LiveAuctionBidHistoryPage.tsx"));
const RegisterSnsPage = React.lazy(() => import("@pages/register/RegisterSnsPage.tsx"));
const AdminHomePage = React.lazy(() => import("@pages/admin/home/AdminHomePage.tsx"));
const BlindAuctionChatPage = React.lazy(() => import("@pages/auction/chat/BlindAuctionChatPage.tsx"));


function App() {
    return (
        <RQProvider>
            <BrowserRouter>
                <Suspense fallback={<LoadingPage/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/community" element={<FeedPage/>}/>
                        <Route path="/Login" element={<LoginPage/>}/>
                        <Route path="/auction/live" element={<LiveAuctionPage/>}/>
                        <Route path="/auction/live/:id" element={<LiveAuctionInfoPage/>}/>
                        <Route path="/auction/blind" element={<BlindAuctionPage/>}/>
                        <Route path="/auction/blind/:id" element={<BlindAuctionInfoPage/>}/>
                        <Route path="/Login" element={<LoginPage/>}/>

                        <Route path="/Profile" element={<ProfilePage/>}/>
                        <Route path="/auction/productUpload" element={<ProductUploadPage/>}/>
                        <Route path="/auction/chat/:id" element={<AuctionChatPage/>}/>
                        <Route path="/auction/blind/chat/:id" element={<BlindAuctionChatPage/>}/>
                        <Route path="/FeedInfo/:id" element={<FeedInfo/>}/>
                        <Route path={"/register"} element={<RegisterPage/>}/>
                        <Route path={"/register/sns"} element={<RegisterSnsPage/>}/>
                        <Route path={"/auction/live/:id/bid-history"} element={<LiveAuctionBidHistoryPage/>}/>
                        <Route path={"/admin/home"} element={<AdminHomePage/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </RQProvider>
    )
}

export default App
