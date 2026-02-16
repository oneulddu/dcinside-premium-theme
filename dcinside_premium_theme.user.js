// ==UserScript==
// @name         DCinside Premium Theme (Mobile)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  디시인사이드 모바일을 세련되고 모던한 프리미엄 테마로 변경합니다.
// @author       Antigravity
// @match        https://m.dcinside.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const CONFIG = {
        anonymizeNicknames: true,
        useExternalFonts: false,
        initialPrehide: true,
        initialPrehideMaxMs: 1000
    };
    const THEME_PENDING_CLASS = 'dcinside-theme-pending';
    const THEME_BOOT_CLASS = 'dcinside-theme-boot';
    document.documentElement.classList.add(THEME_PENDING_CLASS);
    if (CONFIG.initialPrehide) {
        document.documentElement.classList.add(THEME_BOOT_CLASS);
    }

    const releaseInitialPrehide = () => {
        document.documentElement.classList.remove(THEME_BOOT_CLASS);
    };

    if (CONFIG.initialPrehide) {
        // Fail-safe: unexpected 오류가 나도 화면이 영구히 숨겨지지 않도록 제한 시간 후 해제
        window.setTimeout(releaseInitialPrehide, CONFIG.initialPrehideMaxMs);
    }

    const fontImports = CONFIG.useExternalFonts
        ? "@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');\n@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');"
        : '';

    const css = `
        ${fontImports}

        html.${THEME_BOOT_CLASS} body {
            visibility: hidden !important;
        }

        :root {
            --premium-primary: #2ba476; /* 요청하신 그린 컬러 */
            --premium-secondary: #218c64; /* GNB용 약간 짙은 그린 */
            --premium-bg: #e8e8e8;
            --premium-white: #ffffff;
            --premium-text: #000000;
            --premium-grey: #888888;
            --premium-border: #eeeeee;
        }

        body {
            background-color: var(--premium-bg) !important;
            font-family: 'Pretendard', 'Exo 2', -apple-system, sans-serif !important;
            color: var(--premium-text) !important;
            margin: 0 !important;
        }

        /* Header & Navigation (Premium Styled) */
        header, .header, .hd, .top-header {
            background: var(--premium-primary) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 9999 !important;
            height: auto !important;
            min-height: 50px !important;
            padding: 5px 12px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
        }

        /* 불필요 요소 제거 (깜빡임 방지용) - .search-wrapping은 전체 래퍼이므로 제외 */
        .sp-daum-search, .btn-ico-del, .icon_event, .gall-tit-group, #viewtop, 
        .btn-scrap, .btn-line-gray, .sp-app, .tab-lst, .bottom-content-tab,
        .full-sch-more, .thum-rtg-1-slider, .view-btm-more, .md-tit-box, .media-group, 
        .thum-rtg-2-slider, .cnt-bst-slider, .capcha-code-box, .comment-write-btm,
        .round.ntc-line-orange, .round.ntc-line-blue, .round.ntc-line-green, 
        span.round[id^="recom_title"],
        #topsearch_form > fieldset > div > div > button.sp-btn-sch,
        #clear_searchBtn {
            display: none !important;
        }

        /* 헤더 변환 전 전체 내용 깜빡임 방지 */
        html.${THEME_PENDING_CLASS} header:not(.js-header-fixed) > * {
            opacity: 0 !important;
            visibility: hidden !important;
        }
        
        /* 변환 완료 후 부드러운 페이드인 */
        header.js-header-fixed > * {
            opacity: 1 !important;
            visibility: visible !important;
            transition: opacity 0.15s ease !important;
        }

        /* 헤더 내의 모든 폼을 캡슐 스타일로 강제 통일 */
        header.js-header-fixed form {
            flex: 1 !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            background-color: rgba(255, 255, 255, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 20px !important;
            padding: 0 12px !important;
            height: 36px !important;
            transition: all 0.2s ease !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
        }

        header.js-header-fixed form:focus-within {
            background-color: #ffffff !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        }

        /* 내부 입력창 스타일 통일 */
        header.js-header-fixed form input[type="text"],
        header.js-header-fixed .search-gall.ipt-sch,
        header.js-header-fixed .ipt-sch.js-keyword {
            background: transparent !important;
            border: none !important;
            color: #ffffff !important;
            font-size: 14px !important;
            flex: 1 !important;
            outline: none !important;
            padding: 0 8px !important;
            height: 100% !important;
            min-width: 0 !important;
        }

        header.js-header-fixed form:focus-within input[type="text"] {
            color: #333 !important;
        }

        header.js-header-fixed form input::placeholder {
            color: rgba(255, 255, 255, 0.6) !important;
        }

        /* 홈 버튼 스타일 */
        .premium-home-btn {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 36px !important;
            height: 36px !important;
            margin-right: 8px !important;
            border-radius: 50% !important;
            background: rgba(255, 255, 255, 0.15) !important;
            transition: all 0.2s ease !important;
            text-decoration: none !important;
            flex-shrink: 0 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .premium-home-btn:active {
            background: rgba(255, 255, 255, 0.3) !important;
            transform: scale(0.95) !important;
        }
        .premium-home-btn svg {
            width: 20px !important;
            height: 20px !important;
            fill: #ffffff !important;
        }

        header.js-header-fixed form:focus-within input::placeholder {
            color: #999 !important;
        }

        /* 버튼 및 아이콘 스타일 */
        header.js-header-fixed form button,
        header.js-header-fixed .sp-btn-sch,
        header.js-header-fixed .allview {
            background-color: transparent !important;
            border: none !important;
            filter: brightness(0) invert(1) !important;
            cursor: pointer !important;
            padding: 0 !important;
            margin: 0 !important;
            width: auto !important;
            height: auto !important;
            display: flex !important;
            align-items: center !important;
        }

        header.js-header-fixed form:focus-within .allview,
        header.js-header-fixed form:focus-within .sp-btn-sch,
        header.js-header-fixed form:focus-within button {
            filter: brightness(0) grayscale(1) !important;
        }

        /* 폼 내부 불필요한 레이아웃 클래스 제거용 */
        header.js-header-fixed .top-schbox, header.js-header-fixed fieldset {
            display: flex !important;
            align-items: center !important;
            flex: 1 !important;
            min-width: 0 !important;
            background: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        header.js-header-fixed legend, header.js-header-fixed .blind {
            display: none !important;
        }

        .cnt-vst {
            background: transparent !important;
            border: none !important;
            color: #fff !important;
            font-size: 13px !important;
            margin-left: 10px !important;
            white-space: nowrap !important;
            font-weight: 500 !important;
        }

        #lately_pop {
            position: absolute !important;
            top: 50px !important;
            width: 100% !important;
            left: 0 !important;
            z-index: 10000 !important;
            background: #fff !important;
            display: none !important; /* 기본은 숨김 */
        }
        
        /* 팝업이 활성화되었을 때의 스타일 (디시인사이드 기본 기능 대응) */
        #lately_pop.on, .lately_pop.on {
            display: block !important;
        }

        .logo, .logo-link, .sp-logo {
            display: none !important; /* 검색창 집중을 위해 로고 숨김 (필요 시 조정 가능) */
        }

        /* 게시글 레이아웃 (Premium Flat Look) 및 제목 공백 제거 */
        .gall-tit-box, .gall-view-head, .view-head {
            background: var(--premium-white) !important;
            padding: 20px 15px !important;
            margin: 0 !important;
            border-bottom: 1px solid var(--premium-border) !important;
            border-radius: 0 !important;
            box-shadow: none !important;
        }

        /* ========== 프리미엄 스타일 게시글 리스트 ========== */
        
        /* 리스트 컨테이너 */
        .gall-detail-lst, .gall-lst {
            background: var(--premium-white) !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /* 각 게시글 아이템 */
        .gall-detail-lst li, .gall-lst li {
            background: var(--premium-white) !important;
            border-bottom: 1px solid #f0f0f0 !important;
            padding: 0 16px !important;
            margin: 0 !important;
            position: relative !important;
            transition: background-color 0.15s ease !important;
        }

        /* 리스트 아이템 내부 레이아웃 - 댓글 배지 우측 고정 */
        .gall-detail-lnktb {
            position: relative !important;
        }

        .gall-detail-lnktb .lt {
            display: block !important;
            padding-right: 35px !important;
            text-decoration: none !important;
        }

        .gall-detail-lnktb .lt:hover,
        .gall-detail-lnktb .lt:active {
            text-decoration: none !important;
        }

        /* 리스트 내 모든 링크 및 텍스트 밑줄 제거 */
        .gall-detail-lst a, .gall-lst a,
        .gall-detail-lst li a, .gall-lst li a,
        .subject-add, .subject-add *,
        .ginfo, .ginfo *, .ginfo li,
        .subjectin, .subjectin * {
            text-decoration: none !important;
        }

        .gall-detail-lst li:active, .gall-lst li:active {
            background: #fafafa !important;
        }

        /* 제목 영역 전체 */
        .subject-add, .gallview-tit-box .tit {
            display: flex !important;
            align-items: center !important;
            gap: 0 !important;
            margin-bottom: 4px !important;
        }

        .subjectin {
            flex: 1 !important;
            min-width: 0 !important;
            padding-right: 4px !important;
        }

        /* 제목 텍스트 - 프리미엄 스타일 */
        .subjectin .subject_con, .subject_con {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #222 !important;
            line-height: 1.45 !important;
            display: block !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
        }

        /* 댓글 수 배지 - 프리미엄 스타일 작은 원형 배지 (우측 고정) */
        .gall-detail-lst .rt, .gall-lst .rt {
            position: absolute !important;
            top: 50% !important;
            right: 16px !important;
            transform: translateY(-50%) !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-width: 22px !important;
            width: 22px !important;
            height: 22px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            background: #f5f5f5 !important;
            border: 1px solid #e8e8e8 !important;
        }

        .gall-detail-lst .rt span, .gall-lst .rt span,
        .reply-num, .cmt {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: #888 !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            line-height: 1 !important;
        }

        /* 메타 정보 영역 - 프리미엄 스타일 */
        .gall-detail-lst .ginfo, .gall-lst .ginfo,
        .gall-detail-lst .ginfo2, .gall-lst .ginfo2 {
            display: flex !important;
            align-items: center !important;
            gap: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            list-style: none !important;
            font-size: 12px !important;
            color: #999 !important;
        }

        .ginfo li, .ginfo2 li {
            display: inline-flex !important;
            align-items: center !important;
            color: #999 !important;
            font-size: 12px !important;
            font-weight: 400 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            border-bottom: none !important;
        }

        /* 메타 정보 구분자 */
        .ginfo li::after, .ginfo2 li::after {
            content: "" !important;
            display: inline-block !important;
            width: 1px !important;
            height: 10px !important;
            background: #ddd !important;
            margin: 0 8px !important;
        }

        .ginfo li:last-child::after, .ginfo2 li:last-child::after {
            display: none !important;
        }

        /* 시간, 조회수 등 */
        .ginfo .date, .ginfo .count, .ginfo .view-count,
        .ginfo2 .date, .ginfo2 .count, .ginfo2 .view-count {
            color: #999 !important;
            font-size: 12px !important;
        }

        /* 닉네임 강조 제거 (익명 기반이므로) */
        .ginfo .nick, .ginfo2 .nick {
            color: #999 !important;
            font-weight: 400 !important;
        }

        /* 리스트 및 제목 영역의 불필요한 공백 제거용 Flex 적용 */
        .gall-detail-lst li .subject-add {
            padding-left: 0 !important;
            margin-left: 0 !important;
        }

        .gall-detail-lst li .subjectin {
            padding-left: 0 !important;
            margin-left: 0 !important;
        }

        .title-subject, .tit {
            font-size: 22px !important;
            font-weight: 700 !important;
            color: var(--premium-text) !important;
            margin-bottom: 5px !important;
            line-height: 1.4 !important;
        }

        /* 메타데이터 (한 줄 및 파이프 구분) */
        .gall-writer, .btm, .gall-thum-btm {
            display: flex !important;
            align-items: center !important;
            flex-wrap: wrap !important;
            font-size: 13px !important;
            color: var(--premium-grey) !important;
            margin-top: 5px !important;
        }

        .nick, .date, .count, .view-count {
            color: var(--premium-grey) !important;
        }

        /* 구분선 추가 (Premium Style) */
        .nick::after, .date::after {
            content: "|" !important;
            margin: 0 8px !important;
            color: #ddd !important;
            font-weight: normal !important;
        }

        /* 본문 영역 (반응형 보정) */
        .view-content, .writing_view_box, .gall-thum-list, .gallview-contents, .gall-thum-btm-inner, .thum-txt, .thum-txtin, .og-wrap {
            background: var(--premium-white) !important;
            margin: 0 !important;
            padding: 20px 15px !important;
            border-bottom: 1px solid var(--premium-border) !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-wrap: break-word !important;
            word-break: break-all !important;
            display: block !important;
        }

        .view-content img, .writing_view_box img, .gall-thum-btm-inner img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 4px !important;
            margin: 15px 0 !important;
        }

        /* 댓글 영역 (반응형 보정) */
        .comment-box, #comment_box, .all-comment, .all-comment-lst {
            background: var(--premium-white) !important;
            margin-top: 10px !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
        }

        .comment-list li, .all-comment-lst li {
            background: var(--premium-white) !important;
            border-bottom: 1px solid var(--premium-border) !important;
            margin-bottom: 0 !important;
            padding: 15px !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-wrap: break-word !important;
            word-break: break-all !important;
        }

        /* 댓글 텍스트 */
        .comment-list .txt, .comment-list .comment-content, .all-comment-lst .txt {
            width: 100% !important;
            max-width: 100% !important;
            word-break: break-all !important;
            white-space: normal !important;
            display: block !important;
        }

        /* 그리드 시스템 상속 제한 제거 */
        .sec-wrap-sub, .gall-thum-btm, .grid, .brick-wid {
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /* 모든 닉네임 및 메타데이터 색상 강화 (프리미엄 스타일) */
        .nick, .nick *, a.nick, .writer, .writer *, .ginfo li, .ginfo2 li {
            color: #444444 !important;
            font-weight: 400 !important;
        }

        /* 닉네임 강조 (리스트 및 상세페이지) */
        .ginfo li:first-child, .ginfo2 li:first-child, .nick, .writer {
            color: #000000 !important;
            font-weight: 500 !important;
        }

        .comment-list .nick, 
        .comment-list .nick *,
        .comment-list a.nick {
            font-weight: 700 !important;
            color: #000000 !important;
            font-size: 15px !important;
            display: inline-flex !important;
            align-items: center !important;
            text-decoration: none !important;
        }

        .comment-list .ip {
            color: #000000 !important;
            font-size: 11px !important;
            margin-left: 5px !important;
            font-weight: 400 !important;
            opacity: 0.7;
        }

        /* 닉네임 옆 아이콘 및 스프라이트 숨김 */
        .sp-nick, .nogonick, .in-nick img, .sp-mgallinfo, .sp-p-edit, .sp-p-del, .sp-go-home, .icon_event {
            display: none !important;
        }

        /* 게시글 리스트 공백 및 레이아웃 최적화 */
        .gall-detail-lst li .subject-add, .subject-add {
            padding-left: 0 !important;
            margin-left: 0 !important;
            display: flex !important;
            align-items: center !important;
        }

        .gall-detail-lst li .subjectin, .subjectin {
            padding-left: 0 !important;
            margin-left: 0 !important;
            flex: 1 !important;
            min-width: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }
        
        /* 작성자 닉네임에 번호 부여 (프리미엄 스타일) */
        .comment-list .nick::before {
            content: "익명의 사용자 " !important;
            font-weight: 700 !important;
            color: #000000 !important;
        }

        .comment-list .txt {
            font-size: 15px !important;
            color: #333 !important;
            margin-top: 8px !important;
            line-height: 1.5 !important;
        }

        /* 추천 박스 미니멀화 */
        .btn-recommend-box {
            background: var(--premium-white) !important;
            padding: 30px 0 !important;
            margin: 0 !important;
            border-bottom: 1px solid var(--premium-border) !important;
        }

        .btn-recommend, .btn-non-recommend {
            border: 1px solid #ccc !important;
            background: #fdfdfd !important;
            color: #555 !important;
        }

        /* 프리미엄 스타일 검색 바 */
        .search-gall, .search-box {
            background: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            border-radius: 4px !important;
        }

        /* 상단 네비게이션(GNB) 및 불필요 요소 제거 */
        .menu-scroll-box, #topmenu, .gnb, .gnb-area, .gnb_box, .nav.fx-depthmenu, .menu-scroll-slider,
        .ft-info, footer, .btn-top, 
        .list-all-wrap, .thum-list-all, .all-list-btn, .sp-lst, .sp-lst-txt,
        .reco-icon-box, .reco-icon-lst, .reco-circle, .reco-cicle-lst, .btn-justify-area, #view_btn_area {
            display: none !important;
        }

    `;

    const inject = () => {
        const style = document.createElement('style');
        style.id = 'premium-style-theme';
        style.textContent = css;
        if (document.head) {
            document.head.appendChild(style);
        } else {
            const observer = new MutationObserver(() => {
                if (document.head) {
                    document.head.appendChild(style);
                    observer.disconnect();
                }
            });
            observer.observe(document.documentElement, { childList: true });
        }
    };

    inject();

    // 프리미엄 스타일로 텍스트나 레이아웃 추가 조정
    let hasStartedTheme = false;
    const startTheme = () => {
        if (hasStartedTheme) return;
        if (!document.body) return;
        hasStartedTheme = true;

        const releasePendingHeader = () => {
            document.documentElement.classList.remove(THEME_PENDING_CLASS);
        };
        const pendingFallbackTimer = window.setTimeout(releasePendingHeader, 1400);

        const stabilizeSearchHeader = () => {
            const header = document.querySelector('header');
            // 검색창 후보군 (갤러리 페이지, 검색 결과 페이지 등 대응)
            const searchForm = document.querySelector('#topsearch_form') ||
                document.querySelector('.outside-search-box form') ||
                document.querySelector('.search_bar form');
            const searchWrap = document.querySelector('#search_wrap');
            const latelyPop = document.querySelector('#lately_pop');

            if (!header || !searchForm) return false;
            if (header.classList.contains('js-header-fixed')) {
                window.clearTimeout(pendingFallbackTimer);
                releasePendingHeader();
                return true;
            }

            // 검색창 문구 및 버튼 텍스트 간소화 및 ID 복구 (기능 복구용)
            const searchInput = searchForm.querySelector('.search-gall.ipt-sch, .ipt-sch.js-keyword');
            if (searchInput) {
                searchInput.placeholder = '통합검색';
                searchInput.id = 'search_gall'; // 디시 내부 스크립트 필수 ID
            }
            const legacySearchButton = searchForm.querySelector('button.sp-btn-sch');
            if (legacySearchButton) legacySearchButton.remove();
            const clearSearchBtnInForm = searchForm.querySelector('#clear_searchBtn');
            if (clearSearchBtnInForm) clearSearchBtnInForm.remove();
            const clearSearchBtn = document.querySelector('#clear_searchBtn');
            if (clearSearchBtn) clearSearchBtn.remove();

            const latelyBtn = searchForm.querySelector('.cnt-vst');
            if (latelyBtn) latelyBtn.innerText = '최근';

            // 1. 헤더 마킹
            header.classList.add('js-header-fixed');

            // 2. 홈 버튼 생성 또는 재활용
            const urlMatch = window.location.href.match(/board\/([a-z0-9_]+)/i) ||
                window.location.href.match(/id=([a-z0-9_]+)/i);
            const gallId = urlMatch ? urlMatch[1] : '';
            const homeUrl = gallId ? `https://m.dcinside.com/board/${gallId}` : 'https://m.dcinside.com';

            let homeBtn = header.querySelector('.premium-home-btn');
            if (!homeBtn) {
                homeBtn = document.createElement('a');
                homeBtn.className = 'premium-home-btn';
                homeBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
            }
            homeBtn.href = homeUrl;
            homeBtn.setAttribute('aria-label', '갤러리 홈으로 이동');
            header.prepend(homeBtn);

            // 3. 검색창과 관련 팝업을 헤더로 직접 이동
            if (searchForm.parentElement !== header) {
                header.appendChild(searchForm);
            }
            if (latelyPop) {
                document.body.appendChild(latelyPop); // 팝업은 독립적으로 관리 (z-index 등 문제 방지)
            }

            // 4. 헤더 내부는 필요한 요소만 남겨 레이아웃 충돌 최소화
            Array.from(header.children).forEach(child => {
                if (child !== homeBtn && child !== searchForm) {
                    child.remove();
                }
            });

            // 기존 껍데기 제거 (실제 결과 데이터가 없는 경우에만)
            const isResultPage = document.querySelector('.sch-lst, .flex-gall-lst, .search_list_wrap');

            if (searchWrap && !searchWrap.contains(searchForm) && !isResultPage) {
                searchWrap.remove();
            }

            // 검색 결과 페이지용 컨테이너도 정리 (결과물이 없을 때만)
            const outerSch = document.querySelector('.outside-search-box');
            if (outerSch && !outerSch.contains(searchForm) && !outerSch.querySelector('.sch-lst, .flex-gall-lst')) {
                outerSch.remove();
            }

            window.clearTimeout(pendingFallbackTimer);
            releasePendingHeader();
            return true;
        };

        const cleanup = () => {
            // 헤더 및 검색창 안정화 실행
            stabilizeSearchHeader();

            if (CONFIG.anonymizeNicknames) {
                // 익명성 강화: 닉네임 전용 요소만 치환
                const nickSelectors = ['.nick', '.writer', '.nickname', '.btn-jusline-inblue.write'];
                const nickTargets = document.querySelectorAll(nickSelectors.join(', '));

                nickTargets.forEach(el => {
                    if (el.dataset.anonProcessed === '1') return;

                    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
                    let node;
                    while (node = walker.nextNode()) {
                        const text = node.textContent || '';
                        const replaced = text.replace(/([가-힣a-zA-Z0-9_]+갤러|ㅇㅇ)/g, '익명');

                        if (text !== replaced) {
                            node.textContent = replaced;
                        }
                    }

                    el.dataset.anonProcessed = '1';
                });
            }
        };

        // 초기 실행 및 옵저버 설정
        cleanup();
        window.requestAnimationFrame(() => releaseInitialPrehide());

        let cleanupTimer = null;
        const scheduleCleanup = (delay = 100) => {
            if (cleanupTimer !== null) return;
            cleanupTimer = window.setTimeout(() => {
                cleanupTimer = null;
                cleanup();
            }, delay);
        };

        const mainObserver = new MutationObserver(() => scheduleCleanup(120));
        mainObserver.observe(document.body, { childList: true, subtree: true });

        // 초기 렌더 이후 지연 삽입되는 노드 대응
        window.setTimeout(() => scheduleCleanup(0), 1200);
    };

    const startThemeWhenBodyReady = () => {
        if (document.body) {
            startTheme();
            return;
        }
        const bodyObserver = new MutationObserver(() => {
            if (!document.body) return;
            bodyObserver.disconnect();
            startTheme();
        });
        bodyObserver.observe(document.documentElement, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startThemeWhenBodyReady, { once: true });
        startThemeWhenBodyReady();
    } else {
        startTheme();
    }
})();
