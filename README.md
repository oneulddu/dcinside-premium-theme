<p align="center">
  <img src="https://img.shields.io/badge/platform-mobile-brightgreen?style=flat-square" alt="Platform: Mobile" />
  <img src="https://img.shields.io/badge/version-1.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-yellow?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/tampermonkey-compatible-red?style=flat-square" alt="Tampermonkey" />
</p>

<h1 align="center">🎨 DCinside Premium Theme</h1>

<p align="center">
  <b>디시인사이드 모바일을 세련되고 모던한 프리미엄 UI로 바꿔주는 유저스크립트</b><br/>
  광고 없는 깔끔한 화면 · 익명화 모드 · 높은 정보 밀도
</p>

---

## ✨ 주요 기능

### 🎯 클린 뷰
광고, 이슈 피드, 추천 아이콘, GNB 메뉴 등 **불필요한 요소를 모두 제거**하여 콘텐츠에만 집중할 수 있습니다.

### 🔒 익명화 모드
게시글 리스트와 댓글에서 `ㅇㅇ` 또는 `~갤러` 형태의 닉네임을 자동 감지하여 **'익명'으로 치환**합니다. 댓글 작성자 앞에는 `익명의 사용자` 접두어가 자동 추가됩니다.

### 🏠 스마트 홈 버튼
헤더에 **원형 홈 버튼**이 자동 생성되어, 현재 보고 있는 갤러리의 메인 페이지로 빠르게 이동할 수 있습니다.

### 🔍 통합 검색바
헤더에 고정된 **캡슐형 검색바**로 어디서든 빠르게 검색할 수 있습니다. 포커스 시 배경이 화이트로 전환되는 인터랙션이 적용되어 있습니다.

### 📐 높은 정보 밀도
카드형 레이아웃을 제거하고 **플랫한 리스트 + 실선 구분선** 구조를 사용하여 한 화면에 더 많은 게시글을 표시합니다. 메타데이터(작성자 · 날짜 · 조회수)는 파이프(`|`) 구분자로 한 줄에 정리됩니다.

### 🚫 아이콘 숨김
닉네임 옆의 인증 마크, 레벨 아이콘(`.sp-nick`, `.nogonick` 등)을 모두 숨겨 **텍스트 가독성을 극대화**합니다.

---

## 🎨 디자인 시스템

| 토큰 | 값 | 용도 |
|---|---|---|
| `--premium-primary` | `#2ba476` | 헤더 배경 (그린) |
| `--premium-secondary` | `#218c64` | GNB 강조색 |
| `--premium-bg` | `#e8e8e8` | 전체 배경 |
| `--premium-white` | `#ffffff` | 콘텐츠 영역 배경 |
| `--premium-text` | `#000000` | 기본 텍스트 |
| `--premium-grey` | `#888888` | 메타데이터 텍스트 |
| `--premium-border` | `#eeeeee` | 구분선 |

**폰트**: `Pretendard` → `Exo 2` → `-apple-system` → `sans-serif` (fallback 체인)

---

## ⚙️ 설정 옵션

스크립트 상단의 `CONFIG` 객체에서 동작을 커스터마이즈할 수 있습니다:

```javascript
const CONFIG = {
    anonymizeNicknames: true,   // 닉네임 익명화 on/off
    removeDynamicAds: true,     // 동적 광고 제거 on/off
    useExternalFonts: false,    // 외부 폰트(Pretendard CDN) 로드 on/off
    initialPrehide: true,       // 초기 로드 시 깜빡임 방지 on/off
    initialPrehideMaxMs: 1000   // 깜빡임 방지 최대 대기 시간 (ms)
};
```

---

## 📦 설치 방법

### 사전 준비
모바일 브라우저에 유저스크립트 관리자를 설치합니다:
- **Android**: [Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) + [Tampermonkey](https://www.tampermonkey.net/)
- **iOS**: Safari + [Userscripts 앱](https://apps.apple.com/app/userscripts/id1463298887)

### 설치
1. 유저스크립트 관리자에서 **새 스크립트 추가**를 선택합니다.
2. `dcinside_premium_theme.user.js`의 전체 내용을 붙여넣습니다.
3. 저장 후 `m.dcinside.com`에 접속하면 **자동으로 테마가 적용**됩니다.

---

## 🔧 기술적 특징

| 기술 | 설명 |
|---|---|
| **`@run-at document-start`** | 페이지 렌더 전에 CSS를 주입하여 깜빡임(FOUC)을 방지합니다. |
| **Prehide 메커니즘** | `visibility: hidden`으로 초기 화면을 숨긴 후, 테마 적용 완료 시 해제합니다. Fail-safe 타이머로 영구 숨김을 방지합니다. |
| **MutationObserver** | DOM 변경을 감시하여 동적으로 삽입되는 광고나 요소를 자동 제거합니다. |
| **Debounced Cleanup** | Observer 콜백을 120ms 디바운스하여 성능 저하를 방지합니다. |
| **Sticky Header** | 스크롤 시에도 헤더가 상단에 고정되어 검색과 탐색이 용이합니다. |

---

## 📄 라이선스

MIT License — 자유롭게 사용하고 수정할 수 있습니다.
