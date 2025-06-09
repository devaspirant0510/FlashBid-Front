import {BrowserRouter, Routes} from "react-router";
import {Route} from "react-router-dom";
import {HomePage} from "@pages/home";
import {RQProvider} from "@app/provider";
import {AuctionList} from "@pages/auction";
import LoginPage from "@pages/login/LoginPage.tsx";
import FeedPage from "@pages/feed/FeedPage.tsx";
import {LiveAuctionInfoPage, LiveAuctionPage} from "@pages/auction/realtime";
import "./global.css"
import FeedInfo from "@pages/feed/component/FeedInfo.tsx";

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
                    <Route path="/FeedInfo/:id" element={<FeedInfo />} />
                </Routes>
            </BrowserRouter>
        </RQProvider>
    )
}

export default App
