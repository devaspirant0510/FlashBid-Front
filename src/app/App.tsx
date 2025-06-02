import {BrowserRouter, Routes} from "react-router";
import {Route} from "react-router-dom";
import {HomePage} from "@pages/home";
import {RQProvider} from "@app/provider";
import {AuctionList} from "@pages/auction";
import LoginPage from "@pages/login/LoginPage.tsx";
import ProfilePage from "@pages/profile/ProfilePage.tsx";


function App() {
    return (
        <RQProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProfilePage/>}/>
                    <Route path="/auction-list" element={<AuctionList/>}/>
                    <Route path="/Login" element={<LoginPage/>}/>
                    <Route path="/Profile" element={<ProfilePage/>}/>
                </Routes>
            </BrowserRouter>
        </RQProvider>
    )
}

export default App
