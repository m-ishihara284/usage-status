# usage-status

Claude Code のプロンプト入力欄の下に、使用量を1行で常時表示するプラグインです。
プランの5時間枠・週枠の使用率とリセットまでの残り時間、セッションの料金、コンテキストの使用率を、セッション開始時と毎回の応答のあとに更新して表示します。
Claude への追加の問い合わせは行わないため、費用や利用枠の消費はありません。

```
使用量: 5時間 23.5%(あと2h15m) · 週 41%(あと3日) · $1.84 · ctx 37%
```

## インストール

ターミナルの Claude Code のプロンプトで:

```
/plugin install usage-status --marketplace m-ishihara284/usage-status
```

`Add marketplace?` には `y` を入力し、範囲は user を選びます。

シェルから:

```
claude plugin install usage-status --marketplace m-ishihara284/usage-status
```

デスクトップアプリ（`/plugin` が使えない場合）: 入力欄の横の + → Plugins → Add marketplace に `m-ishihara284/usage-status` を入力 → Add plugin。

非公開リポジトリのため、GitHub でこのリポジトリを読める人で、かつそのパソコンに github.com の git 認証（SSH キー、または `gh auth login` のあと `gh auth setup-git`）がある場合にだけインストールできます。
