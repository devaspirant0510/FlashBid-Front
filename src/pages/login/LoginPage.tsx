import { MainLayout } from "@shared/layout";
import { Link } from "react-router";
import {AuthLoginButton, KakaoLoginButton} from "@/features/login/ui";

function LoginPage() {
    return (
        <MainLayout>
            <div className="px-[110px] py-10 text-center text-[#f26522]">
                {/* LOGIN 타이틀 */}
                <h2 className="text-2xl mb-5">LOGIN</h2>

                {/* 로그인 폼 */}
                <div className="max-w-[400px] mx-auto border-t border-[#f26522] pt-8">
                    <input
                        type="email"
                        placeholder="아이디"
                        className="w-full box-border p-2.5 mb-2.5 border border-[#F5BC94] rounded text-[#f26522]"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="w-full box-border p-2.5 mb-2.5 border border-[#F5BC94] rounded text-[#f26522]"
                    />

                    <div className="flex justify-between text-xs text-[#F5BC94] mb-5">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-1.5" />
                            이메일 저장
                        </label>
                        <div>
                            <Link to="/find-email" className="text-[#F5BC94] no-underline">이메일 찾기</Link>
                            <span className="mx-1">|</span>
                            <Link to="/find-password" className="text-[#F5BC94] no-underline">비밀번호 찾기</Link>
                        </div>
                    </div>

                    <button
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            backgroundColor: '#F5BC94',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                        }}
                    >
                        로그인
                    </button>
                    <button
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            backgroundColor: 'white',
                            color: '#F5BC94',
                            border: '1px solid #F5BC94',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                        }}
                    >
                        회원가입
                    </button>

                    {/* 소셜 로그인 */}
                    <div className="mt-10">
                        <div className="flex items-center mb-5">
                            <div className="flex-1 h-px bg-[#f26522]"></div>
                            <span className="px-2 text-[#f26522] text-sm">소셜 로그인</span>
                            <div className="flex-1 h-px bg-[#f26522]"></div>
                        </div>

                        <div className="flex justify-center gap-2.5">
                            <AuthLoginButton auth={"kakao"}/>
                            <AuthLoginButton auth={'google'}/>
                            <img src={"/img/apple_logo.png"} className={"rounded-full w-12 h-12"} alt={"애플 로그인"}/>
                            <AuthLoginButton auth={'naver'}/>
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <footer className="mt-20 bg-[#444] text-white p-10">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="leading-relaxed text-sm">
                            <strong>Unknown Auction</strong>
                            <br />
                            <Link to="/company" className="text-white mr-2.5 no-underline">회사소개</Link>
                            <Link to="/terms" className="text-white mr-2.5 no-underline">이용약관</Link>
                            <Link to="/privacy" className="text-white no-underline">개인정보처리방침</Link>
                            <br /><br />
                            상품명 : (주)Unknown Auction
                            <br />
                            대표이사 : OOO
                            <br />
                            Tel: 010-0000-0000 | Fax: 02-000-0000
                            <br />
                            사업자 등록번호 : 000-00-000000
                        </div>
                        <div className="flex gap-2.5 mt-5">
                            {/* 아이콘/이미지 공간 비움 */}
                        </div>
                    </div>
                </footer>
            </div>
        </MainLayout>
    );
}

export default LoginPage;
