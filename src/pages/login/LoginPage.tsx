import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom'; // react-router-dom에서 useNavigate 임포트
import LoginPan from './loginpan';
import {MainLayout} from "@shared/layout";
import {AuthLoginButton} from "@/features/login/ui";
import Cookies from "js-cookie";
import useInput from "@shared/hooks/useInput.ts";
import {axiosClient} from "@shared/lib";


function LoginPage() {
    const [isLoginPanOpen, setIsLoginPanOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 호출
    const [email,onChangeEmail] = useInput({initialValue:''})
    const [password,onChangePassword] = useInput({initialValue:''})

    const handleLoginPanOpen = () => {
        setIsLoginPanOpen(true);
    };

    const handleLoginPanClose = () => {
        setIsLoginPanOpen(false);
    };

    // 회원가입 버튼 클릭시 emailsign 페이지로 이동
    const handleSignUpClick = () => {
        navigate('/register');
    };
    const onClickLogin = useCallback(async ()=>{
        const result = await axiosClient.post('/auth/login', {
            email: email,
            password: password,
        },{
            withCredentials:true
        } as any);
        console.log(result.headers)
        navigate("/",{replace:true} as any)
    },[email,password])

    return (
        <MainLayout>

            <div style={{padding: '40px 110px', textAlign: 'center', color: '#f26522'}}>
                <h2 style={{fontSize: '24px', marginBottom: '20px'}}>LOGIN</h2>

                <div
                    style={{
                        maxWidth: '400px',
                        margin: '0 auto',
                        borderTop: '1px solid #f26522',
                        paddingTop: '30px',
                    }}
                >
                    <input
                        type="email"
                        placeholder="아이디"
                        value={email}
                        onChange={onChangeEmail}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #F5BC94',
                            borderRadius: '4px',
                            color: '#f26522',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={onChangePassword}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #F5BC94',
                            borderRadius: '4px',
                            color: '#f26522',
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#F5BC94',
                            marginBottom: '20px',
                        }}
                    >
                        <label>
                            <input type="checkbox" style={{marginRight: '5px'}}/>
                            이메일 저장
                        </label>
                        <div>
                            <a href="/find-email" style={{textDecoration: 'none', color: '#F5BC94'}}>
                                이메일 찾기
                            </a>
                            <span style={{margin: '0 5px'}}>|</span>
                            <a href="/find-password" style={{textDecoration: 'none', color: '#F5BC94'}}>
                                비밀번호 찾기
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={onClickLogin}
                        style={{
                            width: '100%',
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
                            padding: '10px',
                            backgroundColor: 'white',
                            color: '#F5BC94',
                            border: '1px solid #F5BC94',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                        }}
                        onClick={handleSignUpClick} // 회원가입 클릭시 라우트 이동
                    >
                        회원가입
                    </button>

                    <div style={{marginTop: '40px'}}>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                            <div style={{flex: 1, height: '1px', backgroundColor: '#f26522'}}></div>
                            <span style={{padding: '0 10px', color: '#f26522', fontSize: '14px'}}>
              소셜 로그인
            </span>
                            <div style={{flex: 1, height: '1px', backgroundColor: '#f26522'}}></div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            <AuthLoginButton auth={"kakao"}/>
                            <AuthLoginButton auth={"naver"}/>
                            <AuthLoginButton auth={"google"}/>
                            <AuthLoginButton auth={"apple"}/>
                        </div>
                    </div>
                </div>

                {/* 로그인 모달 */}
                <LoginPan isOpen={isLoginPanOpen} onClose={handleLoginPanClose}/>

                {/* 푸터 */}
                <footer
                    onClick={()=>{
                        Cookies.set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc1MjMxMTg1NiwiZXhwIjoxNzgzODQ3ODU2LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoiMTIzNCIsInJvbGUiOiIxMjM0In0.ZDoQCYyOzOBBRXC4c5bJ78hneZu9uFAki4OnrPzMmxE");
                        window.location.reload();

                    }}
                    style={{
                        marginTop: '80px',
                        backgroundColor: '#444',
                        color: '#fff',
                        padding: '40px 20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <div style={{lineHeight: '1.6', fontSize: '14px'}}>
                            <strong>Unknown Auction</strong>
                            <br/>
                            <a href="/company" style={{color: '#fff', marginRight: '10px', textDecoration: 'none'}}>
                                회사소개
                            </a>
                            <a href="/terms" style={{color: '#fff', marginRight: '10px', textDecoration: 'none'}}>
                                이용약관
                            </a>
                            <a href="/privacy" style={{color: '#fff', textDecoration: 'none'}}>
                                개인정보처리방침
                            </a>
                            <br/>
                            <br/>
                            상품명 : (주)Unknown Auction
                            <br/>
                            대표이사 : OOO
                            <br/>
                            Tel: 010-0000-0000 | Fax: 02-000-0000
                            <br/>
                            사업자 등록번호 : 000-00-000000
                        </div>
                    </div>
                </footer>
            </div>
        </MainLayout>
    );
}

export default LoginPage;
