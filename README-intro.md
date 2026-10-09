# 자유낙하 Untethered Demo — 인트로 화면 추가

## 변경/추가된 파일
- `index.html`  : 인트로 DOM(`#intro`)과 `intro.css`, `intro.js` 링크를 추가한 버전으로 교체
- `intro.css`   : 인트로 전용 스타일 (신규)
- `intro.js`    : 인트로 페이드인/아웃 및 세션 스킵 로직 (신규)

기존 `style.css`, `app.js`, `tracks.js`, `qr.html`, `audio/`, `font/` 는 **수정할 필요 없습니다.**

## 인트로 등장 순서
1. 제목 "자유낙하 Untethered Demo"  (0.4s)
2. 부제 "SLEEQ"  (1.1s)
3. 설명 "앨범 수록곡들의 데모 버전 및 미공개 데모곡을 들려드립니다."  (1.7s)
4. `Listen` 버튼  (2.4s)

## 적용 방법 (GitHub Pages)
1. 저장소에 위 파일들을 업로드 (index.html, intro.css 는 덮어쓰기)
2. 커밋 & 푸시 → GitHub Pages 자동 반영
3. 페이지 새로고침

## 동작
- `Listen` 버튼(또는 키보드 Enter/Space) 클릭 시 부드럽게 페이드아웃되고 본문 노출
- 같은 탭 세션에서는 인트로를 한 번만 표시 (sessionStorage)
  - 다시 보고 싶으면 탭을 닫고 새로 열거나, 시크릿 창 사용
- `prefers-reduced-motion` 사용자에게는 애니메이션 없이 표시

## 커스터마이징 팁
- 설명 문구 변경: `index.html` 의 `<p class="intro-desc">...</p>`
- 버튼 텍스트 변경: `index.html` 의 `<button id="intro-enter">Listen</button>`
- 페이드 속도: `intro.css` 의 `#intro { transition: opacity 900ms ease; }`
- 등장 타이밍: 각 요소의 `animation-delay` 값 조정 (400 / 1100 / 1700 / 2400ms)
- 매번 인트로를 보고 싶다면 `intro.js` 에서 `sessionStorage` 부분을 제거하거나 주석 처리
