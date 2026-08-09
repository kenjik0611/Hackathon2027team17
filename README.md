# モラルチェッカー

10個のシチュエーションに4択で答え、「モラル度」と選択した人物への「理解度」を100点満点で表示する診断ゲームです。初期版では、気遣い型のAさん編と直球型のBさん編を遊べます。

## 主な機能

- Aさん編 / Bさん編の人物選択
- 人物紹介とゲームルール表示
- 各人物10問・各問題4択の診断ゲーム
- モラル度と人物理解度の100点換算
- 75点を境界にした4タイプ診断
- 同じ人物へのリトライ、別人物への切り替え
- 375pxから1440pxまでのレスポンシブ表示
- 問題データのランタイム検証と自動テスト

## 起動方法

Node.jsがインストールされた環境で、リポジトリのルートから実行します。

```bash
npm install
npm run dev
```

ターミナルに表示されたURL（通常は `http://localhost:5173`）をブラウザで開いてください。

## 確認コマンド

```bash
npm run lint
npm test
npm run build
```

`npm run build` の成果物は `dist/` に出力されます。

## 問題を編集する

Aさん編は `src/data/people/a.json`、Bさん編は `src/data/people/b.json` を編集します。問題文・選択肢・点数を変更するためにReactコードを触る必要はありません。

各人物データは次の条件を守ってください。

- 問題は10問
- 各問題の選択肢はA / B / C / Dの4つ
- `moral` と `understanding` は0〜3の整数
- 人物内で問題IDを重複させない
- 必須の文章を空にしない

条件に合わないデータは、起動時にエラー画面とコンソールで原因を確認できます。

## 新しい人物を追加する

1. `src/data/people/a.json` をコピーして、例えば `src/data/people/c.json` を作ります。
2. `id`、人物情報、テーマ色、画像パス、10問の問題を変更します。
3. `src/App.tsx` でJSONをimportし、`loadPeople` の `candidates` 配列へ追加します。
4. `public/assets/` に人物画像を追加し、JSONの `portrait` にパスを設定します。

画面コンポーネントは人物共通なので、人物専用の画面を追加する必要はありません。

## 採点ロジック

各選択肢の `moral` と `understanding` を合計し、問題数から最大点を動的に計算します。

```text
スコア = round(取得点 / (問題数 × 3) × 100)
```

診断タイプは、各スコアが75点以上かどうかで決まります。

| モラル度 | 理解度 | 診断タイプ |
|---|---|---|
| 75以上 | 75以上 | 人間関係マスター |
| 75以上 | 74以下 | ピュア優等生 |
| 74以下 | 75以上 | 世渡り上手 |
| 74以下 | 74以下 | 我が道タイプ |

採点処理は `src/utils/scoring.ts`、診断処理は `src/utils/diagnosis.ts` に分離しています。

## ファイル構成

```text
ntt-project/
├─ public/assets/          人物画像
├─ src/
│  ├─ components/         共通UI部品
│  ├─ data/people/        Aさん・BさんのJSON
│  ├─ screens/            各画面
│  ├─ styles/             全体と画面のCSS
│  ├─ types/              TypeScriptの型定義
│  ├─ utils/              採点・診断・データ検証とテスト
│  ├─ App.tsx             ゲーム全体の状態と画面遷移
│  └─ main.tsx            Reactの起動処理
├─ index.html
├─ package.json
└─ vite.config.ts
```

## Gitでの開発

作業ブランチで変更を確認したあと、次の順にGitHubへ送ります。

```bash
git status
git add .
git commit -m "Add moral checker MVP"
git push -u origin feature/arita-test
```

GitHubでPull Requestを作り、チームメンバーのレビュー後に `main` へマージします。

## チームメンバー

- リーダー: 鈴木 航
- プログラムリーダー: 清瀬 健治
- メンバー: 有田 怜司
- メンバー: 工藤 有人
- メンバー: 深澤 陽基
