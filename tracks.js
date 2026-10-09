/**
 * =====================================================
 *  곡 목록 (여기만 수정하면 됩니다)
 * =====================================================
 *
 *  각 곡은 아래 형식으로 추가하세요:
 *
 *  {
 *    title:  "곡 제목",              // 필수
 *    artist: "아티스트명",           // 선택
 *    file:   "audio/demo01.mp3",    // 필수 (audio 폴더 안의 파일명)
 *    cover:  "audio/cover01.jpg"    // 선택 (없으면 빈 문자열 "")
 *  }
 *
 *  ⚠️ 주의:
 *   - 각 곡은 쉼표(,)로 구분합니다
 *   - 마지막 곡 뒤에는 쉼표를 붙이지 마세요
 *   - 파일명은 대소문자를 정확히 맞춰주세요
 */

const TRACKS = [
  {
    title: "Demo 01",
    artist: "Sample Artist",
    file: "audio/demo01.mp3",
    cover: ""
  },
  {
    title: "Demo 02",
    artist: "Sample Artist",
    file: "audio/demo02.mp3",
    cover: ""
  },
  {
    title: "Demo 03",
    artist: "Sample Artist",
    file: "audio/demo03.mp3",
    cover: ""
  }
];

// 전역으로 노출
window.TRACKS = TRACKS;
