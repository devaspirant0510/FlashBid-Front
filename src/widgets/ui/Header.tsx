import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router";
import Cookies from "js-cookie";
import {parseJwtPayload} from "@shared/lib/jwtUtils.ts";

const Header = () => {
    const [query, setQuery] = useState("");
    const token = Cookies.get("access_token");
    const [userInfo, setUserInfo] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            setUserInfo({...parseJwtPayload(token)});
        }
    }, [token]);

    const handleSearch = () => {
        if (query.trim() !== "") {
            console.log("검색어:", query);
            // navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className="rounded-br-[120px] border border-[#eee] shadow-sm bg-white">
            {/* 상단 작은 네비 */}
            <div className="flex justify-end gap-3 px-8 py-1 text-xs text-gray-600">
                <Link to="/help" className="hover:text-gray-800">고객센터</Link>
                <span>|</span>
                {!userInfo ? (
                    <>
                        <Link to="/signup" className="hover:text-gray-800">회원가입</Link>
                        <span>|</span>
                        <Link to="/login" className="hover:text-gray-800">로그인</Link>
                    </>
                ) : (
                    <>
                        <Link to="/Profile" className="hover:text-gray-800">
                            {userInfo?.nickname}
                        </Link>
                        <span>|</span>
                        <button
                            onClick={() => {
                                Cookies.remove("access_token");
                                Cookies.remove("refresh_token");
                                navigate("/login");
                            }}
                            className="hover:text-gray-800"
                        >
                            로그아웃
                        </button>
                    </>
                )}
            </div>

            {/* 메인 헤더 */}
            <header className="px-[110px] pt-[10px] pb-[20px]">
                {/* 로고 */}
                <div className="text-2xl font-bold">
                    <Link to="/">
                        <img src="/img/logo.svg" alt="logo" className="h-[45px]"/>
                    </Link>
                </div>

                {/* 메뉴, 검색, 아이콘들 */}
                <div className="flex items-center justify-between mt-2 flex-wrap gap-5 ">
                    {/* 네비게이션 */}
                    <nav className="  text-[#f26522]">
                        <ul className="flex items-center gap-5">
                            <li><FontAwesomeIcon icon={faBars} className="text-[#f26522] text-lg"/></li>
                            <li><Link to="/blind" className="hover:underline">블라인드 경매</Link></li>
                            <li><Link to="/auction/live" className="hover:underline">실시간 경매</Link></li>
                            <li><Link to="/community" className="hover:underline">커뮤니티</Link></li>
                            <li><Link to="/auction/productUpload" className="hover:underline">상품판매</Link></li>
                        </ul>
                    </nav>

                    <div className="lg:bg-red-400 lg:flex-grow w-0  bg-green-400"></div>
                    <div className="flex items-center border-b-2 border-[#f26522] pb-1 flex-grow ml-auto">
                        <input
                            type="text"
                            placeholder="검색어를 입력해주세요"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 py-1"
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 text-[#f26522] text-lg"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>

                    {/* 오른쪽 아이콘들 */}
                    <div className="flex items-center gap-10 ml-4">
                        <Link to="/cart">
                            <img src="/img/point.svg" alt="cart" className="h-5"/>
                        </Link>
                        <Link to="/mypage">
                            <img src="/img/notification.svg" alt="notification" className="h-5"/>
                        </Link>
                        <Link to="/Profile">
                            <img src="/img/user.svg" alt="user" className="h-5"/>
                        </Link>
                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header;
