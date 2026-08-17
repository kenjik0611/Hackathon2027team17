[README.md](https://github.com/user-attachments/files/30784215/README.md)
# Hackathon2027team17

## フォルダ構成

```
.
├── docs/
│   └── PROJECT_CONTEXT.md        # プロジェクトの背景・要件整理メモ
└── src/
    └── frontend/                 # フロントエンド一式（静的HTML/CSS/JS）
        ├── index.html             # トップページ（モラル／男心理解のモード選択）
        ├── style.css              # 全ページ共通のスタイル
        ├── script.js              # トップページの挙動（モード切替・遷移）
        │
        ├── moral/                 # モラルチェック編
        │   ├── main.html           # シーン選択画面
        │   ├── main.css
        │   ├── house_Kiyose/           # シーンごとに担当者が実装
        │   ├── office_Arita/
        │   ├── online_Suzuki/
        │   ├── outsideCompany_Fukazawa/
        │   └── publicSpace_Kudo/
        │
        └── Otokogokoro/           # 男心理解ゲーム編
            ├── main.html           # 担当者選択画面
            ├── main.css
            ├── Arita/
            ├── Kiyose/
            ├── Suzuki/
            ├── Kudo/
            └── Fukazawa/
```

- `moral/` と `Otokogokoro/` はそれぞれ「シーン／担当者ごとのフォルダ」に分かれており、各フォルダの中には同名の `.html` / `.css` / `.js` が入っています（例: `house_Kiyose/house.html`, `house.css`, `house.js`）。担当者は自分のフォルダの3ファイルだけを編集すればよく、他の人のファイルとは衝突しません。
- `index.html` でモードを選んでスタートすると `moral/main.html` または `Otokogokoro/main.html` に遷移し、そこからさらに各シーン／担当者のページへ進みます。


## セットアップ



## チームメンバー

リーダー　鈴木　航　
プログラムリーダー　清瀬　健治
メンバー　有田　怜司
メンバー　工藤　有人
メンバー　深澤　陽基


## ローカルでの作業手順

### 1. 初回だけ：リポジトリをローカルに取得

```bash
git clone https://github.com/kenjik0611/Hackathon2027team17.git
cd Hackathon2027team17
```

Gitが入っていない場合は先に [Git公式サイト](https://git-scm.com/downloads) からインストールしてください。

### 2. 作業前：最新の状態を取得

作業を始める前に、必ず最新の状態にしておく。

```bash
git pull origin main
```

### 3. 作業用ブランチを作る（推奨）

`main` に直接コミットせず、機能ごとにブランチを切る。

```bash
git checkout -b your-name/feature-name
# 例: git checkout -b tanaka/login-page
```

### 4. 編集する

`src/`、`docs/` などのファイルを編集・追加する。

### 5. 変更を保存してpush

```bash
git add .
git commit -m "変更内容の説明"
git push origin your-name/feature-name
```

### 6. GitHub上でPull Requestを作成

1. GitHubのリポジトリページを開く
2. 「Compare & pull request」をクリック
3. 内容を確認して「Create pull request」
4. チームメンバーがレビューしてから `main` にマージする

### よく使うコマンド一覧

| コマンド | 内容 |
|---|---|
| `git status` | 変更内容の確認 |
| `git pull origin main` | 最新の状態を取得 |
| `git checkout -b ブランチ名` | 新しいブランチを作成 |
| `git add .` | 変更をステージング |
| `git commit -m "メッセージ"` | 変更をコミット |
| `git push origin ブランチ名` | GitHubへ反映 |

### 困ったとき

- `git status` で今の状態を確認する
- コンフリクト（衝突）が出たら、慌てずチームに相談する
- 分からない変更は無理に `git push` せず、まずチームに共有する
