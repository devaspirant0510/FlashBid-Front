import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MainLayout} from "@shared/layout";
import {axiosClient} from "@shared/lib";

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

    const [emailCheck, setEmailCheck] = useState({checked: false, message: ''});
    const [nicknameCheck, setNicknameCheck] = useState({checked: false, message: ''});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'email' || name === 'domain') {
            setEmailCheck({checked: false, message: ''});
        }
        if (name === 'nickname') {
            setNicknameCheck({checked: false, message: ''});
        }
    };

    const handleCheckEmail = async () => {
        if (!form.email || !form.domain) {
            setEmailCheck({checked: false, message: '이메일을 모두 입력해주세요.'});
            return;
        }
        const fullEmail = `${form.email}@${form.domain}`;
        try {
            const response = await axiosClient.get(`/auth/register/email/check?email=${fullEmail}`);
            const isDuplicate = response.data.data;

            if (isDuplicate) {
                setEmailCheck({checked: false, message: '이미 사용 중인 이메일입니다.'});
            } else {
                setEmailCheck({checked: true, message: '사용 가능한 이메일입니다!'});
            }
        } catch (error) {
            console.error("Email check failed:", error);
            setEmailCheck({checked: false, message: '오류가 발생했습니다. 다시 시도해주세요.'});
        }
    };

    const handleCheckNickname = async () => {
        if (!form.nickname) {
            setNicknameCheck({checked: false, message: '닉네임을 입력해주세요.'});
            return;
        }
        try {
            const response = await axiosClient.get(`/auth/register/nickname/check?nickname=${form.nickname}`);
            const isDuplicate = response.data.data

            if (isDuplicate) {
                setNicknameCheck({checked: false, message: '이미 사용 중인 닉네임입니다.'});
            } else {
                setNicknameCheck({checked: true, message: '멋진 닉네임이네요!'});
            }
        } catch (error) {
            console.error("Nickname check failed:", error);
            setNicknameCheck({checked: false, message: '오류가 발생했습니다. 다시 시도해주세요.'});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailCheck.checked) {
            alert('이메일 중복 확인을 해주세요!');
            return;
        }
        if (!nicknameCheck.checked) {
            alert('닉네임 중복 확인을 해주세요!');
            return;
        }
        console.log('회원가입 정보:', form);
        const result = await axiosClient.post('/auth/register/email', {
                email: `${form.email}@${form.domain}`,
                password: form.password,
                nickname: form.nickname
            }
        )
        if(result.status === 200 || result.status === 201) {
            alert("회원가입이 완료되었습니다!");
            navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
        }
    };

    // --- 👇 스타일 클래스들을 변수로 빼서 관리하면 더 깔끔해! ---
    const inputBaseStyle = "w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-orange-400";
    const labelStyle = "font-semibold text-gray-700";
    const verifyBtnStyle = "bg-orange-200 text-sm font-bold text-gray-800 px-4 py-2 rounded-md hover:bg-orange-300 transition-colors whitespace-nowrap";

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto my-10 p-10 bg-gray-50 text-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-orange-500 mb-5 pb-3 border-b-2 border-orange-500">
                    회원가입
                </h2>
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    {/* 이메일 섹션 */}
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>이메일</label>
                        <div className="flex items-center gap-2">
                            <input type="text" name="email" placeholder="이메일" value={form.email} onChange={handleChange}
                                   className={`${inputBaseStyle} w-1/3`}/>
                            <span className="text-gray-500">@</span>
                            <select name="domain" value={form.domain} onChange={handleChange}
                                    className={`${inputBaseStyle} w-1/3`}>
                                <option value="">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="hotmail.com">hotmail.com</option>
                            </select>
                            <button type="button" className={verifyBtnStyle} onClick={handleCheckEmail}>중복확인</button>
                        </div>
                        {emailCheck.message && (
                            <p className={`text-xs mt-1 ${emailCheck.checked ? 'text-green-600' : 'text-red-600'}`}>
                                {emailCheck.message}
                            </p>
                        )}
                        <input type="text" name="code" placeholder="인증번호 6자리" value={form.code} onChange={handleChange}
                               className={`${inputBaseStyle} max-w-sm mt-2`}/>
                    </div>

                    {/* 비밀번호 섹션 */}
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>비밀번호</label>
                        <input type="password" name="password" placeholder="비밀번호" value={form.password}
                               onChange={handleChange} className={`${inputBaseStyle} max-w-sm`}/>
                        <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={form.confirmPassword}
                               onChange={handleChange} className={`${inputBaseStyle} max-w-sm`}/>
                        <small className="text-xs text-orange-500">8~20자 / 영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합</small>
                    </div>

                    {/* 닉네임 섹션 */}
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>닉네임</label>
                        <div className="flex items-center gap-2 max-w-sm">
                            <input type="text" name="nickname" placeholder="닉네임" value={form.nickname}
                                   onChange={handleChange} className={inputBaseStyle}/>
                            <button type="button" className={verifyBtnStyle} onClick={handleCheckNickname}>중복확인</button>
                        </div>
                        {nicknameCheck.message && (
                            <p className={`text-xs mt-1 ${nicknameCheck.checked ? 'text-green-600' : 'text-red-600'}`}>
                                {nicknameCheck.message}
                            </p>
                        )}
                    </div>

                    {/* 이용약관 섹션 */}
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>이용약관</label>
                        <div className="border-y border-orange-500 py-4 flex flex-col gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="agreeAll" checked={form.agreeAll} onChange={handleChange}
                                       className="w-4 h-4"/> 이용약관 모두 동의 (필수)
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer ml-2">
                                <input type="checkbox" name="agreePrivacy" checked={form.agreePrivacy}
                                       onChange={handleChange} className="w-4 h-4"/> 개인정보 수집 및 이용동의 (필수)
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer ml-2">
                                <input type="checkbox" name="agreeAge" checked={form.agreeAge} onChange={handleChange}
                                       className="w-4 h-4"/> 연령(만 14세 이상) 확인 (필수)
                            </label>
                            <p className="text-xs text-orange-500 ml-8">만 14세 미만의 회원 가입은 법정대리인 동의가 필요합니다</p>
                            <label className="flex items-center gap-2 cursor-pointer ml-2">
                                <input type="checkbox" name="agreeMarketing" checked={form.agreeMarketing}
                                       onChange={handleChange} className="w-4 h-4"/> 서비스 홍보 및 마케팅 목적의 수집 및 이용동의 (선택)
                            </label>
                        </div>
                    </div>

                    <button type="submit"
                            className="mt-6 mx-auto w-40 bg-orange-500 text-white font-bold text-lg py-3 rounded-md hover:bg-orange-600 transition-colors">
                        가입하기
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
