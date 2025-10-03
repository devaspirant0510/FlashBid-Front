export function parseJwtPayload(token) {
    if (!token) {
        return null;
    }

    try {
        const base64Url = token.split('.')[1]; // JWT의 두 번째 부분(페이로드) 선택
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL 인코딩을 일반 Base64로 변환
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''),
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('토큰 파싱 오류:', error);
        return null;
    }
}
