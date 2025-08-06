# Unknown Auction
## 프론트엔드 아키텍쳐
Layer	설명  
Shared	전체 앱에서 재사용되는 공통 코드 (예: UI Kit, 공통 API 클라이언트 등)  
Entities	비즈니스 개체(유저, 포스트 등) 정의 & 관련 로직  
Features	실제 기능 단위 (예: 로그인, 팔로우 버튼 등)  
Widgets	UI 조각(컴포넌트) 조합. 로딩/에러 처리 포함 가능  
Pages	위의 모든 걸 조합해서 완성된 페이지 구성  


🧱 Shared
- ui: 전체 앱에서 공통으로 쓰는 UI kit (버튼, 텍스트 필드 등)
- model: 보통 사용하지 않음
- lib: 공통 유틸 함수들 (lodash-es 같은)
- api: 공통 API 클라이언트, 인증/캐싱 포함 가능

🧩 Entities
- ui: 비즈니스 개체를 나타내는 기본적인 UI (ex: 사용자 카드)
- model: 개체의 상태나 데이터 저장, 조작하는 함수들 (TanStack Query 써도 됨)
- lib: 데이터 저장과 무관한 기능 (ex: 계산 함수)
- api: 이 개체와 관련된 API (Shared의 클라이언트를 이용)

🧰 Features
- ui: 사용자가 실제로 상호작용하는 UI (예: 좋아요 버튼)
- model: 비즈니스 로직, 앱 상태 저장 등 (ex: 테마 변경)
- lib: model 안의 로직을 도와주는 보조 코드
- api: 이 기능과 관련된 API (Entities의 API 조합도 가능)

🧱 Widgets
- ui: Entities & Features 조합한 UI 블록. 로딩/에러 처리 포함 가능
- model: 필요 시 인프라 저장소만 (로직 없음)
- lib: 제스처 같은 상호작용 관련 코드
- api: 보통 사용 안 함. 필요 시 nested route context에서 사용

📄 Pages
- ui: 완성된 페이지 UI. 다른 모든 계층 조합됨
- model: 거의 사용 안 함
- lib: 제스처나 페이지 기능용 코드
- api: SSR 프레임워크용 데이터 로더

## Git 협업 방식
Git Flow

* main 브랜치
    * 가장 최근 배포 버전 현재 운영중인 프로덕션 서비스
* release 브랜치
    * 네이밍 규칙 : release/버전명
    * 프로덕션에 배포할 서비스를 버전별로 관리
* hotfix 브랜치
    * 네이밍 규칙: hotfix/버전명
    * 이미 배포된 브랜치 (release 브랜치) 에서 긴급 수정이 필요할경우
        * 버그 수정후 머지하면 해당 브랜치 삭제
* develop 브랜치
    * 네이밍 규칙 : dev
    * 개발중인 브랜치, feature 브랜치를 합쳐서 최종적으로 release 브랜치로 머지
* feature 브랜치
    * 네이밍 규칙 : feature
    * 새로운 기능을 개발하기 위한 브랜치 develop 브랜치를 pull 해와서 개발진행

Git Convention

* feat : 새로운 기능 추가
* fix : 버그 수정
* docs : 문서 수정
* style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
* refactor : 코드 리펙토링
* test : 테스트 코드, 리펙토링 테스트 코드 추가
* chore : 빌드 업무 수정, 패키지 매니저 수정



