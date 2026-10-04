# 公開準備検証 / 2026-10-05

STATUS: HOLD_FOR_GITHUB_AUTH

公開対象の内容: Prototype 0.12。公開Repository・Pagesはまだ未作成で、公開URLのHTTP応答・公開PC/スマホ検証は未実施です。

## ファイル・安全性

- 元0.12の実行ファイルは無改変でコピー。必要な58ファイルのみを抽出し、静的配信用の空の.nojekyllを追加。
- Pythonはローカルテスト用配信のみで、ゲームロジックに不要。
- 画像・CSS・JavaScript・音声はProject Site配下の相対参照。
- 古い基礎データ内の画像参照14件は、アプリ開始前の後続データで上書きされる履歴値。最終データで参照する全素材を抽出済み。
- 公開対象にローカルパス・ユーザー名・LAN IP・メールアドレス・秘密鍵・既知token形式を検出せず。
- PNGテキスト/EXIF、WAV情報チャンク、MP3 ID3のメタデータも検査。圧縮された画素・波形の偶然の文字列はテキストとして判定しない。
- 元版の説明資料・個人情報を含む証拠・起動スクリプト・Firewallスクリプト・不要な履歴音源・一時ファイルは公開対象から除外。
- 音源ライセンス確認済み。素材の出所はASSET_NOTICE.md、LICENSES_AUDIO.txt。
- 旧版・0.12・118MASTERは前後SHA-256で一致。稼働中の配信ログ2件は変動対象として除外。4コマ正本への書き込みなし。

## ローカル静的ブラウザ検証

Project Siteと同じ名前のサブパスから配信して検証。ゲームコードの変更なし。

- 1280×900: STORY 1、準備戦、化合物選択・吸収・攻撃、サポート選択、Ga戦。ページ高さ900。
- 390×844: Ga戦、手札、候補、サポート、Story/救出進行。ページ高さ844・幅390。メイン戦闘の縦/横ページスクロールなし。
- 全表示画像の読込成功。草原背景とCSS適用。
- 準備BGMとボスBGMの再生/切替を実際のaudio要素で確認。SE ONで組成完成・サポートを操作。
- Ga → In → SnのStory・戦闘・救出・仲間化・Stage解放を確認。後半進行はQA指定の敵残量1による救出境界テストであり、通常バランスの通しプレイとは区別。
- 元素図鑑・化合物図鑑、進行のリロード保持を確認。
- アプリconsole error: 0。操作ツールの待機タイムアウトはアプリconsole errorではない。

## Git・公開

mainのローカルRepositoryを新規作成。Gitのグローバル設定は変更せず、Repository限定の公開用noreply作者情報を使用。

予定remote: https://github.com/nekohisa-code/element-chan-rescue-battle.git

認証連携ではnekohisa-codeを確認できるが、作成・push・Pages設定に使えるGit認証アカウントは未登録。ブラウザも未ログイン。秘密値は取得・保存・表示していない。

初回認証後、同名Repository不存在を再確認 → PUBLIC作成 → 公開対象再検査 → main通常push → Pages main/docs → HTTPS実アクセス検証、の順で続行。既存同名Repositoryがあれば停止。force push・独自Actions・Firewall変更なし。

Pagesの設定根拠: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

この文書のPASSは公開準備の範囲のみ。公開完了を意味しません。
