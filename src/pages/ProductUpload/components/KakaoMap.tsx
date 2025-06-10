import { useEffect, useRef } from 'react';

interface KakaoMapProps {
    setSelectedLocation: (coords: { lat: number; lng: number; address?: string }) => void;
}

const KakaoMap = ({ setSelectedLocation }: KakaoMapProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const addressRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (document.getElementById("kakao-map-script")) return;

        const script = document.createElement("script");
        script.id = "kakao-map-script";
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=73b609510bf50a842fa780be96b152e4&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                if (!mapRef.current) return;

                const center = new window.kakao.maps.LatLng(37.5665, 126.9780);
                const map = new window.kakao.maps.Map(mapRef.current, {
                    center,
                    level: 5,
                });

                const marker = new window.kakao.maps.Marker({ position: center });
                marker.setMap(map);

                const circle = new window.kakao.maps.Circle({
                    center,
                    radius: 3000,
                    strokeWeight: 2,
                    strokeColor: '#FB923C',
                    strokeOpacity: 0.8,
                    fillColor: '#FDBA74',
                    fillOpacity: 0.3,
                });
                circle.setMap(map);

                const geocoder = new window.kakao.maps.services.Geocoder();

                window.kakao.maps.event.addListener(map, "click", function (mouseEvent: kakao.maps.event.MouseEvent) {
                    const latlng = mouseEvent.latLng;

                    marker.setPosition(latlng);
                    circle.setPosition(latlng);

                    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result: kakao.maps.services.Address[], status: kakao.maps.services.Status) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const address = result[0].road_address?.address_name || result[0].address.address_name;

                            if (addressRef.current) {
                                addressRef.current.innerText = `📍 선택된 주소: ${address}`;
                            }
                            setSelectedLocation({
                                lat: latlng.getLat(),
                                lng: latlng.getLng(),
                                address,
                            });
                        }
                    });
                });
            });
        };
        document.head.appendChild(script);
    }, [setSelectedLocation]);

    return (
        <div className="mt-2">
            <div className="mb-2 flex items-center gap-2">
                <span className="text-orange-500 font-semibold">거래 가능 지역</span>
                <span ref={addressRef} className="text-sm text-gray-500">📍 선택된 주소:</span>
            </div>
            <div ref={mapRef} style={{ width: '100%', height: '300px' }} className="rounded border border-orange-300" />
        </div>
    );
};

export default KakaoMap;