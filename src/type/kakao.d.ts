// 이 파일은 Kakao Maps SDK의 주요 클래스들과 함수들에 대한 타입을 정의한 전역 타입 선언입니다.
// TypeScript는 외부 JS 라이브러리의 타입을 알 수 없기 때문에 우리가 직접 정의해야 자동완성과 타입 검사를 받을 수 있습니다.
// 이 정의는 프로젝트 전역에 적용되므로, 지도 컴포넌트 등에서 타입 오류 없이 사용할 수 있습니다.

export {};

declare global {
    namespace kakao {
        namespace maps {
            class LatLng {
                constructor(lat: number, lng: number);
                getLat(): number;
                getLng(): number;
            }

            class Map {
                constructor(container: HTMLElement, options: any);
                setCenter(position: LatLng): void;
            }

            class Marker {
                constructor(options: { position: LatLng });
                setMap(map: Map | null): void;
                setPosition(position: LatLng): void;
            }

            class Circle {
                constructor(options: {
                    center: LatLng;
                    radius: number;
                    strokeWeight: number;
                    strokeColor: string;
                    strokeOpacity: number;
                    fillColor: string;
                    fillOpacity: number;
                });
                setMap(map: Map | null): void;
                setPosition(position: LatLng): void;
            }

            namespace event {
                interface MouseEvent {
                    latLng: LatLng;
                }

                function addListener(
                    target: any,
                    type: string,
                    callback: (event: MouseEvent) => void,
                ): void;
            }

            namespace services {
                interface Address {
                    address: {
                        address_name: string;
                    };
                    road_address?: {
                        address_name: string;
                    };
                }

                class Geocoder {
                    coord2Address(
                        lng: number,
                        lat: number,
                        callback: (
                            result: Address[],
                            status: 'OK' | 'ZERO_RESULT' | 'ERROR',
                        ) => void,
                    ): void;
                }

                type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';
            }

            function load(callback: () => void): void;
        }
    }

    interface Window {
        kakao: typeof kakao;
    }
}
