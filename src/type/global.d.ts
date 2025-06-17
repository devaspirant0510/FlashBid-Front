// 이 파일은 프로젝트 전역에서 사용할 타입을 선언하는 파일입니다.
// 여기서는 Kakao Maps API를 사용할 때 `window.kakao`에 대한 타입 오류를 방지하기 위해 선언합니다.
// 브라우저에는 `window.kakao`가 있지만, TypeScript는 그것을 모른 채 오류를 발생시키므로 수동으로 선언해주는 것입니다.

export {};

declare global {
    interface Window {
        kakao: any; // Kakao 지도 API 전역 객체
    }
}
