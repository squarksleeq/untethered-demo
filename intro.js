/* ============================================================
   intro.js — 자유낙하 Untethered Demo 인트로 화면 로직
   - 페이지 로드 시 인트로를 표시하고 스크롤을 잠급니다.
   - Enter 버튼 클릭 시 페이드아웃 후 본문을 노출합니다.
   - 같은 세션에서 이미 본 경우 인트로를 건너뜁니다.
   기존 app.js / tracks.js와 독립적으로 동작합니다.
   ============================================================ */

(function () {
  "use strict";

  var SESSION_KEY = "untethered_intro_seen";
  var intro = document.getElementById("intro");
  var enterBtn = document.getElementById("intro-enter");

  if (!intro) return;

  // 같은 탭 세션에서 이미 인트로를 본 경우 → 즉시 제거
  var alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch (e) {
    alreadySeen = false;
  }

  if (alreadySeen) {
    removeIntro(true);
    return;
  }

  // 인트로 표시 중 본문 스크롤 잠금
  document.body.classList.add("intro-locked");

  function removeIntro(instant) {
    if (instant) {
      intro.remove();
    } else {
      intro.classList.add("is-hidden");
      // 트랜지션 종료 후 DOM에서 제거
      setTimeout(function () {
        intro.remove();
      }, 950);
    }
    document.body.classList.remove("intro-locked");
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {}
  }

  function handleEnter() {
    removeIntro(false);
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", handleEnter);
  }

  // 접근성: Enter / Space 키로도 진입 가능
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      // 인트로가 아직 화면에 있을 때만
      if (document.body.contains(intro) && !intro.classList.contains("is-hidden")) {
        e.preventDefault();
        handleEnter();
      }
    }
  });
})();
