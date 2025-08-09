import React, {FC, useEffect, useRef} from "react";

interface Props {
    lat: number;
    lng: number;
    radius: number; // 미터 단위
}

const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;

const DirectMapInfo: FC<Props> = ({ lat, lng, radius }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 카카오맵 스크립트 로드
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                if (!mapRef.current) return;

                // 지도 생성
                const map = new window.kakao.maps.Map(mapRef.current, {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 5,
                });

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(lat, lng),
                });
                marker.setMap(map);

                // 원(반경) 그리기
                const circle = new window.kakao.maps.Circle({
                    center: new window.kakao.maps.LatLng(lat, lng),
                    radius: radius,
                    strokeWeight: 2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeStyle: 'solid',
                    fillColor: '#FF0000',
                    fillOpacity: 0.2,
                });
                circle.setMap(map);
            });
        };

        return () => {
            // cleanup
            document.head.removeChild(script);
        };
    }, [lat, lng, radius]);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "400px", borderRadius: "8px", overflow: "hidden" }}
        />
    );
};

export default DirectMapInfo;
