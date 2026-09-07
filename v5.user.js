// ==UserScript==
// @name               IG Helper V5
// @name:ar            أداة IG
// @name:de            IG-Helfer
// @name:es            Ayudante de IG
// @name:fr            Assistant IG
// @name:id            Asisten IG
// @name:it            Assistente IG
// @name:ja            IG助手
// @name:ko            IG조수
// @name:pt-BR         Assistente do IG
// @name:ro            IG Helper
// @name:ru            Помощник IG
// @name:th            ตัวช่วย IG
// @name:tr            IG Yardımcısı
// @name:vi            Trợ lý IG
// @name:zh-CN         IG小助手
// @name:zh-TW         IG小精靈
// @namespace          https://github.snkms.com/
// @version            5.1.0
// @description        Download photos and videos from Instagram posts in one click, including Stories, Reels, and profile pictures.
// @description:ar     نزّل صورًا ومقاطع فيديو من منشورات Instagram بنقرة واحدة، بما في ذلك القصص وReels وصور الملف الشخصي.
// @description:de     Lade Fotos und Videos aus Instagram-Beiträgen mit einem Klick herunter, einschließlich Stories, Reels und Profilbildern.
// @description:es     Descarga fotos y videos de publicaciones de Instagram con un clic, incluyendo Stories, Reels y fotos de perfil.
// @description:fr     Téléchargez en un clic les photos et vidéos des publications Instagram, y compris les Stories, les Reels et les photos de profil.
// @description:id     Unduh foto dan video dari postingan Instagram dalam satu klik, termasuk Stories, Reels, dan foto profil.
// @description:it     Scarica foto e video dai post di Instagram con un solo clic, incluse Storie, Reels e foto del profilo.
// @description:ja     Instagramの投稿の写真や動画をワンクリックでダウンロード。ストーリー、リール、プロフィール写真にも対応。
// @description:ko     한 번의 클릭으로 Instagram 게시물의 사진과 동영상을 다운로드하고, 스토리, 릴스, 프로필 사진도 지원합니다.
// @description:pt-BR  Baixe fotos e vídeos de publicações do Instagram com um clique, incluindo Stories, Reels e fotos de perfil.
// @description:ro     Descarcă cu un singur clic fotografii și videoclipuri din postările Instagram, inclusiv storyuri, reels și fotografii de profil.
// @description:ru     Скачивайте фото и видео из публикаций Instagram в один клик, включая Stories, Reels и фото профиля.
// @description:th     ดาวน์โหลดรูปภาพและวิดีโอจากโพสต์ Instagram ได้ในคลิกเดียว รวมถึง Stories, Reels และรูปโปรไฟล์.
// @description:tr     Instagram gönderilerindeki fotoğraf ve videoları tek tıkla indirin; Hikayeler, Reels ve profil fotoğrafları da dahildir.
// @description:vi     Tải xuống ảnh và video từ bài viết trên Instagram chỉ với một cú nhấp, bao gồm Stories, Reels và ảnh đại diện.
// @description:zh-CN  一键下载 Instagram 帖子中的照片和视频，还包括快拍、Reels 和头像。
// @description:zh-TW  一鍵下載 Instagram 貼文中的照片、影片，還包含限時動態、Reels 與大頭貼。
// @author             SN-Koarashi (5026)
// @match              https://*.instagram.com/*
// @grant              GM_addStyle
// @grant              GM_download
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_info
// @grant              GM_notification
// @grant              GM_openInTab
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_unregisterMenuCommand
// @grant              GM_xmlhttpRequest
// @connect            cdn.jsdelivr.net
// @connect            i.instagram.com
// @connect            raw.githubusercontent.com
// @require            https://cdn.jsdelivr.net/npm/mediabunny@1.34.5/dist/bundles/mediabunny.min.cjs#sha256-wUFR+x2bDvpqgMAVGy2CvGvULyjTGvGy4UUAm8rae5U=
// @require            https://code.jquery.com/jquery-4.0.0.min.js#sha256-OaVG6prZf4v69dPg6PhVattBXkcOWQB62pdZ3ORyrao=
// @resource           INTERNAL_CSS https://cdn.jsdelivr.net/gh/sn-o-w/ig-helper@css/style.css
// @resource           LOCALE_MANIFEST https://cdn.jsdelivr.net/gh/SN-Koarashi/ig-helper@master/locale/manifest.json
// @supportURL         https://github.com/SN-Koarashi/ig-helper/
// @contributionURL    https://ko-fi.com/snkoarashi
// @icon               https://www.google.com/s2/favicons?domain=www.instagram.com&sz=32
// @compatible         chrome >= 100
// @compatible         edge >= 100
// @compatible         firefox >= 100
// @license            GPL-3.0-only
// @run-at             document-idle
// ==/UserScript==

// eslint-disable-next-line no-unused-vars
(function ($, Mediabunny) {
    'use strict';

    /* initial */

    /******** USER SETTINGS ********/
    // !!! DO NOT CHANGE THIS AREA !!!
    // ??? PLEASE CHANGE SETTING WITH MENU ???
    const USER_SETTING = {
        'AUTO_RENAME': true,
        'MATCH_VIDEO_FILENAME_TO_THUMBNAIL': false,
        'CAPTURE_IMAGE_VIA_MEDIA_CACHE': true,
        'CHECK_FOR_UPDATE': true,
        'DIRECT_DOWNLOAD_ALL': false,
        'DIRECT_DOWNLOAD_STORY': false,
        'DIRECT_DOWNLOAD_VISIBLE_RESOURCE': false,
        'DISABLE_VIDEO_LOOPING': false,
        'FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED': false,
        'FORCE_FETCH_ALL_RESOURCES': false,
        'FORCE_POLARIS_POST_ROOT_QUERY_FOR_POSTS_AND_REELS': true,
        'FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS': true,
        'HTML5_VIDEO_CONTROL': false,
        'MODIFY_RESOURCE_EXIF': false,
        'MODIFY_VIDEO_VOLUME': false,
        'NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS': false,
        'PREFER_DASH_MANIFEST_FOR_REELS_MEDIA_API': false,
        'NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API': false,
        'REDIRECT_CLICK_USER_STORY_PICTURE': false,
        'RENAME_PUBLISH_DATE': true,
        'SCROLL_BUTTON': true,
        'SKIP_VIEW_STORY_CONFIRM': false,
        'SKIP_SHARED_WITH_YOU_DIALOG': false,
        'USE_EXTERNAL_DOWNLOAD_MODE': false
    };

    const PARENT_CHILD_MAPPING = {
        'AUTO_RENAME': [
            'RENAME_PUBLISH_DATE'
        ],
        'FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS': [
            'FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED',
            'NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS',
            'PREFER_DASH_MANIFEST_FOR_REELS_MEDIA_API',
            'NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API'
        ]
    };

    // Some settings have a direct dependency even though they are not parent/child
    // entries in the visual hierarchy. When the dependent setting is enabled,
    // automatically enable its prerequisite in both the setting state and the UI.
    const SETTING_DEPENDENCIES = {
        'NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API': [
            'NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS'
        ]
    };

    // Some settings also invalidate dependent options when they are disabled.
    // Disabling the New Tab Reels Media API switch must therefore disable the
    // highest-quality video option, which relies on that switch.
    const SETTING_DISABLE_DEPENDENCIES = {
        'NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS': [
            'NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API'
        ]
    };

    const IMAGE_CACHE_KEY = 'URLS_OF_IMAGES_TEMPORARILY_STORED';
    const IMAGE_CACHE_MAX_AGE = 12 * 60 * 60 * 1000;
    const IMAGE_MAX_CACHE_ITEMS = 500;

    const USER_ID_CACHE_KEY = 'USER_IDS_STORED';
    const USER_ID_MAX_CACHE_ITEMS = 1000;
    /*******************************/

    // Icon download by Google Fonts Material Icon & Lucide
    const SVG = {
        DOWNLOAD: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>',
        NEW_TAB: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
        THUMBNAIL: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
        DOWNLOAD_ALL: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-download-icon lucide-cloud-download"><path d="M12 13v8l-4-4"/><path d="m12 21 4-4"/><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/></svg>',
        CLOSE: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',
        FULLSCREEN: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-icon lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
        TURN_DEG: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.34 6.41L.86 12.9l6.49 6.48 6.49-6.48-6.5-6.49zM3.69 12.9l3.66-3.66L11 12.9l-3.66 3.66-3.65-3.66zm15.67-6.26C17.61 4.88 15.3 4 13 4V.76L8.76 5 13 9.24V6c1.79 0 3.58.68 4.95 2.05 2.73 2.73 2.73 7.17 0 9.9C16.58 19.32 14.79 20 13 20c-.97 0-1.94-.21-2.84-.61l-1.49 1.49C10.02 21.62 11.51 22 13 22c2.3 0 4.61-.88 6.36-2.64 3.52-3.51 3.52-9.21 0-12.72z"/></svg>'
    };

    /*******************************/

    // FIX: resourceCountSelector moved to module scope — was previously re-declared
    // inside every createDownloadButton() invocation, and also referenced from the
    // body-level delegated handlers added below.

    // Improve the selector by using the value from the getVisibleNodeIndex function in 'const $viewport'.
    const resourceCountSelector = '*:not([data-pagelet])>*:not([role]):not([data-pagelet])>*>*>*[role]>*>ul[class] li[class]';

    /*******************************/
    const checkInterval = 250;
    const style = GM_getResourceText("INTERNAL_CSS");
    const locale_manifest = JSON.parse(GM_getResourceText("LOCALE_MANIFEST"));

    const userIdCache = new Map();
    // Session-only hot cache for media discovered during the current page session.
    // Persistent media entries remain in state.GL_imageCache and are not preloaded here.
    const mediaCache = new Map();

    let userIdCacheDirty = false;
    let userIdCacheSaveTimer = null;

    // OPTIMIZATION: Cached jQuery body reference — used in many places, jQuery 4
    // creates a new wrapper for each $('body') call. Reusing $body avoids that
    // overhead while remaining 100% behavior-compatible.
    const $body = $('body');

    var state = {
        videoVolume: (GM_getValue('G_VIDEO_VOLUME')) ? GM_getValue('G_VIDEO_VOLUME') : 1,
        tempFetchRateLimitReels: false,
        // FIX: simple mutexes for onStory()/onHighlightsStory() to prevent
        // two concurrent downloads from starting when the user clicks/presses Alt+S
        // rapidly on successive stories.
        storyDownloadInProgress: false,
        highlightDownloadInProgress: false,
        fileRenameFormat: (GM_getValue('G_RENAME_FORMAT')) ? GM_getValue('G_RENAME_FORMAT') : '%USERNAME%-%SOURCE_TYPE%-%SHORTCODE%-%YEAR%%MONTH%%DAY%_%HOUR%%MINUTE%%SECOND%_%ORIGINAL_NAME_FIRST%',
        registerMenuIds: [],
        locale: {},
        lang: GM_getValue('UI_LANGUAGE') || navigator.language || navigator.userLanguage,
        currentURL: location.href,
        firstStarted: false,
        pageLoaded: false,
        GL_logger: [],
        GL_referrer: null,
        GL_postPath: null,
        GL_username: null,
        GL_repeat: null,
        GL_dataCache: {
            stories: {},
            highlights: {}
        },
        GL_observer: new MutationObserver(function () {
            onReadyMyDW();
        }),
        GL_imageCache: GM_getValue(IMAGE_CACHE_KEY, {}),
        GL_userIdCache: GM_getValue(USER_ID_CACHE_KEY, {}),
        GL_weakCache: {
            overlay: new WeakMap(),
            mutedButton: new WeakMap(),
        },
        debugHotkeyKeyCode: (GM_getValue('G_HOTKEY_DEBUG_KEYCODE')) ? GM_getValue('G_HOTKEY_DEBUG_KEYCODE') : 90,
        settingsHotkeyKeyCode: (GM_getValue('G_HOTKEY_SETTINGS_KEYCODE')) ? GM_getValue('G_HOTKEY_SETTINGS_KEYCODE') : 87,
        keySettingsHotkeyKeyCode: (GM_getValue('G_HOTKEY_KEY_SETTINGS_KEYCODE')) ? GM_getValue('G_HOTKEY_KEY_SETTINGS_KEYCODE') : 67,
        downloadStoryHotkeyKeyCode: (GM_getValue('G_HOTKEY_DOWNLOAD_STORY_KEYCODE')) ? GM_getValue('G_HOTKEY_DOWNLOAD_STORY_KEYCODE') : 83
    };
    /*******************************/

    // initialization script
    initSettings();
    GM_addStyle(style);
    // Force the settings popup (and its overlays) to always render above the
    // in-app image viewer. Without this, opening Settings via GM_registerMenuCommand
    // while the image viewer is on top would place the menu behind the viewer.
    // We use near-max int32 z-indexes so any future upstream CSS bumps are still
    // outranked, and we cover both the dialog itself and its dark backdrop.
    GM_addStyle(`
        #imageViewer { z-index: 2147480000 !important; }
        .IG_POPUP_DIG,
        .IG_POPUP_DIG_BG,
        .IG_POPUP_DIG .IG_POPUP_DIG_MAIN { z-index: 2147483000 !important; }
    `);
    // FIX: dedicated overlay for updateLoadingBar(), completely separate from
    // Instagram's container. pointer-events: none is the key — regardless of what
    // happens elsewhere in the script, this element can never intercept clicks or
    // key presses, so it cannot reproduce the freeze bug during rapid navigation
    // between stories.
    GM_addStyle(`
        #IG_HELPER_LOADING_OVERLAY {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #0095f6;
            z-index: 2147483000;
            pointer-events: none;
            opacity: 0;
            transition: width 0.2s ease, opacity 0.2s ease;
        }
        #IG_HELPER_LOADING_OVERLAY.is-active {
            width: 100%;
            opacity: 1;
        }
    `);
    registerMenuCommand();

    getTranslationText(state.lang).then((res) => {
        state.locale[state.lang] = res;
        repaintingTranslations();
        registerMenuCommand();
        checkingScriptUpdate(300);
    }).catch((err) => {
        registerMenuCommand();
        checkingScriptUpdate(300);

        if (!state.lang.startsWith('en')) {
            console.error('getTranslationText catch error:', err);
        }
    });

    logger('Script Loaded', GM_info.script.name, 'version:', GM_info.script.version);
    registerPostClickHandlers();
    purgeCache();
    /*******************************/

    // Main Timer
    // eslint-disable-next-line no-unused-vars
    var timer = setInterval(function () {
        // page loading or unnecessary route
        if ($('div#splash-screen').length > 0 && !$('div#splash-screen').is(':hidden') ||
            location.pathname.match(/^\/(explore(\/.*)?|challenge\/?.*|direct\/?.*|qr\/?|accounts\/.*|emails\/.*|language\/?.*?|your_activity\/?.*|settings\/help(\/.*)?$)$/ig) ||
            !location.hostname.startsWith('www.') || location.pathname.startsWith('/auth_platform/codeentry/') || location.pathname.startsWith('/auth_platform/recaptcha/') ||
            location.pathname.startsWith('/challenge/') || location.pathname.startsWith('/consent/') || location.pathname.startsWith('/accounts/') ||
            ((location.pathname.endsWith('/followers/') || location.pathname.endsWith('/following/')) && ($(`body > div[class]:not([id^="mount"]) div div[role="dialog"]`).length > 0))
        ) {
            state.pageLoaded = false;
            return;
        }

        if ((state.currentURL != location.href || !state.firstStarted || !state.pageLoaded) && $('section .html-div').length) {
            console.log('Main Timer', 'trigging');

            clearInterval(state.GL_repeat);
            state.pageLoaded = false;
            state.firstStarted = true;
            state.currentURL = location.href;
            clearTimeout(state.homepageObserverDebounce);
            if (!state.currentURL.includes('/stories/') || !location.pathname.startsWith('/stories/')) {
                state.GL_observer.disconnect();
                state.GL_observer_attached = false;
                stopStoryButtonObserver();
            }

            // Auto-skip "X shared this with you" dialog on any ?igsh= link
            if (USER_SETTING.SKIP_SHARED_WITH_YOU_DIALOG && window.location.search.includes("igsh")) {
                let tries = 0;
                const skipTimer = setInterval(() => {
                    tries += 1;

                    // stop early if URL no longer has ?igsh (navigation changed)
                    if (!window.location.search.includes("igsh")) {
                        clearInterval(skipTimer);
                        return;
                    }

                    skipSharedWithYouDialog();

                    if (tries >= 20) {
                        clearInterval(skipTimer);
                    }
                }, 200);
            }

            if (location.pathname.startsWith("/p/") || location.pathname.match(/^\/(.*?)\/(p|reel)\//ig) || location.pathname.startsWith("/reel/")) {
                state.GL_dataCache.stories = {};
                state.GL_dataCache.highlights = {};

                logger('isDialog');

                // This is a delayed function call that prevents the dialog element from appearing before the function is called.
                var dialogTimer = setInterval(() => {
                    // body > div[id^="mount"] section nav + div > article << (mobile page in single post) >>
                    // section:visible > main > div > div > div > div > div > hr << (single foreground post in page, non-floating // <hr> element here is literally the line beneath poster's username) >>
                    // section:visible > main > div > div > article > div > div > div > div > div > header (is the same as above, except that this is on the route of the /{username}/p/{shortcode} structure)
                    // section:visible > main > div > div.xdt5ytf << (former CSS selector for single foreground post in page, non-floating) >>
                    // <hr> is much more unique element than "div.xdt5ytf"
                    if ($(`body > div[class]:not([id^="mount"]) div div[role="dialog"] article,
                                section:visible > main > div > div > div > div > div > hr,
                                body > div[id^="mount"] section nav + div > article,
                                section:visible > main > div > div > article > div > div > div > div > div > header
                            `).length > 0) {
                        clearInterval(dialogTimer);

                        // This is to prevent the detection of the "Modify Video Volume" setting from being too slow.
                        setTimeout(() => {
                            clearInterval(state.GL_repeat);
                            state.GL_repeat = null;
                            onReadyMyDW(false);
                        }, 15);
                    }
                }, 100);

                state.pageLoaded = true;
            }

            if (location.pathname.startsWith("/reels/")) {
                logger('isReelsPage');
                setTimeout(() => {
                    onReels(false);
                }, 150);
                state.pageLoaded = true;
            }

            if (location.pathname === "/") {
                state.GL_dataCache.stories = {};
                state.GL_dataCache.highlights = {};

                let hasReferrer = state.GL_referrer?.match(/^\/(stories|highlights)\//ig) != null;

                logger('isHomepage', hasReferrer);
                setTimeout(() => {
                    onReadyMyDW(false, hasReferrer);

                    const element = $('div[id^="mount"] > div > div div > section > main div:not([class]):not([style]) > div > article')?.parent()[0];
                    if (element) {
                        state.GL_observer.disconnect();
                        state.GL_observer.observe(element, {
                            childList: true
                        });
                    }
                }, 150);

                state.pageLoaded = true;
            }

            if (
                $('header > *[class]:first-child img[alt]').length &&
                // eslint-disable-next-line no-useless-escape
                location.pathname.match(/^(\/)([0-9A-Za-z\.\-_]+)\/?(tagged|reels|saved)?\/?$/ig) &&
                !location.pathname.match(/^(\/explore\/?$|\/stories(\/.*)?$|\/p\/)/ig)
            ) {
                logger('isProfile');
                setTimeout(() => {
                    onProfileAvatar(false);
                }, 150);
                state.pageLoaded = true;
            }

            if (!state.pageLoaded) {
                // Call Instagram stories function
                if (location.pathname.startsWith("/stories/highlights/")) {
                    state.GL_dataCache.highlights = {};

                    logger('isHighlightsStory');

                    onHighlightsStory(false);
                    state.GL_repeat = setInterval(() => {
                        onHighlightsStoryThumbnail(false);
                    }, checkInterval);

                    // Same rationale as the story branch: Instagram doesn't always
                    // update location.href in sync with the visible highlight
                    // content when scrolling between highlight trays, so this
                    // must not depend on URL-change timing. Idempotent — harmless
                    // to call every Main Timer tick.
                    startStoryButtonObserver();

                    if ($(".IG_DWHISTORY").length) {
                        setTimeout(() => {
                            if (USER_SETTING.SKIP_VIEW_STORY_CONFIRM) {
                                var $viewStoryButton = $('div[id^="mount"] section:last-child > div > div:not([class]) div:last-child > div[role="button"]').filter(function () {
                                    return $(this).children().length === 0 && this.textContent.trim() !== "";
                                });
                                $viewStoryButton?.trigger("click");
                            }

                            state.pageLoaded = true;
                        }, 150);
                    }
                }
                else if (location.pathname.startsWith("/stories/")) {
                    logger('isStory');

                    /*
                     *
                     *  $('body div[id^="mount"] > div > div > div[class]').length >= 2 &&
                     *  $('body div[id^="mount"] > div > div > div[class]').last().find('svg > path[d^="M16.792"], svg > path[d^="M34.6 3.1c-4.5"]').length > 0 &&
                     *  $('body div[id^="mount"] > div > div > div[class]').last().find('svg > polyline + line').length > 0
                     *
                     */
                    // ? detect logo element in left-top corner
                    if (
                        $('div[id^="mount"] section > div > a[href="/"]').length > 0 ||
                        $('div[id^="mount"] section > div > a[href^="/?hl="]').length > 0 ||
                        $('div[id^="mount"] section i[aria-label="Instagram"]').length > 0
                    ) {
                        onStory(false);

                        // Immediate attempt above covers the common case. The
                        // real safety net is startStoryButtonObserver() below —
                        // a persistent, content-driven watcher (not tied to this
                        // URL-change detection), since Instagram doesn't always
                        // update location.href in sync with the visible story
                        // content, so gating the retry on "URL just changed" can
                        // miss the exact moments a rebuild is needed.
                    }

                    // Started once, left running for as long as we're on a story
                    // page (idempotent — harmless to call every Main Timer tick).
                    // See startStoryButtonObserver() for why this must not depend
                    // on location.href.
                    startStoryButtonObserver();

                    if ($(".IG_DWSTORY").length) {
                        setTimeout(() => {
                            if (USER_SETTING.SKIP_VIEW_STORY_CONFIRM) {
                                var $viewStoryButton = $('div[id^="mount"] section:last-child > div > div:not([class]) div:last-child > div[role="button"]').filter(function () {
                                    return $(this).children().length === 0 && this.textContent.trim() !== "";
                                });
                                $viewStoryButton?.trigger("click");
                            }

                            state.pageLoaded = true;
                        }, 150);
                    }
                }
                else {
                    state.pageLoaded = false;
                    // Remove icons
                    // OPTIMIZATION: Single combined selector + .remove() — replaces 8 separate
                    // $('.CLASS').length checks + removes. Behavior is identical because
                    // .remove() is a no-op on an empty set.
                    $('.IG_DWSTORY, .IG_DWSTORY_ALL, .IG_DWNEWTAB, .IG_DWSTORY_THUMBNAIL, .IG_DWSTORY_POSITION, .IG_DWHISTORY, .IG_DWHISTORY_ALL, .IG_DWHINEWTAB, .IG_DWHISTORY_THUMBNAIL, .IG_DWHISTORY_POSITION').remove();
                    restoreMarkedContainers();
                }
            }

            checkingScriptUpdate(300);
            state.GL_referrer = new URL(location.href).pathname;
        }
    }, checkInterval);

    /* Main functions */

    /**
     * getHighlightsStoryUsername
     * @description Get the current highlight story owner's username.
     *
     * @return {?String}
     */
    function getHighlightsStoryUsername() {
        let href = $('body > div section:visible a[href^="/"]').filter(function () {
            return $(this).attr('href').split('/').filter(e => e.length > 0).length === 1
        }).first().attr('href');

        return href?.split('/').filter(e => e.length > 0).at(0);
    }

    /**
     * onHighlightsStoryAll
     * @description Trigger user's highlight all download event.
     *
     * @return {void}
     */
    async function onHighlightsStoryAll() {
        updateLoadingBar(true);

        let date = new Date().getTime();
        let timestamp = Math.floor(date / 1000);
        let highlightId = location.href.replace(/\/$/ig, '').split('/').at(-1);
        let highStories = await getHighlightStories(highlightId);
        let username = highStories.data.reels_media[0].owner.username;

        if (USER_SETTING.DIRECT_DOWNLOAD_STORY) {

            let complete = 0;
            // OPTIMIZATION: Cache items array — accessed inside per-item setTimeout closures,
            // avoids repeated .reels_media[0].items lookups (was 3 lookups per iteration).
            const items = highStories.data.reels_media[0].items;
            const totalItems = items.length;
            setDownloadProgress(complete, totalItems);

            items.forEach((item, idx) => {
                setTimeout(() => {
                    if (USER_SETTING.RENAME_PUBLISH_DATE) {
                        timestamp = item.taken_at_timestamp;
                    }

                    item.display_resources.sort(function (a, b) {
                        if (a.config_width < b.config_width) return 1;
                        if (a.config_width > b.config_width) return -1;
                        return 0;
                    });

                    if (item.is_video) {
                        (async () => {
                            // Gate DASH on the Reels Media API switch and honour the
                            // Reels Media API priority (skip Media API when Reels Media API is on).


                            await saveFiles(
                                item.video_resources[0].src,
                                {
                                    username,
                                    sourceType: "highlights",
                                    timestamp,
                                    filetype: 'mp4',
                                    shortcode: item.id,
                                    thumbnailURL: item.display_resources?.[0]?.src
                                }
                            );
                            setDownloadProgress(++complete, totalItems);
                        })();
                    }
                    else {
                        saveFiles(item.display_resources[0].src,
                            {
                                username,
                                sourceType: "highlights",
                                timestamp,
                                filetype: 'jpg',
                                shortcode: item.id
                            }).then(() => {
                                setDownloadProgress(++complete, totalItems);
                            });
                    }
                }, 100 * idx);
            });
        }
        else {
            IG_createDM(false, true);
            createStoryListDOM(highStories, 'highlights');
        }
    }

    /**
     * onHighlightsStory
     * @description Trigger user's highlight download event or button display event.
     *
     * @param  {Boolean}  isDownload - Check if it is a download operation
     * @param  {Boolean}  isPreview - Check if it is need to open new tab
     * @return {void}
     */
    async function onHighlightsStory(isDownload, isPreview, isInternalRetry) {
        var username = getHighlightsStoryUsername();

        if (isDownload) {
            // FIX: same mutex + try/catch/finally pattern as onStory(), for the
            // same reason (prevents overlapping concurrent downloads and guarantees
            // the loading bar is reset even if an unexpected exception occurs).
            if (!isInternalRetry) {
                if (state.highlightDownloadInProgress) {
                    logger('onHighlightsStory', 'Download already in progress, ignoring additional call');
                    return;
                }

                state.highlightDownloadInProgress = true;
                updateLoadingBar(true);
            }

            let date = new Date().getTime();
            let timestamp = Math.floor(date / 1000);
            let highlightId = location.href.replace(/\/$/ig, '').split('/').at(-1);
            const visibleStoryTimestamp = getVisibleStoryTimestamp();
            let nowIndex = $("body > div section._ac0a header._ac0k > ._ac3r ._ac3n ._ac3p[style]").length ||
                $('body > div section:visible > div > div:not([class]) > div > div div.x1ned7t2.x78zum5 div.x1caxmr6').length ||
                $('body > div div:not([hidden]) section:visible > div div[style]:not([class]) > div').find('div div.x1ned7t2.x78zum5 div.x1caxmr6').length;
            try {

            const useReelsMediaApi = (USER_SETTING.FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS || (isPreview && USER_SETTING.NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS)) && !state.tempFetchRateLimitReels;

            /*
             * mediaId candidate resolution, run BEFORE the highlight fetch
             * when possible, in the same priority order as onStory():
             *   1) DOM JSON fast path — reads the pk straight out of IG's
             *      own embedded reels_media payload
             *      (getMediaIdOfStoryOrHighlightFromEmbeddedJSON). Highlights
             *      carry no numeric mediaId in the URL (unlike Stories), so
             *      there is no urlID step here.
             *   2) resolveMediaIdOfStoryOrHighlightByTimestamp() — tried
             *      further below, once the highlight response is available
             *      (it needs the fetched items to compare timestamps
             *      against, so it cannot run in this pre-fetch section).
             *   3) DOM-derived id from the currently-visible <img>
             *      (getVisibleImageMediaId(), the ig_cache_key trick) —
             *      last-resort local fallback, tried further below only
             *      once steps 1-2 both yielded nothing.
             *
             * candidateIds here is used ONLY for the local media-cache
             * lookup right below — it intentionally also includes the
             * step-3 candidate (domMediaId), since checking the cache is a
             * pure optimization independent of resolution priority: if
             * either candidate is already cached, we can avoid the
             * highlight fetch entirely. Priority order only matters for
             * which candidate becomes the AUTHORITATIVE mediaId when
             * nothing is cached (see below) — there, domMediaId (step 3)
             * is deliberately excluded, same as in onStory().
             */
            const storyItemIndex = getCurrentStoryItemIndex(username);
            const domJsonMediaId = getMediaIdOfStoryOrHighlightFromEmbeddedJSON(storyItemIndex ?? 0);
            const domMediaId = getVisibleImageMediaId();

            const candidateIds = [];
            if (domJsonMediaId) candidateIds.push(domJsonMediaId);
            if (domMediaId) candidateIds.push(domMediaId);

            let mediaId = null;
            const currentHighlightHasVideo = $('body > div section:visible video[playsinline]').length > 0;

            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                for (const candidateId of candidateIds) {
                    const cached = getImageFromCache(candidateId);

                    if (cached && !currentHighlightHasVideo) {
                        logger("[Restore Cached onHighlightsStory]", candidateId);

                        if (isPreview) {
                            openNewTab(cached);
                        }
                        else {
                            saveFiles(cached, {
                                username,
                                sourceType: "highlights",
                                timestamp,
                                filetype: 'jpg',
                                shortcode: candidateId
                            });
                        }

                        return;
                    }
                }

                /*
                 * Nothing cached — keep the AUTHORITATIVE local candidate
                 * (if any) as a known mediaId, so it isn't re-derived from
                 * scratch. domMediaId (step 3) is deliberately NOT
                 * considered here — see the resolution-priority note above.
                 */
                if (domJsonMediaId) {
                    mediaId = domJsonMediaId;
                }
            }
            else if (domJsonMediaId) {
                /*
                 * CAPTURE_IMAGE_VIA_MEDIA_CACHE off — no cache lookup, but
                 * we already have a precise pk straight from IG's own
                 * embedded reels_media JSON. Use it directly instead of
                 * falling through to the resolution chain below, which only
                 * kicks in once resolveMediaIdOfStoryOrHighlightByTimestamp()
                 * and domMediaId (step 3) also fail to resolve anything.
                 */
                mediaId = domJsonMediaId;
            }

            let highStories;
            const cachedHighlight = state.GL_dataCache.highlights[highlightId];

            if (cachedHighlight) {
                logger('Fetch from memory cache:', highlightId);
                highStories = cachedHighlight;
            }
            else {
                try {
                    highStories = useReelsMediaApi
                        ? await getReelsMedia(`highlight:${highlightId}`)
                        : await getHighlightStories(highlightId);
                }
                catch (err) {
                    logger('[Reels Media API]', 'fetch highlight failed', err);
                    if (useReelsMediaApi && USER_SETTING.FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED) {
                        state.tempFetchRateLimitReels = true;
                        await onHighlightsStory(isDownload, isPreview, true);
                    }
                    else {
                        alert('Fetch failed for highlight.');
                    }
                    return;
                }

                // Cache the complete highlight response regardless of which API supplied it.
                // The cached response is reusable by Download, New Tab and Thumbnail actions.
                state.GL_dataCache.highlights[highlightId] = highStories;
            }

            const items = highStories.data.reels_media[0].items;
            username = highStories.data.reels_media[0].owner.username;

            /*
             * 1) domJsonMediaId, already resolved pre-fetch above (if
             * present) — use it directly instead of re-deriving.
             */
            let target = (mediaId != null ? items.find(item => String(item.pk ?? item.id) === String(mediaId)) : null) || null;

            /*
             * 2) resolveMediaIdOfStoryOrHighlightByTimestamp() — the
             * highlight cache is API-agnostic: always resolve the visible
             * item the same way, regardless of whether the response came
             * from Reels Media API or GraphQL.
             */
            if (target == null) {
                const bestId = resolveMediaIdOfStoryOrHighlightByTimestamp(highStories, visibleStoryTimestamp);
                target = (bestId != null ? items.find(item => String(item.pk ?? item.id) === String(bestId)) : null) || null;
            }

            /*
             * 3) DOM-derived id from the currently-visible <img>
             * (domMediaId, the ig_cache_key trick — already computed in the
             * pre-fetch candidate gathering above). Last local resort
             * before falling back to pure DOM-position matching below.
             */
            if (target == null && domMediaId) {
                target = items.find(item => String(item.pk ?? item.id) === String(domMediaId)) || null;
            }

            // 4) Fallback to visible highlight progress.
            if (target == null) {
                let $header = getStoryProgress(username);
                $header.each(function (index) {
                    if (target == null && $(this).children().length > 0) {
                        target = items[index] || null;
                    }
                });
            }

            // 5) Fallback to the old profile-page / home-page layouts.
            if (target == null) {
                $('body > div section:visible div.x1ned7t2.x78zum5 > div').each(function (index) {
                    const $this = $(this);
                    if (target == null && $this.hasClass('x1lix1fw') && $this.children().length > 0) {
                        target = items[index] || null;
                    }
                });

                $('body > div section:visible ._ac0k > ._ac3r > div').each(function (index) {
                    if (target == null && $(this).children().hasClass('_ac3q')) {
                        target = items[index] || null;
                    }
                });
            }

            // 6) Ultimate fallback: the first item in the highlight tray.
            target = target || items[0] || null;

            if (!target) {
                alert('Cannot resolve story item from reels_media.');
                return;
            }

            logger('onHighlightsStory', highlightId, target);

            if (USER_SETTING.RENAME_PUBLISH_DATE) {
                timestamp = target.taken_at ?? target.taken_at_timestamp ?? timestamp;
            }

            mediaId = target.pk ?? target.id;

            /*
             * Check the persistent/session image cache once, before any download work.
             */
            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE && !isReelsMediaVideo(target)) {
                const cached = getImageFromCache(mediaId);
                if (cached) {
                    logger("[Restore cached onHighlightsStory]", mediaId);
                    if (isPreview) {
                        openNewTab(cached);
                    }
                    else {
                        saveFiles(cached, {
                            username,
                            sourceType: "highlights",
                            timestamp,
                            filetype: 'jpg',
                            shortcode: mediaId
                        });
                    }
                    return;
                }
            }

            if (isReelsMediaVideo(target)) {
                const handled = await tryHandleDashFromMediaItem({
                    mediaItem: target,
                    username,
                    sourceType: "highlights",
                    timestamp,
                    shortcode: mediaId,
                    isPreview,
                });
                if (handled) {
                    return;
                }

                const videoUrl = target.video_versions?.[0]?.url || target.video_resources?.[0]?.src;

                if (!videoUrl) {
                    alert('Cannot find highlight video URL.');
                    return;
                }

                if (isPreview) {
                    openNewTab(videoUrl, username);
                }
                else {
                    saveFiles(videoUrl, {
                        username,
                        sourceType: "highlights",
                        timestamp,
                        filetype: 'mp4',
                        shortcode: mediaId,
                        thumbnailURL: target.image_versions2?.candidates?.[0]?.url || target.display_url || target.display_resources?.[0]?.src
                    });
                }
            }
            else {
                const imageUrl = target.image_versions2?.candidates?.[0]?.url || target.display_url || target.display_resources?.[0]?.src;

                if (!imageUrl) {
                    alert('Cannot find highlight image URL.');
                    return;
                }

                if (isPreview) {
                    openNewTab(imageUrl, username);
                }
                else {
                    saveFiles(imageUrl, {
                        username,
                        sourceType: "highlights",
                        timestamp,
                        filetype: 'jpg',
                        shortcode: mediaId
                    });
                }
            }

            }
            catch (err) {
                logger('onHighlightsStory', 'Unexpected error while downloading highlight', err);
                alert('Fetch failed for highlight.');
            }
            finally {
                if (!isInternalRetry) {
                    state.highlightDownloadInProgress = false;
                    updateLoadingBar(false);
                }
            }
        }
        else {
                // Add the stories download button
                if (!$('.IG_DWHISTORY').length) {
                    let $element = getHighlightButtonContainer();

                    if ($element.length > 0) {
                        //$element.css('position','relative');
                        $element.append(`<div data-ih-locale-title="DW" title="${_i18n("DW")}" class="IG_DWHISTORY">${SVG.DOWNLOAD}</div>`);
                        $element.append(`<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="IG_DWHINEWTAB">${SVG.NEW_TAB}</div>`);

                        let $header = getStoryProgress(username);
                        if ($header.length > 1) {
                            $element.append(`<div data-ih-locale-title="DW_ALL" title="${_i18n("DW_ALL")}" class="IG_DWHISTORY_ALL">${SVG.DOWNLOAD_ALL}</div>`);
                        }

                        setStoryProgressIndexText($element, $header, 'IG_DWHISTORY_POSITION');

                        // replace something times ago format to publish time in first init
                        setTimeElementDateAndLocaleTime(getHighlightCurrentTimeElement($header));

                        //// Modify video volume
                        //if(USER_SETTING.MODIFY_VIDEO_VOLUME){
                        //    $element.find('video').each(function(){
                        //        $(this).one('play playing', function(){
                        //            if(!$(this).data('modify')){
                        //                $(this).data('modify', true);
                        //                this.volume = VIDEO_VOLUME;
                        //                logger('(highlight) Added video event listener #modify');
                        //            }
                        //        });
                        //    });
                        //}

                        // Try to use event listener 'timeupdate' in order to detect if highlight is a video
                        //$element.find('video').each(function(){
                        //    $(this).one('timeupdate',function(){
                        //        if(!$(this).data('modify-thumbnail')){
                        //            if($element.find('.IG_DWHISTORY_THUMBNAIL').length === 0){
                        //                $(this).data('modify-thumbnail', true);
                        //                onHighlightsStoryThumbnail(false);
                        //                logger('(highlight) Manually inserting thumbnail button');
                        //            }
                        //            else{
                        //                $(this).data('modify-thumbnail', true);
                        //                logger('(highlight) Thumbnail button already inserted');
                        //            }
                        //        }
                        //    });
                        //});
                    }
                }
                else {
                    setStoryProgressIndexByUsername($('.IG_DWHISTORY').parent(), getHighlightsStoryUsername(), 'IG_DWHISTORY_POSITION');
                    updateHighlightThumbnailButton();
                }
            }
        }


    /**
     * onHighlightsStoryThumbnail
     * @description Trigger user's highlight video thumbnail download event or button display event.
     *
     * @param  {Boolean}  isDownload - Check if it is a download operation
     * @return {void}
     */
    async function onHighlightsStoryThumbnail(isDownload) {
        if (isDownload) {
            let date = new Date().getTime();
            let timestamp = Math.floor(date / 1000);
            let highlightId = location.href.replace(/\/$/ig, '').split('/').at(-1);
            const visibleStoryTimestamp = getVisibleStoryTimestamp();
            let username = getHighlightsStoryUsername();
            let nowIndex = $("body > div section._ac0a header._ac0k > ._ac3r ._ac3n ._ac3p[style]").length ||
                $('body > div section:visible > div > div:not([class]) > div > div div.x1ned7t2.x78zum5 div.x1caxmr6').length ||
                $('body > div div:not([hidden]) section:visible > div div[style]:not([class]) > div').find('div div.x1ned7t2.x78zum5 div.x1caxmr6').length;

            updateLoadingBar(true);

            const useReelsMediaApi = USER_SETTING.FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS && !state.tempFetchRateLimitReels;

            /*
             * mediaId candidate resolution, run BEFORE the highlight fetch
             * when possible, in the same priority order as
             * onStoryThumbnail() / onHighlightsStory():
             *   1) DOM JSON fast path — reads the pk straight out of IG's
             *      own embedded reels_media payload
             *      (getMediaIdOfStoryOrHighlightFromEmbeddedJSON).
             *   2) resolveMediaIdOfStoryOrHighlightByTimestamp() — tried
             *      further below, once the highlight response is available.
             *   3) DOM-derived id(s) from the currently-visible <video>
             *      poster(s) (getVisibleVideoPosterMediaIds()) —
             *      last-resort local fallback, tried further below only
             *      once steps 1-2 both yielded nothing.
             *
             * candidateIds here is used ONLY for the local media-cache
             * lookup right below — see the matching note in
             * onStoryThumbnail() for why domMediaIds are excluded from the
             * AUTHORITATIVE pre-fetch mediaId assignment further below.
             */
            const storyItemIndex = getCurrentStoryItemIndex(username);
            const domJsonMediaId = getMediaIdOfStoryOrHighlightFromEmbeddedJSON(storyItemIndex ?? 0);
            const domMediaIds = getVisibleVideoPosterMediaIds().filter(id => id !== domJsonMediaId);

            const candidateIds = [];
            if (domJsonMediaId) candidateIds.push(domJsonMediaId);
            candidateIds.push(...domMediaIds);

            let mediaId = null;

            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                for (const candidateId of candidateIds) {
                    const cached = getImageFromCache(candidateId);

                    if (cached) {
                        logger("[Restore Cached onHighlightsStoryThumbnail]", candidateId);

                        saveFiles(cached, {
                            username,
                            sourceType: "highlights",
                            timestamp,
                            filetype: 'jpg',
                            shortcode: candidateId
                        });

                        state.tempFetchRateLimitReels = false;
                        updateLoadingBar(false);
                        return;
                    }
                }

                /*
                 * Nothing cached — keep the AUTHORITATIVE local candidate
                 * (if any) as a known mediaId, so it isn't re-derived from
                 * scratch. domMediaIds (step 3) are deliberately NOT
                 * considered here — see the resolution-priority note above.
                 */
                if (domJsonMediaId) {
                    mediaId = domJsonMediaId;
                }
            }
            else if (domJsonMediaId) {
                /*
                 * CAPTURE_IMAGE_VIA_MEDIA_CACHE off — no cache lookup, but
                 * we already have a precise pk straight from IG's own
                 * embedded reels_media JSON. Use it directly instead of
                 * falling through to the resolution chain below, which only
                 * kicks in once resolveMediaIdOfStoryOrHighlightByTimestamp()
                 * and domMediaIds (step 3) also fail to resolve anything.
                 */
                mediaId = domJsonMediaId;
            }

            let highStories;
            const cachedHighlight = state.GL_dataCache.highlights[highlightId];

            if (cachedHighlight) {
                logger('Fetch from memory cache:', highlightId);
                highStories = cachedHighlight;
            }
            else {
                try {
                    highStories = useReelsMediaApi
                        ? await getReelsMedia(`highlight:${highlightId}`)
                        : await getHighlightStories(highlightId);
                }
                catch (err) {
                    logger('[Reels Media API]', 'fetch highlight thumbnail failed', err);
                    if (useReelsMediaApi && USER_SETTING.FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED) {
                        state.tempFetchRateLimitReels = true;
                        onHighlightsStoryThumbnail(isDownload);
                    }
                    else {
                        alert('Fetch failed for highlight.');
                        updateLoadingBar(false);
                    }
                    return;
                }

                // Cache the complete highlight response regardless of which API supplied it.
                // A later thumbnail/download/new-tab action can reuse the same response.
                state.GL_dataCache.highlights[highlightId] = highStories;
            }

            const items = highStories.data.reels_media[0].items;
            username = highStories.data.reels_media[0].owner.username;

            /*
             * 1) domJsonMediaId, already resolved pre-fetch above (if
             * present) — use it directly instead of re-deriving.
             */
            let target = (mediaId != null ? items.find(item => String(item.pk ?? item.id) === String(mediaId)) : null) || null;

            /*
             * 2) resolveMediaIdOfStoryOrHighlightByTimestamp() — highlight
             * target resolution is API-agnostic and timestamp-first.
             */
            if (target == null) {
                const bestId = resolveMediaIdOfStoryOrHighlightByTimestamp(highStories, visibleStoryTimestamp);
                target = (bestId != null ? items.find(item => String(item.pk ?? item.id) === String(bestId)) : null) || null;
            }

            /*
             * 3) DOM-derived id(s) from the currently-visible <video>
             * poster(s) (domMediaIds — already computed in the pre-fetch
             * candidate gathering above). Last local resort before falling
             * back to pure DOM-position matching below.
             */
            if (target == null) {
                for (const domMediaId of domMediaIds) {
                    const found = items.find(item => String(item.pk ?? item.id) === String(domMediaId));
                    if (found) {
                        target = found;
                        break;
                    }
                }
            }

            // 4) Fallback to visible highlight progress.
            if (target == null) {
                let $header = getStoryProgress(username);
                $header.each(function (index) {
                    if (target == null && $(this).children().length > 0) {
                        target = items[index] || null;
                    }
                });
            }

            // 5) Ultimate fallback: position-count-based.
            if (target == null) {
                let totIndex = items.length;
                target = items[totIndex - nowIndex] || items[0] || null;
            }

            if (!target) {
                alert('Cannot resolve highlight thumbnail item from reels_media.');
                updateLoadingBar(false);
                return;
            }

            mediaId = target.pk ?? target.id;

            if (USER_SETTING.RENAME_PUBLISH_DATE) {
                timestamp = target.taken_at ?? target.taken_at_timestamp ?? timestamp;
            }

            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                const cached = getImageFromCache(mediaId);
                if (cached) {
                    logger("[Restore cached onHighlightsStoryThumbnail]", mediaId);
                    saveFiles(cached, {
                        username,
                        sourceType: "highlights",
                        timestamp,
                        filetype: 'jpg',
                        shortcode: mediaId
                    });
                    state.tempFetchRateLimitReels = false;
                    updateLoadingBar(false);
                    return;
                }
            }

            // Thumbnail is always an image — this must never enter the DASH/video path,
            // regardless of which source (Reels Media API or classic GraphQL) resolved `target`.
            const thumbnailURL = target.image_versions2?.candidates?.[0]?.url ||
                target.display_url ||
                target.display_resources?.[0]?.src;

            if (!thumbnailURL) {
                alert('No highlight thumbnail URL found.');
                updateLoadingBar(false);
                return;
            }

            saveFiles(thumbnailURL, {
                username,
                sourceType: "highlights",
                timestamp,
                filetype: 'jpg',
                shortcode: mediaId
            });

            state.tempFetchRateLimitReels = false;
            updateLoadingBar(false);
        }
        else {
            setStoryProgressIndexByUsername($('.IG_DWHISTORY').parent(), getHighlightsStoryUsername(), 'IG_DWHISTORY_POSITION');
            updateHighlightThumbnailButton();
        }
        }


/**
     * onReadyMyDW
     * @description Create an event entry point for the download button for the post.
     *
     * @param  {Boolean}  NoDialog    - Check if it not showing the dialog
     * @param  {?Boolean}  hasReferrer - Check if the source of the previous page is a story page
     * @return {void}
     */
    function onReadyMyDW(NoDialog, hasReferrer) {
        if (hasReferrer === true) {
            logger('hasReferrer', 'regenerated');
            $('article[data-snig="canDownload"], div[data-snig="canDownload"]').filter(function () {
                return $(this).find('.IG_DW_MAIN').length === 0;
            }).removeAttr('data-snig');
        }

        clearInterval(state.GL_repeat);
        state.GL_repeat = null;

        // Whether is Instagram dialog?
        if (NoDialog == false) {
            const maxCall = 100;
            let i = 0;

            state.GL_repeat = setInterval(() => {
                /*
                 * Fast-path check:
                 * Do not call createDownloadButton() when there are no new <article>
                 * elements waiting to be processed.
                 *
                 * createDownloadButton() also supports the special <hr>-based single
                 * post layout, so that layout is checked separately below.
                 */
                let hasPendingArticle = document.querySelector('article:not([data-snig="canDownload"])') !== null;
                let hasPendingHrContainer = false;

                /*
                 * section:visible > main > div > div > div > div > div > hr << (single foreground post in page, non-floating // <hr> element here is literally the line beneath poster's username) >>
                 * section:visible > main > div > div.xdt5ytf[data-snig="canDownload"] << (former CSS selector for single foreground post in page, non-floating) >>
                 * <hr> is much more unique element than "div.xdt5ytf"
                 */
                const hrElements = document.querySelectorAll(
                    'section > main > div > div > div > div > div > hr'
                );

                if (!hasPendingArticle) {
                    for (const hr of hrElements) {
                        if (hr.getClientRects().length === 0) continue;

                        const container =
                            hr.parentElement?.parentElement?.parentElement?.parentElement;

                        if (container && !container.hasAttribute('data-snig')) {
                            hasPendingHrContainer = true;
                            break;
                        }
                    }
                }

                // Check whether any post container currently exists in the DOM.
                const hasAnyPost = (document.querySelector('article') !== null) || (hrElements.length > 0);

                /*
                 * FIX (Homepage navigation & Dialog coexistence):
                 * 1) When navigating to the homepage, React may take 200-600ms to render the feed.
                 *    During that window, hasAnyPost is false (0 articles in DOM). We must KEEP WAITING
                 *    instead of prematurely terminating the timer.
                 * 2) When a dialog opens (isDialog), foreground post has no data-snig yet (hasPendingArticle is true).
                 *    We must allow createDownloadButton() to process it even if background posts already have data-snig.
                 * 3) Stop repeating ONLY when posts actually exist in DOM (hasAnyPost is true) AND all of them
                 *    have been processed (!hasPendingArticle && !hasPendingHrContainer).
                 */
                if (hasAnyPost && !hasPendingArticle && !hasPendingHrContainer) {
                    // On homepage, attach GL_observer once feed articles have appeared if not already attached
                    if (location.pathname === "/" && !state.GL_observer_attached) {
                        const feedContainer = $('div[id^="mount"] > div > div div > section > main div:not([class]):not([style]) > div > article')?.parent()[0];
                        if (feedContainer) {
                            state.GL_observer.disconnect();
                            state.GL_observer.observe(feedContainer, { childList: true });
                            state.GL_observer_attached = true;
                            logger('onReadyMyDW()', 'GL_observer attached to feed container');
                        }
                    }

                    clearInterval(state.GL_repeat);
                    state.GL_repeat = null;
                    return;
                }

                if (i > maxCall) {
                    clearInterval(state.GL_repeat);
                    state.GL_repeat = null;

                    //alert('Trying to call button creation method reached to maximum try times. If you want to re-register method, please open script menu and press "Reload Script" button or hotkey "R" to reload main timer.');
                    console.warn('onReadyMyDW() Timer', 'maximum number of repetitions reached, terminated');
                    return;
                }

                logger('onReadyMyDW() Timer', 'repeating to call detection createDownloadButton()');
                createDownloadButton();
                i++;
            }, 50);
        }
        else {
            createDownloadButton();
        }
    }


    /**
     * initPostVideoFunction
     * @description Initialize settings related to the video resources in the post.
     *
     * @param  {JQuery<HTMLElement>}  $mainElement
     * @return {Void}
     */
    function initPostVideoFunction($mainElement) {
        // OPTIMIZATION: cache $videos — used in 3-4 separate .find('video') traversals below
        const $videos = $mainElement.find('video');

        $videos.each(function () {
            $(this).off('fullscreenchange.IG_videoControl').on('fullscreenchange.IG_videoControl', function () {
                const $vid = $(this);
                if ($vid.attr('style').includes('object-fit')) {
                    if (document.fullscreenElement == this) {
                        $vid.css('object-fit', 'contain');
                    }
                    else {
                        $vid.css('object-fit', 'cover');
                    }
                }
            });
        });

        // Disable video autoplay
        if (USER_SETTING.DISABLE_VIDEO_LOOPING) {
            $videos.each(function () {
                $(this).one('ended', function () {
                    this.pause();
                    logger('(post) Stop video playing #loop');
                });
            });
        }

        // Modify video volume
        if (USER_SETTING.MODIFY_VIDEO_VOLUME) {
            $videos.each(function () {
                const $vid = $(this);
                $(this).one('play playing', function () {
                    if (!$vid.data('modify')) {
                        $vid.data('modify', true);
                        this.volume = state.videoVolume;
                        logger('(post) Added video event listener #modify');
                    }
                });
            });
        }

        if (USER_SETTING.HTML5_VIDEO_CONTROL) {
            const handleSwitchController = function (e) {
                e.preventDefault();
                e.stopPropagation();

                let $overlayElement = null;

                if ($overlayElement == null) {
                    $overlayElement = $(e.target).parents('div[aria-label][data-visualcompletion="ignore"]').first();
                }

                $videos.each(function () {
                    $(this).css('z-index', '2');
                    $(this).attr('controls', true);
                    state.GL_weakCache.overlay.set(this, $overlayElement);
                });

                $overlayElement.css('z-index', '-10');
                $mainElement.find('a[href^="/reels/"]').first().attr("draggable", false);
            };

            $mainElement.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', handleSwitchController);

            $videos.each(function () {
                const $video = $(this);
                if (!$video.data('controls')) {

                    logger('(post) Added video html5 contorller #modify');

                    if (USER_SETTING.MODIFY_VIDEO_VOLUME) {
                        this.volume = state.videoVolume;

                        $video.on('loadstart', function () {
                            this.volume = state.videoVolume;
                        });
                    }


                    let $mute_button_wrapper = $video.parent().find('video + div > div');
                    $mute_button_wrapper = $mute_button_wrapper.add($mainElement);

                    // eslint-disable-next-line no-unused-vars
                    let $element_mute_button = $mute_button_wrapper.find('button[type="button"], div[role="button"]').filter(function (idx) {
                        const $b = $(this);
                        // This is mute/unmute's icon
                        return $b.width() <= 64 && $b.height() <= 64 && $b.find('svg > path[d^="M16.636 7.028a1.5"], svg > path[d^="M1.5 13.3c-.8"]').length > 0;
                    });

                    state.GL_weakCache.mutedButton.set(this, $element_mute_button);

                    let $targets = $video.parent().find('video + div > div').first();

                    // Hide layout to show controller
                    $targets.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', handleSwitchController);

                    // Restore layout to show details interface
                    $video.on('contextmenu', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        $video.css('z-index', '-1');
                        $video.removeAttr('controls');

                        $targets.css('z-index', '1');
                        state.GL_weakCache.overlay.get(this)?.css('z-index', '1');
                        $(this).parents('a[href^="/reels/"]').first().removeAttr("draggable");
                    });

                    $video.on('volumechange', function () {
                        let video = this;
                        let $element_mute_button = state.GL_weakCache.mutedButton.get(this) || {};
                        let is_element_muted = $element_mute_button.find && $element_mute_button.find('svg > path[d^="M16.636"]').length === 0;

                        if (this.muted != is_element_muted) {
                            this.volume = state.videoVolume;

                            if ($element_mute_button.length === 1) {
                                triggerReactClickHandler($element_mute_button.first()[0]);
                            }
                            else {
                                let $firstElementMuteButton = $element_mute_button.filter(function () {
                                    return $(this).closest(state.GL_weakCache.overlay.get(video)).length > 0;
                                }).first();

                                triggerReactClickHandler($firstElementMuteButton.first()[0]);
                            }
                        }

                        const $v = $(this);
                        if ($v.data('completed')) {
                            state.videoVolume = this.volume;
                            GM_setValue('G_VIDEO_VOLUME', this.volume);
                        }

                        if (this.volume == state.videoVolume) {
                            $v.data('completed', true);
                        }
                    });

                    $video.parents('a[href^="/reels/"]').first().on('click', function (e) {
                        if ($video.attr('controls')) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });

                    $video.css('position', 'absolute');
                    $video.data('controls', true);
                }
            });
        }

        var $buttonParent = $mainElement.find('video + div > div').first();
        toggleVolumeSilder($videos, $buttonParent, 'post', 'bottom');
    };


    /**
     * createDownloadButton
     * @description Create a download button in the upper right corner of each post.
     *
     * @return {void}
     */
    function createDownloadButton() {
        // Add download icon per each posts
        // eslint-disable-next-line no-unused-vars

        /*
         * OPTIMIZATION:
         * Avoid the expensive `:visible` + jQuery `.height()` / `.width()` checks
         * on every invocation.
         *
         * <article> is the normal post container.
         * The <hr>-based layout is kept because Instagram still uses it for some
         * single foreground post layouts.
         */
        const candidates = [];

        document.querySelectorAll('article:not([data-snig="canDownload"])').forEach((element) => {
            if (element.getClientRects().length === 0) return;
            candidates.push(element);
        });

        document.querySelectorAll('section > main > div > div > div > div > div > hr').forEach((element) => {
            if (element.getClientRects().length === 0) return;

            const container =
                element.parentElement?.parentElement?.parentElement?.parentElement;

            if (!container || container.hasAttribute('data-snig')) return;

            candidates.push(container);
        });

        $(candidates).each(function (index) {
            // OPTIMIZATION: cache $(this) — referenced 8+ times in this each() body
            const $self = $(this);
            // If it is have not download icon
            // class x1iyjqo2 mean user profile pages post list container
            if (!$self.attr('data-snig') && !$self.hasClass('x1iyjqo2') && !$self.children('article')?.hasClass('x1iyjqo2') && $self.parents('div#scrollview').length === 0) {
                logger("Found post container", $self);

                const $mainElement = $self;
                const tagName = this.tagName;

                // not loop each in single top post
                if (tagName === "DIV" && index != 0) {
                    return;
                }

                const $childElement = $mainElement.children("div").children("div");

                if ($mainElement.find('> .button_wrapper, .button_wrapper').length > 0) {
                    $mainElement.attr('data-snig', 'canDownload');
                    return;
                }

                if ($childElement.length === 0) return;

                logger("Found insert point", $childElement);

                // Modify carousel post counter's position to not interfere with our buttons
                // OPTIMIZATION: cache repeated ._acay lookup
                const $acay = $mainElement.find('._acay');
                if ($acay.length > 0) {
                    const $acayX24 = $mainElement.find('._acay + .x24i39r');
                    if ($acayX24.length > 0) {
                        $acayX24.css('top', '37px');
                    }

                    const observeNode = $acay.first().parent()[0];
                    var observer = new MutationObserver(function () {
                        $mainElement.find('._acay + .x24i39r').css('top', '37px');
                    });

                    observer.observe(observeNode, {
                        childList: true
                    });
                }

                $childElement.eq((tagName === "DIV") ? 0 : $childElement.length - 2).append(`<div class="button_wrapper">`);

                // Add icons
                const DownloadElement = `<div data-ih-locale-title="DW" title="${_i18n("DW")}" class="IG_DW_MAIN">${SVG.DOWNLOAD}</div>`;
                const NewTabElement = `<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="IG_NEWTAB_MAIN">${SVG.NEW_TAB}</div>`;
                const ThumbnailElement = `<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="IG_THUMBNAIL_MAIN">${SVG.THUMBNAIL}</div>`;
                const ViewerElement = `<div data-ih-locale-title="IMAGE_VIEWER" title="${_i18n("IMAGE_VIEWER")}" class="IG_IMAGE_VIEWER">${SVG.FULLSCREEN}</div>`;

                // OPTIMIZATION: cache .button_wrapper inside $childElement (used 5+ times)
                const $buttonWrapper = $childElement.find(".button_wrapper");
                $buttonWrapper.append(DownloadElement);

                const resource_count = $mainElement.find(resourceCountSelector).length;

                if (resource_count > 1 && USER_SETTING.DIRECT_DOWNLOAD_VISIBLE_RESOURCE && !USER_SETTING.DIRECT_DOWNLOAD_ALL) {
                    const DownloadAllElement = `<div data-ih-locale-title="DW_ALL" title="${_i18n("DW_ALL")}" class="IG_DW_ALL_MAIN">${SVG.DOWNLOAD_ALL}</div>`;
                    $buttonWrapper.append(DownloadAllElement);
                }

                $buttonWrapper.append(NewTabElement);

                let $resourceLayout = $childElement.filter(function () {
                    const element = this;
                    return element.getClientRects().length > 0 &&
                        element.getBoundingClientRect().width > 100 &&
                        element.getBoundingClientRect().height > 100;
                }).first();

                let $isNewPostStyleLayout = $resourceLayout.find(`a[role="link"][tabindex="0"][href^="/"]`).filter(function () {
                    const href = $(this).attr('href');
                    return !href.startsWith("/p/") && !href.startsWith("/reels/");
                }).length > 0;

                // Make sure the button wrapper doesn't cover the "More Options" button.
                if ($isNewPostStyleLayout) {
                    $buttonWrapper.css('top', '45px');
                }

                setTimeout(() => {
                    // eslint-disable-next-line no-unused-vars
                    const checkNodeCallback = (entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                var $targetNode = $(entry.target);
                                // OPTIMIZATION: combined remove selector instead of 2 separate
                                $childElement.find('.IG_THUMBNAIL_MAIN, .IG_IMAGE_VIEWER').remove();

                                // The IntersectionObserver target can itself be <video> or <img>,
                                // so checking only descendants is not enough (a <video>'s own
                                // .find('video') returns an empty set).
                                const isVideoTarget = $targetNode.is('video') || $targetNode.find('video').length > 0;
                                const isImageTarget = $targetNode.is('img') || $targetNode.find('img').length > 0;

                                if (isVideoTarget) {
                                    $mainElement.removeData('igHelper_displayResourceURL');

                                    const $video = $targetNode.is('video') ? $targetNode : $targetNode.find('video').first();
                                    const posterSrc = $video.attr('poster') || $video.prop('poster') || $targetNode.find('img').first().attr('src');
                                    if (posterSrc) {
                                        $mainElement.data('igHelper_videoThumbnailURL', posterSrc);
                                    } else {
                                        $mainElement.removeData('igHelper_videoThumbnailURL');
                                    }

                                    $childElement.find(".button_wrapper").append(ThumbnailElement);
                                    initPostVideoFunction($mainElement);
                                } else if (isImageTarget) {
                                    const imgSrc = $targetNode.is('img') ? $targetNode.attr('src') : $targetNode.find('img').first().attr('src');
                                    if (imgSrc) {
                                        $mainElement.data('igHelper_displayResourceURL', imgSrc);
                                        $childElement.find(".button_wrapper").append(ViewerElement);
                                    } else {
                                        $mainElement.removeData('igHelper_displayResourceURL');
                                    }
                                }
                            }
                        });
                    };

                    const observer_i = new IntersectionObserver(checkNodeCallback, {
                        root: $childElement.find('.button_wrapper').parent()[0],
                        rootMargin: "0px",
                        threshold: 0.1,
                    });

                    // trigger when switching resources
                    // eslint-disable-next-line no-unused-vars
                    const observer = new MutationObserver(function (mutation, owner) {
                        var target = mutation.at(0)?.target;
                        observer_i.disconnect();

                        $(target).find('li').each(function () {
                            const $t = $(target);
                            if ($t.find('video').length > 0 || $t.find('img').length > 0) {
                                observer_i.observe(this);
                            }
                        });
                    });

                    let $triggeredTarget = null;
                    // first onload
                    $childElement.find('.button_wrapper').parent().find('ul li, div[role="button"] > div, div[class] > div').each(function () {
                        const $li = $(this);
                        const $targetNode = $li.find('video').length > 0
                            ? $li.find('video')?.first()
                            : $li.find('img')?.first();

                        // Check if the node is visible and has size,
                        // and not the same node as last triggered one to avoid duplicated trigger
                        // when switching resources with same container
                        if (
                            $targetNode.length > 0 &&
                            $targetNode.is(':visible') &&
                            $targetNode.get(0).getBoundingClientRect().width > 0 &&
                            $targetNode.get(0).getBoundingClientRect().height > 0 &&
                            this.getBoundingClientRect().width > 64 &&
                            this.getBoundingClientRect().height > 64 &&
                            $triggeredTarget?.get(0) != $targetNode?.get(0)
                        ) {
                            // ignore the image without alt attribute,
                            // because it is usually used for video thumbnail
                            if (
                                $targetNode.get(0).tagName === "IMG" &&
                                $targetNode.attr('alt')?.length == 0
                            ) {
                                return;
                            }

                            $triggeredTarget = $targetNode;
                            observer_i.observe(this);
                        }
                    });

                    const $bwParent = $childElement.find('.button_wrapper').parent();
                    const listRoot =
                        $bwParent.find('ul li, div[role="button"] > div').first().parent()[0] ||
                        $bwParent.find('ul').first()[0];

                    if (listRoot) {
                        observer.observe(listRoot, {
                            attributes: true,
                            childList: true,
                        });
                    } else {
                        initPostVideoFunction($mainElement);
                        logger("Cannot find resource list root element, thumbnail and viewer button may not work.");
                    }

                }, 50);

                markContainerPositioned($childElement);

                // Add the mark that download is ready
                var username = $self.find("header > div:last-child > div:first-child span a").first().text() || $self.find('a[href^="/"]').filter(function () {
                    return $(this)?.text()?.length > 0;
                }).first().text();

                $self.attr('data-snig', 'canDownload');
                $self.data('username', username);
            }
        });
    }


    /**
     * registerPostClickHandlers
     * @description Registers delegated body-level handlers for post download/view actions.
     *
     * FIX: Registers all post-button click handlers exactly once on $('body') using
     * the event namespace ".igHelperPost". Body-level delegation means jQuery stores
     * only a single handler object per event type (not one per article), and the
     * handlers themselves never hold strong references to article DOM nodes —
     * they resolve the relevant article at click-time via $(this).closest().
     *
     * Cleanup is a single $('body').off('.igHelperPost') call in reloadScript().
     */
    function registerPostClickHandlers() {
        if (state.bodyEventsRegistered) return;
        state.bodyEventsRegistered = true;

        // OPTIMIZATION: All body-level delegated handlers now use cached $body reference
        $body.on('click.igHelperPost', '.IG_IMAGE_VIEWER', function () {
            const { $article } = getPostContextFromButton(this);
            // IG_IMAGE_VIEWER is only created for an image resource. Never infer
            // a URL from arbitrary visible descendants here; that can resolve to
            // the author's avatar in video posts.
            const url = $article.data('igHelper_displayResourceURL') || null;

            if (url) {
                openImageViewer(url);
            } else {
                alert("Cannot find resource url.");
            }
        });

$body.on('click.igHelperPost', '.IG_THUMBNAIL_MAIN', async function () {
    updateLoadingBar(true);

    try {
        const { $article, postPath } = getPostContextFromButton(this);
        if ($article.length === 0 || !postPath) {
            alert('Cannot determine post path.');
            return;
        }

        state.GL_username = $article.data('username');
        state.GL_postPath = postPath;

        if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
            const posterUrl = $article.data('igHelper_videoThumbnailURL');
            const mediaId = posterUrl ? mediaIdFromURL(posterUrl) : null;
            const cached = mediaId ? getImageFromCache(mediaId) : null;

            if (cached) {
                logger('[Restore cached post video thumbnail]', mediaId);

                const publish_time = new Date(
                    $article.find('a[href] time[datetime]').filter(function () {
                        let href = $(this).parents("a[href]").attr("href");
                        return href?.startsWith("/p/") || href?.match(/\/([\w.\-_]+)\/(p|reel)\//ig) != null;
                    }).first().attr('datetime')
                ).getTime();

                await saveFiles(cached, {
                    username: state.GL_username,
                    sourceType: 'thumbnail',
                    timestamp: USER_SETTING.RENAME_PUBLISH_DATE ? publish_time : new Date().getTime(),
                    filetype: 'jpg',
                    shortcode: postPath
                });
                return;
            }
        }

        const index = getVisibleNodeIndex($article);

        IG_createDM(true, false);

        const totalInserted = await createMediaListDOM(
            state.GL_postPath,
            ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
            ""
        );

        if (!totalInserted || totalInserted < 1) {
            alert('Cannot find thumbnail URL.');
            return;
        }

        const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY');
        const $videoThumbnail = $popupBody
            .find('a[data-globalindex="' + (index + 1) + '"]')
            .parent()
            .find('.videoThumbnail')
            .first();

        if ($videoThumbnail.length > 0) {
            $videoThumbnail.trigger("click");
        }
        else {
            alert('Cannot find thumbnail URL.');
        }
    }
    catch (err) {
        logger('registerPostClickHandlers .IG_THUMBNAIL_MAIN', err);
        alert('Cannot find thumbnail URL.');
    }
    finally {
        updateLoadingBar(false);
        $('.IG_POPUP_DIG').remove();
    }
});

        $body.on('click.igHelperPost', '.IG_NEWTAB_MAIN', async function () {
            updateLoadingBar(true);

            try {
                const { $article, postPath } = getPostContextFromButton(this);
                if ($article.length === 0 || !postPath) {
                    alert('Cannot determine post path.');
                    return;
                }

                state.GL_username = $article.data('username');
                state.GL_postPath = postPath;

                if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                    const displayUrl = $article.data('igHelper_displayResourceURL');
                    const isVideoVisible = $article.find('video:visible').length > 0;

                    if (displayUrl && !isVideoVisible) {
                        const mediaId = mediaIdFromURL(displayUrl);
                        const cached = mediaId ? getImageFromCache(mediaId) : null;

                        if (cached) {
                            logger('[Fast path] Restore cached visible resource for new tab', mediaId);
                            openNewTab(cached);
                            return;
                        }
                    }
                }

                const index = getVisibleNodeIndex($article);

                IG_createDM(true, false);

                const totalInserted = await createMediaListDOM(
                    state.GL_postPath,
                    ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                    ""
                );

                if (!totalInserted || totalInserted < 1) {
                    alert('Cannot find open tab URL.');
                    return;
                }

                const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY');
                const $linkElement = $popupBody.find('a[data-globalindex="' + (index + 1) + '"]');

                if ($linkElement.length === 0) {
                    alert('Cannot find open tab URL.');
                    return;
                }


                    const href = $linkElement.data('href');
                    if (href) {
                        openNewTab(replaceSameOriginHost(href));
                    }
                    else {
                        alert('Cannot find open tab URL.');
                    }

            }
            catch (err) {
                logger('registerPostClickHandlers .IG_NEWTAB_MAIN', err);
                alert('Cannot find open tab URL.');
            }
            finally {
                updateLoadingBar(false);
                $('.IG_POPUP_DIG').remove();
            }
        });

        $body.on('click.igHelperPost', '.IG_DW_ALL_MAIN', async function () {
            try {
                const { $article, postPath } = getPostContextFromButton(this);
                if ($article.length === 0 || !postPath) {
                    alert('Cannot determine post path.');
                    return;
                }

                state.GL_username = $article.data('username');
                state.GL_postPath = postPath;

                IG_createDM(USER_SETTING.DIRECT_DOWNLOAD_ALL, true);
                $("#article-id").html(`<a href="https://www.instagram.com/p/${state.GL_postPath}">${state.GL_postPath}</a>`);

                const totalInserted = await createMediaListDOM(
                    state.GL_postPath,
                    ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                    _i18n("LOAD_BLOB_MULTIPLE")
                );

                if (!totalInserted || totalInserted < 1) {
                    $('.IG_POPUP_DIG').remove();
                    return;
                }

                const links = [];
                $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY a').each(function () {
                    links.push($(this));
                });

                await batchDownloadPostFiles(links);
            }
            catch (err) {
                logger('registerPostClickHandlers .IG_DW_ALL_MAIN', err);
            }
            finally {
                $('.IG_POPUP_DIG').remove();
            }
        });

        $body.on('click.igHelperPost', '.IG_DW_MAIN', async function () {
            try {
                const { $article, postPath } = getPostContextFromButton(this);
                if ($article.length === 0 || !postPath) {
                    alert('Cannot determine post path.');
                    return;
                }

                state.GL_username = $article.data('username');
                state.GL_postPath = postPath;

                IG_createDM(USER_SETTING.DIRECT_DOWNLOAD_ALL, true);
                $("#article-id").html(`<a href="https://www.instagram.com/p/${state.GL_postPath}">${state.GL_postPath}</a>`);

                if (USER_SETTING.DIRECT_DOWNLOAD_VISIBLE_RESOURCE) {
                    updateLoadingBar(true);
                    IG_setDM(true);

                    try {
                        if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                            const displayUrl = $article.data('igHelper_displayResourceURL');
                            const isVideoVisible = $article.find('video:visible').length > 0;

                            if (displayUrl && !isVideoVisible) {
                                const mediaId = mediaIdFromURL(displayUrl);
                                const cached = mediaId ? getImageFromCache(mediaId) : null;

                                if (cached) {
                                    logger('[Restore cached visible resource]', mediaId);

                                    const publish_time = new Date(
                                        $article.find('a[href] time[datetime]').filter(function () {
                                            let href = $(this).parents("a[href]").attr("href");
                                            return href?.startsWith("/p/") || href?.match(/\/([\w.\-_]+)\/(p|reel)\//ig) != null;
                                        }).first().attr('datetime')
                                    ).getTime();

                                    await saveFiles(cached, {
                                        username: state.GL_username,
                                        sourceType: 'photo',
                                        timestamp: USER_SETTING.RENAME_PUBLISH_DATE ? publish_time : new Date().getTime(),
                                        filetype: 'jpg',
                                        shortcode: mediaId
                                    });

                                    updateLoadingBar(false);
                                    $('.IG_POPUP_DIG').remove();
                                    return;
                                }
                            }
                        }

                        const index = getVisibleNodeIndex($article);

                        const totalInserted = await createMediaListDOM(
                            state.GL_postPath,
                            ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                            ""
                        );

                        if (!totalInserted || totalInserted < 1) {
                            alert('Cannot find download URL.');
                            return;
                        }

                        const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY');
                        const $targetLink = $popupBody.find('a[data-globalindex="' + (index + 1) + '"]');
                        const href = $targetLink.data('href');

                        if ($targetLink.length > 0 && href) {
                            $targetLink.trigger("click");
                        }
                        else {
                            alert('Cannot find download URL.');
                        }
                    }
                    catch (err) {
                        logger('registerPostClickHandlers .IG_DW_MAIN visibleResource', err);
                        alert('Cannot find download URL.');
                    }
                    finally {
                        updateLoadingBar(false);
                        $('.IG_POPUP_DIG').remove();
                    }

                    return;
                }

                if (!USER_SETTING.DIRECT_DOWNLOAD_ALL) {
                    let s = 0;
                    const $resourceItems = $article.find(resourceCountSelector);
                    let multiple = $resourceItems.length;
                    let blob = USER_SETTING.FORCE_FETCH_ALL_RESOURCES;
                    const publish_time = new Date(
                        $article.find('a[href] time[datetime]').filter(function () {
                            let href = $(this).parents("a[href]").attr("href");
                            return href?.startsWith("/p/") || href?.match(/\/([\w.\-_]+)\/(p|reel)\//ig) != null;
                        }).first().attr('datetime')
                    ).getTime();

                    if (multiple) {
                        $resourceItems.each(function () {
                            let element_videos = $(this).parent().parent().parent().find('video');
                            if (element_videos && element_videos.attr('src')) {
                                blob = true;
                            }
                        });

                        if (blob) {
                            await createMediaListDOM(
                                state.GL_postPath,
                                ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                                _i18n("LOAD_BLOB_MULTIPLE")
                            );
                        }
                        else {
                            const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY');
                            $resourceItems.each(function () {
                                s++;
                                const $this = $(this);
                                let element_videos = $this.find('video');
                                let element_images = $this.find('._aagv img');
                                let imgLink = (element_images.attr('srcset')) ? element_images.attr('srcset').split(" ")[0] : element_images.attr('src');

                                if (element_videos && element_videos.attr('src')) {
                                    blob = true;
                                }
                                if (element_images && imgLink) {
                                    $popupBody.append(`<a datetime="${publish_time}" data-needed="direct" data-path="${state.GL_postPath}" data-name="photo" data-type="jpg" data-username="${state.GL_username || ''}" data-globalIndex="${s}" href="javascript:;" data-href="${imgLink}"><img width="100" src="${imgLink}" /><br/>- <span data-ih-locale="IMG">${_i18n("IMG")}</span> ${s} -</a>`);
                                }
                            });

                            if (blob) {
                                await createMediaListDOM(
                                    state.GL_postPath,
                                    ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                                    _i18n("LOAD_BLOB_RELOAD")
                                );
                            }
                        }
                    }
                    else {

                            s++;
                            let element_videos = $article.find('video');
                            let element_images = $article.find('._aagv img');
                            let imgLink = (element_images.attr('srcset')) ? element_images.attr('srcset').split(" ")[0] : element_images.attr('src');

                            if (element_videos && element_videos.attr('src')) {
                                await createMediaListDOM(
                                    state.GL_postPath,
                                    ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                                    _i18n("LOAD_BLOB_ONE")
                                );
                            }
                            if (element_images && imgLink) {
                                $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY').append(`<a datetime="${publish_time}" data-needed="direct" data-path="${state.GL_postPath}" data-name="photo" data-type="jpg" data-username="${state.GL_username || ''}" data-globalIndex="${s}" href="javascript:;" data-href="${imgLink}"><img width="100" src="${imgLink}" /><br/>- <span data-ih-locale="IMG">${_i18n("IMG")}</span> ${s} -</a>`);
                            }

                    }
                }

                $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY a').each(function () {
                    const $a = $(this);
                    if ($a.parent().is('div') && $a.prev('.inner_box_wrapper').length > 0) {
                        return;
                    }

                    $a.wrap('<div></div>');
                    $a.before('<label class="inner_box_wrapper"><input class="inner_box" type="checkbox"><span></span></label>');
                    $a.after(`<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="newTab">${SVG.NEW_TAB}</div>`);

                    if ($a.data('name') == 'video') {
                        $a.after(`<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="videoThumbnail">${SVG.THUMBNAIL}</div>`);
                    }
                });

                if (USER_SETTING.DIRECT_DOWNLOAD_ALL) {
                    const totalInserted = await createMediaListDOM(
                        state.GL_postPath,
                        ".IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY",
                        _i18n("LOAD_BLOB_MULTIPLE")
                    );

                    if (!totalInserted || totalInserted < 1) {
                        $('.IG_POPUP_DIG').remove();
                        return;
                    }

                    const links = [];
                    $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY a').each(function () {
                        links.push($(this));
                    });

                    await batchDownloadPostFiles(links);
                    $('.IG_POPUP_DIG').remove();
                }
            }
            catch (err) {
                logger('registerPostClickHandlers .IG_DW_MAIN', err);
                $('.IG_POPUP_DIG').remove();
            }
        });
    }


    /**
     * filterResourceData
     * @description Standardized resource object format.
     *
     * @param  {Object}  data
     * @return {Object}
     */
    function filterResourceData(data) {
        var resource = data.shortcode_media ?? data;
        if (resource.owner == null && resource.user != null) {
            resource.owner = resource.user;
        }

        if (resource.owner == null) {
            logger('carousel_media:', 'undefined username');
            alert('carousel_media: undefined username');
        }

        return resource;
    }


    /**
     * createMediaListDOM
     * @description Create a list of media elements from post URLs.
     *
     * @param  {String}  postURL
     * @param  {String}  selector - Use CSS element selectors to choose where it appears.
     * @param  {String}  message - i18n display loading message
     * @return {Promise<number>}  The number of <a> elements inserted into the DOM
     */
    async function createMediaListDOM(postURL, selector, message) {
        try {
            // OPTIMIZATION: cache the popup body selection used many times below
            const $target = $(selector);
            $target.find('a').remove();
            $target.append('<p id="_SNLOAD">' + message + '</p>');
            $('.IG_POPUP_DIG #batch_download_selected, .IG_POPUP_DIG #batch_download_direct').prop('disabled', true);
            // Optionally resolve post/reel media through Instagram's current
            // PolarisPostRootQuery. DIRECT_DOWNLOAD_ALL additionally uses the legacy
            // query_hash response only to discover the media IDs before resolving URLs
            // through Polaris.
            let result = await getPostMediaWithProvider(postURL, {
                discoverMediaIds: USER_SETTING.DIRECT_DOWNLOAD_ALL
            });
            let resource = filterResourceData(result.data);
            const resourceShortcode = resource.code || resource.shortcode || postURL;

            if (result.type === 'query_hash') {
                let idx = 1;

                // GraphVideo
                if (resource.__typename == "GraphVideo" && resource.video_url) {
                    $target.append(`<a media-id="${resource.id}" datetime="${resource.taken_at_timestamp}" data-blob="true" data-needed="direct" data-path="${resource.shortcode}" data-name="video" data-type="mp4" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${resource.video_url}"><img width="100" src="${resource.display_resources[1].src}" /><br/>- <span data-ih-locale="VID">${_i18n("VID")}</span> ${idx} -</a>`);
                    idx++;

                }
                // GraphImage
                if (resource.__typename == "GraphImage") {
                    $target.append(`<a media-id="${resource.id}" datetime="${resource.taken_at_timestamp}" data-blob="true" data-needed="direct" data-path="${resource.shortcode}" data-name="photo" data-type="jpg" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${resource.display_resources[resource.display_resources.length - 1].src}"><img width="100" src="${resource.display_resources[1].src}" /><br/>- <span data-ih-locale="IMG">${_i18n("IMG")}</span> ${idx} -</a>`);
                    idx++;
                }
                // GraphSidecar
                if (resource.__typename == "GraphSidecar" && resource.edge_sidecar_to_children) {
                    for (let e of resource.edge_sidecar_to_children.edges) {
                        if (e.node.__typename == "GraphVideo") {
                            $target.append(`<a media-id="${e.node.id}" datetime="${resource.taken_at_timestamp}" data-blob="true" data-needed="direct" data-path="${resource.shortcode}" data-name="video" data-type="mp4" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${e.node.video_url}"><img width="100" src="${e.node.display_resources[1].src}" /><br/>- <span data-ih-locale-title="VID">${_i18n("VID")}</span> ${idx} -</a>`);
                        }

                        if (e.node.__typename == "GraphImage") {
                            $target.append(`<a media-id="${e.node.id}" datetime="${resource.taken_at_timestamp}" data-blob="true" data-needed="direct" data-path="${resource.shortcode}" data-name="photo" data-type="jpg" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${e.node.display_resources[e.node.display_resources.length - 1].src}"><img width="100" src="${e.node.display_resources[1].src}" /><br/>- <span data-ih-locale="IMG">${_i18n("IMG")}</span> ${idx} -</a>`);
                        }
                        idx++;
                    }
                }
            }
            else {
                if (resource.carousel_media) {
                    logger('carousel_media');

                    resource.carousel_media.forEach((mda, ind) => {
                        let idx = ind + 1;
                        // Image
                        if (mda.video_versions == null) {
                            mda.image_versions2.candidates.sort(function (a, b) {
                                let aSTP = new URL(a.url).searchParams.get('stp');
                                let bSTP = new URL(b.url).searchParams.get('stp');

                                if (aSTP && bSTP) {
                                    if (aSTP.length > bSTP.length) return 1;
                                    if (aSTP.length < bSTP.length) return -1;
                                }
                                else {
                                    if (a.width < b.width) return 1;
                                    if (a.width > b.width) return -1;
                                }

                                return 0;
                            });

                            $target.append(`<a media-id="${mda.pk}" datetime="${mda.taken_at}" data-blob="true" data-needed="direct" data-path="${resourceShortcode}" data-name="photo" data-type="jpg" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${mda.image_versions2.candidates[0].url}"><img width="100" src="${mda.image_versions2.candidates[0].url}" /><br/>- <span data-ih-locale="IMG">${_i18n("IMG")}</span> ${idx} -</a>`);
                        }
                        // Video
                        else {
                            $target.append(`<a media-id="${mda.pk}" datetime="${mda.taken_at}" data-blob="true" data-needed="direct" data-path="${resourceShortcode}" data-name="video" data-type="mp4" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${mda.video_versions[0].url}"><img width="100" src="${mda.image_versions2.candidates[0].url}" /><br/>- <span data-ih-locale="VID">${_i18n("VID")}</span> ${idx} -</a>`);
                            if (mda.video_dash_manifest) {
                            }
                        }
                    });
                }
                else {
                    let idx = 1;
                    // Image
                    if (resource.video_versions == null) {
                        resource.image_versions2.candidates.sort(function (a, b) {
                            let aSTP = new URL(a.url).searchParams.get('stp');
                            let bSTP = new URL(b.url).searchParams.get('stp');

                            if (aSTP && bSTP) {
                                if (aSTP.length > bSTP.length) return 1;
                                if (aSTP.length < bSTP.length) return -1;
                            }
                            else {
                                if (a.width < b.width) return 1;
                                if (a.width > b.width) return -1;
                            }

                            return 0;
                        });

                        $target.append(`<a media-id="${resource.pk}" datetime="${resource.taken_at}" data-blob="true" data-needed="direct" data-path="${resourceShortcode}" data-name="photo" data-type="jpg" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${resource.image_versions2.candidates[0].url}"><img width="100" src="${resource.image_versions2.candidates[0].url}" /><br/>- <span data-ih-locale="IMG">${_i18n("IMG")}</span> ${idx} -</a>`);
                    }
                    // Video
                    else {
                            $target.append(`<a media-id="${resource.pk}" datetime="${resource.taken_at}" data-blob="true" data-needed="direct" data-path="${resourceShortcode}" data-name="video" data-type="mp4" data-username="${resource.owner.username}" data-globalIndex="${idx}" href="javascript:;" data-href="${resource.video_versions[0].url}"><img width="100" src="${resource.image_versions2.candidates[0].url}" /><br/>- <span data-ih-locale="VID">${_i18n("VID")}</span> ${idx} -</a>`);
                    }
                }
            }

            $("#_SNLOAD").remove();
            $('.IG_POPUP_DIG #batch_download_selected, .IG_POPUP_DIG #batch_download_direct').prop('disabled', false);
            $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY a').each(function () {
                const $a = $(this);
                $a.wrap('<div></div>');
                $a.before('<label class="inner_box_wrapper"><input class="inner_box" type="checkbox"><span></span></label>');
                $a.after(`<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="newTab">${SVG.NEW_TAB}</div>`);

                if ($a.data('name') == 'video') {
                    $a.after(`<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="videoThumbnail">${SVG.THUMBNAIL}</div>`);
                }
            });
            updatePopupSelectionSummary();

            return $target.find('a').length;
        }
        catch (err) {
            logger('createMediaListDOM', err);
            $("#_SNLOAD").remove();
            $('.IG_POPUP_DIG #batch_download_selected, .IG_POPUP_DIG #batch_download_direct').prop('disabled', false);
            return 0;
        }
    }


    /**
     * getVisibleNodeIndex
     * @description Get element visible node.
     *
     * @param  {Object}  $main
     * @return {Integer}
     */
    function getVisibleNodeIndex($main) {
        // 1. Prioritize the most efficient rule: check if the "back" button exists.
        const hasBackButton = $main.find('button._afxv._al46._al47').length > 0;

        // 2. If the "back" button does not exist, it is determined to be the first image, and the result is returned immediately.
        if (!hasBackButton) {
            return 0;
        }
        var index = 0;

        // 3. If the code execution reaches here, it means it is not the first image, and the final geometric algorithm is enabled.

        // a. Locate the "viewport" element: it is the grandparent of ul
        // "_acay" class of <ul> has been removed by Instagram; [class] added to <ul> to get much lesser matches in page
        // The parent of the parent of ul[class] always has the attributes "role"
        // '*:not([data-pagelet])>*:not([role]):not([data-pagelet])>*>*>*[role]>*>ul[class]' is useful for avoiding the homepage stories section, account highlights section, and notes section in Messages.
        const $viewport = $main.find('*:not([data-pagelet])>*:not([role]):not([data-pagelet])>*>*>*[role]>*>ul[class]').parent().parent('[role]');

        if ($viewport.length > 0) {
            const viewportRect = $viewport.get(0).getBoundingClientRect();
            // b. Get itemWidth: directly use the width of the viewport, this method is the most generalizable
            const itemWidth = viewportRect.width;

            // Must successfully obtain the width to continue, to prevent division by zero errors
            if (itemWidth > 0) {
                // STAGE 1: Visual positioning, find the currently displayed <li> element
                // "_acaz" class of <li> has been removed by Instagram; [class] added to <li> to get much lesser matches in page
                const viewportRight = viewportRect.right;
                let closestSlideElement = null;
                let minDistance = Infinity;

                $main.find('li[class]').each(function () {
                    if (this.getBoundingClientRect().width === 0) return;

                    const slideRect = this.getBoundingClientRect();
                    const distance = Math.abs(slideRect.right - viewportRight);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSlideElement = this;
                    }
                });

                // STAGE 2: Index calculation, use the found <li> and itemWidth to calculate the global index
                if (closestSlideElement) {
                    const style = $(closestSlideElement).attr('style');
                    if (style && style.includes('translateX')) {
                        const offsetMatch = style.match(/translateX\(([^p]+)px\)/);
                        if (offsetMatch && offsetMatch[1]) {
                            const totalOffset = parseFloat(offsetMatch[1]);
                            // c. Execute the final calculation formula
                            index = Math.round(totalOffset / itemWidth);
                        }
                    }
                }
            }
        }
        return index;
    }


    /**
     * batchDownloadPostFiles
     * @description Batch download media files in posts to prevent browser crashes.
     * @param {jQuery} $elements
     * @return {Promise<void>}
     */
    async function batchDownloadPostFiles($elements) {
        let index = 0;
        const totalLen = $elements.length;
        setDownloadProgress(0, totalLen);

        for (const element of $elements) {
            try {
                await triggerLinkElement($(element), false);
            } catch (err) {
                console.error('batchDownloadPostFiles failed:', err, element?.dataset?.href);
            }

            index++;
            setDownloadProgress(index, totalLen);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }


    /**
     * getPostContextFromButton
     * @description Resolve the current post container and shortcode safely across
     * homepage, dialog, /p/, /reel/, and changing Instagram layouts.
     *
     * @param {HTMLElement|JQuery} target
     * @return {{ $article: JQuery<HTMLElement>, postPath: (string|null) }}
     */
    function getPostContextFromButton(target) {
        const $article = $(target).closest('[data-snig="canDownload"], article, div[data-snig]');
        if ($article.length === 0) {
            return { $article: $(), postPath: null };
        }

        const candidates = [];
        const pushHref = (href) => {
            if (typeof href === 'string' && href.trim().length > 0) {
                candidates.push(href.trim());
            }
        };

        pushHref($article.find('a[href^="/p/"]').first().attr('href'));
        pushHref($article.find('a[href^="/reel/"]').first().attr('href'));
        pushHref($article.find('a[href*="/p/"]').first().attr('href'));
        pushHref($article.find('a[href*="/reel/"]').first().attr('href'));

        $article.find('a[role="link"][href], a[href]').each(function () {
            const href = $(this).attr('href') || '';
            if (href.startsWith('/p/') || href.startsWith('/reel/') || href.match(/^\/[^/]+\/(p|reel)\//i)) {
                pushHref(href);
                return false;
            }
        });

        let postPath = null;
        for (const href of candidates) {
            const parts = href.split('/').filter(Boolean);
            const idx = parts.findIndex(p => p === 'p' || p === 'reel');
            if (idx >= 0 && parts[idx + 1]) {
                postPath = parts[idx + 1];
                break;
            }
            if ((href.startsWith('/p/') || href.startsWith('/reel/')) && parts[1]) {
                postPath = parts[1];
                break;
            }
        }

        if (!postPath) {
            const pathParts = location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
            if ((pathParts[0] === 'p' || pathParts[0] === 'reel') && pathParts[1]) {
                postPath = pathParts[1];
            }
            else {
                const routeIndex = pathParts.findIndex(p => p === 'p' || p === 'reel');
                if (routeIndex >= 0 && pathParts[routeIndex + 1]) {
                    postPath = pathParts[routeIndex + 1];
                }
            }
        }

        return { $article, postPath };
    }

    /**
     * onProfileAvatar
     * @description Trigger user avatar download event or button display event.
     *
     * @param  {Boolean}  isDownload - Check if it is a download operation
     * @return {void}
     */
    async function onProfileAvatar(isDownload) {
        if (isDownload) {
            updateLoadingBar(true);

            let date = new Date().getTime();
            let timestamp = Math.floor(date / 1000);
            let username = location.pathname.replaceAll(/(reels|tagged)\/$/ig, '').split('/').filter(s => s.length > 0).at(-1);
            let userInfo = await getUserId(username);
            try {
                let dataURL = await getUserHighSizeProfile(userInfo.user.pk);
                saveFiles(dataURL, {
                    username,
                    sourceType: "avatar",
                    timestamp,
                    filetype: 'jpg',
                    uid: userInfo.user.id
                });
            }
            // eslint-disable-next-line no-unused-vars
            catch (err) {
                saveFiles(userInfo.user.profile_pic_url, {
                    username,
                    sourceType: "avatar",
                    timestamp,
                    filetype: 'jpg',
                    uid: userInfo.user.id
                });
            }

            updateLoadingBar(false);
        }
        else {
            // Add the profile download button
            if (!$('.IG_DWPROFILE').length) {
                let profileTimer = setInterval(() => {
                    if ($('.IG_DWPROFILE').length) {
                        clearInterval(profileTimer);
                        return;
                    }

                    const selector = 'header > *[class]:first-child > *[class]:first-child img[alt]';
                    const $draggableElements = $(`${selector}[draggable]`).parent().parent();
                    const $nonDraggableElements = $(`${selector}:not([draggable])`).parent().parent().parent();
                    $draggableElements.append(`<div data-ih-locale-title="DW" title="${_i18n("DW")}" class="IG_DWPROFILE">${SVG.DOWNLOAD}</div>`);
                    markContainerPositioned($draggableElements);
                    $nonDraggableElements.append(`<div data-ih-locale-title="DW" title="${_i18n("DW")}" class="IG_DWPROFILE">${SVG.DOWNLOAD}</div>`);
                    markContainerPositioned($nonDraggableElements);
                }, 150);
            }
        }
    }


    /**
     * skipSharedWithYouDialog
     * @description Auto-skip the "X shared this with you" dialog for ?igsh= links.
     *
     * @return {void}
     */
    function skipSharedWithYouDialog() {
        if (!USER_SETTING.SKIP_SHARED_WITH_YOU_DIALOG) return;

        let url;
        try {
            url = new URL(window.location.href);
        }
        catch (e) {
            logger("[skipSharedWithYouDialog] invalid URL", e);
            return;
        }

        // only for shared links with the tracking param ?igsh=...
        if (!url.searchParams || !url.searchParams.has("igsh")) return;

        const $dialogs = $("div[role=\"dialog\"]");
        if (!$dialogs || !$dialogs.length) {
            return;
        }

        const profileUsername = location.pathname
            .split("/")
            .filter(s => s.length > 0)
            .at(0)?.toLowerCase();

        $dialogs.each(function () {
            const $dialog = $(this);

            if (!$dialog.is(":visible")) {
                return;
            }

            const $headers = $dialog.find("h2");
            if (!$headers.length) {
                return;
            }

            // Heuristic: header text that looks like "profile_name shared this with you"
            const isSharedHeader = $headers.filter(function () {
                const rawText = (this.textContent || "").trim().toLowerCase();
                if (!rawText) return false;

                // Typical case
                if (rawText.includes("shared this with you")) return true;
                if (rawText.includes("shared with you")) return true;

                // Fallback: contains username + "shared"
                if (profileUsername &&
                    rawText.includes(profileUsername) &&
                    rawText.includes("shared")) {
                    return true;
                }

                return false;
            }).length > 0;

            if (!isSharedHeader) {
                return;
            }

            const $buttons = $dialog.find("div[role=\"button\"]");
            if (!$buttons.length) {
                logger("[skipSharedWithYouDialog] dialog has no buttons");
                return;
            }

            let $notNow = null;

            // Prefer a button whose text is exactly "Not now" (case-insensitive)
            $buttons.each(function () {
                const text = (this.textContent || "").trim().toLowerCase();
                if (!text) return;

                if (text === "not now") {
                    $notNow = $(this);
                    return false;
                }
            });

            // Fallback: if there are exactly 2 buttons, assume the second is "Not now"
            if ((!$notNow || !$notNow.length) && $buttons.length === 2) {
                $notNow = $buttons.last();
            }

            if (!$notNow || !$notNow.length) {
                logger("[skipSharedWithYouDialog] could not find \"Not now\" button");
                return;
            }

            logger("[skipSharedWithYouDialog] clicking \"Not now\" button");
            $notNow.trigger("click");
        });
    }

    /**
     * onReels
     * @description Trigger user's reels download event or button display event.
     *
     * @param  {Boolean}  isDownload - Check if it is a download operation
     * @param  {Boolean}  isVideo - Check if reel is a video element
     * @param  {Boolean}  isPreview - Check if it is need to open new tab
     * @return {void}
     */
    async function onReels(isDownload, isVideo, isPreview, clickedButton) {
        try {
            if (isDownload) {
                updateLoadingBar(true);

                let reelsPath = location.href.split('?').at(0).split('instagram.com/reels/').at(-1).replaceAll('/', '');

                // .IG_REELS_THUMBNAIL is handled by onReels(), so the cache check
                // happens here, before getBlobMediaWithQueryID(). Uses the exact
                // Reel container belonging to the clicked button instead of
                // globally selecting the first visible video on the page.
                if (!isVideo && USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE && clickedButton) {
                    const $button = $(clickedButton);
                    const $reelContainer = $button.parents().filter(function () {
                        return $(this).find('video').length > 0;
                    }).first();

                    const candidateUrls = [];
                    $reelContainer.find('video').each(function () {
                        const poster = this.getAttribute('poster') || this.poster;
                        if (poster) candidateUrls.push(poster);
                    });
                    $reelContainer.find('img[src]').each(function () {
                        const src = this.getAttribute('src');
                        if (src) candidateUrls.push(src);
                    });

                    const seenIds = new Set();
                    for (const candidateUrl of candidateUrls) {
                        const mediaId = mediaIdFromURL(candidateUrl);
                        if (!mediaId || seenIds.has(mediaId)) continue;
                        seenIds.add(mediaId);

                        const cachedThumbnail = getImageFromCache(mediaId);
                        if (!cachedThumbnail) continue;

                        logger('[Restore cached reel thumbnail]', mediaId);

                        let cachedTimestamp = Date.now();
                        if (USER_SETTING.RENAME_PUBLISH_DATE) {
                            const timeValue = $reelContainer.find('a[href] time[datetime]').first().attr('datetime');
                            if (timeValue) cachedTimestamp = new Date(timeValue).getTime();
                        }

                        // The Reel container often has a profile/avatar link whose visible
                        // text is empty, so the username is resolved from the href first,
                        // then falls back to text/data attributes.
                        const excludedProfilePaths = /^(reels|explore|accounts|direct|stories|p|about|developer|privacy|terms|web|directory|emails|challenge)$/i;
                        let cachedUsername = '';

                        $reelContainer.find('a[href]').each(function () {
                            if (cachedUsername) return;

                            const href = $(this).attr('href') || '';
                            try {
                                const pathParts = new URL(href, location.origin).pathname.split('/').filter(Boolean);
                                if (pathParts.length === 1 &&
                                    /^[A-Za-z0-9._]+$/.test(pathParts[0]) &&
                                    !excludedProfilePaths.test(pathParts[0])) {
                                    cachedUsername = pathParts[0];
                                }
                            } catch (_) {
                                // Ignore malformed/non-URL hrefs and continue searching.
                            }
                        });

                        if (!cachedUsername) {
                            cachedUsername = $reelContainer.find('[data-username]').filter(function () {
                                return !!$(this).attr('data-username');
                            }).first().attr('data-username') || '';
                        }

                        if (!cachedUsername) {
                            cachedUsername = $reelContainer.find('a[href^="/"]').filter(function () {
                                return ($(this).text() || '').trim().length > 0;
                            }).first().text().trim();
                        }

                        if (!cachedUsername) {
                            cachedUsername = state.GL_username || '';
                        }

                        if (!cachedUsername) {
                            logger('[Fast path] Cached Reel thumbnail found, but username could not be resolved; skipping save to avoid API lookup', mediaId);
                            updateLoadingBar(false);
                            return;
                        }

                        await saveFiles(cachedThumbnail, {
                            username: cachedUsername,
                            sourceType: 'reels',
                            timestamp: USER_SETTING.RENAME_PUBLISH_DATE ? cachedTimestamp : Date.now(),
                            filetype: 'jpg',
                            shortcode: reelsPath
                        });
                        updateLoadingBar(false);
                        return;
                    }

                    logger('[Cache miss] No cached Reel thumbnail for clicked Reel', candidateUrls);
                }

                // Only reach the network when the persistent media cache does not contain
                // the currently visible Reel thumbnail. When the Polaris switch is enabled,
                // this uses PolarisPostRootQuery instead of the legacy media query endpoints.
                let result = await getPostMediaWithProvider(reelsPath);
                let media = filterResourceData(result.data);

                let timestamp = new Date().getTime();

                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                    if (result.type === 'query_hash') {
                        timestamp = media.taken_at_timestamp;
                    }
                    else {
                        timestamp = media.taken_at;
                    }
                }

                if (result.type === 'query_hash') {
                    if (isVideo && media.is_video) {
                        if (isPreview) {
                            openNewTab(media.video_url);
                        }
                        else {
                            let type = 'mp4';
                            saveFiles(media.video_url, {
                                username: media.owner.username,
                                sourceType: "reels",
                                timestamp,
                                filetype: type,
                                shortcode: reelsPath,
                                thumbnailURL: media.display_resources?.at(-1)?.src
                            });
                        }
                    }
                    else {
                        if (isPreview) {
                            openNewTab(media.display_resources.at(-1).src);
                        }
                        else {
                            let type = 'jpg';
                            saveFiles(media.display_resources.at(-1).src, {
                                username: media.owner.username,
                                sourceType: "reels",
                                timestamp,
                                filetype: type,
                                shortcode: reelsPath
                            });
                        }
                    }
                }
                else {
                    if (isVideo && media.video_versions != null) {
                        if (isPreview) {
                            openNewTab(media.video_versions[0].url);
                        }
                        else {
                            let type = 'mp4';
                            saveFiles(media.video_versions[0].url, {
                                username: media.owner.username,
                                sourceType: "reels",
                                timestamp,
                                filetype: type,
                                shortcode: reelsPath,
                                thumbnailURL: media.image_versions2?.candidates?.[0]?.url
                            });
                        }
                    }
                    else {
                        if (isPreview) {
                            openNewTab(media.image_versions2.candidates[0].url);
                        }
                        else {
                            let type = 'jpg';
                            saveFiles(media.image_versions2.candidates[0].url, {
                                username: media.owner.username,
                                sourceType: "reels",
                                timestamp,
                                filetype: type,
                                shortcode: reelsPath
                            });
                        }
                    }
                }

                updateLoadingBar(false);
            }
            else {
                const svgClose = 'svg > polyline[points^="20.643 3.357 12 12 3.353 20.647"] ~ line';
                var timer = setInterval(() => {
                    const hasTiktokStyleLayout = $(svgClose).length > 0;
                    if (hasTiktokStyleLayout || $('section > main[role="main"] > div div.x1qjc9v5 video').length > 0) {
                        clearInterval(timer);

                        if (USER_SETTING.SCROLL_BUTTON) {
                            $('#scrollWrapper').remove();
                            // OPTIMIZATION: cache reels main element (used 5 times below)
                            const $reelsMain = $('section > main[role="main"]');
                            $reelsMain.append('<section id="scrollWrapper"></section>');
                            const $scrollWrapper = $reelsMain.find('> #scrollWrapper');
                            $scrollWrapper.append('<div class="button-up"><div></div></div>');
                            $scrollWrapper.append('<div class="button-down"><div></div></div>');

                            $scrollWrapper.find('> .button-up').on('click', function () {
                                $reelsMain.find('> div')[0].scrollBy({ top: -30, behavior: "smooth" });
                            });
                            $scrollWrapper.find('> .button-down').on('click', function () {
                                $reelsMain.find('> div')[0].scrollBy({ top: 30, behavior: "smooth" });
                            });
                        }

                        $('div[aria-busy][tabindex]').children('div').each(function () {
                            const $this = $(this);
                            if (
                                $this.children().length > 0 &&
                                $this.width() > window.innerWidth * 0.8 &&
                                $this.height() > window.innerHeight * 0.8 &&
                                $this.find('video').length > 0
                            ) {
                                appendReelsButton($this);
                            }
                        });
                    }
                }, 250);
            }
        }
        catch (err) {
            console.error("[reels]", err);
        }
    }

    function appendReelsButton($main) {
        // OPTIMIZATION: cache $main.children() and $main.find('video') usage
        const $mainChildren = $main.children();
        if (!$mainChildren.find('.IG_REELS').length) {
            markContainerPositioned($mainChildren);

            $mainChildren.append(`<div data-ih-locale-title="DW" title="${_i18n("DW")}" class="IG_REELS">${SVG.DOWNLOAD}</div>`);
            $mainChildren.append(`<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="IG_REELS_NEWTAB">${SVG.NEW_TAB}</div>`);
            $mainChildren.append(`<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="IG_REELS_THUMBNAIL">${SVG.THUMBNAIL}</div>`);

            const $videos = $main.find('video');

            $videos.each(function () {
                $(this).off('fullscreenchange.IG_videoControl').on('fullscreenchange.IG_videoControl', function () {
                    const $vid = $(this);
                    if ($vid.attr('style').includes('object-fit')) {
                        if (document.fullscreenElement == this) {
                            $vid.css('object-fit', 'contain');
                        }
                        else {
                            $vid.css('object-fit', 'cover');
                        }
                    }
                });
            });

            // Disable video autoplay
            if (USER_SETTING.DISABLE_VIDEO_LOOPING) {
                $videos.each(function () {
                    $(this).one('ended', function () {
                        const $this = $(this);

                        let $element_play_button = $this.next().find('div[role="presentation"] > div svg > path[d^="M5.888"]').parents('button[role="button"], div[role="button"]');
                        if ($element_play_button.length > 0) {
                            $element_play_button.trigger("click");
                            logger('(reel) Stop video playing #loop, then paused click()');
                        }
                        else {
                            $this.parent().find('.xpgaw4o').removeAttr('style');
                            this.pause();
                            logger('(reel) Stop video playing #loop, then paused pause()');
                        }

                    });
                });
            }

            if (USER_SETTING.HTML5_VIDEO_CONTROL) {

                const handleSwitchController = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    let $overlayElement = null;
                    if ($overlayElement == null) {
                        $overlayElement = $(e.target).parents('div[aria-label][data-visualcompletion="ignore"]').first();
                    }

                    $videos.each(function () {
                        const $v = $(this);
                        $v.css('z-index', '2');
                        $v.attr('controls', true);
                        state.GL_weakCache.overlay.set(this, $overlayElement);
                    });

                    $overlayElement.css('z-index', '-10');
                    $main.find('a[href^="/reels/"]').first().attr("draggable", false);
                };

                $main.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', handleSwitchController);
                $videos.each(function () {
                    const $video = $(this);
                    if (!$video.data('controls')) {

                        logger('(reel) Added video html5 contorller #modify');

                        if (USER_SETTING.MODIFY_VIDEO_VOLUME) {
                            this.volume = state.videoVolume;

                            $video.on('loadstart', function () {
                                this.volume = state.videoVolume;
                            });
                        }

                        let $mute_button_wrapper = $video.parent().find('video + div > div');
                        $mute_button_wrapper = $mute_button_wrapper.add($main);

                        // eslint-disable-next-line no-unused-vars
                        let $element_mute_button = $mute_button_wrapper.find('button[type="button"], div[role="button"]').filter(function (idx) {
                            const $b = $(this);
                            return $b.width() <= 64 && $b.height() <= 64 && $b.find('svg > path[d^="M16.636 7.028a1.5"], svg > path[d^="M1.5 13.3c-.8"]').length > 0;
                        });

                        state.GL_weakCache.mutedButton.set(this, $element_mute_button);

                        let $targets = $video.parent().find('video + div div[role="button"]').filter(function () {
                            const $t = $(this);
                            return $t.parent('div[role="presentation"]').length > 0 && $t.css('cursor') === 'pointer' && $t.attr('style') != null;
                        }).first();

                        $video.on('contextmenu', function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            $video.css('z-index', '-1');
                            $video.removeAttr('controls');
                            $targets.css('z-index', '1');
                            state.GL_weakCache.overlay.get(this)?.css('z-index', '1');
                        });

                        $targets.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', handleSwitchController);

                        $video.on('volumechange', function () {
                            let video = this;
                            let $element_mute_button = state.GL_weakCache.mutedButton.get(this) || {};
                            let is_element_muted = $element_mute_button.find && $element_mute_button.find('svg > path[d^="M16.636"]').length === 0;

                            if (this.muted != is_element_muted) {
                                this.volume = state.videoVolume;

                                if ($element_mute_button.length === 1) {
                                    triggerReactClickHandler($element_mute_button.first()[0]);
                                }
                                else {
                                    let $firstElementMuteButton = $element_mute_button.filter(function () {
                                        return $(this).closest(state.GL_weakCache.overlay.get(video)).length > 0;
                                    }).first();

                                    triggerReactClickHandler($firstElementMuteButton.first()[0]);
                                }
                            }

                            const $v = $(this);
                            if ($v.data('completed')) {
                                state.videoVolume = this.volume;
                                GM_setValue('G_VIDEO_VOLUME', this.volume);
                            }

                            if (this.volume == state.videoVolume) {
                                $v.data('completed', true);
                            }
                        });

                        markContainerPositioned($video);
                        $video.data('controls', true);
                    }
                });
            }

            var $buttonParent = $main.find('div[role="presentation"] > div[role="button"] > div').first();
            toggleVolumeSilder($videos, $buttonParent, 'reel');
        }
    }

    /**
     * createStoryListDOM
     * @description Create a list of story items in the popup dialog.
     *
     * @return {void}
     */
    async function createStoryListDOM(obj, type) {
        try {
            $('.IG_POPUP_DIG #post_info').text(`${type} ID: ${obj.data.reels_media[0].id}`);
            const selector = '.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_BODY';
            // OPTIMIZATION: cache target once
            const $selector = $(selector);

            // OPTIMIZATION: cache reels_media[0] reference
            const reel = obj.data.reels_media[0];
            const items = reel.items;

            items.forEach((item, idx) => {
                let date = new Date().getTime();
                let timestamp = Math.floor(date / 1000);
                let username = reel?.user?.username || reel?.owner?.username;

                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                    timestamp = item.taken_at_timestamp;
                }

                item.display_resources.sort(function (a, b) {
                    if (a.config_width < b.config_width) return 1;
                    if (a.config_width > b.config_width) return -1;
                    return 0;
                });

                if (item.is_video) {
                    $selector.append(`<a media-id="${item.id}" datetime="${timestamp}" data-blob="true" data-needed="direct" data-name="${type}" data-type="mp4" data-username="${username}" data-path="${item.id}" data-globalIndex="${idx + 1}" href="javascript:;" data-href="${item.video_resources[0].src}"><img width="100" src="${item.display_resources[0].src}" /><br/>- <span data-ih-locale-title="VID">${_i18n("VID")}</span> ${idx} -</a>`);
                }
                else {
                    $selector.append(`<a media-id="${item.id}" datetime="${timestamp}" data-blob="true" data-needed="direct" data-name="${type}" data-type="jpg" data-username="${username}" data-path="${item.id}" data-globalIndex="${idx + 1}" href="javascript:;" data-href="${item.display_resources[0].src}"><img width="100" src="${item.display_resources[0].src}" /><br/>- <span data-ih-locale-title="IMG">${_i18n("IMG")}</span> ${idx} -</a>`);
                }
            });

            $selector.find('a').each(function () {
                const $a = $(this);
                $a.wrap('<div></div>');
                $a.before('<label class="inner_box_wrapper"><input class="inner_box" type="checkbox"><span></span></label>');
                $a.after(`<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="newTab">${SVG.NEW_TAB}</div>`);

                if ($a.data('type') == 'mp4') {
                    $a.after(`<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="videoThumbnail">${SVG.THUMBNAIL}</div>`);
                }
            });

            updatePopupSelectionSummary();
            $('.IG_POPUP_DIG #batch_download_selected, .IG_POPUP_DIG #batch_download_direct').prop('disabled', false);
            updateLoadingBar(false);
        }
        catch (err) {
            console.error('createStoryListDOM()', err);
        }
    }

    /**
     * onStoryAll
     * @description Trigger user's story all download event.
     *
     * @return {void}
     */
    async function onStoryAll() {
        updateLoadingBar(true);

        let date = new Date().getTime();
        let timestamp = Math.floor(date / 1000);
        let username = $("body > div section._ac0a header._ac0k ._ac0l a + div a").first().text() || location.pathname.split("/").filter(s => s.length > 0).at(1);

        let userInfo = await getUserId(username);
        let userId = userInfo.user.pk;
        let stories = await getStories(userId, username);

        if (USER_SETTING.DIRECT_DOWNLOAD_STORY) {
            let complete = 0;
            // OPTIMIZATION: cache items array — repeatedly accessed inside setTimeout closures
            const items = stories.data.reels_media[0].items;
            const totalItems = items.length;
            setDownloadProgress(complete, totalItems);

            items.forEach((item, idx) => {
                setTimeout(() => {
                    if (USER_SETTING.RENAME_PUBLISH_DATE) {
                        timestamp = item.taken_at_timestamp;
                    }

                    item.display_resources.sort(function (a, b) {
                        if (a.config_width < b.config_width) return 1;
                        if (a.config_width > b.config_width) return -1;
                        return 0;
                    });

                    if (item.is_video) {
                        saveFiles(item.video_resources[0].src,
                            {
                                username,
                                sourceType: "stories",
                                timestamp,
                                filetype: 'mp4',
                                shortcode: item.id,
                                thumbnailURL: item.display_resources?.[0]?.src
                            }).then(() => {
                                setDownloadProgress(++complete, totalItems);
                            });
                    }
                    else {
                        saveFiles(item.display_resources[0].src, {
                            username,
                            sourceType: "stories",
                            timestamp,
                            filetype: 'jpg',
                            shortcode: item.id
                        }).then(() => {
                            setDownloadProgress(++complete, totalItems);
                        });
                    }
                }, 100 * idx);
            });
        }
        else {
            IG_createDM(false, true);
            createStoryListDOM(stories, 'stories');
        }
    }

    /**
     * getMediaIdOfStoryOrHighlightFromEmbeddedJSON
     * @description Reads the pk of the currently-viewed Story OR Highlight
     *              item straight out of Instagram's own server-rendered
     *              xdt_api__v1__feed__reels_media payload.
     *
     *              For Highlights, the embedded payload is accepted only
     *              when its highlight node id exactly matches the numeric
     *              highlight ID from the current /stories/highlights/<id>/ URL.
     *              This prevents a stale DOM payload from another highlight
     *              being used after client-side navigation.
     *
     *              For Stories, the existing reels_media[0].items shape
     *              remains supported.
     *
     * @param  {Number}  [itemIndex=0] - 0-based index of the Story/Highlight
     *                    item currently visible in the viewer (see
     *                    getCurrentStoryItemIndex()). Defaults to 0.
     * @param  {?String}  [expectedUsername=null] - Expected Story owner. On regular
     *                    Story pages, when omitted, it is derived from the current
     *                    /stories/<username>/... URL and must match the embedded
     *                    payload owner. Ignored for Highlights.
     * @return {?string}  pk of the embedded item, or null if absent/unparseable or
     *                    the Story owner does not match the current URL.
     */
    function getMediaIdOfStoryOrHighlightFromEmbeddedJSON(itemIndex = 0, expectedUsername = null) {
        const idx = Number.isInteger(itemIndex) && itemIndex >= 0 ? itemIndex : 0;
        const isHighlightPage = location.pathname.startsWith('/stories/highlights/');

        // For regular Stories, always derive the expected owner from the current
        // /stories/<username>/... URL when the caller did not provide one. This
        // prevents a stale embedded payload from another user's story tray from
        // being accepted merely because it contains a valid reels_media item.
        if (!isHighlightPage && !expectedUsername) {
            const pathParts = location.pathname.split('/').filter(Boolean);
            if (pathParts[0] === 'stories' && pathParts[1]) {
                expectedUsername = decodeURIComponent(pathParts[1]);
            }
        }
        const highlightId = isHighlightPage
            ? location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).at(-1)
            : null;
        const expectedHighlightNodeId = /^\d+$/.test(highlightId || '')
            ? `highlight:${highlightId}`
            : null;

        function findKeyDeep(obj, key, depth = 12) {
            if (!obj || typeof obj !== 'object' || depth < 0) return undefined;
            if (Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];

            for (const k in obj) {
                const val = obj[k];
                if (val && typeof val === 'object') {
                    const found = findKeyDeep(val, key, depth - 1);
                    if (found !== undefined) return found;
                }
            }

            return undefined;
        }

        /*
         * extractPkFromCompositeStoryId: some single-item Story payloads omit
         * "pk" entirely and only carry a composite "id" shaped like
         * "<pk>_<userId>" (e.g. "3980127151482536531_4032195876"). Returns
         * the numeric part before the first underscore, or null if the id
         * doesn't match that shape.
         */
        function extractPkFromCompositeStoryId(id) {
            if (typeof id !== 'string') return null;

            const underscorePos = id.indexOf('_');
            if (underscorePos === -1) return null;

            const candidate = id.slice(0, underscorePos);
            return /^\d+$/.test(candidate) ? candidate : null;
        }

        /*
         * getDirectItemPk: resolves an item's own "pk" (never item.user.pk).
         * Falls back to extractPkFromCompositeStoryId() whenever an item
         * has no "pk" of its own but does have a composite "id" — this
         * fallback only ever activates in the absence of a direct "pk", so
         * it applies the same way to both Stories and Highlights.
         */
        function getDirectItemPk(item) {
            if (!item || typeof item !== 'object') return null;
            if (Object.prototype.hasOwnProperty.call(item, 'pk')) return item.pk;

            return extractPkFromCompositeStoryId(item.id);
        }

        /*
         * countDirectItemPks: counts how many entries in the `items` array
         * resolve to a usable, item-level pk via getDirectItemPk() — i.e.
         * their OWN "pk" (deliberately ignoring anything nested deeper, like
         * item.user.pk), or the composite-id fallback above. Used to tell
         * whether the embedded payload actually reaches as far as the item
         * we need — IG's server-rendered payload is not guaranteed to
         * contain every item of a long Highlight/Story, so a raw
         * items.length check would still trust an array that looks
         * complete but silently stops short of the visible item.
         */
        function countDirectItemPks(items) {
            if (!Array.isArray(items)) return 0;
            return items.reduce((count, item) => (
                count + (getDirectItemPk(item) ? 1 : 0)
            ), 0);
        }

        /*
         * FIX (truncated data-sjs recovery): large Highlights (many items,
         * each with a huge video_dash_manifest) can get cut off mid-string
         * by IG's own rendering — the tag's real textContent.length ends up
         * shorter than its own data-content-len attribute says it should
         * be. JSON.parse() on such a tag always throws, even though the
         * item we actually need (index 0's pk) usually sits well BEFORE the
         * point of truncation. This does a narrow string-search recovery
         * for that one specific, common case — first item only, Highlight
         * pages only, since the node.id used to pick the right edge is also
         * near the front of the string. Anything else (itemIndex > 0, or a
         * truncated Story tag) safely returns null and falls through to
         * resolveMediaIdOfStoryOrHighlightByTimestamp() same as before.
         */
        function recoverFirstItemPkFromTruncatedHighlight(text, nodeIdMarker) {
            const nodePos = text.indexOf(nodeIdMarker);
            if (nodePos === -1) return null;

            const itemsMarker = '"items":[';
            const itemsPos = text.indexOf(itemsMarker, nodePos);
            if (itemsPos === -1) return null;

            const slice = text.slice(itemsPos + itemsMarker.length, itemsPos + itemsMarker.length + 200);
            const m = slice.match(/^\{"pk":"(\d+)"/);
            return m ? m[1] : null;
        }

        let result = null;

        $('script[type="application/json"][data-sjs]').each(function () {
            if (result) return;

            const text = $(this).text();
            if (!text.includes('xdt_api__v1__feed__reels_media')) return;

            try {
                const parsed = JSON.parse(text);
                const reelsMedia = findKeyDeep(parsed, isHighlightPage ? 'xdt_api__v1__feed__reels_media__connection' : 'xdt_api__v1__feed__reels_media')
                                || findKeyDeep(parsed, 'xdt_api__v1__feed__reels_media')
                                || findKeyDeep(parsed, 'xdt_api__v1__feed__reels_media__connection');
                if (!reelsMedia) return;

                let items = null;

                if (isHighlightPage) {
                    // A Highlight payload may remain in the DOM after SPA navigation.
                    // Accept it only when the embedded node belongs to the current URL.
                    if (!expectedHighlightNodeId) return;

                    const edges = reelsMedia?.edges;
                    const matchingEdge = Array.isArray(edges)
                        ? edges.find(edge => String(edge?.node?.id ?? '') === expectedHighlightNodeId)
                        : null;

                    if (!matchingEdge) {
                        logger('[getMediaIdOfStoryOrHighlightFromEmbeddedJSON]', 'stale/mismatched highlight node, expected:', expectedHighlightNodeId, 'edges:', edges?.map(e => e?.node?.id));
                        return;
                    }

                    items = matchingEdge.node?.items;
                }
                else {
                    items = reelsMedia?.reels_media?.[0]?.items;

                    const ownerUsername = reelsMedia?.reels_media?.[0]?.user?.username;
                    if (expectedUsername) {
                        if (!ownerUsername || ownerUsername.toLowerCase() !== expectedUsername.toLowerCase()) {
                            logger('[getMediaIdOfStoryOrHighlightFromEmbeddedJSON]', 'stale/mismatched story owner, expected:', expectedUsername, 'got:', ownerUsername ?? null);
                            return;
                        }
                    }
                }

                const pkCount = countDirectItemPks(items);

                if (idx >= pkCount) {
                    logger('[getMediaIdOfStoryOrHighlightFromEmbeddedJSON]', 'payload incomplete: only', pkCount, 'direct pk(s) present, requested index:', idx);
                    return;
                }

                const item = items[idx];
                const pk = getDirectItemPk(item);

                if (pk) result = String(pk);
            }
            catch (e) {
                const declaredLen = parseInt(this.getAttribute('data-content-len') || '', 10);
                const isTruncated = Number.isFinite(declaredLen) && text.length < declaredLen;

                logger('[getMediaIdOfStoryOrHighlightFromEmbeddedJSON]', isTruncated ? 'tag truncated:' : 'tag not parseable, len:', text.length, isTruncated ? `/ ${declaredLen}` : e.message);

                if (isTruncated && isHighlightPage && idx === 0 && expectedHighlightNodeId) {
                    const recoveredPk = recoverFirstItemPkFromTruncatedHighlight(text, `"id":"${expectedHighlightNodeId}"`);
                    if (recoveredPk) {
                        logger('[getMediaIdOfStoryOrHighlightFromEmbeddedJSON]', 'recovered pk from truncated tag:', recoveredPk);
                        result = recoveredPk;
                    }
                }
            }
        });

        if (result) {
            logger('[getMediaIdOfStoryOrHighlightFromEmbeddedJSON]', 'found:', result, 'at index:', idx);
        }

        return result;
    }

    /**
     * getCurrentStoryItemIndex
     * @description Resolves the 0-based index of the Story/Highlight item
     *              currently visible in the viewer, read from Instagram's
     *              own progress-bar segments — the same data
     *              IG_DWSTORY_POSITION (setStoryProgressIndexText/
     *              getStoryProgressIndex) uses to show "current/total".
     *              Used so getMediaIdOfStoryOrHighlightFromEmbeddedJSON()
     *              picks the item matching what's on screen instead of
     *              always assuming the first one in the embedded payload.
     *
     * @param  {String}  username - Story/Highlight owner's username
     * @return {?Number}          - 0-based index, or null if undetermined
     *                    (no progress bar found — caller should fall back
     *                    to index 0)
     */
    function getCurrentStoryItemIndex(username) {
        const $header = getStoryProgress(username);
        const progress = getStoryProgressIndex($header);

        return progress ? progress.current - 1 : null;
    }

    /**
     * getVisibleStoryTimestamp
     * @description Captures the currently visible Story/Highlight <time datetime>
     *              value before any asynchronous API request can change the DOM.
     *              The captured Unix timestamp is later passed to the media-id
     *              resolver so it does not re-read a potentially changed Story.
     *
     * @return {?Number} Unix timestamp in seconds, or null if unavailable/invalid
     */
    function getVisibleStoryTimestamp() {
        const $time = $(
            'body > div section:visible time[datetime]'
        ).filter(function () {
            const $this = $(this);
            return (
                $this.is(':visible') &&
                $this.closest('a[href^="/stories/highlights/"]').length === 0 &&
                $this.closest('[role="button"]').length === 0
            );
        }).first();

        if ($time.length === 0) return null;

        const visibleTs = Math.floor(new Date($time.attr('datetime')).getTime() / 1000);
        return Number.isFinite(visibleTs) && visibleTs !== 0
            ? visibleTs
            : null;
    }

    /**
     * resolveMediaIdOfStoryOrHighlightByTimestamp
     * @description Identifies the currently visible Story or Highlight item by
     *              comparing a timestamp captured from the viewer DOM before
     *              the API request with the timestamps in the fetched items.
     *              More reliable than index-based DOM mapping because it does
     *              not depend on CSS class names or progress-bar structure.
     *
     * @param  {Object}  mediaResponse - Full getStories() / getHighlightStories()
     *                    / getReelsMedia() response
     * @param  {?Number} visibleTs     - Timestamp captured before the API request
     * @return {?String}                - Best-matching item id, or null if undetermined
     */
    function resolveMediaIdOfStoryOrHighlightByTimestamp(mediaResponse, visibleTs) {
        const items = mediaResponse?.data?.reels_media?.[0]?.items;
        if (!items || items.length === 0) return null;
        if (!Number.isFinite(visibleTs) || visibleTs === 0) return null;

        let bestId = null;
        let minDiff = Infinity;

        items.forEach(item => {
            const itemTimestamp = item.taken_at ?? item.taken_at_timestamp ?? 0;
            const diff = Math.abs(itemTimestamp - visibleTs);
            if (diff < minDiff) {
                minDiff = diff;
                bestId = item.pk ?? item.id;
            }
        });

        logger('[resolveMediaIdOfStoryOrHighlightByTimestamp]', 'best match:', bestId, 'diff(s):', minDiff);
        return bestId;  // always return best match, better than any index heuristic
    }

    /**
     * getVisibleImageMediaId
     * @description DOM-derived last-resort candidate: extracts a mediaId
     *              from the ig_cache_key query param of the currently-visible
     *              <img> in the Story/Highlight viewer (same technique v4
     *              used). Works for the visible resource regardless of
     *              whether it turns out to be a photo or a video item —
     *              IG still renders a poster-like <img> either way — so it
     *              is used by both onStory() and onHighlightsStory(), which
     *              each handle photo AND video items in one function.
     *              Tried only when both the DOM JSON fast path
     *              (getMediaIdOfStoryOrHighlightFromEmbeddedJSON) and
     *              resolveMediaIdOfStoryOrHighlightByTimestamp() found
     *              nothing.
     *
     * @return {?String} mediaId decoded from the visible <img>, or null if none found
     */
    function getVisibleImageMediaId() {
        let domSrcset = $('body > div section:visible img[referrerpolicy][class], body > div section:visible img[crossorigin][class]:not([alt])').attr('srcset')?.split(',')[0]?.split(' ')[0];

        let domLink = (domSrcset)
            ? domSrcset
            : $('body > div section:visible img[referrerpolicy][class], body > div section:visible img[crossorigin][class]:not([alt])').filter(function () {
                const $this = $(this);
                return $this.parents('a').length === 0 && $this.width() === $this.parent().width();
            }).attr('src');

        if (!domLink) {
            // _aa63 mean stories picture in stories page (not avatar)
            let $domElement = $('body > div section:visible img._aa63');
            domLink = ($domElement.attr('srcset'))
                ? $domElement.attr('srcset')?.split(',')[0]?.split(' ')[0]
                : $domElement.attr('src');
        }

        return domLink ? getStoryId(domLink) : null;
    }

    /**
     * getVisibleVideoPosterMediaIds
     * @description DOM-derived last-resort candidate(s): the currently-visible
     *              <video>'s <video src="blob:..."> has no ig_cache_key of
     *              its own, but its `poster` attribute IS a real IG image
     *              URL that does carry one, decoded via mediaIdFromURL()
     *              (same technique v4 used, and the same one onReels() uses
     *              for Reel thumbnails). Shared between onStoryThumbnail()
     *              and onHighlightsStoryThumbnail(), which both target VIDEO
     *              items specifically. Tried only when both the DOM JSON
     *              fast path (getMediaIdOfStoryOrHighlightFromEmbeddedJSON)
     *              and resolveMediaIdOfStoryOrHighlightByTimestamp() found
     *              nothing.
     *
     * @return {String[]} deduplicated mediaIds, in DOM order, decoded from
     *                    every currently-visible <video>'s poster (may be empty)
     */
    function getVisibleVideoPosterMediaIds() {
        const posterMediaIds = [];
        const seenIds = new Set();

        $('body > div section:visible video').each(function () {
            const poster = this.getAttribute('poster') || this.poster;
            if (!poster) return;

            const domMediaId = mediaIdFromURL(poster);
            if (!domMediaId || seenIds.has(domMediaId)) return;

            seenIds.add(domMediaId);
            posterMediaIds.push(domMediaId);
        });

        return posterMediaIds;
    }

    /**
     * markContainerPositioned / restoreMarkedContainers
     * @description FIX (freeze when story buttons spawn): onStory()
     *              used to unconditionally force position:relative on Instagram's
     *              NATIVE container (needed to absolutely position our buttons
     *              inside it) without ever restoring it.
     *              This meant that on EVERY navigation between stories, at the
     *              exact moment Instagram was building/rendering the container
     *              (i.e. the exact window described as "when the buttons spawn"),
     *              we changed its stacking context live — creating a real risk of
     *              colliding with Instagram's own invisible click zones
     *              (prev/next) if the change happened while Instagram was still
     *              initializing that element.
     *
     *              markContainerPositioned() applies position:relative ONLY
     *              if the element does not already have a computed position other
     *              than static (so we do not perform a redundant mutation every
     *              time), and marks the element as "ours" with an attribute.
     *              restoreMarkedContainers() restores those elements to their
     *              initial state — called at every point where we remove the
     *              buttons (including navigation between stories and leaving
     *              the page).
     *
     * @param  {jQuery}  $el
     * @return {void}
     */
    function markContainerPositioned($el) {
        if (!$el || $el.length === 0) {
            return;
        }

        $el.each(function () {
            const $this = $(this);

            if ($this.attr('data-ihelper-owns-position') === '1') {
                return;
            }

            if ($this.css('position') === 'static') {
                $this.attr('data-ihelper-owns-position', '1');
                $this.css('position', 'relative');
            }
        });
    }

    function restoreMarkedContainers() {
        $('[data-ihelper-owns-position="1"]').each(function () {
            $(this).css('position', '').removeAttr('data-ihelper-owns-position');
        });
    }


    /**
     * getHighlightButtonContainer
     * @description Resolve the container element where onHighlightsStory(false)
     *              attaches the .IG_DWHISTORY button, using the same fallback chain
     *              onHighlightsStory() uses. Extracted for the same reason as
     *              getStoryButtonContainer() below: so the persistent watcher
     *              (startStoryButtonObserver) and onHighlightsStory() can never
     *              disagree about where the button belongs.
     *
     *              Note: position:relative is applied only on the "single story
     *              layout mode" fallback branch, matching the original inline
     *              logic exactly (the section._ac0a branch and the div-layout-mode
     *              branch never had it applied either) — this is a preserved quirk
     *              of the original code, not a new behavior.
     *
     * @return {jQuery}  Empty jQuery object if no container is currently resolvable.
     */
    function getHighlightButtonContainer() {
        let $element = null;

        // Default detector (section layout mode)
        if ($('body > div section._ac0a').length > 0) {
            $element = $('body > div section:visible._ac0a');
        }
        else {
            $element = $('body > div section:visible > div > div[style]:not([class])');
            markContainerPositioned($element);
        }

        // Detector for div layout mode
        if ($element.length === 0) {
            let $$element = $('body > div div:not([hidden]) section:visible > div div[class][style] > div[style]:not([class])');
            let nowSize = 0;

            $$element.each(function () {
                const $this = $(this);
                const width = $this.width();

                if (width > nowSize) {
                    nowSize = width;
                    $element = $this.children('div').first();
                }
            });
        }

        return $element != null ? $element.first() : $();
    }

    /**
     * getStoryButtonContainer
     * @description Resolve the container element where onStory(false) attaches the
     *              .IG_DWSTORY button, using the same fallback chain onStory() uses.
     *              Extracted so the persistent watcher (startStoryButtonObserver)
     *              can watch/verify the exact container, instead of the whole mount tree,
     *              and so onStory() and the watcher can never disagree about where the
     *              button belongs.
     *
     * @return {jQuery}  Empty jQuery object if no container is currently resolvable.
     */
    function getStoryButtonContainer() {
        let $element = null;

        // Default detector (section layout mode)
        if ($('body > div section._ac0a').length > 0) {
            $element = $('body > div section:visible._ac0a');
        }
        // detector (single story layout mode)
        else {
            $element = $('body > div section:visible > div > div[style]:not([class])');
        }

        if ($element.length === 0) {
            $element = $('div[id^="mount"] section > div > a[href="/"]').parent().parent().parent().find('section:visible > div > div[style]:not([class])');
        }

        if ($element.length === 0) {
            $element = $('div[id^="mount"] section > div > a[href="/"]').parent().parent().parent().find('section:visible > div div[style]:not([class]) > div:not([data-visualcompletion="loading-state"])');
        }

        if ($element.length === 0) {
            $element = $('div[id^="mount"] section > div a[href="/"]').parents('section:visible').find('div[style]:not([class])');
        }

        // Detecter for div layout mode
        if ($element.length === 0) {
            let $$element = $('body > div div:not([hidden]) section:visible > div div[class][style] > div[style]:not([class])');
            let nowSize = 0;

            $$element.each(function () {
                const $this = $(this);
                const width = $this.width();

                if (width > nowSize) {
                    nowSize = width;
                    $element = $this.children('div').first();
                }
            });
        }

        return $element != null ? $element.first() : $();
    }

    /**
     * startStoryButtonObserver
     * @description Keeps the .IG_DWSTORY (stories) or .IG_DWHISTORY (highlights)
     *              button present while browsing either, driven purely by DOM
     *              content changes — NOT by Main Timer's location.href polling.
     *              This matters because Instagram sometimes swaps the visible
     *              content before (or well after) it actually updates the URL via
     *              pushState — this happens both between individual stories AND
     *              between highlight trays; any fix gated on "URL just changed"
     *              misses those cases, since the button-attach logic would never
     *              run for them. This observer stays connected for as long as the
     *              user is browsing stories/highlights (started once, left running
     *              across Next/Back and across highlight-tray scrolling), and on
     *              every settled batch of mutations (debounced ~80ms so rapid
     *              navigation doesn't cause layout thrashing) checks: are we still
     *              on a story or highlight page, is the relevant button missing,
     *              and is its container now resolvable — if so, attach it. No
     *              dependency on which URL was current when the check was
     *              scheduled.
     *
     * @return {void}
     */
    function startStoryButtonObserver() {
        // Idempotent — Main Timer can call this on every tick while on a story or
        // highlight page without spawning duplicate observers.
        if (state.storyButtonObserver) {
            return;
        }

        const mountRoot = $('div[id^="mount"]')[0];
        if (!mountRoot) {
            return;
        }

        state.storyButtonObserver = new MutationObserver(() => {
            clearTimeout(state.storyButtonObserverDebounce);
            state.storyButtonObserverDebounce = setTimeout(() => {
                const isHighlight = location.pathname.startsWith('/stories/highlights/');
                const isStory = !isHighlight && location.pathname.startsWith('/stories/');

                // Bail if we've since left both story and highlight view entirely.
                if (!isStory && !isHighlight) {
                    return;
                }

                if (isHighlight) {
                    if ($('.IG_DWHISTORY').length > 0) {
                        // Button already attached — just keep the position counter in
                        // sync with Instagram's own progress bar as it advances. Safe
                        // to call on every settled batch: setStoryProgressIndexText no
                        // longer removes the counter reactively, it only updates the
                        // text once fresh, valid progress data is available.
                        setStoryProgressIndexByUsername($('.IG_DWHISTORY').parent(), getHighlightsStoryUsername(), 'IG_DWHISTORY_POSITION');
                        updateHighlightThumbnailButton();
                        return;
                    }

                    const $container = getHighlightButtonContainer();
                    if ($container.length === 0) {
                        // DOM not settled yet for this content change — the next
                        // mutation will re-trigger this same check.
                        return;
                    }

                    logger('(highlight) storyButtonObserver: button missing, attaching');
                    onHighlightsStory(false);

                    // Switching to a different user's stories rebuilds the container,
                    // and right at that moment the new header/username may not have
                    // fully rendered yet, so the very first counter read can come back
                    // empty. These follow-up reads don't depend on another DOM mutation
                    // happening to retrigger this observer — they just retry directly.
                    [100, 300, 600].forEach(delay => {
                        setTimeout(() => {
                            if (location.pathname.startsWith('/stories/highlights/')) {
                                setStoryProgressIndexByUsername($('.IG_DWHISTORY').parent(), getHighlightsStoryUsername(), 'IG_DWHISTORY_POSITION');
                            }
                        }, delay);
                    });

                    return;
                }

                if ($('.IG_DWSTORY').length > 0) {
                    // Button already attached — just keep the position counter in
                    // sync with Instagram's own progress bar as it advances. Same
                    // reasoning as the highlight branch above.
                    const username = $("body > div section._ac0a header._ac0k ._ac0l a + div a").first().text() || location.pathname.split("/").filter(s => s.length > 0).at(1);
                    setStoryProgressIndexByUsername($('.IG_DWSTORY').parent(), username, 'IG_DWSTORY_POSITION');
                    updateStoryThumbnailButton();
                    return;
                }

                const $container = getStoryButtonContainer();
                if ($container.length === 0) {
                    // DOM not settled yet for this content change — the next
                    // mutation (there will be one, since the story is still
                    // rendering) will re-trigger this same check.
                    return;
                }

                logger('(story) storyButtonObserver: button missing, attaching');
                onStory(false);

                // Same reasoning as the highlight branch above: switching to a
                // different user's stories rebuilds the container, and the new
                // header/username may not be settled yet on the first read.
                [100, 300, 600].forEach(delay => {
                    setTimeout(() => {
                        if (!location.pathname.startsWith('/stories/highlights/') && location.pathname.startsWith('/stories/')) {
                            const username = $("body > div section._ac0a header._ac0k ._ac0l a + div a").first().text() || location.pathname.split("/").filter(s => s.length > 0).at(1);
                            setStoryProgressIndexByUsername($('.IG_DWSTORY').parent(), username, 'IG_DWSTORY_POSITION');
                        }
                    }, delay);
                });
            }, 80);
        });

        state.storyButtonObserver.observe(mountRoot, {
            childList: true,
            subtree: true
        });
    }

    /**
     * stopStoryButtonObserver
     * @description Disconnects the persistent story-button observer started by
     *              startStoryButtonObserver(). Called when navigating away from
     *              stories entirely.
     *
     * @return {void}
     */
    function stopStoryButtonObserver() {
        state.storyButtonObserver?.disconnect();
        state.storyButtonObserver = null;
        clearTimeout(state.storyButtonObserverDebounce);
    }


    /**
     * onStory
     * @description Trigger user's story download event or button display event.
     *
     * @param  {Boolean}  isDownload - Check if it is a download operation
     * @param  {Boolean}  isForce - Force a fresh Reels Media API tray fetch
     *                    instead of reusing state.GL_dataCache.stories. Does
     *                    NOT bypass the persistent media cache — a cached
     *                    resource is still served with no API call at all.
     * @param  {Boolean}  isPreview - Check if it is need to open new tab
     * @return {void}
     */
    async function onStory(isDownload, isForce, isPreview, isInternalRetry) {
        var username = $("body > div section._ac0a header._ac0k ._ac0l a + div a").first().text() || location.pathname.split("/").filter(s => s.length > 0).at(1);

        if (isDownload) {
            // FIX (freeze during rapid story navigation): a simple mutex
            // prevents two concurrent downloads from overlapping (rapid clicks
            // + Alt+S on successive stories). isInternalRetry=true is used only
            // by this function's own internal retries (see below) and does not
            // re-acquire the mutex / loading bar, preventing a self-deadlock.
            if (!isInternalRetry) {
                if (state.storyDownloadInProgress) {
                    logger('onStory', 'Download already in progress, ignoring additional call');
                    return;
                }

                state.storyDownloadInProgress = true;
                updateLoadingBar(true);
            }

            let date = new Date().getTime();
            let timestamp = Math.floor(date / 1000);

            // FIX: the entire download logic is now wrapped in a
            // try/catch/finally. Previously, an unexpected exception anywhere in this
            // long chain (e.g. userInfo being null during rate limiting) could skip
            // updateLoadingBar(false) permanently, leaving it stuck. The loading bar
            // and mutex are now guaranteed to reset regardless of how the function
            // exits.
            try {
            if ((USER_SETTING.FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS || (isPreview && USER_SETTING.NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS)) && !state.tempFetchRateLimitReels) {
                let mediaId = null;

                const urlID = location.pathname
                    .split('/')
                    .filter(s => s.length > 0 && /^\d{10,}$/.test(s))
                    .at(-1);

                /*
                 * Candidate mediaId gathering, run BEFORE any Reels Media API
                 * call, in priority order:
                 *   1) numeric mediaId embedded in the Story URL (urlID)
                 *   2) DOM JSON fast path — mandatory whenever the URL
                 *      carries no numeric mediaId. Reads the pk straight out
                 *      of IG's own embedded reels_media payload
                 *      (getMediaIdOfStoryOrHighlightFromEmbeddedJSON), so it
                 *      works for video Stories too (unlike the ig_cache_key
                 *      technique below, which needs an <img>).
                 *   3) resolveMediaIdOfStoryOrHighlightByTimestamp() — tried
                 *      further below, once the Reels Media API response is
                 *      available (it needs the fetched items to compare
                 *      timestamps against, so it cannot run in this
                 *      pre-fetch section).
                 *   4) DOM-derived id from the currently visible <img>, via
                 *      its `ig_cache_key` query param (getVisibleImageMediaId(),
                 *      same technique v4 used) — last-resort local fallback
                 *      for picture Stories, tried further below only once
                 *      steps 1-3 all yielded nothing.
                 *
                 * candidateIds here is used ONLY for the local media-cache
                 * lookup right below — it intentionally also includes the
                 * step-4 candidate (domMediaId), since checking the cache is
                 * a pure optimization independent of resolution priority: if
                 * ANY candidate is already cached, we can avoid the Reels
                 * Media API call entirely, regardless of that candidate's
                 * priority. Priority order only matters for which candidate
                 * becomes the AUTHORITATIVE mediaId when nothing is cached
                 * (see below) — there, domMediaId (step 4) is deliberately
                 * excluded, and is only used after step 3 fails post-fetch.
                 *
                 * FIX (domJsonMediaId gated on CAPTURE_IMAGE_VIA_MEDIA_CACHE):
                 * candidate gathering now always runs, even with that setting
                 * off. Reading the DOM JSON fast path (2) is strictly more
                 * precise than the progress-bar position match done further
                 * below (last resolution step) — it's a real pk from IG's own
                 * payload, not an inferred DOM index — so there's no reason
                 * to withhold it just because caching is disabled. Only the
                 * actual cache lookup (which candidate, if any, is already
                 * downloaded) stays behind that setting; the mediaId itself,
                 * when resolvable, is used either way. No media-type test is
                 * done for the cache lookup: if a candidate is cached, that
                 * cached resource is served regardless of whether the Story
                 * is currently an image or a video. Only if none of the
                 * candidates are cached (or caching is off) do we fall
                 * through to getUserId()/getReelsMedia() below.
                 *
                 * FIX (isForce bypassed the cache): this must run regardless
                 * of isForce. isForce=true (e.g. .IG_DWNEWTAB, which calls
                 * onStory(true, true, true)) means "force a fresh tray fetch
                 * below, don't reuse state.GL_dataCache.stories" — it never
                 * meant "skip a resource we already have cached". Gating this
                 * check on !isForce made New Tab always hit the Reels Media
                 * API even when the exact mediaId was already cached.
                 */
                const candidateIds = [];
                let domJsonMediaId = null;
                let domMediaId = null;
                const visibleStoryTimestamp = getVisibleStoryTimestamp();

                if (urlID) {
                    candidateIds.push(urlID);
                }
                else {
                    // FIX (always read reels_media[0].items[0]): the embedded
                    // payload lists ALL of the user's story items, but only the
                    // one matching the visible progress-bar segment
                    // (IG_DWSTORY_POSITION, e.g. "1/2") is the one actually on
                    // screen. Resolve that index first so multi-story trays
                    // don't always resolve to the first item.
                    const storyItemIndex = getCurrentStoryItemIndex(username);
                    domJsonMediaId = getMediaIdOfStoryOrHighlightFromEmbeddedJSON(storyItemIndex ?? 0, username);
                    if (domJsonMediaId) candidateIds.push(domJsonMediaId);

                    domMediaId = getVisibleImageMediaId();
                    if (domMediaId) candidateIds.push(domMediaId);
                }

                const currentStoryHasVideo = $('body > div section:visible video[playsinline]').length > 0;

                if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                    for (const candidateId of candidateIds) {
                        const cached = getImageFromCache(candidateId);

                        if (cached && !currentStoryHasVideo) {
                            logger("[Restore Cached onStory]", candidateId);

                            if (isPreview) {
                                openNewTab(cached);
                            }
                            else {
                                saveFiles(cached, {
                                    username,
                                    sourceType: "stories",
                                    timestamp,
                                    filetype: 'jpg',
                                    shortcode: candidateId
                                });
                            }

                            return;
                        }
                    }

                    /*
                     * Nothing cached — keep the best AUTHORITATIVE local
                     * candidate (if any) as a known mediaId for the Reels
                     * Media API fallback below, so it isn't re-derived from
                     * scratch. domMediaId (step 4, the ig_cache_key trick)
                     * is deliberately NOT considered here — see the
                     * resolution-priority note above.
                     */
                    if (urlID) {
                        mediaId = urlID;
                    }
                    else if (domJsonMediaId) {
                        mediaId = domJsonMediaId;
                    }
                }
                else if (domJsonMediaId) {
                    /*
                     * CAPTURE_IMAGE_VIA_MEDIA_CACHE off — no cache lookup, but
                     * we already have a precise pk straight from IG's own
                     * embedded reels_media JSON. Use it directly instead of
                     * falling through to the resolution chain below, which
                     * only kicks in once resolveMediaIdOfStoryOrHighlightByTimestamp()
                     * and domMediaId (step 4) also fail to resolve anything.
                     */
                    mediaId = domJsonMediaId;
                }

                /*
                 * Reels Media API path. Only reached once the cache
                 * verification step above found nothing cached (or
                 * CAPTURE_IMAGE_VIA_MEDIA_CACHE is off).
                 */
                let stories;

                /*
                 * Session tray cache. getReelsMedia() has no caching of its own,
                 * so state.GL_dataCache.stories[username] — the same in-session
                 * tray cache used by the highlights branches above — is reused
                 * here, avoiding a re-fetch when the tray for this username was
                 * already fetched in the current session and isForce was not
                 * requested.
                 */
                if (!isForce && state.GL_dataCache.stories[username]) {
                    logger('[Reels Media API]', 'Fetch from memory cache:', username);
                    stories = state.GL_dataCache.stories[username];
                }
                else {
                    try {
                        const userInfo = await getUserId(username);
                        const userId = userInfo?.user?.pk ?? userInfo?.user?.id;

                        if (!userId) {
                            throw new Error(`Could not resolve userId for @${username}`);
                        }

                        stories = await getReelsMedia(String(userId), username);

                        // Persist the freshly-fetched tray so subsequent onStory() calls
                        // for the same username reuse it instead of re-hitting the API.
                        state.GL_dataCache.stories[username] = stories;
                    }
                    catch (err) {
                        logger('[Reels Media API]', 'getStories() failed', err);

                        if (USER_SETTING.FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED) {
                            state.tempFetchRateLimitReels = true;
                            await onStory(isDownload, isForce, isPreview, true);
                        }
                        else {
                            alert('Fetch failed from Reels Media API.');
                        }

                        return;
                    }
                }

                const items = stories?.data?.reels_media?.[0]?.items || [];

                /*
                 * 1) Match directly by story media ID from URL. Only
                 * reached when the cache-verification step above did not
                 * already resolve a mediaId (isForce, cache disabled, or no
                 * local candidate at all).
                 */
                if (mediaId == null) {
                    items.forEach(item => {
                        if ((item.pk ?? item.id) == urlID) {
                            mediaId = item.pk ?? item.id;
                        }
                    });
                }

                /*
                 * 2) resolveMediaIdOfStoryOrHighlightByTimestamp() — only
                 * reachable here when neither urlID nor the DOM JSON fast
                 * path (domJsonMediaId) resolved anything above. Compares
                 * the visible <time> element against the items just fetched.
                 */
                if (mediaId == null) {
                    mediaId = resolveMediaIdOfStoryOrHighlightByTimestamp(stories, visibleStoryTimestamp);
                }

                /*
                 * 3) DOM-derived id from the currently visible <img>
                 * (domMediaId, the ig_cache_key trick — already computed in
                 * the pre-fetch candidate gathering above). Last local
                 * resort before falling back to pure DOM-position matching
                 * below.
                 */
                if (mediaId == null && domMediaId) {
                    mediaId = domMediaId;
                }

                /*
                 * 4) Fallback to visible Story progress.
                 *
                 * FIX (align with onStoryThumbnail): guard added so the loop
                 * keeps the FIRST matching segment instead of letting a
                 * later one silently overwrite mediaId (could happen if two
                 * segments briefly both read as "filled" mid-transition).
                 */
                if (mediaId == null) {
                    let $header = getStoryProgress(username);

                    $header.each(function (index) {
                        if (mediaId) return;

                        if ($(this).children().length > 0 && items[index]) {
                            mediaId = items[index].pk ?? items[index].id;
                        }
                    });
                }

                /*
                 * 5) Fallback to the old profile-page layout.
                 * 6) Fallback to the home-page layout.
                 *
                 * FIX (align with onStoryThumbnail): both loops guarded so
                 * they keep the FIRST matching segment instead of letting a
                 * later one silently overwrite mediaId.
                 */
                if (mediaId == null) {
                    $('body > div section:visible div.x1ned7t2.x78zum5 > div').each(function (index) {
                        if (mediaId) return;

                        const $this = $(this);

                        if ($this.hasClass('x1lix1fw')) {
                            if ($this.children().length > 0 && items[index]) {
                                mediaId = items[index].pk ?? items[index].id;
                            }
                        }
                    });

                    $('body > div section:visible ._ac0k > ._ac3r > div').each(function (index) {
                        if (mediaId) return;

                        if ($(this).children().hasClass('_ac3q') && items[index]) {
                            mediaId = items[index].pk ?? items[index].id;
                        }
                    });
                }

                if (mediaId == null) {
                    mediaId = location.pathname
                        .split('/')
                        .filter(s => s.length > 0 && s.match(/^([0-9]{10,})$/))
                        .at(-1);
                }

                // Resolve the story item from the already-fetched reels_media payload.
                const resolvedMediaItem = items.find(item => String(item.pk ?? item.id) === String(mediaId));

                const result = {
                    status: resolvedMediaItem ? 'ok' : 'fail',
                    items: resolvedMediaItem ? [resolvedMediaItem] : [],
                    message: resolvedMediaItem
                        ? ''
                        : 'Media item not found in getReelsMedia() cache for id ' + mediaId
                };

                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                    timestamp = result.items?.[0]?.taken_at ?? timestamp;
                }

                if (result.status === 'ok') {
                    const mediaItem = result.items[0];

                    if (isReelsMediaVideo(mediaItem)) {
                        // onStory's Reels Media API branch — tag as reels_media.
                        const handled = await tryHandleDashFromMediaItem({
                            mediaItem: mediaItem,
                            username,
                            sourceType: "stories",
                            timestamp,
                            shortcode: mediaId,
                            isPreview,
                        });

                        if (handled) {
                            return;
                        }

                        if (isPreview) {
                            openNewTab(mediaItem.video_versions[0].url);
                        }
                        else {
                            saveFiles(mediaItem.video_versions[0].url, {
                                username,
                                sourceType: "stories",
                                timestamp,
                                filetype: 'mp4',
                                shortcode: mediaId,
                                thumbnailURL: mediaItem.image_versions2?.candidates?.[0]?.url
                            });
                        }
                    }
                    else {
                        if (isPreview) {
                            openNewTab(mediaItem.image_versions2.candidates[0].url);
                        }
                        else {
                            saveFiles(mediaItem.image_versions2.candidates[0].url, {
                                username,
                                sourceType: "stories",
                                timestamp,
                                filetype: 'jpg',
                                shortcode: mediaId
                            });
                        }
                    }
                }
                else {
                    alert('Fetch failed from Reels Media API. API response message: ' + result.message);
                    logger(result);
                }

                return;
            }

            /*
             * Normal Media API / in-memory story cache path.
             */
            if ($('body > div section:visible video[playsinline]').length > 0) {
                // Download stories if it is video
                let type = "mp4";
                let videoURL = "";
                let videoThumbnailSrc = "";
                let targetURL = location.pathname.replace(/\/$/ig, '').split("/").at(-1);
                let mediaId = null;

                if (state.GL_dataCache.stories[username] && !isForce) {
                    logger('Fetch from memory cache:', username);

                    state.GL_dataCache.stories[username].data.reels_media[0].items.forEach(item => {
                        if (item.id == targetURL) {
                            videoURL = item.video_resources[0].src;
                            videoThumbnailSrc = item.display_resources?.[0]?.src || '';

                            if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                timestamp = item.taken_at_timestamp;
                                mediaId = item.id;
                            }
                        }
                    });

                    if (videoURL.length == 0) {
                        logger('Memory cache not found, try fetch from API:', username);
                        // FIX: also pass isPreview through (it was previously lost on retry)
                        await onStory(true, true, isPreview, true);
                        return;
                    }
                }
                else {
                    let userInfo = await getUserId(username);
                    let userId = userInfo?.user?.pk;

                    if (!userId) {
                        throw new Error(`Could not resolve userId for @${username}`);
                    }
                    let stories = await getStories(userId, username);

                    // OPTIMIZATION: cache items
                    const items = stories.data.reels_media[0].items;

                    items.forEach(item => {
                        if (item.id == targetURL) {
                            videoURL = item.video_resources[0].src;
                            videoThumbnailSrc = item.display_resources?.[0]?.src || '';

                            if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                timestamp = item.taken_at_timestamp;
                                mediaId = item.id;
                            }
                        }
                    });

                    // GitHub issue #4: thinkpad4
                    if (videoURL.length == 0) {

                        let $header = getStoryProgress(username);

                        // FIX (align with onStoryThumbnail): guard added so the
                        // loop keeps the FIRST matching segment instead of
                        // letting a later one silently overwrite videoURL/mediaId.
                        $header.each(function (index) {
                            if (videoURL.length > 0) return;

                            if ($(this).children().length > 0) {
                                videoURL = items[index].video_resources[0].src;
                                videoThumbnailSrc = items[index].display_resources?.[0]?.src || '';

                                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                    timestamp = items[index].taken_at_timestamp;
                                    mediaId = items[index].id;
                                }
                            }
                        });


                        if (videoURL.length == 0) {
                            // appear in from profile page to story page
                            // FIX (align with onStoryThumbnail): guards added
                            // so both loops keep the FIRST matching segment.
                            $('body > div section:visible div.x1ned7t2.x78zum5 > div').each(function (index) {
                                if (videoURL.length > 0) return;

                                const $this = $(this);

                                if ($this.hasClass('x1lix1fw')) {
                                    if ($this.children().length > 0) {
                                        videoURL = items[index].video_resources[0].src;
                                        videoThumbnailSrc = items[index].display_resources?.[0]?.src || '';

                                        if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                            timestamp = items[index].taken_at_timestamp;
                                            mediaId = items[index].id;
                                        }
                                    }
                                }
                            });

                            // appear in from home page to story page
                            $('body > div section:visible ._ac0k > ._ac3r > div').each(function (index) {
                                if (videoURL.length > 0) return;

                                if ($(this).children().hasClass('_ac3q')) {
                                    videoURL = items[index].video_resources[0].src;
                                    videoThumbnailSrc = items[index].display_resources?.[0]?.src || '';

                                    if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                        timestamp = items[index].taken_at_timestamp;
                                        mediaId = items[index].id;
                                    }
                                }
                            });
                        }
                    }

                    state.GL_dataCache.stories[username] = stories;
                }

                if (videoURL.length == 0) {
                    alert(_i18n("NO_VID_URL"));
                }
                else {
                    if (isPreview) {
                        openNewTab(videoURL);
                    }
                    else {
                        saveFiles(videoURL, {
                            username,
                            sourceType: "stories",
                            timestamp,
                            filetype: type,
                            shortcode: mediaId,
                            thumbnailURL: videoThumbnailSrc
                        });
                    }
                }
            }
            else {
                // Download stories if it is image
                let srcset = $('body > div section:visible img[referrerpolicy][class], body > div section:visible img[crossorigin][class]:not([alt])').attr('srcset')?.split(',')[0]?.split(' ')[0];

                let link = (srcset)
                    ? srcset
                    : $('body > div section:visible img[referrerpolicy][class], body > div section:visible img[crossorigin][class]:not([alt])').filter(function () {
                        const $this = $(this);
                        return $this.parents('a').length === 0 && $this.width() === $this.parent().width();
                    }).attr('src');

                if (!link) {
                    // _aa63 mean stories picture in stories page (not avatar)
                    let $element = $('body > div section:visible img._aa63');
                    link = ($element.attr('srcset'))
                        ? $element.attr('srcset')?.split(',')[0]?.split(' ')[0]
                        : $element.attr('src');
                }

                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                    timestamp = new Date($('body > div section:visible time[datetime][class]').first().attr('datetime')).getTime();
                }

                let downloadLink = link;
                let type = 'jpg';

                const mediaId = getImageFromCache(getStoryId(downloadLink) ?? "-");

                if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                    const cached = getImageFromCache(mediaId);

                    if (cached) {
                        if (isPreview) {
                            openNewTab(cached);
                        }
                        else {
                            saveFiles(cached, {
                                username,
                                sourceType: "stories",
                                timestamp,
                                filetype: 'jpg',
                                shortcode: mediaId
                            });
                        }

                        return;
                    }
                }

                if (isPreview) {
                    openNewTab(downloadLink);
                }
                else {
                    saveFiles(downloadLink, {
                        username,
                        sourceType: "stories",
                        timestamp,
                        filetype: type,
                        shortcode: mediaId
                    });
                }
            }

            state.tempFetchRateLimitReels = false;
            }
            catch (err) {
                logger('onStory', 'Unexpected error while downloading story', err);
                alert('Fetch failed from Reels Media API.');
            }
            finally {
                if (!isInternalRetry) {
                    state.storyDownloadInProgress = false;
                    updateLoadingBar(false);
                }
            }
        }
        else {
            // Add the stories download button
            if (!$('.IG_DWSTORY').length) {
                state.GL_dataCache.stories = {};

                // Resolved via getStoryButtonContainer() so onStory() and the
                // startStoryButtonObserver() watcher always agree on where the
                // button belongs. Note: unlike the watcher's read-only usage,
                // onStory() still applies position:relative to the resolved
                // element (needed for the button's absolute positioning), same
                // as the original per-fallback behavior.
                let $element = getStoryButtonContainer();
                markContainerPositioned($element);

                if ($element.length > 0) {
                    // OPTIMIZATION: cache .first() once
                    const $firstEl = $element.first();

                    $firstEl.append(`<div data-ih-locale-title="DW" title="${_i18n("DW")}" class="IG_DWSTORY">${SVG.DOWNLOAD}</div>`);
                    $firstEl.append(`<div data-ih-locale-title="NEW_TAB" title="${_i18n("NEW_TAB")}" class="IG_DWNEWTAB">${SVG.NEW_TAB}</div>`);

                    let $header = getStoryProgress(username);

                    if ($header.length > 1) {
                        $firstEl.append(`<div data-ih-locale-title="DW_ALL" title="${_i18n("DW_ALL")}" class="IG_DWSTORY_ALL">${SVG.DOWNLOAD_ALL}</div>`);
                    }

                    setStoryProgressIndexText($firstEl, $header, 'IG_DWSTORY_POSITION');

                    // Modify video volume
                    //if(USER_SETTING.MODIFY_VIDEO_VOLUME){
                    //    $element.find('video').each(function(){
                    //        $(this).one('play playing', function(){
                    //            if(!$(this).data('modify')){
                    //                $(this).data('modify', true);
                    //                this.volume = VIDEO_VOLUME;
                    //                logger('(story) Added video event listener #modify');
                    //            }
                    //        });
                    //    });
                    //}

                    // Try to use event listener 'timeupdate' in order to detect if story is a video
                    //$element.find('video').each(function(){
                    //    $(this).one('timeupdate',function(){
                    //        if(!$video.data('modify-thumbnail')){
                    //            if($element.find('.IG_DWSTORY_THUMBNAIL').length === 0){
                    //                $(this).data('modify-thumbnail', true);
                    //                onStoryThumbnail(false);
                    //                logger('(story) Manually inserting thumbnail button');
                    //            }
                    //            else{
                    //                $(this).data('modify-thumbnail', true);
                    //                logger('(story) Thumbnail button already inserted');
                    //            }
                    //        }
                    //    });
                    //});
                }
            }
            else {
                setStoryProgressIndexByUsername($('.IG_DWSTORY').parent(), username, 'IG_DWSTORY_POSITION');
                updateStoryThumbnailButton();
            }
        }
    }



    /**
     * updateStoryThumbnailButton
     * @description Smoothly manages the presence of the story video thumbnail button.
     *              Keeps the button intact across video-to-video transitions to eliminate
     *              flicker, and fades it out smoothly when the active story is an image.
     *
     * @return {void}
     */
function updateStoryThumbnailButton() {
    let $container = $('.IG_DWSTORY').parent();

    if ($container.length === 0) {
        $container = getStoryButtonContainer().first();
    }

    if ($container.length === 0) {
        return;
    }

    const $section = $container.closest('section:visible');
    const $scope = $section.length ? $section : $('body > div section:visible');

    // IMPORTANT:
    // Only count a video that is actually visible.
    // Do not use a generic video[playsinline] fallback because Instagram
    // may keep preloaded/hidden videos in the DOM while showing an image.
    const hasVideo = $scope.find('video').filter(function () {
        return $(this).is(':visible') && this.getClientRects().length > 0;
    }).length > 0;

    const $thumb = $('.IG_DWSTORY_THUMBNAIL');

    if (hasVideo) {
        if ($thumb.length === 0) {
            markContainerPositioned($container);

            $container.append(
                `<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="IG_DWSTORY_THUMBNAIL">${SVG.THUMBNAIL}</div>`
            );
        } else {
            $thumb.stop(true, true).show();
        }
    } else {
        // Active story is an image -> remove any stale thumbnail.
        $thumb.remove();
    }
}

    /**
     * updateHighlightThumbnailButton
     * @description Smoothly manages the presence of the highlight video thumbnail button.
     *              Keeps the button intact across video-to-video transitions to eliminate
     *              flicker, and fades it out smoothly when the active highlight is an image.
     *
     * @return {void}
     */
function updateHighlightThumbnailButton() {
    let $container = $('.IG_DWHISTORY').parent();

    if ($container.length === 0) {
        $container = getHighlightButtonContainer().first();
    }

    if ($container.length === 0) {
        return;
    }

    const $section = $container.closest('section:visible');
    const $scope = $section.length ? $section : $('body > div section:visible');

    // Only count the currently visible video.
    const hasVideo = $scope.find('video').filter(function () {
        return $(this).is(':visible') && this.getClientRects().length > 0;
    }).length > 0;

    const $thumb = $('.IG_DWHISTORY_THUMBNAIL');

    if (hasVideo) {
        if ($thumb.length === 0) {
            markContainerPositioned($container);

            $container.append(
                `<div data-ih-locale-title="VIDEO_THUMBNAIL" title="${_i18n("VIDEO_THUMBNAIL")}" class="IG_DWHISTORY_THUMBNAIL">${SVG.THUMBNAIL}</div>`
            );
        } else {
            $thumb.stop(true, true).show();
        }
    } else {
        // Active highlight is an image -> remove any stale thumbnail.
        $thumb.remove();
    }
}

    /**
     * onStoryThumbnail
     * @description Trigger user's story video thumbnail download event or button display event.
     *
     * @param  {Boolean}  isDownload - Check if it is a download operation
     * @param  {Boolean}  isForce - Force a fresh Reels Media API tray fetch
     *                    instead of reusing state.GL_dataCache.stories. Does
     *                    NOT bypass the persistent media cache — a cached
     *                    resource is still served with no API call at all.
     * @return {void}
     */
    async function onStoryThumbnail(isDownload, isForce) {
        if (isDownload) {

            // Download stories if it is video
            let date = new Date().getTime();
            let timestamp = Math.floor(date / 1000);
            let type = 'jpg';
            let username = $("body > div section._ac0a header._ac0k ._ac0l a + div a").first().text() || location.pathname.split('/').at(2);

            // Download thumbnail
            let targetURL = location.pathname.replace(/\/$/ig, '').split("/").at(-1);
            let videoThumbnailURL = "";
            let mediaId = null;

            updateLoadingBar(true);

            /*
             * Candidate mediaId gathering, run BEFORE any Reels Media API
             * call, in priority order:
             *   1) numeric mediaId embedded in the Story URL (urlID)
             *   2) DOM JSON fast path — mandatory whenever the URL carries
             *      no numeric mediaId. Reads the pk straight out of IG's own
             *      embedded reels_media payload
             *      (getMediaIdOfStoryOrHighlightFromEmbeddedJSON).
             *   3) resolveMediaIdOfStoryOrHighlightByTimestamp() — tried
             *      further below, once the Reels Media API response is
             *      available (it needs the fetched items to compare
             *      timestamps against, so it cannot run in this pre-fetch
             *      section).
             *   4) DOM-derived id(s) from the currently-visible <video>
             *      poster(s) (getVisibleVideoPosterMediaIds(), same
             *      technique v4 used, and the same one onReels() uses for
             *      Reel thumbnails): onStoryThumbnail() targets VIDEO
             *      stories, whose <video src="blob:..."> has no
             *      ig_cache_key of its own, but its `poster` attribute IS a
             *      real IG image URL that does carry one, decoded via
             *      mediaIdFromURL(). Last-resort local fallback, tried
             *      further below only once steps 1-3 all yielded nothing.
             *
             * candidateIds here is used ONLY for the local media-cache
             * lookup right below — it intentionally also includes the
             * step-4 candidates (domMediaIds), since checking the cache is
             * a pure optimization independent of resolution priority. See
             * the matching note in onStory() for why domMediaIds are
             * excluded from the AUTHORITATIVE pre-fetch mediaId assignment
             * further below.
             *
             * FIX (domJsonMediaId gated on CAPTURE_IMAGE_VIA_MEDIA_CACHE):
             * candidate gathering now always runs, even with that setting
             * off — same reasoning as onStory(). The thumbnail is always an
             * image even when the underlying Story is a video, so once a
             * candidate is resolved, a cache hit for it is unconditionally
             * valid to serve directly, no media-type check needed. Only the
             * actual cache lookup stays behind CAPTURE_IMAGE_VIA_MEDIA_CACHE;
             * the mediaId itself, when resolvable, is used either way. Only
             * if none of the candidates are cached (or caching is off) do we
             * fall through to getUserId()/getReelsMedia() below.
             *
             * FIX (isForce bypassed the cache): this must run regardless of
             * isForce — see the matching fix in onStory() for why.
             */
            let urlID = location.pathname
                .split('/')
                .filter(s => s.length > 0 && s.match(/^([0-9]{10,})$/))
                .at(-1);

            const candidateIds = [];
            let domJsonMediaId = null;
            let domMediaIds = [];
            const visibleStoryTimestamp = getVisibleStoryTimestamp();

            if (urlID) {
                candidateIds.push(urlID);
            }
            else {
                // FIX: same reasoning as onStory() — pick the item matching
                // the visible progress-bar position, not always items[0].
                const storyItemIndex = getCurrentStoryItemIndex(username);
                domJsonMediaId = getMediaIdOfStoryOrHighlightFromEmbeddedJSON(storyItemIndex ?? 0, username);
                if (domJsonMediaId) candidateIds.push(domJsonMediaId);

                domMediaIds = getVisibleVideoPosterMediaIds().filter(id => id !== domJsonMediaId);
                candidateIds.push(...domMediaIds);
            }

            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                for (const candidateId of candidateIds) {
                    const cached = getImageFromCache(candidateId);

                    if (cached) {
                        logger("[Restore Cached onStoryThumbnail]", candidateId);

                        saveFiles(cached, {
                            username,
                            sourceType: "thumbnail",
                            timestamp,
                            filetype: type,
                            shortcode: candidateId
                        });

                        state.tempFetchRateLimitReels = false;
                        updateLoadingBar(false);
                        return;
                    }
                }

                /*
                 * Nothing cached — keep the best AUTHORITATIVE local
                 * candidate (if any) as a known mediaId for the Reels Media
                 * API fallback below, so it isn't re-derived from scratch.
                 * domMediaIds (step 4, the poster trick) are deliberately
                 * NOT considered here — see the resolution-priority note
                 * above.
                 */
                if (urlID) {
                    mediaId = urlID;
                }
                else if (domJsonMediaId) {
                    mediaId = domJsonMediaId;
                }
            }
            else if (domJsonMediaId) {
                /*
                 * CAPTURE_IMAGE_VIA_MEDIA_CACHE off — no cache lookup, but we
                 * already have a precise pk straight from IG's own embedded
                 * reels_media JSON. Use it directly instead of falling
                 * through to the resolution chain below, which only kicks in
                 * once resolveMediaIdOfStoryOrHighlightByTimestamp() and
                 * domMediaIds (step 4) also fail to resolve anything.
                 */
                mediaId = domJsonMediaId;
            }

            /*
             * Reels Media API path. Only reached once the cache verification
             * step above found nothing cached (or CAPTURE_IMAGE_VIA_MEDIA_CACHE
             * is off). mediaId is resolved independently of
             * RENAME_PUBLISH_DATE below.
             */
            if (USER_SETTING.FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS && !state.tempFetchRateLimitReels) {
                let stories;

                /*
                 * Session tray cache. Same as onStory(): reuse
                 * state.GL_dataCache.stories[username] when the tray for this
                 * username was already fetched in the current session and
                 * isForce was not requested, instead of re-hitting
                 * getReelsMedia().
                 */
                if (!isForce && state.GL_dataCache.stories[username]) {
                    logger('[Reels Media API]', 'Fetch from memory cache:', username);
                    stories = state.GL_dataCache.stories[username];
                }
                else {
                    let userInfo = await getUserId(username);
                    let userId = userInfo.user.pk;
                    stories = await getReelsMedia(String(userId), username);

                    // Persist the freshly-fetched tray so subsequent calls for
                    // the same username reuse it instead of re-hitting the API.
                    state.GL_dataCache.stories[username] = stories;
                }

                const items = stories.data.reels_media[0].items;

                /*
                 * 1) Match directly by story media ID from URL. Only reached
                 * when the cache-verification step above did not already
                 * resolve a mediaId (isForce, cache disabled, or no local
                 * candidate at all).
                 */
                if (!mediaId && urlID) {
                    for (const item of items) {
                        if (String(item.pk ?? item.id) === String(urlID)) {
                            mediaId = item.pk ?? item.id;
                            break;
                        }
                    }
                }

                /*
                 * 2) resolveMediaIdOfStoryOrHighlightByTimestamp() — only
                 * reachable here when neither urlID nor domJsonMediaId
                 * resolved anything above.
                 */
                if (!mediaId) {
                    mediaId = resolveMediaIdOfStoryOrHighlightByTimestamp(stories, visibleStoryTimestamp);
                }

                /*
                 * 3) DOM-derived id(s) from the currently-visible <video>
                 * poster(s) (domMediaIds — already computed in the
                 * pre-fetch candidate gathering above). Last local resort
                 * before falling back to pure DOM-position matching below.
                 */
                if (!mediaId) {
                    for (const domMediaId of domMediaIds) {
                        if (items.some(item => String(item.pk ?? item.id) === String(domMediaId))) {
                            mediaId = domMediaId;
                            break;
                        }
                    }
                }

                // 4) Fallback to visible story progress.
                if (!mediaId) {
                    let $header = getStoryProgress(username);

                    $header.each(function (index) {
                        if (mediaId) return;

                        if ($(this).children().length > 0 && items[index]) {
                            mediaId = items[index].pk ?? items[index].id;
                        }
                    });
                }

                // 5) Fallback to the old profile-page layout.
                if (!mediaId) {
                    $('body > div section:visible div.x1ned7t2.x78zum5 > div').each(function (index) {
                        if (mediaId) return;

                        const $this = $(this);

                        if ($this.hasClass('x1lix1fw') && $this.children().length > 0 && items[index]) {
                            mediaId = items[index].pk ?? items[index].id;
                        }
                    });

                    // 6) Fallback to the home-page layout.
                    if (!mediaId) {
                        $('body > div section:visible ._ac0k > ._ac3r > div').each(function (index) {
                            if (mediaId) return;

                            if ($(this).children().hasClass('_ac3q') && items[index]) {
                                mediaId = items[index].pk ?? items[index].id;
                            }
                        });
                    }
                }

                // Not cached — derive the thumbnail URL from the resolved item.
                const resolvedItem = items.find(item => String(item.pk ?? item.id) === String(mediaId));

                if (resolvedItem) {
                    if (USER_SETTING.RENAME_PUBLISH_DATE) {
                        timestamp = resolvedItem.taken_at ?? resolvedItem.taken_at_timestamp ?? timestamp;
                    }

                    videoThumbnailURL = resolvedItem.image_versions2?.candidates?.[0]?.url || "";
                }

                if (!videoThumbnailURL) {
                    logger('[Reels Media API] Story thumbnail URL not found:', mediaId || urlID);
                    alert('Cannot find story video thumbnail URL.');
                    state.tempFetchRateLimitReels = false;
                    updateLoadingBar(false);
                    return;
                }

                saveFiles(videoThumbnailURL, {
                    username,
                    sourceType: "thumbnail",
                    timestamp,
                    filetype: type,
                    shortcode: mediaId
                });

                state.tempFetchRateLimitReels = false;
                updateLoadingBar(false);
                return;
            }

            // Same mutual-exclusion guard as in onHighlightsStory / onStory.

            /*
             * Normal Media API / in-memory story cache path.
             */
            if (state.GL_dataCache.stories[username] && !isForce) {
                logger('Fetch from memory cache:', username);

                const items = state.GL_dataCache.stories[username].data.reels_media[0].items;

                items.forEach(item => {
                    if (String(item.id) === String(targetURL)) {
                        mediaId = item.pk ?? item.id;

                        if (USER_SETTING.RENAME_PUBLISH_DATE) {
                            timestamp = item.taken_at_timestamp ?? item.taken_at ?? timestamp;
                        }

                        videoThumbnailURL = item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
                    }
                });

                if (videoThumbnailURL.length === 0 || !mediaId) {
                    logger('Memory cache not found, try fetch from API:', username);
                    onStoryThumbnail(true, true);
                    return;
                }
            }
            else {
                let userInfo = await getUserId(username);
                let userId = userInfo.user.pk;
                let stories = await getStories(userId, username);

                // OPTIMIZATION: cache items
                const items = stories.data.reels_media[0].items;

                items.forEach(item => {
                    if (String(item.id ?? item.pk) === String(targetURL)) {
                        mediaId = item.pk ?? item.id;

                        if (USER_SETTING.RENAME_PUBLISH_DATE) {
                            timestamp = item.taken_at_timestamp ?? item.taken_at ?? timestamp;
                        }

                        videoThumbnailURL = item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
                    }
                });

                // GitHub issue #4: thinkpad4
                if (videoThumbnailURL.length === 0 || !mediaId) {
                    let $header = getStoryProgress(username);

                    $header.each(function (index) {
                        if (mediaId && videoThumbnailURL) {
                            return;
                        }

                        if ($(this).children().length > 0 && items[index]) {
                            const item = items[index];

                            mediaId = item.pk ?? item.id;

                            if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                timestamp = item.taken_at_timestamp ?? item.taken_at ?? timestamp;
                            }

                            videoThumbnailURL = item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
                        }
                    });

                    if (videoThumbnailURL.length === 0 || !mediaId) {
                        // Appear in from profile page to story page
                        $('body > div section:visible div.x1ned7t2.x78zum5 > div').each(function (index) {
                            if (mediaId && videoThumbnailURL) {
                                return;
                            }

                            const $this = $(this);

                            if ($this.hasClass('x1lix1fw') && $this.children().length > 0 && items[index]) {
                                const item = items[index];

                                mediaId = item.pk ?? item.id;

                                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                    timestamp = item.taken_at_timestamp ?? item.taken_at ?? timestamp;
                                }

                                videoThumbnailURL = item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
                            }
                        });

                        // Appear in from home page to story page
                        $('body > div section:visible ._ac0k > ._ac3r > div').each(function (index) {
                            if (mediaId && videoThumbnailURL) {
                                return;
                            }

                            if ($(this).children().hasClass('_ac3q') && items[index]) {
                                const item = items[index];

                                mediaId = item.pk ?? item.id;

                                if (USER_SETTING.RENAME_PUBLISH_DATE) {
                                    timestamp = item.taken_at_timestamp ?? item.taken_at ?? timestamp;
                                }

                                videoThumbnailURL = item.display_url || item.image_versions2?.candidates?.[0]?.url || "";
                            }
                        });
                    }
                }
            }

            if (!videoThumbnailURL) {
                logger('Story thumbnail URL not found:', mediaId || targetURL);
                alert('Cannot find story video thumbnail URL.');
                state.tempFetchRateLimitReels = false;
                updateLoadingBar(false);
                return;
            }

            saveFiles(videoThumbnailURL, {
                username,
                sourceType: "thumbnail",
                timestamp,
                filetype: type,
                shortcode: mediaId
            });

            state.tempFetchRateLimitReels = false;
            updateLoadingBar(false);
        }
        else {
            const username = $("body > div section._ac0a header._ac0k ._ac0l a + div a").first().text() || location.pathname.split("/").filter(s => s.length > 0).at(1);
            setStoryProgressIndexByUsername($('.IG_DWSTORY').parent(), username, 'IG_DWSTORY_POSITION');
            updateStoryThumbnailButton();
        }
    }

    /* utils */

    const DB_NAME = 'IG_HELPER';
    const DB_VERSION = 1;
    const STORE_NAME = 'DATA_CACHE';

    /**
     * openDB
     * @description Open (or create on first run) the IG_HELPER IndexedDB database
     *              used to persist larger data caches that don't fit comfortably in
     *              GM_setValue.
     *
     * @return {Promise<IDBDatabase>}
     */
    function openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(`Database open failed: ${event.target.error}`);
        });
    }

    /**
     * addData
     * @description Insert a new record into the DATA_CACHE object store. Fails if a
     *              record with the same key already exists (use updateData for upsert).
     *
     * @param  {Object}  data
     * @return {Promise<IDBValidKey>}
     */
    async function addData(data) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(`Insert failed: ${event.target.error}`);
        });
    }

    /**
     * getData
     * @description Retrieve a record from the DATA_CACHE object store by key.
     *
     * @param  {number|string}  id
     * @return {Promise<?Object>}
     */
    async function getData(id) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(`Read failed: ${event.target.error}`);
        });
    }

    /**
     * getAllData
     * @description Retrieve every record from the DATA_CACHE object store.
     *
     * @return {Promise<Array>}
     */
    async function getAllData() {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(`Read all failed: ${event.target.error}`);
        });
    }

    /**
     * updateData
     * @description Upsert (insert-or-replace) a record into the DATA_CACHE object store.
     *
     * @param  {Object}  data
     * @return {Promise<IDBValidKey>}
     */
    async function updateData(data) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(`Update failed: ${event.target.error}`);
        });
    }

    /**
     * @param {number} id
     */
    async function deleteData(id) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = (event) => reject(`Delete failed: ${event.target.error}`);
        });
    }

    /**
     * findUsernameByUserId
     * @description Find which cached username currently owns a given user ID.
     *              A user ID may belong to at most one cached username.
     *
     * @param  {String|Number} userId
     * @param  {String=} excludeUsername - Username that is allowed to own this ID.
     * @return {?String}
     */
    function findUsernameByUserId(userId, excludeUsername = '') {
        if (!userId) return null;

        const targetId = String(userId).trim();
        const excluded = String(excludeUsername || '').trim().toLowerCase();

        for (const [cachedUsername, cachedUserId] of Object.entries(state.GL_userIdCache || {})) {
            if (String(cachedUserId) === targetId && cachedUsername.toLowerCase() !== excluded) {
                return cachedUsername;
            }
        }

        return null;
    }

    /**
     * removeUserIdCacheEntry
     * @description Remove a username -> user ID mapping from both caches.
     *
     * @param  {String} username
     * @return {Boolean}
     */
    function removeUserIdCacheEntry(username) {
        if (!username) return false;

        const normalizedUsername = String(username).trim();
        if (!normalizedUsername) return false;

        const existed = Object.prototype.hasOwnProperty.call(state.GL_userIdCache || {}, normalizedUsername);

        if (existed) {
            delete state.GL_userIdCache[normalizedUsername];
            userIdCacheDirty = true;
        }

        userIdCache.delete(normalizedUsername);

        if (existed) {
            logger('removeUserIdCacheEntry()', `removed cached userId mapping for @${normalizedUsername}`);
        }

        return existed;
    }

    /**
     * putUserIdInCache
     * @description Save a resolved (username -> user id) mapping in both the in-memory
     *              userIdCache and the persistent USER_IDS_STORED bucket. Self-heals: if
     *              this user ID is currently assigned to a different username (Instagram
     *              reassigned the ID, or the username changed), that stale mapping is
     *              dropped and replaced, since every caller here supplies live/confirmed
     *              data (getUserId()'s live fetch, getReelsMedia()/getStories()'s
     *              owner-mismatch refresh, reconcileOwnerFromApiResponse()). The persistent
     *              bucket is capped at USER_ID_MAX_CACHE_ITEMS entries; once full, a random
     *              existing entry is evicted to make room for the new one.
     *
     * @param  {String} username
     * @param  {String|Number} userId
     * @return {Boolean} True when the mapping was cached, false on invalid input.
     */
    function putUserIdInCache(username, userId) {
        if (!username || !userId) return false;

        const normalizedUsername = String(username).trim();
        const normalizedUserId = String(userId).trim();
        if (!normalizedUsername || !normalizedUserId) return false;

        const existingUsername = findUsernameByUserId(normalizedUserId, normalizedUsername);
        if (existingUsername) {
            logger('putUserIdInCache()', `userId ${normalizedUserId} was assigned to @${existingUsername}; reassigning it to @${normalizedUsername}`);
            removeUserIdCacheEntry(existingUsername);
        }

        const isNewPersistentEntry = !state.GL_userIdCache[normalizedUsername];
        const keys = Object.keys(state.GL_userIdCache);
        if (isNewPersistentEntry && keys.length >= USER_ID_MAX_CACHE_ITEMS) {
            const randomUsername = keys[Math.floor(Math.random() * keys.length)];
            delete state.GL_userIdCache[randomUsername];
            userIdCache.delete(randomUsername);
        }

        userIdCacheDirty = true;
        state.GL_userIdCache[normalizedUsername] = normalizedUserId;
        userIdCache.set(normalizedUsername, { user: { id: normalizedUserId, pk: normalizedUserId } });

        if (!userIdCacheSaveTimer) {
            userIdCacheSaveTimer = setTimeout(() => {
                if (userIdCacheDirty) {
                    GM_setValue(USER_ID_CACHE_KEY, state.GL_userIdCache);
                    userIdCacheDirty = false;
                }
                userIdCacheSaveTimer = null;
            }, 500);
        }

        return true;
    }

    /**
     * getPersistedUserId
     * @description Read-only lookup of the userId persisted for `username` in the
     *              GM persistent bucket (USER_IDS_STORED), without touching the
     *              in-memory userIdCache Map.
     *
     * @param  {String} username
     * @return {?String}
     */
    function getPersistedUserId(username) {
        const normalizedUsername = String(username || '').trim().toLowerCase();
        if (!normalizedUsername) return null;

        const persistedId = state.GL_userIdCache?.[normalizedUsername];
        return persistedId ? String(persistedId) : null;
    }

    /**
     * isOwnerVerifiedThisSession
     * @description True when `username`'s userId is already trusted for the rest of
     *              the tab session: either resolved live this session (getUserId()
     *              sets no flag in that case), or already confirmed once against a
     *              real content API response after being promoted from the persistent
     *              cache (see `_needsOwnerVerification` below). False when the
     *              in-memory Map has no entry yet, or the entry still carries that flag.
     *
     * @param  {String} username
     * @return {Boolean}
     */
    function isOwnerVerifiedThisSession(username) {
        const normalizedUsername = String(username || '').trim().toLowerCase();
        if (!normalizedUsername) return false;

        const cached = userIdCache.get(normalizedUsername);
        return !!cached && !cached._needsOwnerVerification;
    }

    /**
     * markOwnerVerified
     * @description Clears the `_needsOwnerVerification` flag on a userIdCache Map
     *              entry, so later calls in the same tab session trust it without
     *              re-checking against a content API response. Stays cleared until
     *              the tab is refreshed, since userIdCache is a plain in-memory Map
     *              recreated empty on load.
     *
     * @param  {String} username
     * @return {void}
     */
    function markOwnerVerified(username) {
        const normalizedUsername = String(username || '').trim().toLowerCase();
        const cached = userIdCache.get(normalizedUsername);
        if (cached) delete cached._needsOwnerVerification;
    }

    /**
     * reconcileOwnerFromApiResponse
     * @description For endpoints that resolve content by shortcode/highlightId rather
     *              than by a cached userId (getPolarisPostRootQuery, getBlobMediaWithQueryID,
     *              getBlobMediaWithQueryHash, getHighlightStories), there is no "expected
     *              username" known before the request is made — the owner is only known
     *              once the response comes back. This uses that authoritative response to
     *              validate (and self-heal) the username -> userId cache, without ever
     *              blocking or re-fetching the content itself: the shortcode/highlightId
     *              already fully determines the correct resource regardless of any userId
     *              bookkeeping issue, so the caller should always proceed to serve it.
     *
     *              Skipped entirely when `username` is already trusted in the in-memory
     *              Map this session. Otherwise:
     *                - no persisted mapping yet for `username`, and its id is not claimed
     *                  by a different username either -> the response itself becomes the
     *                  new trusted baseline (same trust level as a fresh live resolution);
     *                - persisted mapping agrees with the response -> promoted to trusted
     *                  in the Map, persistent bucket left untouched;
     *                - persisted mapping disagrees (stale/reassigned id, or the id is
     *                  currently claimed by a different username) -> a fresh id is resolved
     *                  live for `username` (see resolveUserIdLive), the old conflicting
     *                  entries are dropped, and the corrected mapping is saved to both caches.
     *
     * @param  {String}        username - Owner username as reported by the API response.
     * @param  {String|Number}  userId  - Owner id as reported by the API response.
     * @return {Promise<void>}
     */
    async function reconcileOwnerFromApiResponse(username, userId) {
        if (!username || !userId) return;

        const normalizedUsername = String(username).trim().toLowerCase();
        if (!normalizedUsername) return;

        if (isOwnerVerifiedThisSession(normalizedUsername)) return;

        const reportedId = String(userId).trim();
        const persistedId = getPersistedUserId(normalizedUsername);
        const collidingUsername = findUsernameByUserId(reportedId, normalizedUsername);

        const isConsistent = (!persistedId || persistedId === reportedId) && !collidingUsername;

        if (isConsistent) {
            if (!persistedId) {
                putUserIdInCache(normalizedUsername, reportedId);
            }
            else {
                markOwnerVerified(normalizedUsername);
            }
            return;
        }

        logger(
            'reconcileOwnerFromApiResponse()',
            `stale mapping for @${normalizedUsername} (cached: ${persistedId ?? 'none'}` +
            `${collidingUsername ? `, id ${reportedId} claimed by @${collidingUsername}` : ''}` +
            `, api reports: ${reportedId}) — refreshing`
        );

        try {
            const fresh = await resolveUserIdLive(normalizedUsername);
            const freshId = fresh?.user?.pk ?? fresh?.user?.id;
            if (!freshId) return;

            if (collidingUsername) removeUserIdCacheEntry(collidingUsername);
            removeUserIdCacheEntry(normalizedUsername);

            if (putUserIdInCache(normalizedUsername, freshId)) {
                userIdCache.set(normalizedUsername, fresh);
            }
        }
        catch (err) {
            logger('reconcileOwnerFromApiResponse()', `live refresh failed for @${normalizedUsername}`, err);
        }
    }

    /**
     * normalizeReelsMediaItem
     * @description Bridge a Reels Media API item (image_versions2 / video_versions /
     *              pk / taken_at schema) into the shape older code paths expect
     *              (display_resources / video_resources / id / taken_at_timestamp /
     *              is_video). Non-destructive: returns a shallow copy augmented with
     *              the synthesized fields, leaving the original untouched.
     *
     * @param  {Object}  item - Raw reels_media item from getReelsMedia().
     * @return {Object}        Normalized item safe to pass to legacy helpers.
     */
    function normalizeReelsMediaItem(item) {
        if (!item) return item;

        const id = item.pk ?? item.id;
        const candidates = item.image_versions2?.candidates || [];
        const imageUrl = candidates[0]?.url || item.display_url || item.display_resources?.[0]?.src || '';
        const videoUrl = item.video_versions?.[0]?.url || item.video_resources?.[0]?.src || '';

        const displayResources = item.display_resources?.length
            ? item.display_resources
            : (candidates.length
                ? candidates.map(c => ({ src: c.url, config_width: c.width ?? 0 }))
                : (imageUrl ? [{ src: imageUrl, config_width: 0 }] : []));

        const videoResources = item.video_resources?.length
            ? item.video_resources
            : (videoUrl ? [{ src: videoUrl }] : []);

        return Object.assign({}, item, {
            id,
            pk: id,
            is_video: item.is_video ?? (item.media_type != null ? item.media_type !== 1 : !!(videoUrl || item.video_dash_manifest)),
            taken_at_timestamp: item.taken_at_timestamp ?? item.taken_at ?? Math.floor(Date.now() / 1000),
            display_url: item.display_url || imageUrl,
            image_versions2: item.image_versions2 || (imageUrl ? { candidates: [{ url: imageUrl, width: 0, height: 0 }] } : item.image_versions2),
            video_versions: item.video_versions || (videoUrl ? [{ url: videoUrl, width: 0, height: 0 }] : item.video_versions),
            display_resources: displayResources,
            video_resources: videoResources,
            owner: item.owner || item.user,
            user: item.user || item.owner
        });
    }

    /**
     * isReelsMediaVideo
     * @description Determine whether a Reels Media API item is a video.
     *              Media type is decided from the API item itself; image cache
     *              presence must never be used to infer the media type.
     *
     * @param  {Object} item
     * @return {Boolean}
     */
    function isReelsMediaVideo(item) {
        if (!item) return false;
        if (item.is_video === true) return true;
        if (item.is_video === false) return false;
        if (item.video_versions?.length) return true;
        if (item.video_resources?.length) return true;
        if (item.video_dash_manifest) return true;
        if (item.media_type != null) return item.media_type !== 1;
        return false;
    }

    /**
     * getReelsMedia
     * @description Call the private Reels Media API (i.instagram.com/api/v1/feed/reels_media/)
     *              to resolve a stories/highlights tray by reel id or highlight:ID.
     *              Each returned item is normalized through normalizeReelsMediaItem() so
     *              consumers can rely on the classic schema. When expectedUsername is
     *              provided and hasn't been confirmed yet this session (see
     *              isOwnerVerifiedThisSession()), the resolved owner is checked against
     *              it; on disagreement the cached user id is refreshed live (see
     *              resolveUserIdLive()) and the request is retried once. On agreement,
     *              or once already verified this session, the mapping is trusted without
     *              re-checking until the tab is refreshed.
     *
     * @param  {String}   reelId           - Numeric user id (stories tray) or `highlight:{id}`.
     * @param  {String=}  expectedUsername - Optional owner-mismatch guard.
     * @param  {Boolean=} _retried         - Internal flag to prevent infinite retry loops.
     * @return {Promise<Object>}
     */
    function getReelsMedia(reelId, expectedUsername, _retried) {
        return new Promise((resolve, reject) => {
            const getURL = `https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${encodeURIComponent(reelId)}`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                headers: {
                    'X-IG-App-ID': getAppID()
                },
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        logger('getReelsMedia()', reelId, obj);

                        const reelRaw = obj?.reels?.[reelId];

                        if (obj?.status !== 'ok' || !reelRaw) {
                            reject(obj);
                            return;
                        }

                        const reel = Object.assign({}, reelRaw, {
                            items: (reelRaw.items || []).map(normalizeReelsMediaItem)
                        });

                        const reelOwner = reel.user || reel.owner;

                        // Only worth checking when the cached userId hasn't been confirmed
                        // against a real content API response yet this session — see
                        // isOwnerVerifiedThisSession(). A brand-new userId (just resolved
                        // live by getUserId()) is trusted immediately, same as one already
                        // confirmed earlier this session.
                        const ownerCheckNeeded =
                            !!expectedUsername &&
                            !String(reelId).startsWith('highlight:') &&
                            !_retried &&
                            !isOwnerVerifiedThisSession(expectedUsername);
                        const canCompareOwner = ownerCheckNeeded && !!reelOwner?.username;
                        const ownerMismatch = canCompareOwner && reelOwner.username.toLowerCase() !== expectedUsername.toLowerCase();

                        if (ownerMismatch) {
                            logger('getReelsMedia()', `owner mismatch: expected "${expectedUsername}", got "${reelOwner.username}" — refreshing id`);
                            resolveUserIdLive(expectedUsername).then((freshUserInfo) => {
                                const fresh = freshUserInfo?.user?.id ? freshUserInfo : null;

                                if (fresh && putUserIdInCache(expectedUsername, fresh.user.id)) {
                                    userIdCache.set(expectedUsername, fresh);
                                }

                                if (fresh && String(fresh.user.id) !== String(reelId)) {
                                    getReelsMedia(String(fresh.user.id), expectedUsername, true).then(resolve, reject);
                                }
                                else {
                                    reject('user_mismatch');
                                }
                            }).catch((err) => {
                                logger('getReelsMedia()', 'owner-mismatch refresh failed', err);
                                reject('user_mismatch');
                            });
                            return;
                        }

                        if (canCompareOwner) {
                            // Owner matched what we expected — this mapping is now
                            // confirmed for the rest of the tab session.
                            markOwnerVerified(expectedUsername);
                        }

                        reel.owner = reel.owner || reel.user;
                        reel.user = reel.user || reel.owner;
                        resolve({ data: { reels_media: [reel] } });
                    }
                    catch (err) {
                        logger('getReelsMedia()', 'reject', err.message);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getReelsMedia()', 'reject', err);
                    reject(err);
                }
            });
        });
    }


    /**
     * getHighlightStories
     * @description Get a list of all stories in highlight Id. A highlightId isn't a
     *              userId, so there's no "expected username" to check the request
     *              against before it's made (unlike getReelsMedia/getStories). Once
     *              the response arrives, its owner is used to opportunistically
     *              validate/self-heal the username -> userId cache via
     *              reconcileOwnerFromApiResponse() — this never blocks or delays
     *              serving the resource, since the highlightId already fully
     *              determines the correct content on its own.
     *
     * @param  {Integer}  highlightId
     * @return {Object}
     */
    function getHighlightStories(highlightId) {
        return new Promise((resolve, reject) => {
            const getURL = `https://www.instagram.com/graphql/query/?query_hash=de8017ee0a7c9c45ec4260733d81ea31&variables=%7B%22highlight_reel_ids%22:%5B%22${highlightId}%22%5D,%22precomposed_overlay%22:false%7D`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                onload: async function (response) {
                    try {
                        let obj = JSON.parse(response.response);

                        try {
                            const owner = obj?.data?.reels_media?.[0]?.owner;
                            const ownerId = owner?.pk ?? owner?.id;
                            if (owner?.username && ownerId) {
                                await reconcileOwnerFromApiResponse(owner.username, ownerId);
                            }
                        }
                        catch (reconcileErr) {
                            logger('getHighlightStories()', 'owner reconciliation failed', reconcileErr);
                        }

                        resolve(obj);
                    }
                    catch (err) {
                        logger('getHighlightStories()', 'reject', err.message);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getHighlightStories()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * getStories
     * @description Get a list of all stories in user Id. When expectedUsername is
     *              provided and hasn't been confirmed yet this session (see
     *              isOwnerVerifiedThisSession()), the resolved owner is checked
     *              against it; on disagreement the cached user id is refreshed live
     *              (see resolveUserIdLive()) and the request is retried once. On
     *              agreement, or once already verified this session, the mapping is
     *              trusted without re-checking until the tab is refreshed. Mirrors
     *              getReelsMedia()'s owner-mismatch handling.
     *
     * @param  {Integer}  userId
     * @param  {String=}  expectedUsername - Optional owner-mismatch guard.
     * @param  {Boolean=} _retried         - Internal flag to prevent infinite retry loops.
     * @return {Object}
     */
    function getStories(userId, expectedUsername, _retried) {
        return new Promise((resolve, reject) => {
            const getURL = `https://www.instagram.com/graphql/query/?query_hash=de8017ee0a7c9c45ec4260733d81ea31&variables=%7B%22reel_ids%22:%5B%22${userId}%22%5D,%22precomposed_overlay%22:false%7D`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        logger('getStories()', obj);

                        const reel = obj?.data?.reels_media?.[0];
                        const reelOwner = reel?.owner || reel?.user;

                        const ownerCheckNeeded =
                            !!expectedUsername &&
                            !_retried &&
                            !isOwnerVerifiedThisSession(expectedUsername);
                        const canCompareOwner = ownerCheckNeeded && !!reelOwner?.username;
                        const ownerMismatch = canCompareOwner && reelOwner.username.toLowerCase() !== expectedUsername.toLowerCase();

                        if (ownerMismatch) {
                            logger('getStories()', `owner mismatch: expected "${expectedUsername}", got "${reelOwner.username}" — refreshing id`);
                            resolveUserIdLive(expectedUsername).then((freshUserInfo) => {
                                const fresh = freshUserInfo?.user?.id ? freshUserInfo : null;

                                if (fresh && putUserIdInCache(expectedUsername, fresh.user.id)) {
                                    userIdCache.set(expectedUsername, fresh);
                                }

                                if (fresh && String(fresh.user.id) !== String(userId)) {
                                    getStories(String(fresh.user.id), expectedUsername, true).then(resolve, reject);
                                }
                                else {
                                    reject('user_mismatch');
                                }
                            }).catch((err) => {
                                logger('getStories()', 'owner-mismatch refresh failed', err);
                                reject('user_mismatch');
                            });
                            return;
                        }

                        if (canCompareOwner) {
                            // Owner matched what we expected — this mapping is now
                            // confirmed for the rest of the tab session.
                            markOwnerVerified(expectedUsername);
                        }

                        resolve(obj);
                    }
                    catch (err) {
                        logger('getStories()', 'reject', err.message);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getStories()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

/**
 * getUserIdWithAgent
 * @description Live request to web_profile_info.
 * @param {String} username
 * @return {Promise<Object>}
 */
async function getUserIdWithAgent(username) {
    const normalized = (username || '').toLowerCase();
    const getURL = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(normalized)}`;

    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: getURL,
            headers: {
                'X-IG-App-ID': getAppID()
            },
            onload: function (response) {
                try {
                    const obj = JSON.parse(response.response);
                    const user = obj?.data?.user;

                    if (!user) {
                        logger('getUserIdWithAgent()', 'reject', 'undefined');
                        reject('undefined');
                        return;
                    }

                    const userInfo = obj.data;
                    userInfo.user.pk = userInfo.user.id;

                    logger('getUserIdWithAgent()', obj);
                    resolve(userInfo);
                } catch (err) {
                    logger('getUserIdWithAgent()', 'reject', err.message);
                    reject(err);
                }
            },
            onerror: function (err) {
                logger('getUserIdWithAgent()', 'reject', err);
                reject(err);
            }
        });
    });
}

/**
 * getUserIdFromSearch
 * @description Fallback request to topsearch (exact match preferred).
 * @param {String} username
 * @return {Promise<Object>}
 */
async function getUserIdFromSearch(username) {
    const normalized = (username || '').toLowerCase();
    const getURL = `https://www.instagram.com/web/search/topsearch/?query=${encodeURIComponent(normalized)}`;

    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: getURL,
            onload: function (response) {
                try {
                    const obj = JSON.parse(response.response);
                    const users = obj.users ?? [];

                    // Exact match (case-insensitive), otherwise the first result
                    const exactMatch = users.find(pos =>
                        pos.user?.username?.toLowerCase() === normalized
                    );
                    const result = exactMatch ?? users[0] ?? null;

                    if (!result) {
                        reject(new Error('No user found in search'));
                        return;
                    }

                    if (!result.user.pk) {
                        result.user.pk = result.user.id;
                    }

                    logger('getUserIdFromSearch()', result);
                    resolve(result);
                } catch (err) {
                    logger('getUserIdFromSearch()', 'reject', err.message);
                    reject(err);
                }
            },
            onerror: function (err) {
                logger('getUserIdFromSearch()', 'reject', err);
                reject(err);
            }
        });
    });
}

/**
 * resolveUserIdLive
 * @description Resolve a username's current userId directly from Instagram, bypassing
 *              both caches: tries web_profile_info first, falls back to topsearch.
 *              Shared by every owner-mismatch/reconciliation repair path (getReelsMedia,
 *              getStories, reconcileOwnerFromApiResponse), so a stale or corrupted cache
 *              entry always gets fixed the same way. Deliberately does not alert() on
 *              total failure, unlike getUserId()'s own cold path — a background cache
 *              repair should never interrupt the user with a popup.
 *
 * @param  {String} username
 * @return {Promise<Object>} userInfo shaped like { user: { id, pk, ... } }
 */
async function resolveUserIdLive(username) {
    try {
        return await getUserIdWithAgent(username);
    }
    catch (agentErr) {
        logger('resolveUserIdLive()', 'primary failed, trying search fallback...', agentErr);
        return await getUserIdFromSearch(username);
    }
}

    /**
     * getUserId
     * @description Orchestrator + caching multi-layer:
     * 1) in-memory Map
     * 2) persistent GM cache
     * 3) web_profile_info
     * 4) topsearch fallback
     *
     * Both success paths write to both caches.
     *
     * @param {String} username
     * @return {Promise<Object>}
     */
    async function getUserId(username) {
        const normalizedUsername = (username || state.GL_username || '').toLowerCase();

        if (userIdCache.has(normalizedUsername)) {
            const cachedUserInfo = userIdCache.get(normalizedUsername);
            const cachedId = cachedUserInfo?.user?.pk ?? cachedUserInfo?.user?.id;
            if (cachedId && !findUsernameByUserId(cachedId, normalizedUsername)) {
                logger('getUserId()', 'return from cache:', cachedUserInfo);
                return cachedUserInfo;
            }
            logger('getUserId()', `invalid in-memory mapping for @${normalizedUsername}; discarding`);
            userIdCache.delete(normalizedUsername);
        }

        const persistedId = state.GL_userIdCache?.[normalizedUsername];
        if (persistedId) {
            if (findUsernameByUserId(persistedId, normalizedUsername)) {
                logger('getUserId()', `invalid duplicate mapping: @${normalizedUsername} -> ${persistedId}`);
                removeUserIdCacheEntry(normalizedUsername);
            }
            else {
                logger('getUserId()', 'return from persistent cache:', persistedId);
                const userInfo = {
                    user: { id: persistedId, pk: persistedId },
                    // Not yet confirmed against a live content API response this
                    // session — see isOwnerVerifiedThisSession() / markOwnerVerified().
                    _needsOwnerVerification: true
                };
                userIdCache.set(normalizedUsername, userInfo);
                return userInfo;
            }
        }

        try {
            const userInfo = await getUserIdWithAgent(normalizedUsername);

            if (putUserIdInCache(normalizedUsername, userInfo.user.id)) {
                userIdCache.set(normalizedUsername, userInfo);
            }
            return userInfo;
        } catch (agentErr) {
            logger('getUserId()', 'primary failed, trying search fallback...', agentErr);

            try {
                const result = await getUserIdFromSearch(normalizedUsername);

                const id = result.user.pk ?? result.user.id;

                if (putUserIdInCache(normalizedUsername, id)) {
                    userIdCache.set(normalizedUsername, result);
                }
                return result;
            } catch (searchErr) {
                userIdCache.delete(normalizedUsername);
                logger('getUserId()', 'both methods failed', searchErr);
                alert("Cannot find user info from getUserId()\nDetails may be in the console.");
                throw searchErr;
            }
        }
    }

    /**
     * getUserHighSizeProfile
     * @description Get user's high quality avatar image.
     *
     * @param  {Integer}  userId
     * @return {String}
     */
    function getUserHighSizeProfile(userId) {
        return new Promise((resolve, reject) => {
            const getURL = `https://www.instagram.com/api/v1/users/${userId}/info/`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Pixel 7 XL)Build/RP1A.20845.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/5.0 Chrome/117.0.5938.60 Mobile Safari/537.36 Instagram 307.0.0.34.111'
                },
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        if (obj.status !== 'ok') {
                            logger('getUserHighSizeProfile()', 'reject', obj);
                            reject('faild');
                        }
                        else {
                            logger('getUserHighSizeProfile()', obj);
                            resolve(obj.user.hd_profile_pic_url_info?.url);
                        }
                    }
                    catch (err) {
                        logger('getUserHighSizeProfile()', 'reject', err);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getUserHighSizeProfile()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * getPostOwner
     * @description Get post's author with post shortcode.
     *
     * @param  {String}  postPath
     * @return {String}
     */
    function getPostOwner(postPath) {
        return new Promise((resolve, reject) => {
            if (!postPath) reject("NOPATH");
            const postShortCode = postPath;
            const getURL = `https://www.instagram.com/graphql/query/?query_hash=2c4c2e343a8f64c625ba02b2aa12c7f8&variables=%7B%22shortcode%22:%22${postShortCode}%22}`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        logger('getPostOwner()', obj);
                        resolve(obj.data.shortcode_media.owner.username);
                    }
                    catch (err) {
                        logger('getPostOwner()', 'reject', err.message);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getPostOwner()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * getPolarisPostRootQuery
     * @description Resolve a post/reel through Instagram's PolarisPostRootQuery.
     * Include LSD/DTSG extraction and the current doc_id.
     *
     * @param {String} postPath - Instagram post/reel shortcode.
     * @return {Promise<{ type: 'polaris', data: Object }>}
     */
    async function getPolarisPostRootQuery(postPath) {
        if (!postPath) throw new Error('NOPATH');

        // Doc ID (needs to be updated when Instagram rotates it)
        const IG_POST_ROOT_QUERY_DOC_ID = '27852811784380813';

        // Extract LSD + DTSG from the inline scripts
        const tokens = { lsd: null, dtsg: null };
        document.querySelectorAll('script').forEach((script) => {
            const text = script.textContent || '';
            if (!tokens.lsd) {
                tokens.lsd = text.match(/\["LSD",\[\],\{"token":"([^"]+)"\}/)?.[1] ?? null;
            }
            if (!tokens.dtsg) {
                tokens.dtsg =
                    text.match(/\["DTSGInitData",\[\],\{"token":"([^"]+)"/)?.[1] ??
                    text.match(/\["DTSGInitialData",\[\],\{"token":"([^"]+)"/)?.[1] ??
                    null;
            }
        });
        const { lsd, dtsg } = tokens;

        const apiURL = new URL('/graphql/query', window.location.origin);
        const variables = {
            shortcode: postPath,
            __relay_internal__pv__PolarisShortDramaEnabledrelayprovider: false,
            __relay_internal__pv__PolarisMultiCaptionCarouselEnabledrelayprovider: false
        };

        const body = new URLSearchParams({
            __d: 'www',
            __user: '0',
            __a: '1',
            __req: '1',
            __comet_req: '7',
            fb_dtsg: dtsg ?? '',
            lsd: lsd ?? '',
            fb_api_caller_class: 'RelayModern',
            fb_api_req_friendly_name: 'PolarisPostRootQuery',
            server_timestamps: 'true',
            doc_id: IG_POST_ROOT_QUERY_DOC_ID,
            variables: JSON.stringify(variables)
        }).toString();

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-FB-Friendly-Name': 'PolarisPostRootQuery',
            'X-ASBD-ID': '129477'
        };
        if (lsd) headers['X-FB-LSD'] = lsd;

        const response = await fetch(apiURL.href, {
            method: 'POST',
            credentials: 'include',
            headers,
            body
        });

        const responseText = await response.text();
        let json;
        try {
            json = JSON.parse(responseText);
        } catch (err) {
            throw new Error(`PolarisPostRootQuery returned non-JSON (${response.status})`);
        }

        logger('getPolarisPostRootQuery()', postPath, json);

        if (!response.ok) {
            throw new Error(`PolarisPostRootQuery failed with HTTP ${response.status}`);
        }

        const item = json?.data?.xdt_api__v1__media__shortcode__web_info?.items?.[0];
        if (!item) {
            throw new Error('PolarisPostRootQuery returned no media item');
        }

        return { type: 'polaris', data: item };
    }

    /**
     * extractMediaIdsFromLegacyQueryHash
     * @description Extract the media IDs exposed by the legacy shortcode_media
     *              response. The IDs are used as a discovery/ordering hint for the
     *              Polaris path; PolarisPostRootQuery itself is shortcode-scoped.
     *
     * @param  {Object} data
     * @return {String[]}
     */
    function extractMediaIdsFromLegacyQueryHash(data) {
        const resource = filterResourceData(data || {});
        const ids = [];

        const pushId = (value) => {
            if (value == null) return;
            const id = String(value);
            if (id && !ids.includes(id)) ids.push(id);
        };

        if (resource.carousel_media && Array.isArray(resource.carousel_media)) {
            resource.carousel_media.forEach((item) => pushId(item.pk ?? item.id));
        }

        if (resource.edge_sidecar_to_children?.edges) {
            resource.edge_sidecar_to_children.edges.forEach((edge) => {
                const node = edge?.node;
                pushId(node?.id ?? node?.pk);
            });
        }

        pushId(resource.pk ?? resource.id);
        return ids;
    }

    /**
     * getPostMediaWithProvider
     * @description Resolve post/reel media through the selected provider. When the
     *              Polaris setting is disabled this preserves the legacy path.
     *              With DIRECT_DOWNLOAD_ALL, QueryID is used only to discover media
     *              IDs; media URLs are still resolved by PolarisPostRootQuery.
     *
     *              Every path funnels through here (this is the single call site for
     *              PolarisPostRootQuery/getBlobMediaWithQueryID/getBlobMediaWithQueryHash
     *              from createMediaListDOM and onReels), so once a result is obtained
     *              its owner is used to opportunistically validate/self-heal the
     *              username -> userId cache via reconcileOwnerFromApiResponse(). Shortcode
     *              posts/reels have no "expected username" known ahead of the request
     *              (unlike getReelsMedia/getStories), so this never blocks or delays
     *              serving the resource — the shortcode already fully determines the
     *              correct content on its own.
     *
     * @param  {String}  postPath
     * @param  {{discoverMediaIds?: Boolean}} options
     * @return {Promise<{ type: 'polaris'|'query_id'|'query_hash', data: Object, mediaIds?: String[] }>}
     */
    async function getPostMediaWithProvider(postPath, options = {}) {
        let result;

        if (!USER_SETTING.FORCE_POLARIS_POST_ROOT_QUERY_FOR_POSTS_AND_REELS) {
            result = await getBlobMediaWithQueryIDFallbackHash(postPath);
        }
        else {
            let discoveredMediaIds = null;

            if (options.discoverMediaIds) {
                try {
                    const queryIdResult = await getBlobMediaWithQueryID(postPath);

                    const queryIdResource =
                        queryIdResult?.xdt_api__v1__media__shortcode__web_info?.items?.[0];

                    if (queryIdResource) {
                        discoveredMediaIds = extractMediaIdsFromLegacyQueryHash(queryIdResource);
                    }

                    logger('[PolarisPostRootQuery] query_id media-id discovery', {
                        postPath,
                        mediaIds: discoveredMediaIds
                    });
                }
                catch (err) {
                    // QueryID is discovery-only here. Polaris remains the authoritative
                    // source for media URLs, so a failed discovery request must not prevent
                    // the Polaris request from being attempted.
                    logger(
                        '[PolarisPostRootQuery] query_id discovery failed; continuing with Polaris',
                        postPath,
                        err
                    );
                }
            }

            result = await getPolarisPostRootQuery(postPath);

            if (discoveredMediaIds?.length) {
                const resource = filterResourceData(result.data);
                const idSet = new Set(discoveredMediaIds);

                if (Array.isArray(resource.carousel_media)) {
                    const matching = resource.carousel_media.filter((item) =>
                        idSet.has(String(item.pk ?? item.id))
                    );

                    if (matching.length) {
                        resource.carousel_media = matching;
                    }
                }

                if (resource.edge_sidecar_to_children?.edges) {
                    const matchingEdges = resource.edge_sidecar_to_children.edges.filter((edge) => {
                        const node = edge?.node;

                        return idSet.has(String(node?.id ?? node?.pk));
                    });

                    if (matchingEdges.length) {
                        resource.edge_sidecar_to_children.edges = matchingEdges;
                    }
                }

                result.mediaIds = discoveredMediaIds;
            }
        }

        try {
            const resource = filterResourceData(result.data);
            const ownerId = resource.owner?.pk ?? resource.owner?.id;

            if (resource.owner?.username && ownerId) {
                await reconcileOwnerFromApiResponse(resource.owner.username, ownerId);
            }
        }
        catch (err) {
            logger('getPostMediaWithProvider()', 'owner reconciliation failed', err);
        }

        return result;
    }

    /**
     * getBlobMediaWithQueryIDFallbackHash
     * @description Single entry point that unconditionally prefers the QueryID
     *              endpoint (getBlobMediaWithQueryID) and only falls back to the
     *              legacy QueryHash endpoint (getBlobMediaWithQueryHash) when the
     *              QueryID request fails.
     *
     *              Returned shape mirrors the branch that succeeded:
     *                { type: 'query_id',   data: <xdt web_info item> }   OR
     *                { type: 'query_hash', data: <shortcode_media obj> }
     *              so downstream `filterResourceData()` / consumers keep working.
     *
     * @param  {String}  postPath - Instagram post shortcode.
     * @return {Promise<{ type: 'query_id'|'query_hash', data: Object }>}
     */
    function getBlobMediaWithQueryIDFallbackHash(postPath) {
        return new Promise((resolve, reject) => {
            if (!postPath) reject("NOPATH");
            const postShortCode = postPath;

            getBlobMediaWithQueryID(postShortCode).then((res) => {
                resolve({ type: 'query_id', data: res.xdt_api__v1__media__shortcode__web_info.items[0] });
            }).catch((err) => {
                logger('getBlobMediaWithQueryID() failed, falling back to getBlobMediaWithQueryHash()', postShortCode, err);
                getBlobMediaWithQueryHash(postShortCode).then(resolve).catch(reject);
            });
        });
    }

    /**
     * getBlobMediaWithQueryHash
     * @description Legacy fallback for resolving a post/reel by shortcode via the older
     *              graphql/query/?query_hash=2c4c... endpoint. Returned in the
     *              { type: 'query_hash', data: <shortcode_media> } shape.
     *
     * @param  {String}  postPath - Post shortcode (e.g. "Dbd_4ghMKqj").
     * @return {Promise<{ type: 'query_hash', data: Object }>}
     */
    function getBlobMediaWithQueryHash(postPath) {
        return new Promise((resolve, reject) => {
            if (!postPath) reject("NOPATH");
            const postShortCode = postPath;
            const getURL = `https://www.instagram.com/graphql/query/?query_hash=2c4c2e343a8f64c625ba02b2aa12c7f8&variables=%7B%22shortcode%22:%22${postShortCode}%22}`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; Pixel 7 XL)Build/RP1A.20845.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/5.0 Chrome/117.0.5938.60 Mobile Safari/537.36 Instagram 307.0.0.34.111"
                },
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        logger(obj);

                        if (obj.status === 'fail') {
                            logger('getBlobMediaWithQueryHash()', 'reject', obj);
                            reject(obj);
                        }
                        else {
                            resolve({ type: 'query_hash', data: obj.data });
                        }
                    }
                    catch (err) {
                        logger('getBlobMediaWithQueryHash()', 'reject', err.message);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getBlobMediaWithQueryHash()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * getBlobMediaWithQueryID
     * @description Get list of all media files in post with post shortcode.
     *
     * @param  {String}  postPath
     * @return {Object}
     */
    function getBlobMediaWithQueryID(postPath) {
        return new Promise((resolve, reject) => {
            if (!postPath) reject("NOPATH");
            const postShortCode = postPath;
            const getURL = `https://www.instagram.com/graphql/query/?query_id=9496392173716084&variables={%22shortcode%22:%22${postShortCode}%22,%22__relay_internal__pv__PolarisFeedShareMenurelayprovider%22:true,%22__relay_internal__pv__PolarisIsLoggedInrelayprovider%22:true}`;

            GM_xmlhttpRequest({
                method: "GET",
                url: getURL,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; Pixel 7 XL)Build/RP1A.20845.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/5.0 Chrome/117.0.5938.60 Mobile Safari/537.36 Instagram 307.0.0.34.111",
                    'X-IG-App-ID': getAppID()
                },
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        logger(obj);

                        if (obj.status === 'fail') {
                            logger(`Request failed with API response ${obj.message}: ${obj.feedback_message}`);
                            reject(response);
                        }
                        else {
                            logger('getBlobMediaWithQueryID()', obj.data);
                            resolve(obj.data);
                        }
                    }
                    catch (err) {
                        logger('getBlobMediaWithQueryID()', 'reject', err.message);
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getBlobMediaWithQueryID()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * isMacOS
     * @description Detect whether the current browser runs on macOS. Used to pick the
     *              correct modifier-key glyph in tooltips and hotkey labels.
     *
     * @return {boolean}
     */
    function isMacOS() {
        return /Macintosh|Mac OS/i.test(navigator.userAgent);
    }

    /**
     * getPlatformModifierKey
     * @description Return the display glyph for the Alt/Option modifier key, matching
     *              the current operating system's conventions.
     *
     * @return {string}
     */
    function getPlatformModifierKey() {
        return isMacOS() ? '⌥' : 'Alt';
    }

    /**
     * getStoryId
     * @description Obtain the media id through the resource URL.
     *
     * @param  {string}  url
     * @return {string}
     */
    function getStoryId(url) {
        let obj = new URL(url);
        let base64 = obj?.searchParams?.get('ig_cache_key')?.split('.').at(0);
        if (base64) {
            return atob(base64);
        }
        else {
            return null;
        }
    }

    /**
     * getAppID
     * @description Get Instagram App ID.
     *
     * @return {?string}
     */
    function getAppID() {
        let result = null;
        $('script[type="application/json"]').each(function () {
            const regexp = /"APP_ID":"([0-9]+)"/ig;
            const $this = $(this);
            const text = $this.text();
            const matcher = text.match(regexp);
            if (matcher != null && result == null) {
                result = [...text.matchAll(regexp)];
            }
        })

        return (result) ? result.at(0).at(-1) : null;
    }

    /**
     * getTimeElementBaseDateSource
     * @description Get the base date text source and cache key from a time element.
     *
     * @param  {JQuery}  $time
     * @return {{dateText: ?string, cacheKey: ?string}}
     */
    function getTimeElementBaseDateSource($time) {
        const titleText = $time.attr('title')?.trim();
        if (titleText) {
            return {
                dateText: titleText,
                cacheKey: `title:${titleText}`
            };
        }

        const datetime = $time.attr('datetime')?.trim();
        if (datetime) {
            const date = new Date(datetime);
            if (!Number.isNaN(date.getTime())) {
                return {
                    dateText: new Intl.DateTimeFormat(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }).format(date),
                    cacheKey: `datetime:${datetime}`
                };
            }
        }

        return {
            dateText: null,
            cacheKey: null
        };
    }

    /**
     * getTimeElementBaseDateText
     * @description Get the preserved absolute date text from a time element.
     *
     * @param  {JQuery}  $time
     * @return {?string}
     */
    function getTimeElementBaseDateText($time) {
        const preservedText = $time.attr('data-ih-original-date')?.trim();
        const preservedKey = $time.attr('data-ih-original-date-key')?.trim();
        const { dateText, cacheKey } = getTimeElementBaseDateSource($time);

        if (preservedText && preservedKey && cacheKey && preservedKey === cacheKey) {
            return preservedText;
        }

        if (dateText && cacheKey) {
            $time.attr('data-ih-original-date', dateText);
            $time.attr('data-ih-original-date-key', cacheKey);
            return dateText;
        }

        return null;
    }

    /**
     * setTimeElementDateAndLocaleTime
     * @description Replace time element text with absolute date and localized time.
     *
     * @param  {JQuery}  $time
     * @return {void}
     */
    function setTimeElementDateAndLocaleTime($time) {
        if ($time == null || $time.length === 0) {
            return;
        }

        const datetime = $time.attr('datetime');
        if (!datetime) {
            return;
        }

        const date = new Date(datetime);
        if (Number.isNaN(date.getTime())) {
            return;
        }

        const dateText = getTimeElementBaseDateText($time);
        if (!dateText) {
            return;
        }

        const localeTime = new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit'
        }).format(date);

        if (!localeTime) {
            return;
        }

        const finalText = `${dateText} ${localeTime}`;

        if ($time.text()?.trim() !== finalText) {
            $time.text(finalText);
            $time.css('white-space', 'break-spaces');
        }
    }

    /**
     * getHighlightCurrentTimeElement
     * @description Get the publish time element in the current highlight view.
     *
     * @param  {JQuery}  $element
     * @return {JQuery}
     */
    function getHighlightCurrentTimeElement($element) {
        if ($element == null || $element.length === 0) {
            $element = $body;
        }

        let $section = $element.closest('section:visible');
        if ($section.length === 0) {
            $section = $('body > div section:visible').last();
        }

        if ($section.length === 0) {
            return $();
        }

        let $times = $section.find('time[datetime]').filter(function () {
            const $time = $(this);

            return (
                $time.is(':visible') &&
                $time.closest('a[href^="/stories/highlights/"]').length === 0 &&
                $time.closest('[role="button"]').length === 0
            );
        });

        if ($times.length === 0) {
            return $();
        }

        return $times.first();
    }

    /**
     * updateLoadingBar
     * @description Update loading state.
     *
     * FIX: this function previously manipulated Instagram's root application
     * container directly (div[id^="mount"] > div > div > div:first),
     * removing a layout class and increasing its z-index to 20000. If
     * updateLoadingBar(false) failed to run for any reason (for example, an
     * unexpected exception somewhere in the async download chain), Instagram's
     * container remained permanently in the "modified" state, which broke its
     * own click/key dispatch until refresh — exactly the freeze bug seen during
     * rapid navigation between stories.
     *
     * The function now uses a dedicated script element instead (see the CSS
     * for #IG_HELPER_LOADING_OVERLAY injected below), which has
     * pointer-events: none. This guarantees that, regardless of what happens
     * next (including if the "loading" state remains stuck at true for an
     * unexpected reason), the overlay can never intercept clicks or key presses —
     * at worst, a loading bar remains visible; the Instagram application itself
     * does not become blocked.
     *
     * @param  {Boolean}  isLoading - Check if loading state
     * @return {void}
     */
    function updateLoadingBar(isLoading) {
        let $overlay = $('#IG_HELPER_LOADING_OVERLAY');

        if ($overlay.length === 0) {
            $overlay = $('<div id="IG_HELPER_LOADING_OVERLAY"></div>').appendTo(document.body);
        }

        $overlay.toggleClass('is-active', !!isLoading);
    }

    /**
     * getStoryProgress
     * @description Get the story progress of the username (post several stories).
     *
     * @param  {String}  username - Get progress of username
     * @return {Object}
     */
    function getStoryProgress(username) {
        const lowerUsername = username?.toLowerCase();
        let $header = $('body > div section:visible a[href^="/' + (username) + '"] span').filter(function () {
            const $this = $(this);
            return $this.children().length === 0 && $this.find('svg').length === 0 && $this.text()?.toLowerCase() === lowerUsername;
        }).parents('div:not([class]):not([style])').filter(function () {
            return $(this).text()?.toLowerCase() !== lowerUsername
        }).filter(function () {
            return $(this).children().length > 1
        }).first();

        if ($header.length === 0) {
            $header = $('body > div section:visible a[href^="/' + (username) + '"]').filter(function () {
                return $(this).find('img').length > 0
            }).parents('div:not([class]):not([style])').filter(function () {
                return $(this).text()?.toLowerCase() !== lowerUsername
            }).filter(function () {
                return $(this).children().length > 1
            }).first();
        }

        return $header.children().filter(function () {
            return $(this).height() < 10
        }).first().children();
    }

    /**
     * getStoryProgressIndex
     * @description Get the current story index and total count from Instagram's progress bar.
     *
     * @param  {Object}  $header - Progress bar items returned by getStoryProgress
     * @return {?Object}
     */
    function getStoryProgressIndex($header) {
        let current = 0;
        let total = $header.length;

        if (total === 0) {
            return null;
        }

        $header.each(function (index) {
            if ($(this).children().length > 0) {
                current = index + 1;
            }
        });

        if (current === 0) {
            return null;
        }

        return { current, total };
    }

    /**
     * setStoryProgressIndexText
     * @description Render the current story index and total count.
     *
     * @param  {Object}  $element - Element to append the counter to
     * @param  {Object}  $header - Progress bar items returned by getStoryProgress
     * @param  {String}  className - Counter class name
     * @return {void}
     */
    function setStoryProgressIndexText($element, $header, className) {
        let progress = getStoryProgressIndex($header);

        if (progress == null) {
            // Don't tear the counter down reactively during transient header-detection
            // mid-transition — leave whatever's there untouched so it updates smoothly in-place.
            return;
        }

        if (progress.total < 2) {
            $element.find('.' + className).remove();
            return;
        }

        let $counter = $element.find('.' + className).first();
        let text = progress.current + '/' + progress.total;
        let title = _i18n('ITEM_POSITION')
            .replace('%CURRENT%', progress.current)
            .replace('%TOTAL%', progress.total);

        if ($counter.length === 0) {
            $counter = $('<div>').addClass(className);
            $element.append($counter);
        }

        if ($counter.text() !== text) {
            $counter.text(text);
        }

        if ($counter.attr('title') !== title) {
            $counter.attr('title', title);
        }

        if ($counter.attr('aria-label') !== title) {
            $counter.attr('aria-label', title);
        }
    }

    /**
     * setStoryProgressIndexByUsername
     * @description Render current story index and total count from a username.
     *
     * @param  {Object}  $element - Element to append the counter to
     * @param  {String}  username - Story owner's username
     * @param  {String}  className - Counter class name
     * @return {void}
     */
    function setStoryProgressIndexByUsername($element, username, className) {
        if ($element == null || $element.length === 0 || username == null) {
            return;
        }

        let $header = getStoryProgress(username);
        setStoryProgressIndexText($element, $header, className);
    }

    /**
     * setDownloadProgress
     * @description Show and set download circle progress.
     *
     * @param  {Integer}  now
     * @param  {Integer}  total
     * @return {Void}
     */
    function setDownloadProgress(now, total) {
        // OPTIMIZATION: cache the circle wrapper lookup
        const $circle = $('.circle_wrapper');
        if ($circle.length) {
            $circle.find('span').text(`${now}/${total}`);

            if (now >= total) {
                $circle.fadeOut(250, function () {
                    $(this).remove();
                });
            }
        }
        else {
            $body.append(`<div class="circle_wrapper"><circle></circle><span>${now}/${total}</span></div>`);
        }
    }

    /**
     * saveFiles
     * @description Download the specified media URL to the computer.
     *
     * @param  {String}  downloadLink
     * @param  {Object}  metadata
     * @param  {String}  metadata.username
     * @param  {String}  metadata.sourceType
     * @param  {Integer}  metadata.timestamp
     * @param  {String}  metadata.filetype
     * @param  {String}  metadata.shortcode
     * @param  {Integer|null}  metadata.index
     * @param  {String|null}  metadata.uid
     * @return {Promise}
     */
    function saveFiles(downloadLink, metadata) {
        return new Promise(resolve => {
            setTimeout(() => {
                updateLoadingBar(true);

                const downloadName = getSaveFileName(downloadLink, metadata);
                const { filetype, shortcode, sourceType } = metadata;

                if (
                    USER_SETTING.MODIFY_RESOURCE_EXIF &&
                    filetype === 'jpg' &&
                    shortcode &&
                    sourceType === 'photo'
                ) {
                    fetch(downloadLink)
                        .then(res => res.blob())
                        .then(dwel => {
                            updateLoadingBar(false);
                            return createSaveFileElement(downloadLink, dwel, metadata);
                        })
                        .then(() => resolve(true))
                        .catch(err => {
                            updateLoadingBar(false);
                            console.error('saveFiles failed', err);
                            resolve(false);
                        });
                } else {
                    if (USER_SETTING.USE_EXTERNAL_DOWNLOAD_MODE) {
                        GM_download({
                            url: downloadLink,
                            name: downloadName,
                            onload: () => {
                                updateLoadingBar(false);
                                resolve(true);
                            },
                            // eslint-disable-next-line no-unused-vars
                            onerror: (err) => {
                                updateLoadingBar(false);
                                resolve(true);
                            },
                        });
                    }
                    else {
                        updateLoadingBar(true);
                        fetch(downloadLink)
                            .then(res => res.blob())
                            .then(dwel => {
                                updateLoadingBar(false);
                                return createSaveFileElement(downloadLink, dwel, metadata);
                            })
                            .then(() => resolve(true))
                            .catch(err => {
                                updateLoadingBar(false);
                                console.error('saveFiles failed:', err);
                                resolve(false);
                            });
                    }
                }
            }, 50);
        });
    }

    /**
     * fetchArrayBuffer
     * @description Download URL as ArrayBuffer.
     *
     * @param {string} url
     * @return {Promise<ArrayBuffer>}
     */
    async function fetchArrayBuffer(url) {
        updateLoadingBar(true);
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.arrayBuffer();
        } finally {
            updateLoadingBar(false);
        }
    }

    /**
     * parseDashManifest
     * @description Parse Reels Media API video_dash_manifest (MPD XML).
     *              Returns best video/audio representation URLs.
     *
     * @param  {string} mpdXml
     * @return {{ video: any|null, audio: any|null }}
     */
    function parseDashManifest(mpdXml) {
        try {
            if (!mpdXml || typeof mpdXml !== 'string') return { video: null, audio: null };

            const xml = new DOMParser().parseFromString(mpdXml, 'application/xml');
            if (xml.querySelector('parsererror')) return { video: null, audio: null };

            const reps = Array.from(xml.querySelectorAll('Representation'));
            const candidates = reps.map((rep) => {
                const base = rep.querySelector('BaseURL')?.textContent?.trim();
                if (!base) return null;

                const set = rep.closest('AdaptationSet');
                const mimeType = rep.getAttribute('mimeType') || set?.getAttribute('mimeType') || '';
                const contentType = set?.getAttribute('contentType') || '';
                const codecs = rep.getAttribute('codecs') || set?.getAttribute('codecs') || '';
                const bandwidth = parseInt(rep.getAttribute('bandwidth') || '0', 10) || 0;
                const width = parseInt(rep.getAttribute('width') || '0', 10) || 0;
                const height = parseInt(rep.getAttribute('height') || '0', 10) || 0;
                const id = rep.getAttribute('id') || '';

                return { id, url: base, mimeType, contentType, codecs, bandwidth, width, height };
            }).filter(Boolean);

            const isVideo = (c) => ((c.contentType || '').includes('video') || (c.mimeType || '').startsWith('video'));
            const isAudio = (c) => ((c.contentType || '').includes('audio') || (c.mimeType || '').startsWith('audio'));

            const bestVideo = candidates
                .filter(isVideo)
                .sort((a, b) => (b.height - a.height) || (b.bandwidth - a.bandwidth) || (b.width - a.width))[0] || null;

            const bestAudio = candidates
                .filter(isAudio)
                .sort((a, b) => (b.bandwidth - a.bandwidth))[0] || null;

            return { video: bestVideo, audio: bestAudio };
        } catch (e) {
            logger('[DASH]', 'parseDashManifest() error:', e);
            return { video: null, audio: null };
        }
    }

    /**
     * muxDashVideoAudioToMp4
     * @description Mux DASH video+audio into one MP4 using Mediabunny (demux + mux).
     *
     * @param {ArrayBuffer} videoBuf
     * @param {ArrayBuffer} audioBuf
     * @return {Promise<ArrayBuffer>}
     */
    async function muxDashVideoAudioToMp4(videoBuf, audioBuf) {
        const MB = Mediabunny;

        const videoInput = new MB.Input({
            formats: [MB.MP4],
            source: new MB.BufferSource(videoBuf),
        });
        const audioInput = new MB.Input({
            formats: [MB.MP4],
            source: new MB.BufferSource(audioBuf),
        });

        const vTrack = await videoInput.getPrimaryVideoTrack();
        if (!vTrack || !vTrack.codec) throw new Error('No video track found');

        const aTrack = await audioInput.getPrimaryAudioTrack();
        if (!aTrack || !aTrack.codec) throw new Error('No audio track found');

        const vSink = new MB.EncodedPacketSink(vTrack);
        const aSink = new MB.EncodedPacketSink(aTrack);

        const output = new MB.Output({
            format: new MB.Mp4OutputFormat({ fastStart: 'in-memory' }),
            target: new MB.BufferTarget(),
        });

        const vSource = new MB.EncodedVideoPacketSource(vTrack.codec);
        const aSource = new MB.EncodedAudioPacketSource(aTrack.codec);

        output.addVideoTrack(vSource, { rotation: vTrack.rotation || 0 });
        output.addAudioTrack(aSource);

        await output.start();

        const vDecoderConfig = await vTrack.getDecoderConfig();
        const aDecoderConfig = await aTrack.getDecoderConfig();

        const vMeta = vDecoderConfig ? { decoderConfig: vDecoderConfig } : undefined;
        const aMeta = aDecoderConfig ? { decoderConfig: aDecoderConfig } : undefined;

        const vIter = vSink.packets();
        const aIter = aSink.packets();

        let vNext = await vIter.next();
        let aNext = await aIter.next();
        let vSentMeta = false;
        let aSentMeta = false;

        while (!vNext.done || !aNext.done) {
            const takeVideo = (() => {
                if (vNext.done) return false;
                if (aNext.done) return true;
                return vNext.value.timestamp <= aNext.value.timestamp;
            })();

            if (takeVideo) {
                await vSource.add(vNext.value, vSentMeta ? undefined : vMeta);
                vSentMeta = true;
                vNext = await vIter.next();
            } else {
                await aSource.add(aNext.value, aSentMeta ? undefined : aMeta);
                aSentMeta = true;
                aNext = await aIter.next();
            }
        }

        await output.finalize();

        const outBuf = output.target.buffer;
        if (outBuf instanceof ArrayBuffer) return outBuf;
        if (outBuf && outBuf.buffer) {
            return outBuf.buffer.slice(outBuf.byteOffset, outBuf.byteOffset + outBuf.byteLength);
        }
        throw new Error('Unexpected output buffer type');
    }

    async function downloadDashStreams(videoUrl, audioUrl, username, sourceType, timestamp, shortcode, thumbnailURL) {
        logger('[DASH]', 'downloadDashStreams()', {
            videoUrl: videoUrl,
            audioUrl: audioUrl || null,
            sourceType,
            shortcode
        });

        if (!audioUrl) {
            logger('[DASH]', 'Downloaded DASH video only (no audio rep / has_audio=false).');
            await saveFiles(videoUrl, {
                username,
                sourceType,
                timestamp,
                filetype: 'mp4',
                shortcode,
                thumbnailURL
            });
            return true;
        }

        try {
            logger('[DASH]', 'Fetching DASH streams for mux...');
            const [vBuf, aBuf] = await Promise.all([
                fetchArrayBuffer(videoUrl),
                fetchArrayBuffer(audioUrl)
            ]);

            logger('[DASH]', 'Muxing DASH video+audio into one MP4 (mp4box main thread)...');
            const mergedBuf = await muxDashVideoAudioToMp4(vBuf, aBuf);
            const mergedBlob = new Blob([mergedBuf], { type: 'video/mp4' });

            await createSaveFileElement(videoUrl, mergedBlob, { username, sourceType, timestamp, filetype: 'mp4', shortcode, thumbnailURL });
            logger('[DASH]', 'Merged MP4 download triggered.');
            return true;
        } catch (e) {
            logger('[DASH]', 'Mux failed -> fallback to separate downloads', e?.message || e);
            await saveFiles(videoUrl, {
                username,
                sourceType,
                timestamp,
                filetype: 'mp4',
                shortcode,
                thumbnailURL
            });
            // Same base name as the video (extension aside) is intentional here,
            // consistent with how these two fallback downloads already shared a
            // base name under AUTO_RENAME before this setting existed.
            await saveFiles(audioUrl, {
                username,
                sourceType,
                timestamp,
                filetype: 'm4a',
                shortcode,
                thumbnailURL
            });
            return true;
        }
    }

    /**
     * tryHandleDashFromMediaItem
     * @description Centralized DASH handling for Reels Media API items.
     *              Uses video_dash_manifest when present.
     *              Picks best video by resolution (height/width), then bandwidth.
     *              Audio is optional.
     *
     * @param   {Object}                    args
     * @param   {Object}                    args.mediaItem   - Reels Media API item.
     * @param   {string}                    args.username
     * @param   {string}                    args.sourceType
     * @param   {number}                    args.timestamp
     * @param   {string}                    args.shortcode
     * @param   {boolean}                   args.isPreview   - true = new tab; false = download.
     * @param   {number=}                   args.index
     * @return  {Promise<boolean>} true if DASH path handled it, false to let caller fallback.
     */
    async function tryHandleDashFromMediaItem({
        mediaItem,
        username,
        sourceType,
        timestamp,
        shortcode,
        isPreview,
        index
    }) {
        try {
            const dashEnabled =
                USER_SETTING.PREFER_DASH_MANIFEST_FOR_REELS_MEDIA_API ||
                USER_SETTING.NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API;
            if (!dashEnabled) return false;

            if (!USER_SETTING.FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS) return false;

            if (!mediaItem?.video_dash_manifest) {
                logger('[DASH]', 'No video_dash_manifest available; falling back to progressive video_versions[0]', { apiKind: 'reels_media' });
                return false;
            }
            if (!mediaItem?.video_versions) return false;

            const best = parseDashManifest(mediaItem.video_dash_manifest);
            const vUrl = best?.video?.url || '';
            const aUrl = best?.audio?.url || '';

            if (!vUrl) {
                return false;
            }

            const thumbnailURL = mediaItem?.image_versions2?.candidates?.[0]?.url || mediaItem?.display_url || mediaItem?.display_resources?.[0]?.src;

            logger('[DASH]', 'best reps selected', {
                apiKind: 'reels_media',
                video: best.video ? { height: best.video.height, width: best.video.width, bandwidth: best.video.bandwidth, codecs: best.video.codecs } : null,
                audio: best.audio ? { bandwidth: best.audio.bandwidth, codecs: best.audio.codecs } : '(none)'
            });

            if (isPreview) {
                // When "open highest-quality video in new tab (no
                // audio)" option is on, open the highest-bitrate video-only track;
                // otherwise fall back to the standard preview URL (video_versions[0]).
                const openHighestVideoOnly = USER_SETTING.NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API;

                if (openHighestVideoOnly) {
                    logger('[DASH]', 'preview -> open highest-quality VIDEO-ONLY track (no audio)');
                    openNewTab(vUrl);
                } else {
                    const fallbackUrl = mediaItem.video_versions?.[0]?.url || vUrl;
                    logger('[DASH]', 'preview -> open progressive video_versions[0] (default)');
                    openNewTab(fallbackUrl);
                }
                return true;
            }

            if (!aUrl) {
                logger('[DASH]', 'download mode -> VIDEO-ONLY DASH (no audio rep)');
                await saveFiles(vUrl, {
                    username,
                    sourceType,
                    timestamp,
                    filetype: 'mp4',
                    shortcode,
                    index,
                    thumbnailURL
                });
                return true;
            }

            logger('[DASH]', 'download mode -> DASH video+audio');
            await downloadDashStreams(vUrl, aUrl, username, sourceType, timestamp, shortcode, thumbnailURL);
            return true;
        } catch (e) {
            logger('[DASH]', 'tryHandleDashFromMediaItem failed -> fallback', e?.message || e);
            return false;
        }
    }

    /**
     * triggerDownload
     * @description Trigger download from Blob with filename.
     *
     * @param {Blob} blob
     * @param {string} filename
     */
    function triggerDownload(blob, filename) {
        return new Promise(resolve => {
            const url = URL.createObjectURL(blob);

            if (USER_SETTING.USE_EXTERNAL_DOWNLOAD_MODE) {
                GM_download({
                    url: url,
                    name: filename,
                    onload: () => {
                        URL.revokeObjectURL(url);
                        resolve();
                    },
                    onerror: () => {
                        URL.revokeObjectURL(url);
                        resolve();
                    },
                });
            }
            else {
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                link.rel = "noopener";
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    // eslint-disable-next-line no-unused-vars
                    try { document.body.removeChild(link); } catch (e) { /* noop */ }
                    URL.revokeObjectURL(url);
                    resolve();
                }, 250);
            }
        });
    }

    /**
     * getSaveFileName
     * @description Get the file name for downloaded media according to the user settings and resource information.
     *
     * @param  {String}  downloadLink
     * @param  {Object}  metadata
     * @param  {String}  metadata.username
     * @param  {String}  metadata.sourceType
     * @param  {Integer}  metadata.timestamp
     * @param  {String}  metadata.filetype
     * @param  {String}  metadata.shortcode
     * @param  {Integer|null}  metadata.index
     * @param  {String|null}  metadata.uid
     * @return {String}  The generated filename
     */
    function getSaveFileName(downloadLink, metadata) {
        let { username, sourceType, timestamp, filetype, shortcode, index, uid, thumbnailURL } = metadata;

        /*
         * MATCH_VIDEO_FILENAME_TO_THUMBNAIL: for video files (and the .m4a
         * fallback saved when DASH mux fails), derive the filename from the
         * video's own thumbnail URL instead of the rename template, taking
         * priority over AUTO_RENAME/RENAME_PUBLISH_DATE. ThumbnailURL is
         * whatever the caller resolved directly from the API response/DOM.
         * If it's missing for any reason, this falls through unchanged to
         * the normal naming logic below.
         */
        if (USER_SETTING.MATCH_VIDEO_FILENAME_TO_THUMBNAIL && (filetype === 'mp4' || filetype === 'm4a') && thumbnailURL) {
            const thumbnailName = new URL(thumbnailURL).pathname.split('/').at(-1).split('.').slice(0, -1).join('.');
            return username + '_' + thumbnailName + '.' + filetype;
        }

        timestamp = parseInt(timestamp.toString().padEnd(13, '0'));
        index = (index != null) ? index : 0;

        const date = new Date(timestamp);

        const original_name = new URL(downloadLink).pathname.split('/').at(-1).split('.').slice(0, -1).join('.');
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        var filename = state.fileRenameFormat.replace(/%([^%]+)%/g, (match, content) => {
            return `%${content.toUpperCase()}%`;
        });

        var replacements = {
            '%USERNAME%': username,
            '%SOURCE_TYPE%': sourceType,
            '%SHORTCODE%': shortcode || '',
            '%YEAR%': year,
            '%2-YEAR%': year.substr(-2),
            '%MONTH%': month,
            '%DAY%': day,
            '%HOUR%': hour,
            '%MINUTE%': minute,
            '%SECOND%': second,
            '%ORIGINAL_NAME%': original_name,
            '%ORIGINAL_NAME_FIRST%': original_name.split('_').at(0),
            '%INDEX%': index.toString(),
            '%UID%': uid || '',
        };

        // eslint-disable-next-line no-useless-escape
        filename = filename.replace(/%[\w\-]+%/g, function (str) {
            if (replacements[str] == null) {
                return str;
            }

            return replacements[str];
        });

        const originally = username + '_' + original_name + '.' + filetype;
        const downloadName = USER_SETTING.AUTO_RENAME ? filename + '.' + filetype : originally;

        return downloadName;
    }


    /**
     * createSaveFileElement
     * @description Download the specified media with link element.
     *
     * @param  {String}  downloadLink
     * @param  {Object}  object
     * @param  {Object}  metadata
     * @param  {String}  metadata.username
     * @param  {String}  metadata.sourceType
     * @param  {Integer}  metadata.timestamp
     * @param  {String}  metadata.filetype
     * @param  {String}  metadata.shortcode
     * @param  {Integer|null}  metadata.index
     * @param  {String|null}  metadata.uid
     * @return {void}
     */
    async function createSaveFileElement(downloadLink, object, metadata) {
        let { username, sourceType, filetype, shortcode } = metadata;

        if (metadata.uid == null) {
            username = metadata.username;
            if (!userIdCache.has(username)) {
                userIdCache.set(username, getUserId(username));
            }
            try {
                const userInfo = await userIdCache.get(username);
                metadata.uid = userInfo?.user?.id ?? null;
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                userIdCache.delete(username);
                metadata.uid = null;
            }
        }

        const downloadName = getSaveFileName(downloadLink, metadata);

        if (
            USER_SETTING.MODIFY_RESOURCE_EXIF &&
            filetype === 'jpg' &&
            shortcode &&
            sourceType === 'photo' &&
            (object.type === 'image/jpeg' || object.type === 'image/webp')
        ) {
            try {
                const newBlob = await changeExifData(object, metadata);
                await triggerDownload(newBlob, downloadName);
            } catch (err) {
                console.error('Failed to strip EXIF and/or attach post URL to EXIF.', err);
                await triggerDownload(object, downloadName);
            }
            return;
        }
        else {
            await triggerDownload(object, downloadName);
        }
    }

    /**
     * changeExifData
     * @description Strips EXIF metadata and attaches post URLs to the EXIF of downloaded image resources.
     *
     * @param  {Object}  blob
     * @param  {Object}  metadata
     * @param  {String}  metadata.username
     * @param  {String}  metadata.sourceType
     * @param  {Integer}  metadata.timestamp
     * @param  {String}  metadata.filetype
     * @param  {String}  metadata.shortcode
     * @param  {Integer|null}  metadata.index
     * @param  {String}  metadata.uid
     * @return {Blob}
     */
    async function changeExifData(blob, metadata) {
        const concat = (...arr) => {
            const len = arr.reduce((s, a) => s + a.length, 0);
            const out = new Uint8Array(len);
            let p = 0;
            for (const a of arr) {
                out.set(a, p);
                p += a.length;
            }
            return out;
        };
        const u32le = v => {
            const b = new Uint8Array(4);
            new DataView(b.buffer).setUint32(0, v, true);
            return b;
        };
        const u16le = v => {
            const b = new Uint8Array(2);
            new DataView(b.buffer).setUint16(0, v, true);
            return b;
        };
        const enc = s => new TextEncoder().encode(s);
        const encUtf16le = s => {
            const out = new Uint8Array(s.length * 2);
            for (let i = 0; i < s.length; i++) {
                const code = s.charCodeAt(i);
                out[i * 2] = code & 0xFF;
                out[i * 2 + 1] = (code >> 8) & 0xFF;
            }
            return out;
        };
        const formatExifDate = ts => {
            let parsed = Number(ts);
            if (!Number.isFinite(parsed)) {
                parsed = Date.now();
            }
            if (parsed < 1e12) {
                parsed *= 1000;
            }

            const date = new Date(parsed);
            if (Number.isNaN(date.getTime())) {
                return '1970:01:01 00:00:00';
            }

            const y = String(date.getFullYear()).padStart(4, '0');
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const hh = String(date.getHours()).padStart(2, '0');
            const mm = String(date.getMinutes()).padStart(2, '0');
            const ss = String(date.getSeconds()).padStart(2, '0');
            return `${y}:${m}:${d} ${hh}:${mm}:${ss}`;
        };
        const makeIFDEntry = (tag, type, count, valueOrOffset) =>
            concat(u16le(tag), u16le(type), u32le(count), u32le(valueOrOffset));
        const fourCC = (dv, o) =>
            String.fromCharCode(dv.getUint8(o), dv.getUint8(o + 1), dv.getUint8(o + 2), dv.getUint8(o + 3));

        const head = new Uint8Array(await blob.slice(0, 12).arrayBuffer());
        const isJPEG = head[0] === 0xFF && head[1] === 0xD8;
        const isWEBP = head.length >= 12 &&
            String.fromCharCode(...head.subarray(0, 4)) === 'RIFF' &&
            String.fromCharCode(...head.subarray(8, 12)) === 'WEBP';
        if (!isJPEG && !isWEBP) throw new Error('Not a JPEG or WEBP');

        const exifDateString = `${formatExifDate(metadata.timestamp)}\0`;
        const username = `${(metadata.username || 'unknown').toString()}\0`;
        const url = `https://www.instagram.com/p/${metadata.shortcode}/`;
        const commentUrl = `https://www.instagram.com/uid/${metadata.uid || 'unknown'}`;

        const dateBytes = enc(exifDateString);
        const artistBytes = enc(username);
        const keywordBytes = encUtf16le(`${url}\0`);
        const xpCommentBytes = encUtf16le(`${commentUrl}\0`);

        const exifPrefix = enc('Exif\0\0');
        const tiffHeader = Uint8Array.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00]);

        const ifd0Count = 4;
        const exifIfdCount = 1;

        const ifd0Size = 2 + (ifd0Count * 12) + 4;
        const exifIfdOffset = 8 + ifd0Size;
        const exifIfdSize = 2 + (exifIfdCount * 12) + 4;
        const dataStartOffset = 8 + ifd0Size + exifIfdSize;

        const artistOffset = dataStartOffset;
        const keywordOffset = artistOffset + artistBytes.length;
        const xpCommentOffset = keywordOffset + keywordBytes.length;
        const dateOffset = xpCommentOffset + xpCommentBytes.length;

        const ifd0 = concat(
            u16le(ifd0Count),
            makeIFDEntry(0x013B, 2, artistBytes.length, artistOffset),                 // Artist
            makeIFDEntry(0x8769, 4, 1, exifIfdOffset),                                 // Exif Offset
            makeIFDEntry(0x9C9C, 1, xpCommentBytes.length, xpCommentOffset),           // XPComment
            makeIFDEntry(0x9C9E, 1, keywordBytes.length, keywordOffset),               // XPKeywords
            u32le(0)
        );

        const exifIfd = concat(
            u16le(exifIfdCount),
            makeIFDEntry(0x9003, 2, dateBytes.length, dateOffset),
            u32le(0)
        );

        const tiffBody = concat(tiffHeader, ifd0, exifIfd, artistBytes, keywordBytes, xpCommentBytes, dateBytes);

        if (isJPEG) {
            const ab = await blob.arrayBuffer();
            const dv = new DataView(ab);
            const app1Body = concat(exifPrefix, tiffBody);
            const app1Header = new Uint8Array(4);
            new DataView(app1Header.buffer).setUint16(0, 0xFFE1);
            new DataView(app1Header.buffer).setUint16(2, app1Body.length + 2);
            const newAPP1 = concat(app1Header, app1Body);

            const parts = [new Uint8Array(ab, 0, 2)];
            let off = 2,
                added = false;
            while (off < dv.byteLength) {
                const marker = dv.getUint16(off);
                if ((marker & 0xFF00) !== 0xFF00) break;
                if (marker === 0xFFDA) {
                    if (!added) parts.push(newAPP1);
                    parts.push(new Uint8Array(ab, off));
                    break;
                }
                const len = dv.getUint16(off + 2) + 2;
                if (marker === 0xFFE1) {
                    off += len;
                    continue;
                }
                parts.push(new Uint8Array(ab, off, len));
                off += len;
            }
            const total = parts.reduce((s, a) => s + a.length, 0);
            const out = new Uint8Array(total);
            let p = 0;
            parts.forEach(a => {
                out.set(a, p);
                p += a.length;
            });
            return new Blob([out], {
                type: 'image/jpeg'
            });
        }

        const ab = await blob.arrayBuffer();
        const dv = new DataView(ab);
        const chunks = [];
        let vp8xIdx = -1;
        let offset = 12;
        while (offset < dv.byteLength) {
            const cc = fourCC(dv, offset);
            const sz = dv.getUint32(offset + 4, true);
            const pad = sz & 1;
            const full = 8 + sz + pad;
            if (cc !== 'EXIF' && cc !== 'XMP ') {
                chunks.push(new Uint8Array(ab, offset, full));
                if (cc === 'VP8X') vp8xIdx = chunks.length - 1;
            }
            offset += full;
        }
        let exifChunk = concat(
            enc('EXIF'),
            u32le(exifPrefix.length + tiffBody.length),
            exifPrefix,
            tiffBody
        );
        if (exifChunk.length & 1) exifChunk = concat(exifChunk, Uint8Array.of(0));
        if (vp8xIdx !== -1) {
            const vp8x = new Uint8Array(chunks[vp8xIdx]);
            vp8x[8] |= 0x10;
            chunks[vp8xIdx] = vp8x;
            chunks.splice(vp8xIdx + 1, 0, exifChunk);
        } else {
            chunks.push(exifChunk);
        }
        const payload = chunks.reduce((s, c) => s + c.length, 0);
        const riffHeader = concat(enc('RIFF'), u32le(payload + 4), enc('WEBP'));
        const finalBuf = concat(riffHeader, ...chunks);
        return new Blob([finalBuf], {
            type: 'image/webp'
        });
    }

    /**
     * triggerLinkElement
     * @description Trigger the link element to start downloading or previewing the resource.
     *
     * @param  {Object}   element     - The element containing resource link metadata.
     * @param  {Boolean}  [isPreview] - True to preview in a new tab instead of downloading.
     * @return {void}
     */
    async function triggerLinkElement($element, isPreview = false) {
        try {
            const $el = $($element);

            let date = new Date().getTime();
            let timestamp = Math.floor(date / 1000);
            let username = $el.data('username') ? $el.data('username') : state.GL_username;
            let index = parseInt($el.attr('data-globalindex') || 0, 10) || 0;

            if (!username && $el.data('path')) {
                logger('catching owner name from shortcode', $el.data('href'));
                username = await getPostOwner($el.data('path')).catch(err => {
                    logger('get username failed, replace with default string, error message', err?.message);
                    return null;
                });
            }

            if (username == null) username = 'NONE';

            if (USER_SETTING.RENAME_PUBLISH_DATE && $el.attr('datetime')) {
                timestamp = parseInt($el.attr('datetime'), 10) || timestamp;
            }

            const mediaId = $el.attr('media-id') || $el.attr('data-media-id') || null;
            const sourceType = $el.data('name');
            const filetype = $el.data('type') || 'jpg';
            const shortcode = $el.data('path');
            const href = $el.data('href');
            // Every video entry in these popup/batch lists renders its own thumbnail
            // as the <img> inside the same <a> (see the .videoThumbnail button, which
            // already reads this exact same src to download it directly).
            const thumbnailURL = filetype === 'mp4' ? $el.find('img').first().attr('src') : undefined;

            const downloadOnly = !isPreview;

            if (!isPreview && index < 0) {
                alert(_i18n('NO_CHECK_RESOURCE'));
                return;
            }

            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                const cached = getImageFromCache(mediaId);

                if (cached && filetype !== 'mp4') {
                    if (!downloadOnly && isPreview) {
                        openNewTab(cached);
                    } else {
                        await saveFiles(cached, {
                            username,
                            sourceType,
                            timestamp,
                            filetype: filetype || 'jpg',
                            shortcode,
                            index
                        });
                    }
                    return;
                }
            }

            if (href) {
                if (!downloadOnly && isPreview) {
                    openNewTab(replaceSameOriginHost(href));
                } else {
                    await saveFiles(href, {
                        username,
                        sourceType,
                        timestamp,
                        filetype,
                        shortcode,
                        index,
                        thumbnailURL
                    });
                }
                return;
            }

            alert('Cannot find download URL.');
        } catch (err) {
            console.error('Occur error in triggerLinkElement:', err);
            logger('Occur error in triggerLinkElement:', err);
        }
    }

    /**
     * replaceSameOriginHost
     * @description Replace the host of the URL to bypass the same-origin policy for certain video resources that cannot be downloaded directly.
     *
     * @param  {string}  url
     * @return {string}
     */
    function replaceSameOriginHost(url) {
        // replace https://instagram.ftpe8-2.fna.fbcdn.net/ to https://scontent.cdninstagram.com/ becase of same origin policy (some video)
        var urlObj = new URL(url);
        urlObj.host = 'scontent.cdninstagram.com';

        return urlObj.href;
    }

    /**
     * checkingScriptUpdate
     * @description Check if there is a new version of the script and push notification.
     *
     * @param  {Integer}  interval
     * @return {void}
     */
    function checkingScriptUpdate(interval) {
        if (!USER_SETTING.CHECK_FOR_UPDATE) return;

        const check_timestamp = GM_getValue('G_CHECK_TIMESTAMP') ?? new Date().getTime();
        const now_time = new Date().getTime();

        if (now_time > (parseInt(check_timestamp) + (interval * 1000))) {
            GM_setValue('G_CHECK_TIMESTAMP', new Date().getTime());
            callNotification();
        }
    }

    /**
     * callNotification
     * @description Call desktop notification by browser.
     *
     * @return {void}
     */
    function callNotification() {
        const currentVersion = GM_info.script.version;
        const remoteScriptURL = 'https://raw.githubusercontent.com/SN-Koarashi/ig-helper/refs/heads/master/main.js';

        GM_xmlhttpRequest({
            method: "GET",
            url: remoteScriptURL,
            onload: function (response) {
                const remoteScript = response.responseText;
                const match = remoteScript.match(/\/\/\s+@version\s+([0-9.\-a-zA-Z]+)/i);

                if (match && match[1]) {
                    const remoteVersion = match[1];
                    logger('Current version: ', currentVersion, '|', 'Remote version: ', remoteVersion);

                    if (remoteVersion !== currentVersion) {
                        GM_notification({
                            text: _i18n("NOTICE_UPDATE_CONTENT"),
                            title: _i18n("NOTICE_UPDATE_TITLE"),
                            tag: 'ig_helper_notice',
                            highlight: true,
                            timeout: 5000,
                            zombieTimeout: 5000,
                            image: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.instagram.com&size=64",
                            onclick: (event) => {
                                event?.preventDefault();
                                var w = GM_openInTab(GM_info.script.downloadURL);
                                setTimeout(() => {
                                    w.close();
                                }, 250);
                            }
                        });
                    } else {
                        logger('there is no new update');
                    }
                } else {
                    console.error('Could not find version in the remote script.');
                }
            }
        });
    }

    /**
     * openNewTab
     * @description Open URL in new tab.
     *
     * @param  {String}  link
     * @return {void}
     */
    function openNewTab(link) {
        var a = document.createElement('a');
        a.href = link;
        a.target = '_blank';

        document.body.appendChild(a);
        a.click();
        a.remove();

        setTimeout(() => { updateLoadingBar(false); }, 125);
    }

    /**
     * reloadScript
     * @description Re-register main timer.
     *
     * @return {void}
     */
    function reloadScript() {
        clearInterval(state.GL_repeat);

        // OPTIMIZATION: use cached $body and combine .off() calls
        $body.off('.igHelperPost');
        state.bodyEventsRegistered = false;

        $('.button_wrapper').remove();
        $('.IG_DWPROFILE, .IG_DWPROFILE, .IG_DWSTORY, .IG_DWSTORY_ALL, .IG_DWSTORY_THUMBNAIL, .IG_DWSTORY_POSITION, .IG_DWNEWTAB, .IG_DWHISTORY, .IG_DWHISTORY_ALL, .IG_DWHINEWTAB, .IG_DWHISTORY_THUMBNAIL, .IG_DWHISTORY_POSITION, .IG_REELS, .IG_REELS_NEWTAB, .IG_REELS_THUMBNAIL').remove();
        restoreMarkedContainers();
        $('[data-snig]').removeAttr('data-snig');

        state.pageLoaded = false;
        state.firstStarted = false;
        state.currentURL = location.href;
        state.GL_observer?.disconnect();

        // Re-register delegated click handlers
        registerPostClickHandlers();

        logger('main timer re-register completed');
    }

    /**
     * logger
     * @description Event record.
     *
     * @return {void}
     */
    function logger(...messages) {
        var dd = new Date();
        state.GL_logger.push({
            time: dd.getTime(),
            content: [...messages]
        });

        if (state.GL_logger.length > 1000) {
            state.GL_logger = [{
                time: dd.getTime(),
                content: ['logger sliced']
            }, ...state.GL_logger.slice(-999)];
        }

        console.log(`[${dd.toISOString()}]`, ...messages);
    }

    /**
     * initSettings
     * @description Initialize preferences.
     *
     * @return {void}
     */
    function initSettings() {
        for (let name in USER_SETTING) {
            if (GM_getValue(name) != null && typeof GM_getValue(name) === 'boolean') {
                USER_SETTING[name] = GM_getValue(name);

                if (name === "MODIFY_VIDEO_VOLUME" && GM_getValue(name) !== true) {
                    state.videoVolume = 1;
                }
            }
        }
    }


    /**
     * toggleVolumeSilder
     * @description Toggle display of custom volume slider.
     *
     * @param  {object}  $videos
     * @param  {object}  $buttonParent
     * @param  {string}  loggerType
     * @param  {string}  customClass
     * @return {void}
     */
    function toggleVolumeSilder($videos, $buttonParent, loggerType, customClass = "") {
        // Set initial volume listener only once per video
        $videos.each(function () {
            const $this = $(this);
            $this.one('play playing', function () {
                if (!$this.data('volume-slider')) {
                    $this.data('volume-slider', true);
                    this.volume = state.videoVolume;
                    //logger(`(${loggerType})`, 'video volume changed #volume-slider');
                }
            });
        });

        if ($buttonParent.find('div.volume_slider').length > 0) {
            return;
        }

        const $newSlider = $('<div class="volume_slider ' + customClass + '" />');
        $buttonParent.append($newSlider);

        $newSlider.append('<div><input type="range" max="1" min="0" step="0.05" value="' + state.videoVolume + '" /></div>');
        const $sliderInput = $newSlider.find('input');

        const syncSliderUI = (val) => {
            const percent = (val * 100) + '%';
            $sliderInput.val(val);
            $sliderInput.attr('style', '--ig-track-progress: ' + percent);
        };

        const applyVolumeToVideos = (val) => {
            state.videoVolume = val;
            GM_setValue('G_VIDEO_VOLUME', val);

            $videos.each(function () {
                //logger(`(${loggerType})`, 'video volume changed #slider');
                this.volume = val;
            });
        };

        syncSliderUI(state.videoVolume);

        $sliderInput.on('input', function () {
            const val = parseFloat(this.value);
            syncSliderUI(val);
            applyVolumeToVideos(val);
        });

        $sliderInput.on('mouseenter', function () {
            syncSliderUI(state.videoVolume);
        });

        $newSlider.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    /**
     * triggerReactClickHandler
     * @description Trigger the React synthetic onClick handler bound to the given DOM
     *              node. Locates the internal __reactProps* or __reactEventHandlers*
     *              key React attaches to each fiber-linked node and calls onClick with
     *              a minimal synthetic event.
     *
     * @param  {HTMLElement}  el
     * @return {void}
     */
    function triggerReactClickHandler(el) {
        const reactKey = Object.keys(el).find(k => k.startsWith('__reactProps') || k.startsWith('__reactEventHandlers'));
        const props = el[reactKey];

        if (props && typeof props.onClick === 'function') {
            const mockEvent = {
                target: el,
                currentTarget: el,
                preventDefault: () => { },
                stopPropagation: () => { },
                nativeEvent: new MouseEvent('click')
            };

            props.onClick(mockEvent);
        } else {
            logger('No React click handler found for the element:', el);
        }
    };

    // /**
    //  * getPointerElement
    //  * @description Get the element at the pointer position and check if it is the target element or if it is covered by another element.
    //  *
    //  * @param {JQuery<HTMLElement>} $target
    //  * @param {number} clientX
    //  * @param {number} clientY
    //  */
    // export function getPointerElement($target, clientX, clientY) {
    //     let element = $target.get(0);
    //     const rect = element.getBoundingClientRect();

    //     const viewportWidth = window.innerWidth;
    //     const viewportHeight = window.innerHeight;

    //     const visibleX = Math.max(rect.left, 0) + (Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0)) / 2;
    //     const visibleY = Math.max(rect.top, 0) + (Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)) / 2;

    //     if (visibleX < 0 || visibleX > viewportWidth || visibleY < 0 || visibleY > viewportHeight) {
    //         if (clientX == null || clientY == null) {
    //             return { self: false, topElement: null, target: $target, error: 'out_of_viewport', rect };
    //         }
    //     }

    //     const topElement = document.elementFromPoint(clientX || visibleX, clientY || visibleY);

    //     if ($(topElement).height() > document.body.clientHeight) {
    //         return { self: false, topElement: null, target: $target, error: 'oversize_element', rect };
    //     }

    //     if ($(topElement).width() < 100 || $(topElement).height() < 100) {
    //         return { self: false, topElement: null, target: $target, error: 'small_element', rect };
    //     }

    //     if (topElement && topElement !== element && !element.contains(topElement)) {
    //         if ($(topElement).find($target).length > 0) {
    //             // return { self: false, topElement, target: $target };
    //             return { self: false, topElement: null, target: $target, error: 'covered_by_element', rect };
    //         }

    //         if ($(topElement).width() != $target.width() || $(topElement).height() != $target.height()) {
    //             return { self: false, topElement: null, target: $target, error: 'different_dimensions', rect };
    //         }


    //         // return { self: false, topElement: null, target: $target, error: 'none_of_element', rect };
    //         return { self: false, topElement, target: $target };
    //     } else {
    //         return { self: true, topElement, target: $target };
    //     }
    // }

    /**
     * updatePopupSelectionSummary
     * @description Update selection summary in popup dialog.
     *
     * @param {string|JQuery} root
     * @return {void}
     */
    function updatePopupSelectionSummary(root = '.IG_POPUP_DIG') {
        const $root = (typeof root === 'string') ? $(root) : root;
        if (!$root || $root.length === 0) return;

        const $titleCheckbox = $root.find('.IG_POPUP_DIG_TITLE .checkbox');
        const $countSpan = $titleCheckbox.find('.item-count');
        if ($titleCheckbox.length === 0 || $countSpan.length === 0) return;

        const $items = $root.find('.IG_POPUP_DIG_BODY .inner_box');
        const total = $items.length;
        const selected = $items.filter(':checked').length;

        $titleCheckbox.find('input').prop('checked', total > 0 && selected === total);

        const formatCount = (count, singularKey, pluralKey) => {
            const key = count === 1 ? singularKey : pluralKey;
            const template = _i18n(key);
            return (typeof template === 'string')
                ? template.replace('%COUNT%', count)
                : String(count);
        };

        const totalLabel = formatCount(total, 'ITEM_COUNT_SINGULAR', 'ITEM_COUNT_PLURAL');
        const selectedLabel = formatCount(selected, 'SELECTED_COUNT_SINGULAR', 'SELECTED_COUNT_PLURAL');

        $countSpan.text(` (${selectedLabel} / ${totalLabel})`);
    }

    /**
     * IG_createDM
     * @description A dialog showing a list of all media files in the post.
     *
     * @param  {Boolean}  hasHidden
     * @param  {Boolean}  hasCheckbox
     * @return {void}
     */
    function IG_createDM(hasHidden, hasCheckbox) {
        let isHidden = (hasHidden) ? "hidden" : "";
        $body.append('<div class="IG_POPUP_DIG ' + isHidden + '"><div class="IG_POPUP_DIG_BG"></div><div class="IG_POPUP_DIG_MAIN"><div class="IG_POPUP_DIG_TITLE"></div><div class="IG_POPUP_DIG_BODY"></div></div></div>');
        // OPTIMIZATION: cache popup title element used 3+ times in this function
        const $title = $('.IG_POPUP_DIG .IG_POPUP_DIG_MAIN .IG_POPUP_DIG_TITLE');
        $title.append(`<div style="position:relative;min-height:36px;text-align:center;margin-bottom: 7px;"><div style="position:absolute;left:0px;line-height: 18px;"><kbd>${getPlatformModifierKey()}</kbd>+<kbd>Q</kbd> [<span data-ih-locale="CLOSE">${_i18n("CLOSE")}</span>]</div><div style="line-height: 18px;">IG Helper v${GM_info.script.version}</div><div id="post_info" style="line-height: 14px;font-size:14px;">Post ID: <span id="article-id"></span></div><div class="IG_POPUP_DIG_BTN">${SVG.CLOSE}</div></div>`);

        if (hasCheckbox) {
            $title.append(`<div style="text-align: center;" id="button_group"></div>`);
            const $btnGroup = $title.find('> div#button_group');
            $btnGroup.append(`<button id="batch_download_selected" disabled data-ih-locale="BATCH_DOWNLOAD_SELECTED">${_i18n('BATCH_DOWNLOAD_SELECTED')}</button>`);
            $btnGroup.append(`<button id="batch_download_direct" disabled data-ih-locale="BATCH_DOWNLOAD_DIRECT">${_i18n('BATCH_DOWNLOAD_DIRECT')}</button>`);
            $title.append(`<label class="checkbox"><input value="yes" type="checkbox" /><span data-ih-locale="ALL_CHECK">${_i18n('ALL_CHECK')}</span><span class="item-count"></span></label>`);
        }
    }

    /**
     * IG_setDM
     * @description Set a dialog status.
     *
     * @param  {Boolean}  hasHidden
     * @return {void}
     */
    function IG_setDM(hasHidden) {
        const $popup = $('.IG_POPUP_DIG');
        if ($popup.length) {
            if (hasHidden) {
                $popup.addClass("hidden");
            }
            else {
                $popup.removeClass("hidden");
            }
        }
    }


    /**
     * registerMenuCommand
     * @description Register script menu command.
     *
     * @return {void}
     */
    function registerMenuCommand() {
        for (let id of state.registerMenuIds) {
            logger('GM_unregisterMenuCommand', id);
            GM_unregisterMenuCommand(id);
        }

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('SETTING'), () => {
            showSetting();
        }, {
            accessKey: "w"
        }));

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('HOTKEY_KEY_SETTINGS_KEY'), () => {
            showHotkeySetting();
        }, {
            accessKey: "q"
        }));

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('DONATE'), () => {
            GM_openInTab("https://ko-fi.com/snkoarashi", { active: true });
        }, {
            accessKey: "d"
        }));

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('DEBUG'), () => {
            showDebugDOM();
        }, {
            accessKey: "z"
        }));

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('FEEDBACK'), () => {
            showFeedbackDOM();
        }, {
            accessKey: "f"
        }));

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('CHECK_FOR_UPDATE'), () => {
            callNotification();
        }, {
            accessKey: "c"
        }));

        state.registerMenuIds.push(GM_registerMenuCommand(_i18n('RELOAD_SCRIPT'), () => {
            reloadScript();
        }, {
            accessKey: "r"
        }));
    }

    function showHotkeySetting() {
        $('.IG_POPUP_DIG').remove();
        IG_createDM();

        $('.IG_POPUP_DIG #post_info').text('Hotkey Settings');

        const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY');

        const hotkeyOptions = [
            { value: '87', label: 'Alt+W' },
            { value: '90', label: 'Alt+Z' },
            { value: '88', label: 'Alt+X' },
            { value: '68', label: 'Alt+D' },
            { value: '75', label: 'Alt+K' },
            { value: '67', label: 'Alt+C' },
            { value: '83', label: 'Alt+S' },
            { value: '192', label: 'Alt+~' },
            { value: '49', label: 'Alt+1' },
            { value: '50', label: 'Alt+2' },
            { value: '51', label: 'Alt+3' },
            { value: '52', label: 'Alt+4' },
            { value: '53', label: 'Alt+5' }
        ];

        const hotkeyConfigs = [
            { name: 'HOTKEY_SETTINGS', key: 'HOTKEY_SETTINGS_KEY', stateKey: 'settingsHotkeyKeyCode', storageKey: 'G_HOTKEY_SETTINGS_KEYCODE', defaultKeyCode: 87 },
            { name: 'HOTKEY_KEY_SETTINGS', key: 'HOTKEY_KEY_SETTINGS_KEY', stateKey: 'keySettingsHotkeyKeyCode', storageKey: 'G_HOTKEY_KEY_SETTINGS_KEYCODE', defaultKeyCode: 67 },
            { name: 'HOTKEY_DEBUG', key: 'HOTKEY_DEBUG_KEY', stateKey: 'debugHotkeyKeyCode', storageKey: 'G_HOTKEY_DEBUG_KEYCODE', defaultKeyCode: 90 },
            { name: 'HOTKEY_DOWNLOAD_STORY', key: 'HOTKEY_DOWNLOAD_STORY_KEY', stateKey: 'downloadStoryHotkeyKeyCode', storageKey: 'G_HOTKEY_DOWNLOAD_STORY_KEYCODE', defaultKeyCode: 83 },
        ];

        function checkHotkeyConflict(keyCode, excludeStateKey) {
            for (const config of hotkeyConfigs) {
                if (config.stateKey !== excludeStateKey && state[config.stateKey] === keyCode) {
                    return true;
                }
            }
            return false;
        }

        function createHotkeySetting(name, key, stateKey, storageKey, defaultKeyCode) {
            const currentKeyCode = state[stateKey];
            const $container = $(`
                <label class="globalSettings hotkey-setting-item" data-hotkey="${name}" style="position: relative;display: flex; align-items: center; padding-right: 5px;">
                    <span>${_i18n(key)}</span>
                    <div class="hotkey-select-wrapper" style="display: flex; align-items: center; gap: 8px; justify-content: flex-end; flex: 1;">
                        <select class="hotkey-preset" data-storage="${storageKey}" data-state="${stateKey}" data-default="${defaultKeyCode}" style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px;">
                            ${hotkeyOptions.filter(o => o.value != defaultKeyCode.toString()).map(o => `<option value="${o.value}" ${o.value == currentKeyCode ? 'selected' : ''}>${o.label}</option>`).join('')}
                            <option value="${defaultKeyCode}" ${currentKeyCode == defaultKeyCode ? 'selected' : ''}>Alt+${String.fromCharCode(defaultKeyCode)}</option>
                        </select>
                        <button class="hotkey-reset" title="${_i18n('HOTKEY_RESET')}" style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; color: #1f1f1f; background: #fff; cursor: pointer;">${_i18n('HOTKEY_RESET')}</button>
                    </div>
                    <div class="hotkey-conflict-warning" style="pointer-events: none; position: absolute; bottom: -10px; display: none; font-size: 11px; color: #e74c3c;">▲ ${_i18n('HOTKEY_CONFLICT_WARNING')}</div>
                </label>
            `);

            $container.find('.hotkey-reset').on('click', function () {
                const $preset = $container.find('.hotkey-preset');
                const defaultCode = parseInt($preset.data('default'));
                const stateKeyName = $preset.data('state');
                const storage = $preset.data('storage');

                state[stateKeyName] = defaultCode;
                GM_setValue(storage, defaultCode);
                $preset.val(defaultCode);
                $container.find('.hotkey-conflict-warning').hide();
            });

            $container.find('.hotkey-preset').on('change', function () {
                const $this = $(this);
                const val = $this.val();
                const storage = $this.data('storage');
                const stateKeyName = $this.data('state');
                const defaultCode = parseInt($this.data('default'));
                const keyCode = parseInt(val);

                if (checkHotkeyConflict(keyCode, stateKeyName)) {
                    state[stateKeyName] = defaultCode;
                    GM_setValue(storage, defaultCode);
                    $this.val(defaultCode);
                    $container.find('.hotkey-conflict-warning').show().delay(2000).fadeOut(500);
                } else {
                    state[stateKeyName] = keyCode;
                    GM_setValue(storage, keyCode);
                    $container.find('.hotkey-conflict-warning').hide();
                }
            });

            return $container;
        }

        $popupBody.append('<span style="display: block; margin-bottom: 15px;" class="hotkey-settings-container"></span>');
        const $container = $popupBody.find('.hotkey-settings-container');

        hotkeyConfigs.forEach((config) => {
            $container.append(
                createHotkeySetting(config.name, config.key, config.stateKey, config.storageKey, config.defaultKeyCode)
            );
        });
    }

    /**
     * showSetting
     * @description Show script settings window.
     *
     * @return {void}
     */
    function showSetting() {
        $('.IG_POPUP_DIG').remove();
        IG_createDM();

        $('.IG_POPUP_DIG #post_info').text('Preference Settings');
        $('.IG_POPUP_DIG .IG_POPUP_DIG_TITLE > div')
            .append(`
                <select id="langSelect"></select>
                <div style="font-size: 12px;">
                    Some texts are machine-translated and may be inaccurate; translation contributions are welcome on GitHub.
                </div>
            `);

        // OPTIMIZATION: cache the lang select once
        const $langSelect = $('#langSelect');
        for (const o in locale_manifest) {
            $langSelect.append(
                `<option value="${o}" ${(state.lang === o) ? 'selected' : ''}>${locale_manifest[o]}</option>`
            );
        }

        const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY');

        for (const name in USER_SETTING) {
            $popupBody.append(`
                <label class="globalSettings"
                       title="${_i18n(name + '_INTRO')}"
                       data-ih-locale-title="${name + '_INTRO'}">

                    <span data-ih-locale="${name}">${_i18n(name)}</span>
                    <input id="${name}" value="box" type="checkbox"
                           ${USER_SETTING[name] === true ? 'checked' : ''}>
                    <div class="chbtn"><div class="rounds"></div></div>
                </label>`
            );

            if (name === 'MODIFY_VIDEO_VOLUME') {
                $popupBody.find(`input[id="${name}"]`).parent('label').on('contextmenu', function (e) {
                    e.preventDefault();
                    const $this = $(this);
                    if (!$this.find('#tempWrapper').length) {
                        $this.append('<div id="tempWrapper"></div>')
                            .children('#tempWrapper')
                            .append(`<input value="${state.videoVolume}" type="range" min="0" max="1" step="0.05" />`)
                            .append(`<input value="${state.videoVolume}" step="0.05" type="number" />`)
                            .append(`<div class="IG_POPUP_DIG_BTN">${SVG.CLOSE}</div>`);
                    }
                });
            }

            if (name === 'AUTO_RENAME') {
                $popupBody.find(`input[id="${name}"]`).parent('label').on('contextmenu', function (e) {
                    e.preventDefault();
                    const $this = $(this);
                    if (!$this.find('#tempWrapper').length) {
                        $this.append('<div id="tempWrapper"></div>')
                            .children('#tempWrapper')
                            .append(`<input id="date_format" value="${state.fileRenameFormat}" />`)
                            .append(`<div class="IG_POPUP_DIG_BTN">${SVG.CLOSE}</div>`);
                    }
                });
            }
        }

        $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY input#CHECK_FOR_UPDATE').closest('label').prependTo('.IG_POPUP_DIG .IG_POPUP_DIG_BODY');

        arrangeSettingHierarchy();
    }

    /**
     * arrangeSettingHierarchy
     * @description Arrange specific settings under the corresponding setting.
     *
     * @return {void}
     */
    function arrangeSettingHierarchy() {
        Object.entries(PARENT_CHILD_MAPPING).forEach(([parent, children]) => {

            let $prev = $(`.IG_POPUP_DIG .IG_POPUP_DIG_BODY input#${parent}`).closest('label');

            children.forEach(child => {
                const $childLbl = $(`.IG_POPUP_DIG .IG_POPUP_DIG_BODY input#${child}`).closest('label').detach();
                $childLbl.addClass("child");
                $prev.after($childLbl);
                $prev = $childLbl;
            });
        });
    }

    /**
     * showDebugDOM
     * @description Show full DOM tree.
     *
     * @return {void}
     */
    function showDebugDOM() {
        $('.IG_POPUP_DIG').remove();
        IG_createDM();
        $('.IG_POPUP_DIG #post_info').text('IG Debug DOM Tree');

        // OPTIMIZATION: cache popup body
        const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY');
        $popupBody.append(`<textarea style="font-family: monospace;width:100%;box-sizing: border-box;height:300px;background: transparent;" readonly></textarea>`);
        $popupBody.append(`<span style="display:block;text-align:center;">`);
        const $span = $popupBody.find('span').last();
        $span.append(`<button style="margin: 3px;" class="IG_DISPLAY_DOM_TREE"><a>${_i18n('SHOW_DOM_TREE')}</a></button>`);
        $span.append(`<button style="margin: 3px;" class="IG_SELECT_DOM_TREE"><a>${_i18n('SELECT_AND_COPY')}</a></button>`);
        $span.append(`<button style="margin: 3px;" class="IG_DOWNLOAD_DOM_TREE"><a>${_i18n('DOWNLOAD_DOM_TREE')}</a></button><br/>`);
        $span.append(`<button style="margin: 3px;" class="IG_REPORT_GITHUB"><a href="https://github.com/SN-Koarashi/ig-helper/issues" target="_blank">${_i18n('REPORT_GITHUB')}</a></button>`);
        $span.append(`<button style="margin: 3px;" class="IG_REPORT_DISCORD"><a href="https://discord.gg/q3KT4hdq8x" target="_blank">${_i18n('REPORT_DISCORD')}</a></button>`);
    }

    /**
     * showFeedbackDOM
     * @description Show feedback options.
     *
     * @return {void}
     */
    function showFeedbackDOM() {
        $('.IG_POPUP_DIG').remove();
        IG_createDM();
        $('.IG_POPUP_DIG #post_info').text('Feedback Options');

        const $popupBody = $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY');
        $popupBody.append(`<span style="display:block;text-align:center;">`);
        const $span = $popupBody.find('span').last();
        $span.append(`<button style="margin: 3px;" class="IG_REPORT_FORK"><a href="https://greasyfork.org/en/scripts/404535-ig-helper/feedback" target="_blank">${_i18n('REPORT_FORK')}</a></button>`);
        $span.append(`<button style="margin: 3px;" class="IG_REPORT_GITHUB"><a href="https://github.com/SN-Koarashi/ig-helper/issues" target="_blank">${_i18n('REPORT_GITHUB')}</a></button>`);
        $span.append(`<button style="margin: 3px;" class="IG_REPORT_DISCORD"><a href="https://discord.gg/q3KT4hdq8x" target="_blank">${_i18n('REPORT_DISCORD')}</a></button>`);
    }

    var detectMovingViewerTimer = null;

    function openImageViewer(imageUrl) {
        removeImageViewer();

        $body.append(
            `<div id="imageViewer">
    	<div id="iv_header">
    		<div style="flex:1;">Image Viewer</div>
    		<div style="display: flex;filter: invert(1);gap: 8px;margin-right: 8px;">
                <div id="rotate_left" style="cursor: pointer;">${SVG.TURN_DEG}</div>
                <div id="rotate_right" style="transform: scaleX(-1);cursor: pointer;">${SVG.TURN_DEG}</div>
            </div>
    		<div id="iv_close">${SVG.CLOSE}</div>
    	</div>
        <section>
            <div id="iv_transform">
                <div id="iv_rotate">
                    <img id="iv_image" src="" />
                </div>
            </div>
        </section>
    </div>`);

        const $container = $('#imageViewer');
        const $section = $('#imageViewer > section');
        const $wrapT = $('#iv_transform');
        const $wrapR = $('#iv_rotate');
        const $header = $('#iv_header');
        const $closeIcon = $('#iv_close');
        const $image = $('#iv_image');
        const $rotateLeft = $('#rotate_left');
        const $rotateRight = $('#rotate_right');

        $image.attr('src', imageUrl);
        $container.css('display', 'flex');
        $wrapT.css('transform-origin', '0 0');
        $wrapT.css('transition', `transform 0.15s ease`);
        $wrapR.css('transform-origin', 'center');
        $wrapR.css('transition', `transform 0.15s ease`);
        $wrapT.css('will-change', 'transform');
        $wrapR.css('will-change', 'transform');

        let rotate = 0;
        let scale = 1;
        let posX = 0, posY = 0;
        let isDragging = false;
        let isMovingPhoto = false;
        let startX, startY;
        var previousPosition = {
            x: 0,
            y: 0
        };

        detectMovingViewerTimer = setInterval(() => {
            const currentPosition = {
                x: posX,
                y: posY
            };
            if (currentPosition.x !== previousPosition.x || currentPosition.y !== previousPosition.y) {
                isMovingPhoto = true;
            } else {
                isMovingPhoto = false;
            }
            previousPosition = currentPosition;
        }, 100);


        $image.on('load', () => {
            posX = 0;
            posY = 0;
            updateImageStyle();
        });

        $image.on('dragstart drop', (e) => {
            e.preventDefault();
        });

        $image.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!isMovingPhoto) {
                if (scale <= 1) {
                    makeZoomAction(e, Math.min(Math.max(1, scale + 1.25), 5));
                }
                else {
                    scale = 1;
                    posX = 0;
                    posY = 0;
                }

                updateImageStyle();
            }
        });

        $section.on('wheel', (e) => {
            e.preventDefault();
            makeZoomAction(e);
        });

        $container.on('wheel', (e) => {
            e.preventDefault();
        });

        $image.on('mousedown', (e) => {
            if (scale == 1) return;

            isDragging = true;

            startX = e.pageX - posX;
            startY = e.pageY - posY;
            $image.css('cursor', 'grabbing');
        });

        $image.on('mouseup', () => {
            if (scale == 1) return;

            isDragging = false;
            $image.css('cursor', 'grab');
        });

        $rotateLeft.on('click', function () {
            rotate -= 90;
            updateImageStyle();
        });

        $rotateRight.on('click', function () {
            rotate += 90;
            updateImageStyle();
        });

        $(document).on('mousemove.igHelper', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            posX = e.pageX - startX;
            posY = e.pageY - startY;

            updateImageStyle();
        });

        $container.on('click', () => {
            removeImageViewer();
        });

        $closeIcon.on('click', () => {
            removeImageViewer();
        });

        $header.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        function updateImageStyle() {
            $wrapT.css('transition', isMovingPhoto ? "none" : `transform 0.15s ease`);
            $wrapT.css('transform', `translate(${posX}px, ${posY}px) scale(${scale})`);
            $wrapR.css('transform', `rotate(${rotate}deg)`);

            if (scale == 1) {
                $image.css('cursor', 'zoom-in');
            }
            else {
                $image.css('cursor', 'grabbing');
            }
        }


        function makeZoomAction(e, newScale) {
            e.preventDefault();

            let prevScale = scale;

            // newScale should be null when passing by wheel event
            if (newScale == null) {
                let factor = 0.1;
                let delta = e.originalEvent.deltaY < 0 ? 1 : -1;
                scale = Math.min(5, Math.max(1, scale + delta * factor * scale));
            }
            else {
                scale = newScale;
            }


            let rect = $section[0].getBoundingClientRect();
            let mx = e.clientX - rect.left;
            let my = e.clientY - rect.top;

            let zoomTargetX = (mx - posX) / prevScale;
            let zoomTargetY = (my - posY) / prevScale;

            posX = -zoomTargetX * scale + mx;
            posY = -zoomTargetY * scale + my;

            updateImageStyle();
        }
    }

    function removeImageViewer() {
        clearInterval(detectMovingViewerTimer);
        $('#imageViewer').remove();
        $(document).off('mousemove.igHelper');
    }

    let mediaCacheDirty = false;
    let mediaCacheSaveTimer = null;

    /**
     * purgeCache
     * @description Purge image cache entries older than 12 hours.
     *
     * @return {void}
     */
    function purgeCache() {
        const now = Date.now();
        let changed = false;

        for (const id in state.GL_imageCache) {
            if ((now - state.GL_imageCache[id].ts) > IMAGE_CACHE_MAX_AGE) {
                delete state.GL_imageCache[id];
                changed = true;
            }
        }

        for (const [id, entry] of mediaCache) {
            if ((now - entry.ts) > IMAGE_CACHE_MAX_AGE) {
                mediaCache.delete(id);
            }
        }

        if (changed) {
            GM_setValue(IMAGE_CACHE_KEY, state.GL_imageCache);
        }
    }


    /**
     * mediaIdFromURL
     * @description Decode mediaId from the ig_cache_key parameter that Instagram
     *              embeds in image resource URLs.
     *
     *              The base64-encoded key decodes to either:
     *                a) a single media pk (stories/highlights/profile items) — e.g.
     *                   "3670776772828545770" (19 digits);
     *                b) TWO concatenated ids for feed posts / reels — the media pk
     *                   followed by an internal image upload id, e.g.
     *                   "3953597008038636195" + "18015836522857835".
     *
     *              For the two-id form, only the first (media pk) part is returned
     *              so it matches the id the userscript queries the cache with
     *              (mda.pk / mediaItem.id / resource.pk).
     *
     *              IG media pks are globally unique across all media types (post,
     *              reel, story, highlight item) so the sliced 19-digit prefix
     *              cannot collide with a story id.
     *
     * @param  {string}  url
     * @return {?string}
     */
    function mediaIdFromURL(url) {
        try {
            const u = new URL(url);
            const key = u.searchParams.get('ig_cache_key');
            if (!key) return null;
            const decoded = atob(key.split('.')[0]);   // Part before “.3-ccb7…”
            if (!/^\d+$/.test(decoded)) return decoded;
            // Post/reel image URLs decode to `{media_pk}{image_upload_id}`; media pk
            // is 19 digits on modern posts, so slice the leading 19 chars whenever
            // the decoded string is longer than a single pk.
            if (decoded.length > 19) return decoded.slice(0, 19);
            return decoded;
        } catch { return null; }
    }

    /**
     * putInCache
     * @description Save URL to image cache.
     *
     * @param  {string}  mediaId
     * @param  {string}  url
     * @return {void}
     */
    function putInCache(mediaId, url) {
        if (!mediaId || !url) return;

        const entry = { url, ts: Date.now() };
        const isNewPersistentEntry = !state.GL_imageCache[mediaId];

        // Keep the current session's hot cache independent from persistent storage.
        mediaCache.set(mediaId, entry);

        const keys = Object.keys(state.GL_imageCache);
        if (isNewPersistentEntry && keys.length >= IMAGE_MAX_CACHE_ITEMS) {
            keys.sort((a, b) => state.GL_imageCache[a].ts - state.GL_imageCache[b].ts);
            const oldestId = keys[0];
            delete state.GL_imageCache[oldestId];
            mediaCache.delete(oldestId);
        }

        mediaCacheDirty = true;
        state.GL_imageCache[mediaId] = entry;

        if (!mediaCacheSaveTimer) {
            mediaCacheSaveTimer = setTimeout(() => {
                if (mediaCacheDirty) {
                    GM_setValue(IMAGE_CACHE_KEY, state.GL_imageCache);
                    mediaCacheDirty = false;
                }
                mediaCacheSaveTimer = null;
            }, 500); // write in script storage every 500 ms
        }
    }

    /**
     * getImageFromCache
     * @description Read image URL from cache; returns null if not found or expired.
     *
     * @param  {string}  mediaId
     * @return {?string}
     */
    function getImageFromCache(mediaId) {
        if (!mediaId) return null;

        let entry = mediaCache.get(mediaId);

        if (!entry) {
            entry = state.GL_imageCache[mediaId];
        }

        if (!entry) return null;

        if ((Date.now() - entry.ts) > IMAGE_CACHE_MAX_AGE) {
            mediaCache.delete(mediaId);
            delete state.GL_imageCache[mediaId];
            return null;
        }

        return entry.url;
    }

    /**
     * registerPerformanceObserver
     * @description Register performance observer to document, captures any loaded image resource.
     *
     * @return {void}
     */
    function registerPerformanceObserver() {
        const perfObs = new PerformanceObserver(list => {
            if (!USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) return;

            list.getEntries().forEach(entry => {
                if (entry.initiatorType === 'img') {
                    const u = entry.name;

                    if (
                        !(u.includes('_e35') || u.includes('_e15') || u.includes('.webp?')) ||
                        u.includes('_e35_s') ||
                        u.match(/_[sp](\d+)x\1(?!\d)/)
                    ) {
                        return;
                    }

                    const id = mediaIdFromURL(u);
                    if (id && !mediaCache.has(id)) putInCache(id, u);
                }
            });
        });
        perfObs.observe({ entryTypes: ['resource'] });
    }

    /**
     * translateText
     * @description i18n translation text.
     *
     * @return {void}
     */
    function translateText() {
        var eLocale = {
            "en-US": {
                "NOTICE_UPDATE_TITLE": "Wololo! New version released.",
                "NOTICE_UPDATE_CONTENT": "IG-Helper has released a new version, click here to update.",
                "CHECK_FOR_UPDATE": "Check for Script Updates",
                "RELOAD_SCRIPT": "Reload Script",
                "DONATE": "Donate",
                "FEEDBACK": "Feedback",
                "IMAGE_VIEWER": "Open Image In Viewer",
                "NEW_TAB": "Open in New Tab",
                "SHOW_DOM_TREE": "Show DOM Tree",
                "SELECT_AND_COPY": "Select All and Copy from the Input Box",
                "DOWNLOAD_DOM_TREE": "Download DOM Tree as a Text File",
                "REPORT_GITHUB": "Report an Issue on GitHub",
                "REPORT_DISCORD": "Report an Issue on Discord Support Server",
                "REPORT_FORK": "Report an Issue on Greasy Fork",
                "DEBUG": "Debug Window",
                "CLOSE": "Close",
                "ALL_CHECK": "Select All",
                "ITEM_COUNT_SINGULAR": "%COUNT% item",
                "ITEM_COUNT_PLURAL": "%COUNT% items",
                "ITEM_POSITION": "Item %CURRENT% of %TOTAL%",
                "SELECTED_COUNT_SINGULAR": "%COUNT% selected",
                "SELECTED_COUNT_PLURAL": "%COUNT% selected",
                "BATCH_DOWNLOAD_SELECTED": "Download Selected Resources",
                "BATCH_DOWNLOAD_DIRECT": "Download All Resources",
                "IMG": "Image",
                "VID": "Video",
                "DW": "Download",
                "DW_ALL": "Download All Resources",
                "VIDEO_THUMBNAIL": "Download Video Thumbnail",
                "LOAD_BLOB_ONE": "Loading Blob Media...",
                "LOAD_BLOB_MULTIPLE": "Loading Blob Media and Others...",
                "LOAD_BLOB_RELOAD": "Detecting Blob Media, reloading...",
                "NO_CHECK_RESOURCE": "You need to select a resource to download.",
                "NO_VID_URL": "Cannot find video URL.",
                "SETTING": "Settings",
                "AUTO_RENAME": "Automatically Rename Files (Right-Click to Set)",
                "MATCH_VIDEO_FILENAME_TO_THUMBNAIL": "Match Video Filename to Its Thumbnail",
                "RENAME_PUBLISH_DATE": "Set Renamed File Timestamp to Resource Publish Date",
                "RENAME_LOCATE_DATE": "Modify Renamed File Timestamp Date Format (Right-Click to Set)",
                "DISABLE_VIDEO_LOOPING": "Disable Video Auto-looping",
                "HTML5_VIDEO_CONTROL": "Display HTML5 Video Controller",
                "REDIRECT_CLICK_USER_STORY_PICTURE": "Redirect When Clicking on User's Story Picture",
                "FORCE_FETCH_ALL_RESOURCES": "Force Fetch All Resources in the Post",
                "FORCE_POLARIS_POST_ROOT_QUERY_FOR_POSTS_AND_REELS": "Force Fetch Posts/Reels via PolarisPostRootQuery",
                "DIRECT_DOWNLOAD_VISIBLE_RESOURCE": "Directly Download the Visible Resources in the Post",
                "DIRECT_DOWNLOAD_ALL": "Directly Download All Resources in the Post",
                "DIRECT_DOWNLOAD_STORY": "Directly Download All Resources in the Story/Highlight",
                "MODIFY_VIDEO_VOLUME": "Modify Video Volume (Right-Click to Set)",
                "MODIFY_RESOURCE_EXIF": "Modify Resource EXIF Properties",
                "SCROLL_BUTTON": "Enable Scroll Buttons for Reels Page",
                "FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS": "Force Fetch Stories/Highlights via Reels Media API",
                "PREFER_DASH_MANIFEST_FOR_REELS_MEDIA_API": "Prefer DASH Manifest (Higher-Quality Video via Reels Media API)",
                "FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED": "Use Alternative Methods to Download When the Reels Media API is Not Accessible",
                "NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS": "Use Reels Media API for [Open in New Tab] in Stories/Highlights",
                "NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API": "Open highest-quality video in New Tab, with no audio, via Reels Media API",
                "SKIP_VIEW_STORY_CONFIRM": "Skip the Confirmation Page for Viewing a Story/Highlight",
                "SKIP_SHARED_WITH_YOU_DIALOG": "Skip \"shared this with you\" dialog on shared profile links",
                "CAPTURE_IMAGE_VIA_MEDIA_CACHE": "Capture Image Resource Using Media Cache",
                "AUTO_RENAME_INTRO": [
                    "Auto rename file to custom format:",
                    "Custom Format List:",
                    "%USERNAME% - Username",
                    "%SOURCE_TYPE% - Download Source",
                    "%SHORTCODE% - Post Shortcode",
                    "%YEAR% - Year when downloaded/published",
                    "%2-YEAR% - Year (last two digits) when downloaded/published",
                    "%MONTH% - Month when downloaded/published",
                    "%DAY% - Day when downloaded/published",
                    "%HOUR% - Hour when downloaded/published",
                    "%MINUTE% - Minute when downloaded/published",
                    "%SECOND% - Second when downloaded/published",
                    "%ORIGINAL_NAME% - Original name of downloaded file",
                    "%ORIGINAL_NAME_FIRST% - Original name of downloaded file (first part of name)",
                    "%INDEX% - Resource index",
                    "%UID% - User account unique ID",
                    "",
                    "If set to false, the file name will remain unchanged.",
                    "Example: instagram_321565527_679025940443063_4318007696887450953_n.jpg"
                ],
                "MATCH_VIDEO_FILENAME_TO_THUMBNAIL_INTRO": "For downloaded videos (stories, highlights, reels, posts), use the video's own thumbnail original filename (the part before the file extension) instead of [Automatically Rename Files] / [Set Renamed File Timestamp to Resource Publish Date]. The video's username is kept as a prefix and the extension is forced to match the saved file (.mp4 for the video, or .m4a for the separate audio track saved when DASH muxing fails).\n\nExample: thumbnail instagram_793678102_1796531621502252_4676558487041098231_n.jpg -> video instagram_793678102_1796531621502252_4676558487041098231_n.mp4\n\nTakes priority over [Automatically Rename Files] / [Set Renamed File Timestamp to Resource Publish Date] for video files, and also applies when [Prefer DASH Manifest (Higher-Quality Video via Reels Media API)] downloads video and audio separately.",
                "RENAME_PUBLISH_DATE_INTRO": "Sets the timestamp in the file rename format to the resource publish date (browser time zone).\n\nThis feature only works when [Automatically Rename Files] is set to TRUE.",
                "RENAME_LOCATE_DATE_INTRO": "Modify the renamed file timestamp date format to the browser's local time, and format it to your preferred regional date format.\n\nThis feature only works when [Automatically Rename Files] is set to TRUE.",
                "DISABLE_VIDEO_LOOPING_INTRO": "Disable video auto-looping in Reels and posts.",
                "HTML5_VIDEO_CONTROL_INTRO": "Display the HTML5 video controller in video resource.\n\nThis will hide the custom video volume slider and replace it with the HTML5 controller. The HTML5 controller can be hidden by right-clicking on the video to reveal the original details.",
                "REDIRECT_CLICK_USER_STORY_PICTURE_INTRO": "Redirect to a user's profile page when right-clicking on their avatar in the story area on the homepage.\nIf you use the middle mouse button to click, it will open in a new tab.",
                "FORCE_FETCH_ALL_RESOURCES_INTRO": "Force fetching of all resources (photos and videos) in a post via the Instagram API to remove the limit of three resources per post.",
                "FORCE_POLARIS_POST_ROOT_QUERY_FOR_POSTS_AND_REELS_INTRO": "Use Instagram's PolarisPostRootQuery for posts and reels instead of the legacy media query endpoints. Requires the LSD and DTSG tokens embedded in the current page. When [Directly Download All Resources in the Post] is enabled, the legacy query_hash response is used only to discover media IDs before Polaris resolves the actual media URLs.",
                "DIRECT_DOWNLOAD_VISIBLE_RESOURCE_INTRO": "Directly download the current resources available in the post.",
                "DIRECT_DOWNLOAD_ALL_INTRO": "When you click the download button, all resources in the post will be forcibly fetched and downloaded.",
                "MODIFY_VIDEO_VOLUME_INTRO": "Modify the video playback volume in Reels and posts (right-click to open the volume setting slider).",
                "SCROLL_BUTTON_INTRO": "Enable scroll buttons for the lower right corner of the Reels page.",
                "FORCE_REELS_MEDIA_API_FOR_STORIES_AND_HIGHLIGHTS_INTRO": "Use the Reels Media API (feed/reels_media/) to resolve stories and highlights instead of the classic DOM/GraphQL extraction path.\n\nWhen this is enabled, the standard [Force Fetch Stories/Highlights via Reels Media API] switch is ignored for stories/highlights\u2014Reels Media API takes priority.",
                "PREFER_DASH_MANIFEST_FOR_REELS_MEDIA_API_INTRO": "Prefer the DASH manifest for video resources via the Reels Media API (stories/highlights). If a DASH manifest is available, the highest-bandwidth video and audio tracks are downloaded SEPARATELY and muxed into a single MP4 for the best possible quality.",
                "FALLBACK_TO_BLOB_FETCH_IF_REELS_MEDIA_API_THROTTLED_INTRO": "When the Reels Media API reaches its rate limit or cannot be used for other reasons, the classic DOM/GraphQL method will be used instead to download stories/highlights resources (resource quality may be slightly lower).",
                "NEW_TAB_ALWAYS_FORCE_REELS_MEDIA_API_IN_STORIES_AND_HIGHLIGHTS_INTRO": "Use Instagram's Reels Media API when opening Stories or Highlights in a new tab. A cached image may still be used when available.",
                "NEW_TAB_OPEN_HIGHEST_VIDEO_VIA_REELS_MEDIA_API_INTRO": "Open the highest-quality video-only resource in a new tab using the Reels Media API.\n\nRequires [Prefer DASH Manifest (Higher-Quality Video via Reels Media API)] to be enabled and a DASH manifest to be available.",
                "CHECK_FOR_UPDATE_INTRO": "Check for updates when the script is triggered (check every 300 seconds).\nUpdate notifications will be sent as desktop notifications through the browser.",
                "SKIP_VIEW_STORY_CONFIRM_INTRO": "Automatically skip when confirmation page is shown in story or highlight.",
                "SKIP_SHARED_WITH_YOU_DIALOG_INTRO": "Automatically click \"Not now\" on the \"X shared this with you\" dialog when opening any ?igsh= links.",
                "MODIFY_RESOURCE_EXIF_INTRO": "Modify the EXIF attribute of the image resource to include metadata such as post link, shooting date, and author.",
                "DIRECT_DOWNLOAD_STORY_INTRO": "When you click [Download All Resources], all stories/highlights are downloaded directly, without showing the image selection dialog.",
                "CAPTURE_IMAGE_VIA_MEDIA_CACHE_INTRO": "Cache images loaded by Instagram for later reuse. When a cached image is available, this can avoid unnecessary requests to Instagram's Reels Media API.",
                "HOTKEY_DEBUG_KEY": "Debug Window",
                "HOTKEY_SETTINGS_KEY": "Preference Settings",
                "HOTKEY_KEY_SETTINGS_KEY": "Hotkey Settings",
                "HOTKEY_DOWNLOAD_STORY_KEY": "Download Story",
                "HOTKEY_CONFLICT_WARNING": "This hotkey may conflict with other settings.",
                "HOTKEY_RESET": "Reset",
                "USE_EXTERNAL_DOWNLOAD_MODE": "Use External Download Mode",
                "USE_EXTERNAL_DOWNLOAD_MODE_INTRO": "Enabling this feature will cause the script to use extended download functions (such as GM_download) to download files, resolving the issue of missing files when download multiple files.\n\nPlease note: Enabling this feature may cause the file renaming function to malfunction. Please ensure that the download mode in your extended feature settings is set to Native."
            }
        };

        var resultUnsorted = Object.assign({}, eLocale, state.locale);
        var resultSorted = Object.keys(resultUnsorted).sort().reduce(
            (obj, key) => {
                obj[key] = resultUnsorted[key];
                return obj;
            }, {}
        );

        var result = Object.assign({}, resultSorted);
        for (const lang in result) {
            const translations = result[lang];
            if (!translations || typeof translations !== "object") {
                continue;
            }

            Object.keys(translations).forEach((key) => {
                const value = translations[key];
                if (Array.isArray(value)) {
                    translations[key] = value.join("\n");
                }
            });
        }

        return result;
    }

    /**
     * getTranslationText
     * @description i18n translation text.
     *
     * @param  {String}  lang
     * @return {Object}
     */
    async function getTranslationText(lang) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://cdn.jsdelivr.net/gh/SN-Koarashi/ig-helper@master/locale/translations/${lang}.json?v${GM_info.script.version}`,
                onload: function (response) {
                    try {
                        let obj = JSON.parse(response.response);
                        resolve(obj);
                    }
                    catch (err) {
                        reject(err);
                    }
                },
                onerror: function (err) {
                    logger('getTranslationText()', 'reject', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * _i18n
     * @description Perform i18n translation.
     *
     * @param  {String}  text
     * @return {void}
     */
    function _i18n(text) {
        const translate = translateText();

        if (translate[state.lang] != undefined && translate[state.lang][text] != undefined) {
            return translate[state.lang][text];
        }
        else {
            return translate["en-US"][text];
        }
    }

    /**
     * repaintingTranslations
     * @description Perform i18n translation.
     *
     * @return {void}
     */
    function repaintingTranslations() {
        $('[data-ih-locale]').each(function () {
            const $this = $(this);
            $this.text(_i18n($this.data('ih-locale')));
        });
        $('[data-ih-locale-title]').each(function () {
            const $this = $(this);
            $this.attr('title', _i18n($this.data('ih-locale-title')));
        });
    }

    /* register all events */

    // Running if document is ready
    $(function () {
        function ConvertDOM(domEl) {
            var obj = [];
            for (var ele of domEl) {
                obj.push({
                    tagName: ele.tagName,
                    id: ele.id,
                    className: ele.className
                });
            }

            return obj;
        }

        function setDOMTreeContent() {
            let text = $('div[id^="mount"]')[0];
            var loggerStr = "";
            state.GL_logger.forEach(log => {
                var jsonData = JSON.stringify(log.content, function (key, value) {
                    if (Array.isArray(this)) {
                        if (typeof value === "object" && value instanceof jQuery) {
                            return ConvertDOM(value);
                        }
                        return value;
                    }
                    else {
                        return value;
                    }
                }, "\t");
                loggerStr += `${new Date(log.time).toISOString()}: ${jsonData}\n`
            });
            $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY textarea').text("Logger:\n" + loggerStr + "\n-----\n\nLocation: " + location.pathname + "\nDOM Tree with div#mount:\n" + text.innerHTML);
        }

        $body.on('click', '.IG_POPUP_DIG .IG_POPUP_DIG_BODY .IG_DISPLAY_DOM_TREE', function () {
            setDOMTreeContent();
        });

        // OPTIMIZATION: replace deprecated document.execCommand('copy') with modern
        // navigator.clipboard.writeText() API. Falls back to execCommand on browsers
        // that don't support it (unlikely on Chrome/Firefox/Edge >= 100).
        $body.on('click', '.IG_POPUP_DIG .IG_POPUP_DIG_BODY .IG_SELECT_DOM_TREE', function () {
            const $textarea = $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY textarea');
            const textContent = $textarea.val() || $textarea.text();
            $textarea.trigger('select');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textContent).catch(err => {
                    logger('Clipboard API failed, falling back to execCommand:', err);
                    try { document.execCommand('copy'); } catch (e) { logger('execCommand fallback failed:', e); }
                });
            }
            else {
                try { document.execCommand('copy'); } catch (e) { logger('execCommand failed:', e); }
            }
        });

        $body.on('click', '.IG_POPUP_DIG .IG_POPUP_DIG_BODY .IG_DOWNLOAD_DOM_TREE', function () {
            const $textarea = $('.IG_POPUP_DIG .IG_POPUP_DIG_BODY textarea');
            if ($textarea.text().length === 0) {
                setDOMTreeContent();
            }

            var text = $textarea.text();
            var a = document.createElement("a");
            var file = new Blob([text], { type: "text/plain" });
            a.href = URL.createObjectURL(file);
            a.download = "DOMTree-" + new Date().getTime() + ".txt";

            document.body.appendChild(a);
            a.click();
            a.remove();
        });

        // Close the download dialog if user click the close icon
        $body.on('click', '.IG_POPUP_DIG_BTN, .IG_POPUP_DIG_BG', function () {
            const $this = $(this);
            if ($this.parent('#tempWrapper').length > 0) {
                $this.parent('#tempWrapper').fadeOut(250, function () {
                    $(this).remove();
                });
            }
            else {
                $('.IG_POPUP_DIG').remove();
            }
        });

        $(window).on('keydown', function (e) {
            // Hot key [Alt+Q] to close the download dialog - fixed
            if (e.altKey && e.which == 81) {
                $('.IG_POPUP_DIG').remove();
                e.preventDefault();
            }
            // Hot key [Alt+W] to open/close the settings dialog - use custom keycode if enabled, fallback to default Alt+W(87)
            let settingsKeyCode = state.settingsHotkeyKeyCode || 87;
            if (e.altKey && e.which == settingsKeyCode) {
                const $popup = $('.IG_POPUP_DIG');
                if ($popup.length > 0 && $popup.find('#post_info').text() === 'Preference Settings') {
                    $popup.remove();
                } else {
                    showSetting();
                }
                e.preventDefault();
            }

            // Hot key [Alt+W] to open/close the key settings dialog - use custom keycode if enabled, fallback to default Alt+C(67)
            let keySettingsHotkeyKeyCode = state.keySettingsHotkeyKeyCode || 67;
            if (e.altKey && e.which == keySettingsHotkeyKeyCode) {
                const $popup = $('.IG_POPUP_DIG');
                if ($popup.length > 0 && $popup.find('#post_info').text() === 'Hotkey Settings') {
                    $popup.remove();
                } else {
                    showHotkeySetting();
                }
                e.preventDefault();
            }

            // Hot key [Alt+Z] to open the debug DOM - use custom keycode if enabled, fallback to default Alt+Z(90)
            let debugKeyCode = state.debugHotkeyKeyCode || 90;
            if (e.altKey && e.which == debugKeyCode) {
                showDebugDOM();
                e.preventDefault();
            }

            // Hot key [Alt+R] to reload script (fixed, not customizable)
            if (e.which == '82' && e.altKey) {
                reloadScript();
                e.preventDefault();
            }

            // Hot key [Alt+S] to download story/highlights resource - use custom keycode if enabled, fallback to default Alt+S(83)
            let downloadStoryKeyCode = state.downloadStoryHotkeyKeyCode || 83;
            if (e.altKey && e.which == downloadStoryKeyCode) {
                if (location.href.match(/^(https:\/\/www\.instagram\.com\/stories\/)/ig) && $('.IG_DWSTORY').length > 0) {
                    $('.IG_DWSTORY')?.trigger("click");
                }
                if (location.href.match(/^(https:\/\/www\.instagram\.com\/stories\/highlights\/)/ig) && $('.IG_DWHISTORY').length > 0) {
                    $('.IG_DWHISTORY')?.trigger("click");
                }
                e.preventDefault();
            }
        });

        $body.on('change', '.IG_POPUP_DIG input', function () {
            const $this = $(this);
            var name = $this.attr('id');

            if (name && USER_SETTING[name] !== undefined) {
                let isChecked = $this.prop('checked');
                GM_setValue(name, isChecked);
                USER_SETTING[name] = isChecked;

                if (isChecked) {
                    for (const [parent, children] of Object.entries(PARENT_CHILD_MAPPING)) {
                        if (children.includes(name) && USER_SETTING[parent] !== true) {
                            USER_SETTING[parent] = true;
                            GM_setValue(parent, true);
                            $(`.IG_POPUP_DIG input#${parent}`).prop('checked', true);
                        }
                    }

                    // Keep prerequisite settings visibly enabled when a dependent
                    // setting is checked. This is intentionally a UI + persisted-state
                    // dependency, not merely a runtime fallback.
                    for (const dependency of (SETTING_DEPENDENCIES[name] || [])) {
                        if (USER_SETTING[dependency] !== true) {
                            USER_SETTING[dependency] = true;
                            GM_setValue(dependency, true);
                            $(`.IG_POPUP_DIG input#${dependency}`).prop('checked', true);
                        }
                    }
                }
                else {
                    // Disabling a setting invalidates only the settings that
                    // explicitly depend on it. Keep this separate from the
                    // parent/child loop above because `children` is scoped to
                    // that loop and is not available here.
                    const dependentSettings = SETTING_DISABLE_DEPENDENCIES[name] || [];

                    // Also preserve the original parent -> child behavior: if
                    // the setting being disabled is itself a parent, disable
                    // all of its mapped children as well.
                    const mappedChildren = PARENT_CHILD_MAPPING[name] || [];
                    const settingsToDisable = [...new Set([
                        ...mappedChildren,
                        ...dependentSettings
                    ])];

                    for (const child of settingsToDisable) {
                        USER_SETTING[child] = false;
                        GM_setValue(child, false);
                        $(`.IG_POPUP_DIG input#${child}`).prop('checked', false);
                    }
                }

                console.log('user settings', name, isChecked);
            }
        });

        $body.on('click', '.IG_POPUP_DIG .globalSettings', function (e) {
            if ($(this).find('#tempWrapper').length > 0) {
                e.preventDefault();
            }
        });

        $body.on('change', '.IG_POPUP_DIG #tempWrapper input:not(#date_format)', function () {
            const $this = $(this);
            let value = $this.val();

            if ($this.attr('type') == 'range') {
                $this.next().val(value);
            }
            else {
                $this.prev().val(value);
            }

            if (value >= 0 && value <= 1) {
                state.videoVolume = value;
                GM_setValue('G_VIDEO_VOLUME', value);
            }
        });

        $body.on('input', '.IG_POPUP_DIG #tempWrapper input:not(#date_format)', function () {
            const $this = $(this);
            if ($this.attr('type') == 'range') {
                let value = $this.val();
                $this.next().val(value);
            }
            else {
                let value = $this.val();
                if (value >= 0 && value <= 1) {
                    $this.prev().val(value);
                }
                else {
                    if (value < 0) {
                        $this.val(0);
                    }
                    else {
                        $this.val(1);
                    }
                }
            }
        });

        $body.on('input', '.IG_POPUP_DIG #tempWrapper input#date_format', function () {
            const val = $(this).val();
            GM_setValue('G_RENAME_FORMAT', val);
            state.fileRenameFormat = val;
        });

        $body.on('click', 'a[data-needed="direct"]', function (e) {
            e.preventDefault();
            triggerLinkElement($(this), false);
        });

        $body.on('click', '.IG_POPUP_DIG_BODY .newTab', function () {
            const $this = $(this);
            const $linkA = $this.parent().children('a');

                openNewTab(replaceSameOriginHost($linkA.data('href')));

        });

        $body.on('click', '.IG_POPUP_DIG_BODY .videoThumbnail', function () {
            const $this = $(this);
            const $linkA = $this.parent().children('a');
            let timestamp = new Date().getTime();

            if (USER_SETTING.RENAME_PUBLISH_DATE && $linkA.attr('datetime')) {
                timestamp = $linkA.attr('datetime');
            }

            let postPath = $linkA.data('path') ?? $('#article-id').text();

            if (USER_SETTING.CAPTURE_IMAGE_VIA_MEDIA_CACHE) {
                const mediaId = $linkA.first().attr('media-id');
                const cached = getImageFromCache(mediaId);

                if (cached) {
                    logger("[Restore Cached postThumbnail]", mediaId);
                    saveFiles(cached, {
                        username: $linkA.data('username'),
                        sourceType: 'thumbnail',
                        timestamp,
                        filetype: 'jpg',
                        shortcode: postPath
                    });
                    return;
                }
            }

            saveFiles(
                $linkA.find('img').first().attr('src'),
                {
                    username: $linkA.data('username'),
                    sourceType: 'thumbnail',
                    timestamp,
                    filetype: 'jpg',
                    shortcode: postPath
                });
        });

        // Running if user left-click download icon in stories
        $body.on('click', '.IG_DWSTORY', function () {
            onStory(true);
        });

        // Running if user left-click all download icon in stories
        $body.on('click', '.IG_DWSTORY_ALL', function () {
            onStoryAll();
        });

        // Running if user left-click 'open in new tab' icon in stories
        $body.on('click', '.IG_DWNEWTAB', function (e) {
            e.preventDefault();
            onStory(true, true, true);
        });

        // Running if user left-click download thumbnail icon in stories
        $body.on('click', '.IG_DWSTORY_THUMBNAIL', function () {
            onStoryThumbnail(true);
        });

        // Running if user left-click download icon in profile
        $body.on('click', '.IG_DWPROFILE', function (e) {
            e.stopPropagation();
            onProfileAvatar(true);
        });

        // Running if user left-click download icon in highlight stories
        $body.on('click', '.IG_DWHISTORY', function () {
            onHighlightsStory(true);
        });

        // Running if user left-click all download icon in highlight stories
        $body.on('click', '.IG_DWHISTORY_ALL', function () {
            onHighlightsStoryAll();
        });

        // Running if user left-click 'open in new tab' icon in highlight stories
        $body.on('click', '.IG_DWHINEWTAB', function (e) {
            e.preventDefault();
            onHighlightsStory(true, true);
        });

        // Running if user left-click thumbnail download icon in highlight stories
        $body.on('click', '.IG_DWHISTORY_THUMBNAIL', function () {
            onHighlightsStoryThumbnail(true);
        });

        // Running if user left-click download icon in reels
        $body.on('click', '.IG_REELS', function () {
            onReels(true, true);
        });

        // Running if user left-click newtab icon in reels
        $body.on('click', '.IG_REELS_NEWTAB', function () {
            onReels(true, true, true);
        });

        // Running if user left-click download icon in reels
        $body.on('click', '.IG_REELS_THUMBNAIL', function () {
            onReels(true, false, false, this);
        });

        // Running if user right-click profile picture in stories area
        $body.on('mousedown', 'button[role="menuitem"], div[role="menuitem"], ul > li[tabindex="-1"] > div[role="button"]', function (e) {
            // Right-Click || Middle-Click
            if (e.which === 3 || e.which === 2) {
                if (location.href === 'https://www.instagram.com/' && USER_SETTING.REDIRECT_CLICK_USER_STORY_PICTURE) {
                    e.preventDefault();

                    const $this = $(this);
                    $this.find('img').each(function () {
                        const $img = $(this);
                        if (!$img.data('contextmenu')) {
                            $img.data('contextmenu', true);
                            $img.on('contextmenu', function (e) {
                                e.preventDefault();
                            });
                        }
                    });

                    if ($this.find('canvas._aarh, canvas + span > img').length > 0) {
                        const targetUrl = 'https://www.instagram.com/' + $this.children('div').last().text();
                        if (e.which === 2) {
                            GM_openInTab(targetUrl);
                        }
                        else {
                            location.href = targetUrl;
                        }
                    }
                }
            }
        });

        $body.on('change', '.IG_POPUP_DIG_TITLE .checkbox', function () {
            const isChecked = $(this).find('input').prop('checked');
            $('.IG_POPUP_DIG_BODY .inner_box').each(function () {
                $(this).prop('checked', isChecked);
            });
            updatePopupSelectionSummary();
        });

        $body.on('change', '.IG_POPUP_DIG_BODY .inner_box', function () {
            updatePopupSelectionSummary();
        });

        $body.on('click', '.IG_POPUP_DIG_TITLE #batch_download_selected', function () {
            if ($('.IG_POPUP_DIG #_SNLOAD').length > 0) return;

            let index = 0;
            let links = [];
            $('.IG_POPUP_DIG_BODY a[data-needed="direct"]').each(function () {
                let $link = $(this);
                if ($link.prev().children('input').prop('checked')) {
                    links.push($link);
                    index++;
                }
            });

            if (index == 0) {
                alert(_i18n('NO_CHECK_RESOURCE'));
            }
            else {
                batchDownloadPostFiles(links);
            }
        });

        $body.on('change', '.IG_POPUP_DIG_TITLE #langSelect', function () {
            const $this = $(this);
            const val = $this.val();
            GM_setValue('UI_LANGUAGE', val);
            state.lang = val;

            if (state.lang?.startsWith('en') || state.locale[state.lang] != null) {
                repaintingTranslations();
                registerMenuCommand();
            }
            else {
                getTranslationText(state.lang).then((res) => {
                    state.locale[state.lang] = res;
                    repaintingTranslations();
                    registerMenuCommand();
                }).catch((err) => {
                    console.error('getTranslationText catch error:', err);
                });
            }
        });

        $body.on('click', '.IG_POPUP_DIG_TITLE #batch_download_direct', function () {
            if ($('.IG_POPUP_DIG #_SNLOAD').length > 0) return;

            let links = [];
            $('.IG_POPUP_DIG_BODY a[data-needed="direct"]').each(function () {
                links.push($(this));
            });

            batchDownloadPostFiles(links);
        });

        registerPerformanceObserver();

        const element_observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        const $node = $(node);
                        const $videos = $node.find('video').addBack('video');

                        if (location.pathname.startsWith("/stories/highlights/")) {
                            if (
                                $node.attr("data-ih-locale-title") == null &&
                                $node.attr("data-visualcompletion") == null &&
                                node.tagName === "DIV"
                            ) {
                                // replace something times ago format to publish time when switch highlight
                                var $time = getHighlightCurrentTimeElement($node);
                                setTimeElementDateAndLocaleTime($time);
                            }
                        }

                        if ($videos.length > 0) {
                            // Modify video volume
                            if (USER_SETTING.MODIFY_VIDEO_VOLUME) {
                                $videos.each(function () {
                                    const $this = $(this);
                                    $(this).one('play playing', function () {
                                        if (!$this.data('modify')) {
                                            $this.data('modify', true);
                                            this.volume = state.videoVolume;
                                            logger('(audio_observer) Added video event listener #modify');
                                        }
                                    });
                                });
                            }

                            if (location.pathname.match(/^(\/stories\/)/ig)) {
                                const isHighlight = location.pathname.match(/^(\/stories\/highlights\/)/ig) != null;
                                const storyType = isHighlight ? 'highlight' : 'story';

                                $videos.each(function () {
    const $this = $(this);
$this.one('timeupdate', function () {
    const $video = $(this);

    if (!$video.data('thumbnail-insert')) {
        $video.data('thumbnail-insert', true);

        if ($video.parents('div[style][class]').filter(function () {
            return $(this).width() == $video.width();
        }).find(isHighlight ? '.IG_DWHISTORY_THUMBNAIL' : '.IG_DWSTORY_THUMBNAIL').length === 0) {
            if (isHighlight) {
                onHighlightsStoryThumbnail(false);
            } else {
                onStoryThumbnail(false);
            }

            logger(`(${storyType}) Manually inserting thumbnail button`);
        }
    }
});

                                    var $video = $(this);

                                    if (USER_SETTING.HTML5_VIDEO_CONTROL) {
                                        if (!$video.data('controls')) {
                                            logger(`(${storyType})`, 'Added video html5 contorller #modify');

                                            if (USER_SETTING.MODIFY_VIDEO_VOLUME) {
                                                this.volume = state.videoVolume;

                                                $video.on('loadstart', function () {
                                                    this.volume = state.videoVolume;
                                                });
                                            }

                                            let $videoParent = $video.parents('div').filter(function () {
                                                const $this = $(this);
                                                return $this.attr('class') == null && $this.attr('style') == null;
                                            }).first();

                                            // This is mute/unmute's icon
                                            let $element_mute_button = $videoParent.parent().find('svg > path[d^="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0"], svg > path[d^="M16.636 7.028a1.5 1.5"]').parents('[role="button"]').first();
                                            state.GL_weakCache.mutedButton.set($video[0], $element_mute_button);

                                            // story bottom bar
                                            let $bottomBar = $videoParent.next();

                                            // read more button in center
                                            let $readMoreButton = $videoParent.find('div[class][role="button"]');

                                            let $targets = $video.parent().find('video + div');

                                            const hideContextmenu = function (e) {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                let $overlayElement = null;

                                                if ($overlayElement == null) {
                                                    $overlayElement = $(e.target).parent().find('div[aria-label][data-visualcompletion="ignore"]').first();

                                                    if ($overlayElement.length === 0) {
                                                        $overlayElement = $(e.target).first();
                                                    }
                                                }

                                                state.GL_weakCache.overlay.set($video[0], $overlayElement);

                                                $video.css('z-index', '2');
                                                $video.attr('controls', true);
                                                $targets.css('z-index', '-10');
                                                $overlayElement.css('z-index', '-10');

                                                $readMoreButton.hide();
                                                $bottomBar.hide();

                                                toggleVolumeSilder($video, $video.parents('div[style][class]').filter(function () {
                                                    return $(this).width() == $video.width();
                                                }).first(), storyType, 'vertical');
                                            };

                                            // Hide layout to show controller
                                            $targets.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', hideContextmenu);
                                            $readMoreButton.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', hideContextmenu);
                                            $bottomBar.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', hideContextmenu);
                                            $videoParent.off('contextmenu.IG_videoControl').on('contextmenu.IG_videoControl', hideContextmenu);

                                            // Restore layout to show details interface
                                            $video.on('contextmenu', function (e) {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                $video.css('z-index', '-1');
                                                $video.removeAttr('controls');
                                                $targets.css('z-index', '1');
                                                state.GL_weakCache.overlay.get($video[0])?.css('z-index', '1');

                                                $bottomBar.show();
                                                $readMoreButton.show();

                                                toggleVolumeSilder($video, $video.parents('div[style][class]').filter(function () {
                                                    return $(this).width() == $video.width();
                                                }).first(), storyType, 'vertical');
                                            });

                                            $video.on('volumechange', function () {
                                                let $element_mute_button = state.GL_weakCache.mutedButton.get(this) || {};
                                                var is_element_muted = $element_mute_button?.find && $element_mute_button.find('svg > path[d^="M16.636"]').length === 0;

                                                if (this.muted != is_element_muted) {
                                                    this.volume = state.videoVolume;

                                                    triggerReactClickHandler($element_mute_button.first()[0]);
                                                }

                                                const $v = $(this);
                                                if ($v.data('completed')) {
                                                    state.videoVolume = this.volume;
                                                    GM_setValue('G_VIDEO_VOLUME', this.volume);
                                                }

                                                if (this.volume == state.videoVolume) {
                                                    $v.data('completed', true);
                                                }
                                            });

                                            $video.css('position', 'absolute');
                                            $video.data('controls', true);

                                            toggleVolumeSilder($video, $video.parents('div[style][class]').filter(function () {
                                                return $(this).width() == $video.width();
                                            }).first(), storyType, 'vertical');
                                        }
                                    }
                                    else {
                                        if (!$video.data('volume-slider-init')) {
                                            $video.data('volume-slider-init', true);
                                            toggleVolumeSilder($video, $video.parents('div[style][class]').filter(function () {
                                                return $(this).width() == $video.width();
                                            }).first(), storyType, 'vertical');
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });

        (function installElementObserver(attempts) {
            const mountRoot = $('div[id^="mount"]')[0];
            if (mountRoot) {
                element_observer.observe(mountRoot, { childList: true, subtree: true });
                logger('[element_observer] installed on mount root');
            } else if (attempts > 0) {
                setTimeout(() => installElementObserver(attempts - 1), 250);
                logger('[element_observer] mount root not ready, retrying...');
            } else {
                logger('[element_observer] mount root not found after multiple retries');
            }
        })(20);
    });
})(jQuery, Mediabunny);
ℹ️ Bypass script: : running...
