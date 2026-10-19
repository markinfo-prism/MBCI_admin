#!/bin/bash
# MBCI 관리자 시작 (macOS) — 더블클릭하면 이 폴더로 로컬 서버가 켜지고 관리자 화면이 열립니다.
# 종료: 이 터미널 창에서 Ctrl+C.  (처음 한 번 "열 수 없음" 경고가 나오면: 파일 우클릭 ▸ 열기)
cd "$(dirname "$0")"
PORT=8080
echo "MBCI 관리자: http://localhost:$PORT/   (비밀번호는 관리자 화면 안내 참고)"
(sleep 1; open "http://localhost:$PORT/") &
python3 -m http.server $PORT --bind 127.0.0.1
