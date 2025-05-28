import React from 'react'
import {BrowserRouter, Routes} from "react-router";
import {Route} from "react-router-dom";
import {HomePage} from "@pages/home";
import {RQProvider} from "@app/provider";
import {AuctionList} from "@pages/auction";
import {LiveAuctionPage} from "@pages/auction/realtime";
import LiveAuctionInfoPage from "@pages/auction/realtime/LiveAuctionInfoPage.tsx";

function App() {
    return (
        <RQProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/auction/live" element={<LiveAuctionPage/>}/>
                    <Route path="/auction/live/:id" element={<LiveAuctionInfoPage/>}/>
                    <Route path="/auction/blind" element={<AuctionList/>}/>
                </Routes>
            </BrowserRouter>
        </RQProvider>
    )
}

export default App
