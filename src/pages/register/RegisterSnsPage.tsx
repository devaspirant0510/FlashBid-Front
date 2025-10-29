import React, { useCallback, useState } from 'react';
// Navigate는 사용되지 않아서 제거했어!
// import { Navigate } from "react-router";
import { MainLayout } from '@shared/layout';
import { Input } from '@shared/components/ui/input.tsx';
import { Checkbox } from '@shared/components/ui/checkbox.tsx';
import { Button } from '@shared/components/ui/button.tsx';
import { axiosClient } from '@shared/lib';

const RegisterSnsPage = () => {
    const uuid = window.history.state?.usr?.uuid;
    const [nickname, setNickname] = useState('');
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeInfo, setAgreeInfo] = useState(false);
    const [agreeAge, setAgreeAge] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);

    const handleAllCheck = () => {
        const newValue = !agreeAll;
        setAgreeAll(newValue);
        setAgreeInfo(newValue);
        setAgreeAge(newValue);
        setAgreeMarketing(newValue);
    };

    // 개별 체크박스 클릭 시 '전체 동의' 상태 변경하는 로직 추가!
    const handleSingleCheck = () => {
        if (agreeInfo && agreeAge && agreeMarketing) {
            setAgreeAll(true);
        } else {
            setAgreeAll(false);
        }
    };

    // 각 체크박스 상태 변경 함수를 만들어서 useEffect 대신 사용하면 더 깔끔해!
    const onAgreeInfoChange = (checked: boolean) => {
        setAgreeInfo(checked);
        handleSingleCheck();
    };
    const onAgreeAgeChange = (checked: boolean) => {
        setAgreeAge(checked);
        handleSingleCheck();
    };
    const onAgreeMarketingChange = (checked: boolean) => {
        setAgreeMarketing(checked);
        handleSingleCheck();
    };

    // useCallback 으로 변경
    const handleSubmit = useCallback(async () => {
        if (!nickname.trim()) {
            // 닉네임 비어있는지 체크
            alert('닉네임을 입력해주세요!');
            return;
        }
        if (!agreeInfo || !agreeAge) {
            alert('필수 약관에 동의해야 합니다!');
            return;
        }
        const result = await axiosClient.post('/auth/register/oauth', {
            nickname: nickname,
            uid: uuid,
        });
        if (result.status === 200 || result.status === 201) {
            // 회원가입 성공
            alert('회원가입이 완료되었습니다!');
            window.location.href = '/login'; // 로그인 페이지로 이동
        } else {
            // 회원가입 실패
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }, [nickname, agreeAll]);

    return (
        <MainLayout>
            <div className='max-w-full mx-auto p-8 bg-white mt-10'>
                <h2 className='text-2xl font-bold text-stone-800 mb-2'>소셜 계정 로그인</h2>
                <p className='text-sm text-gray-500'>로그인에 필요한 정보를 정확히 입력해주세요.</p>

                <div className='border-t border-gray-300 my-6'></div>

                <div className='mb-6'>
                    <label htmlFor='nickname' className='block text-gray-800 mb-2 font-semibold'>
                        닉네임
                    </label>
                    <Input
                        id='nickname'
                        placeholder='닉네임'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className='py-6'
                    />
                </div>

                <div className='border-t border-gray-300 my-8'></div>

                <div>
                    <h3 className='text-xl text-stone-800 font-bold mb-4'>이용약관</h3>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-3'>
                            <Checkbox
                                id='agreeAll'
                                checked={agreeAll}
                                onCheckedChange={handleAllCheck}
                                className='rounded-full'
                            />
                            <label htmlFor='agreeAll' className='font-bold text-gray-700'>
                                이용약관 모두 동의 (필수)
                            </label>
                        </div>
                        <div className='flex items-center gap-3 ml-2'>
                            <Checkbox
                                id='agreeInfo'
                                checked={agreeInfo}
                                onCheckedChange={onAgreeInfoChange}
                                className='rounded-full'
                            />
                            <label htmlFor='agreeInfo' className='text-gray-600'>
                                개인정보 수집 및 이용동의 (필수)
                            </label>
                        </div>
                        <div className='flex flex-col ml-2'>
                            <div className='flex items-center gap-3'>
                                <Checkbox
                                    id='agreeAge'
                                    checked={agreeAge}
                                    onCheckedChange={onAgreeAgeChange}
                                    className='rounded-full'
                                />
                                <label htmlFor='agreeAge' className='text-gray-600'>
                                    연령(만 14세 이상) 확인 (필수)
                                </label>
                            </div>
                            <p className='text-xs text-red-500 ml-9 mt-1'>
                                만 14세 미만의 아동의 계정 생성은 보호자의 승인필요
                            </p>
                        </div>
                        <div className='flex items-center gap-3 ml-2'>
                            <Checkbox
                                id='agreeMarketing'
                                checked={agreeMarketing}
                                onCheckedChange={onAgreeMarketingChange}
                                className='rounded-full'
                            />
                            <label htmlFor='agreeMarketing' className='text-gray-600'>
                                서비스 홍보 및 마케팅 목적의 개인정보 수집 및 이용동의 (선택)
                            </label>
                        </div>
                    </div>
                </div>

                <Button
                    className='w-full mt-10 bg-uprimary hover:bg-orange-600 text-white font-bold py-6 text-lg'
                    onClick={handleSubmit}
                >
                    로그인하기
                </Button>
            </div>
        </MainLayout>
    );
};

export default RegisterSnsPage;
