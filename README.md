# Demo Listening Site (데모 청취 사이트)

QR 코드로 접속해서 오디오 데모를 바로 재생할 수 있는 정적 웹사이트입니다.

## 📁 폴더 구조

```

/
├── index.html          # 메인 페이지 (플레이어 목록)
├── style.css           # 스타일
├── app.js              # 플레이어 로직 (재생, 목록 렌더링)
├── tracks.js           # ⭐ 여기에 곡 목록을 추가하세요
├── qr.html             # QR 코드 생성 페이지 (관리자용)
├── audio/              # ⭐ 여기에 mp3 파일을 넣으세요
│   └── .gitkeep
└── README.md

```

## 🚀 처음 설정하는 방법 (터미널 없이, 마우스만으로)

### 1단계: 파일 업로드
1. GitHub 저장소 페이지로 이동
2. `Add file` → `Upload files` 클릭
3. 이 프로젝트의 **모든 파일과 폴더**를 드래그 앤 드롭
   - ⚠️ 폴더째로 드래그하면 폴더 구조가 유지됩니다
   - `audio` 폴더도 반드시 함께 올려주세요
4. `Commit changes` 클릭

### 2단계: mp3 파일 업로드
1. 저장소에서 `audio` 폴더로 들어감
2. `Add file` → `Upload files`
3. mp3 파일들 업로드 (파일명은 영문 소문자, 공백 없이 권장: `demo01.mp3`)
4. `Commit changes` 클릭

### 3단계: 곡 목록 수정 (tracks.js)
1. 저장소에서 `tracks.js` 파일 클릭
2. 연필 아이콘(✏️) 클릭해서 편집
3. 아래 형식으로 곡을 추가:

```javascript
const TRACKS = [
  {
    title: "곡 제목 1",
    artist: "아티스트명",
    file: "audio/demo01.mp3",
    cover: ""  // 커버 이미지 경로 (없으면 빈 문자열)
  },
  {
    title: "곡 제목 2",
    artist: "아티스트명",
    file: "audio/demo02.mp3",
    cover: ""
  }
];
```

4. `Commit changes` 클릭

### 4단계: GitHub Pages 활성화

1. 저장소 → `Settings` 탭
2. 왼쪽 메뉴에서 `Pages` 클릭
3. `Source` → **Deploy from a branch** 선택
4. `Branch` → **main** / **/(root)** 선택
5. `Save` 클릭
6. 1~2분 후 상단에 주소가 표시됩니다:
`https://본인아이디.github.io/저장소이름/`

### 5단계: QR 코드 생성

1. 배포된 주소 뒤에 `/qr.html`을 붙여 접속
예: `https://본인아이디.github.io/저장소이름/qr.html`
2. QR 코드가 자동 생성됩니다
3. **PNG 다운로드** 버튼으로 저장 → 인쇄물에 삽입

## 🎵 곡 추가하는 방법 (요약)

1. mp3를 `audio/` 폴더에 업로드
2. `tracks.js`에 항목 추가
3. 끝 (자동 배포됨, 1~2분 소요)

## ⚠️ 주의사항

- **파일 크기**: GitHub은 파일당 100MB 제한. 큰 mp3는 비트레이트를 낮추거나(128kbps) 외부 호스팅 사용
- **파일명**: 영문 소문자 + 하이픈/언더스코어 권장 (`demo-01.mp3`)
- **저작권**: 공개 저장소에 올리는 음원은 저작권 확인 필수
- **캐시**: 수정 후 반영이 안 되면 브라우저 강력 새로고침 (Ctrl+Shift+R)

## 🛠 로컬에서 테스트하기

`index.html`을 브라우저로 열면 바로 확인 가능합니다.
(단, 일부 브라우저는 `file://` 프로토콜에서 오디오 재생을 막을 수 있음.
이 경우 Python이 있으면 `python -m http.server 8000` 실행 후
`http://localhost:8000` 접속)

</BDS:create_file>

<BDS:create_file fileName="index.html">

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Listening</title>
  <meta name="description" content="QR로 접속해서 데모를 바로 들어보세요" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="hero">
    <div class="hero-inner">
      <h1 class="hero-title">Demo Listening</h1>
      <p class="hero-sub">아래 목록에서 원하는 데모를 눌러 바로 들어보세요.</p>
    </div>
  </header>

  <main class="container">
    <ul id="track-list" class="track-list" aria-label="데모 목록"></ul>

    <p id="empty-message" class="empty-message" hidden>
      아직 등록된 데모가 없습니다.<br />
      <code>tracks.js</code> 파일에 곡을 추가해주세요.
    </p>
  </main>

  <footer class="footer">
    <p>© <span id="year"></span> Demo Listening</p>
  </footer>

  <!-- 하단 고정 플레이어 -->
  <div id="player" class="player" hidden>
    <div class="player-inner">
      <div class="player-info">
        <div class="player-cover" id="player-cover"></div>
        <div class="player-meta">
          <div class="player-title" id="player-title">—</div>
          <div class="player-artist" id="player-artist">—</div>
        </div>
      </div>

      <div class="player-controls">
        <button id="prev-btn" class="icon-btn" aria-label="이전 곡" title="이전 곡">⏮</button>
        <button id="play-btn" class="play-btn" aria-label="재생/일시정지" title="재생/일시정지">▶</button>
        <button id="next-btn" class="icon-btn" aria-label="다음 곡" title="다음 곡">⏭</button>
      </div>

      <div class="player-progress">
        <span id="current-time" class="time">0:00</span>
        <input type="range" id="seek" class="seek" min="0" max="100" value="0" step="0.1" aria-label="재생 위치" />
        <span id="duration" class="time">0:00</span>
      </div>

      <div class="player-extra">
        <label class="volume-label" for="volume">🔊</label>
        <input type="range" id="volume" class="volume" min="0" max="1" step="0.01" value="1" aria-label="볼륨" />
      </div>
    </div>

    <audio id="audio" preload="metadata"></audio>
  </div>

  <script src="tracks.js"></script>
  <script src="app.js"></script>
</body>
</html>

