# VS Code 익스텐션 백업/복구

## 백업

```sh
# mkdir .vscode
code --list-extensions > .vscode/extensions.list
```

## 복구 

Linux, OSX, WSL

```sh
code --list-extensions | xargs -L 1 echo code --install-extension
```

Windows

```sh
cat .vscode/extensions.list |% { code --install-extension $_}
```