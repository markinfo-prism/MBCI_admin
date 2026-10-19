@echo off
rem MBCI 관리자 시작 (Windows) - 더블클릭하면 이 폴더로 로컬 서버가 켜지고 관리자 화면이 열립니다. 종료: 이 창에서 Ctrl+C
cd /d "%~dp0"
set PORT=8080
echo MBCI 관리자: http://localhost:%PORT%/
start "" "http://localhost:%PORT%/"
where py >nul 2>nul && (py -m http.server %PORT% --bind 127.0.0.1) || (python -m http.server %PORT% --bind 127.0.0.1)
