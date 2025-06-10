import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form, setForm] = useState({
        email: '',
        domain: '',
        code: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        agreeAll: false,
        agreePrivacy: false,
        agreeAge: false,
        agreeMarketing: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('회원가입 정보:', form);
    };

    const containerStyle = {
        maxWidth: '1050px',
        width: '100%',
        margin: '40px auto',
        padding: '50px 40px',
        background: '#f5f5f5',
        color: '#333',
        boxSizing: 'border-box',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: "'Noto Sans KR', sans-serif"
    };

    const titleStyle = {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#f26522',
        marginBottom: '20px',
        borderBottom: '2px solid #f26522',
        paddingBottom: '10px',
        width: '100%'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
    };

    const formGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const emailInputsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const inputStyle = {
        width: '360px',
        padding: '12px',
        fontSize: '14px',
        background: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '6px'
    };

    const smallStyle = {
        fontSize: '12px',
        color: '#f26522'
    };

    const checkboxGroupStyle = {
        borderTop: '1px solid #f26522',
        borderBottom: '1px solid #f26522',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const subtextStyle = {
        fontSize: '12px',
        color: '#f26522',
        marginLeft: '24px'
    };

    const buttonStyle = {
        marginTop: '30px',
        width: '160px',
        alignSelf: 'center',
        backgroundColor: '#f26522',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
    };

    const verifyBtnStyle = {
        backgroundColor: '#ffcfc5',
        border: 'none',
        padding: '10px 16px',
        color: '#333',
        fontWeight: 'bold',
        borderRadius: '6px',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>회원가입</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label>이메일</label>
                    <div style={emailInputsStyle}>
                        <input type="text" name="email" placeholder="이메일" value={form.email} onChange={handleChange}
                               style={{ ...inputStyle, width: '180px', padding: '10px' }} />
                        <span>@</span>
                        <select name="domain" value={form.domain} onChange={handleChange}
                                style={{ ...inputStyle, width: '180px', padding: '10px' }}>
                            <option value="">선택</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                            <option value="hotmail.com">hotmail.com</option>
                        </select>
                        <button type="button" style={verifyBtnStyle}>인증하기</button>
                    </div>
                    <input type="text" name="code" placeholder="인증번호 6자리" value={form.code} onChange={handleChange}
                           style={{ ...inputStyle }} />
                </div>

                <div style={formGroupStyle}>
                    <label>비밀번호</label>
                    <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange}
                           style={inputStyle} />
                    <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={form.confirmPassword} onChange={handleChange}
                           style={inputStyle} />
                    <small style={smallStyle}>8~20자 / 영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합</small>
                </div>

                <div style={formGroupStyle}>
                    <label>닉네임</label>
                    <input type="text" name="nickname" placeholder="닉네임" value={form.nickname} onChange={handleChange}
                           style={inputStyle} />
                </div>

                <div style={formGroupStyle}>
                    <label>이용약관</label>
                    <div style={checkboxGroupStyle}>
                        <label>
                            <input type="checkbox" name="agreeAll" checked={form.agreeAll} onChange={handleChange} /> 이용약관 모두 동의 (필수)
                        </label>
                        <label>
                            <input type="checkbox" name="agreePrivacy" checked={form.agreePrivacy} onChange={handleChange} /> 개인정보 수집 및 이용동의 (필수)
                        </label>
                        <label>
                            <input type="checkbox" name="agreeAge" checked={form.agreeAge} onChange={handleChange} /> 연령(만 14세 이상) 확인 (필수)
                        </label>
                        <p style={subtextStyle}>만 14세 미만의 회원 가입은 법정대리인 동의가 필요합니다</p>
                        <label>
                            <input type="checkbox" name="agreeMarketing" checked={form.agreeMarketing} onChange={handleChange} /> 서비스 홍보 및 마케팅 목적의 수집 및 이용동의 (선택)
                        </label>
                    </div>
                </div>

                <button type="submit" style={buttonStyle}>가입하기</button>
            </form>
        </div>
    );
};

export default RegisterPage;
