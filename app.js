/**
 * Demo Listening Site - 메인 로직
 * tracks.js에서 정의된 TRACKS 배열을 읽어 플레이어를 구성합니다.
 */

(function () {
  "use strict";

  // ---------- DOM ----------
  const listEl = document.getElementById("track-list");
  const emptyEl = document.getElementById("empty-message");
  const playerEl = document.getElementById("player");
  const audio = document.getElementById("audio");

  const coverEl = document.getElementById("player-cover");
  const titleEl = document.getElementById("player-title");
  const artistEl = document.getElementById("player-artist");

  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const seekEl = document.getElementById("seek");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeEl = document.getElementById("volume");

  // ---------- State ----------
  const tracks = Array.isArray(window.TRACKS) ? window.TRACKS : [];
  let currentIndex = -1;
  let isSeeking = false;

  // ---------- Utils ----------
  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  function initials(text) {
    if (!text) return "♪";
    return text.trim().charAt(0).toUpperCase();
  }

  // ---------- Render list ----------
  function renderList() {
    listEl.innerHTML = "";

    if (tracks.length === 0) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    tracks.forEach(function (track, index) {
      const li = document.createElement("li");
      li.className = "track-item";
      li.dataset.index = String(index);
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.setAttribute("aria-label", (track.title || "제목 없음") + " 재생");

      // cover
      const cover = document.createElement("div");
      cover.className = "track-cover";
      if (track.cover) {
        cover.style.backgroundImage = "url('" + track.cover + "')";
      } else {
        cover.textContent = initials(track.title);
      }

      // meta
      const meta = document.createElement("div");
      meta.className = "track-meta";

      const title = document.createElement("p");
      title.className = "track-title";
      title.textContent = track.title || "제목 없음";

      const artist = document.createElement("p");
      artist.className = "track-artist";
      artist.textContent = track.artist || "";

      meta.appendChild(title);
      meta.appendChild(artist);

      // play icon
      const icon = document.createElement("div");
      icon.className = "track-play-icon";
      icon.textContent = "▶";

      li.appendChild(cover);
      li.appendChild(meta);
      li.appendChild(icon);

      li.addEventListener("click", function () {
        handleTrackClick(index);
      });

      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTrackClick(index);
        }
      });

      listEl.appendChild(li);
    });
  }

  function handleTrackClick(index) {
    if (index === currentIndex) {
      togglePlay();
    } else {
      loadTrack(index, true);
    }
  }

  // ---------- Player ----------
  function loadTrack(index, autoplay) {
    if (index < 0 || index >= tracks.length) return;

    currentIndex = index;
    const track = tracks[index];

    audio.src = track.file;
    audio.load();

    // update player UI
    playerEl.hidden = false;
    titleEl.textContent = track.title || "제목 없음";
    artistEl.textContent = track.artist || "";

    if (track.cover) {
      coverEl.style.backgroundImage = "url('" + track.cover + "')";
      coverEl.textContent = "";
    } else {
      coverEl.style.backgroundImage = "";
      coverEl.textContent = initials(track.title);
    }

    // reset progress
    seekEl.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";

    updatePlayingHighlight();

    if (autoplay) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function (err) {
          console.warn("자동재생이 차단되었습니다. 사용자가 재생 버튼을 눌러야 합니다.", err);
          setPlayIcon(false);
        });
      }
    }
  }

  function togglePlay() {
    if (currentIndex === -1) {
      if (tracks.length > 0) loadTrack(0, true);
      return;
    }

    if (audio.paused) {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(function (err) {
          console.warn("재생 실패:", err);
        });
      }
    } else {
      audio.pause();
    }
  }

  function playNext() {
    if (tracks.length === 0) return;
    const next = (currentIndex + 1) % tracks.length;
    loadTrack(next, true);
  }

  function playPrev() {
    if (tracks.length === 0) return;

    // 3초 이상 재생됐으면 처음으로 되감기
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const prev = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prev, true);
  }

  function setPlayIcon(isPlaying) {
    playBtn.textContent = isPlaying ? "❚❚" : "▶";
  }

  function updatePlayingHighlight() {
    const items = listEl.querySelectorAll(".track-item");
    items.forEach(function (item, i) {
      if (i === currentIndex) {
        item.classList.add("playing");
        const icon = item.querySelector(".track-play-icon");
        if (icon) icon.textContent = audio.paused ? "▶" : "❚❚";
      } else {
        item.classList.remove("playing");
        const icon = item.querySelector(".track-play-icon");
        if (icon) icon.textContent = "▶";
      }
    });
  }

  // ---------- Events: audio ----------
  audio.addEventListener("play", function () {
    setPlayIcon(true);
    updatePlayingHighlight();
  });

  audio.addEventListener("pause", function () {
    setPlayIcon(false);
    updatePlayingHighlight();
  });

  audio.addEventListener("ended", function () {
    playNext();
  });

  audio.addEventListener("loadedmetadata", function () {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", function () {
    if (isSeeking) return;
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    seekEl.value = String(pct);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("error", function () {
    console.error("오디오 로드 오류:", audio.src);
    artistEl.textContent = "⚠ 파일을 불러올 수 없습니다";
  });

  // ---------- Events: controls ----------
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", playNext);
  prevBtn.addEventListener("click", playPrev);

  // seek
  seekEl.addEventListener("input", function () {
    isSeeking = true;
    if (audio.duration) {
      currentTimeEl.textContent = formatTime((seekEl.value / 100) * audio.duration);
    }
  });

  seekEl.addEventListener("change", function () {
    if (audio.duration) {
      audio.currentTime = (seekEl.value / 100) * audio.duration;
    }
    isSeeking = false;
  });

  // volume
  volumeEl.addEventListener("input", function () {
    audio.volume = parseFloat(volumeEl.value);
  });

  // keyboard shortcuts (space = toggle, arrows = prev/next)
  document.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key === " ") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight") {
      playNext();
    } else if (e.key === "ArrowLeft") {
      playPrev();
    }
  });

  // ---------- Init ----------
  function init() {
    document.getElementById("year").textContent = String(new Date().getFullYear());
    audio.volume = parseFloat(volumeEl.value);
    renderList();

    // player는 첫 재생 전까지 숨김
    if (tracks.length > 0) {
      playerEl.hidden = false;
      // 초기 상태: 곡 정보만 표시하지 않고 비워둠
      titleEl.textContent = "곡을 선택하세요";
      artistEl.textContent = "";
      coverEl.textContent = "♪";
    }
  }

  init();
})();
