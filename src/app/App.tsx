import {BrowserRouter, Routes} from "react-router";
import {Route} from "react-router-dom";
import {HomePage} from "@pages/home";
import {RQProvider} from "@app/provider";
import {AuctionList} from "@pages/auction";
import LoginPage from "@pages/login/LoginPage.tsx";
import FeedPage from "@pages/feed/FeedPage.tsx";

function App() {
    return (
        <RQProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/auction-list" element={<AuctionList/>}/>
                    <Route path="/community" element={<FeedPage/>}/>
                    <Route path="/Login" element={<LoginPage/>}/>
                </Routes>
            </BrowserRouter>
        </RQProvider>
    )
}

export default App
