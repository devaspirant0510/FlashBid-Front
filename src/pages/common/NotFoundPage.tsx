import React, { useMemo } from 'react'; // 1. useMemo 임포트!
import { Link } from 'react-router-dom'; // 2. <a> 대신 <Link> 임포트!
import { AppLayout } from '@shared/layout';

const NotFoundPage: React.FC = () => {
    const images = ['/img/404_1.png', '/img/404_2.png', '/img/404_3.png'];

    // 3. useMemo로 이미지 한번만 고르기! (페이지 리렌더링 돼도 이미지 안 바뀌게!)
    const randomImage = useMemo(() => {
        return images[Math.floor(Math.random() * images.length)];
    }, []); // 빈 배열 필수!

    return (
        // 4. AppLayout으로 감싸서 헤더/푸터 일관성 유지!
        <AppLayout>
            {/* flex-grow: AppLayout의 헤더/푸터 제외한 나머지 공간 꽉 채우기
              min-h-[60vh]: 혹시 모르니 최소 높이 확보해서 수직 중앙 정렬 느낌 주기
            */}
            <div className='flex flex-grow flex-col items-center justify-center min-h-[60vh] bg-white text-gray-800 p-6 text-center'>
                {/* 5. 스타일 좀 더 갬성있게! */}
                <div className='max-w-md w-full'>
                    <img
                        src={randomImage}
                        alt='404 Not Found'
                        className='w-48 h-48 object-contain mb-6 mx-auto' // 이미지 좀 더 키우고 위로!
                    />

                    <h1 className='text-7xl font-extrabold text-uprimary mb-3'>404</h1>
                    <p className='text-3xl font-bold mb-4'>이런! 페이지를 찾을 수 없어요.</p>
                    <p className='text-lg text-gray-500 mb-10'>
                        요청하신 페이지가 사라졌거나, 주소가 잘못되었을 수 있어요.
                    </p>

                    {/* 6. <a> 대신 <Link> 써서 SPA 경험 살리기 (페이지 새로고침 방지!) */}
                    <Link
                        to='/'
                        className='inline-block px-8 py-3 bg-uprimary text-white rounded-lg font-bold hover:bg-usecondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    >
                        메인으로 돌아가기
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default NotFoundPage;
