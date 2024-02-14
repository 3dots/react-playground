$currentPath = $pwd.Path

Start-Process powershell -WorkingDirectory $currentPath  {
  npm run dev
}

 npm run watch-errors