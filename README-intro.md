# 자유낙하 Untethered Demo — 인트로 화면 추가

## 변경/추가된 파일
- `index.html`  : 인트로 DOM(`#intro`)과 `intro.css`, `intro.js` 링크를 추가한 버전으로 교체
- `intro.css`   : 인트로 전용 스타일 (신규)
- `intro.js`    : 인트로 페이드인/아웃 및 세션 스킵 로직 (신규)

기존 `style.css`, `app.js`, `tracks.js`, `qr.html`, `audio/`, `font/` 는 **수정할 필요 없습니다.**

## 적용 방법 (GitHub Pages)
1. 저장소에 위 3개 파일을 업로드 (index.html은 기존 파일 덮어쓰기)
2. 커밋 & 푸시 → GitHub Pages 자동 반영
3. 페이지 새로고침

## 동작
- 페이지 진입 시 검은 배경 위로 제목 → 부제(SLEEQ) → `Enter` 버튼 순서로 페이드인
- `Enter` 버튼(또는 키보드 Enter/Space) 클릭 시 부드럽게 페이드아웃되고 본문 노출
- 같은 탭 세션에서는 인트로를 한 번만 표시 (sessionStorage)
  - 다시 보고 싶으면 탭을 닫고 새로 열거나, 브라우저 시크릿 창 사용
- `prefers-reduced-motion` 사용자에게는 애니메이션 없이 표시

## 커스터마이징 팁
- 부제 텍스트 변경: `index.html` 의 `<p class="intro-sub">SLEEQ</p>`
- 페이드 속도: `intro.css` 의 `#intro { transition: opacity 900ms ease; }`
- 등장 타이밍: 각 요소의 `animation-delay` 값 조정 (400ms / 1100ms / 1800ms)
- 매번 인트로를 보고 싶다면 `intro.js` 에서 `sessionStorage` 부분을 제거하거나 주석 처리
