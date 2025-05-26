import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router";


const Header = () => {
    const [query, setQuery] = useState("");
    const handleSearch = () => {
        if (query.trim() !== "") {
            console.log("검색어:", query);
            // window.location.href = `/search?q=${query}`; // 검색 이동 로직 (선택)
        }
    };
    return (
        <>
            <div className={'rounded-br-[120px] border border-[#eeeee] shadow-sm'}>
                <div className={"flex justify-end gap-3 px-8 py-1 text-xs "}>
                    <Link to="/help" style={{textDecoration: 'none', color: '#666'}}>고객센터</Link>
                    <span style={{color: '#666'}}>|</span>
                    <a href="/signup" style={{textDecoration: 'none', color: '#666'}}>회원가입</a>
                    <span style={{color: '#666'}}>|</span>
                    <a href="/login" style={{textDecoration: 'none', color: '#666'}}>로그인</a>
                </div>

                {/* 메인 헤더 */}
                <header style={{
                    padding: '10px 110px 20px',  // ← 좌우 padding 110px
                }}>
                    {/* 로고 */}
                    <div style={{fontSize: '24px', fontWeight: 'bold'}}>
                        <img src={"/img/logo.svg"} alt="" style={{height: '60px'}}/>
                    </div>

                    {/* AUCTION 아래 메뉴들 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        {/* 네비게이션 */}
                        <nav>
                            <ul style={{
                                display: 'flex',
                                gap: '20px',
                                listStyle: 'none',
                                margin: 0,
                                padding: 0,
                                alignItems: 'center'
                            }}>
                                <li>
                                    <FontAwesomeIcon icon={faBars} style={{color: '#f26522', fontSize: '18px'}}/>
                                </li>
                                <li><a href="/brind" style={{color: '#f26522', textDecoration: 'none'}}>블라인드 경매</a></li>
                                <li><a href="/live" style={{color: '#f26522', textDecoration: 'none'}}>실시간 경매</a></li>
                                <li><a href="/community" style={{color: '#f26522', textDecoration: 'none'}}>커뮤니티</a>
                                </li>
                                <li><a href="/sell" style={{color: '#f26522', textDecoration: 'none'}}>상품판매</a></li>
                            </ul>
                        </nav>

                        {/* 검색 박스 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '2px solid #f26522',
                            paddingBottom: '5px',
                            width: '400px',
                            marginLeft: 'auto'
                        }}>
                            <input
                                type="text"
                                placeholder="검색어를 입력해주세요"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '14px',
                                    padding: '5px 0',
                                    backgroundColor: 'transparent',
                                    color: '#333'
                                }}
                            />
                            <span
                                onClick={handleSearch}
                                style={{
                                    color: '#f26522',
                                    fontSize: '18px',
                                    marginLeft: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </span>
                        </div>

                        {/* 아이콘들 */}
                        <div style={{display: 'flex', gap: '70px', alignItems: 'center', marginLeft: '70px'}}>
                            <a href="/cart">
                                <img src={"/img/point.svg"} alt="" style={{height: '20px'}}/>
                            </a>
                            <a href="/mypage">
                                <img src={"/img/notification.svg"} alt="" style={{height: '20px'}}/>
                            </a>
                            <a href="/search">
                                <img src={"/img/user.svg"} alt="" style={{height: '20px'}}/>
                            </a>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )

}
export default Header;