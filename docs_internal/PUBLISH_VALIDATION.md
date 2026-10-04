# 公開検証報告 / 2026-10-05

STATUS: PASS

公開対象の内容: Prototype 0.12。

PUBLIC_GAME_URL: https://nekohisa-code.github.io/element-chan-rescue-battle/

GITHUB_REPOSITORY: https://github.com/nekohisa-code/element-chan-rescue-battle

DEPLOY_METHOD: GitHub Pages / main / docs

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

remote origin: https://github.com/nekohisa-code/element-chan-rescue-battle.git

Git認証アカウントnekohisa-codeを確認。同名Repository不存在を確認してPUBLIC Repositoryを新規作成。mainを通常pushし、Pages main/docsを設定。build成功、HTTPS有効。認証情報はソース・ログへ保存・表示していない。

初回ゲーム公開commit: fa499027accce0781585d266f2959ea7da2713e9。以降の公開報告更新は文書のみで、ゲームファイル変更なし。force push・独自Actions・Firewall変更なし。

## 公開HTTPS URL実アクセス検証

- HTTP_STATUS: 200。58実行ファイルすべてHTTP 200、公開応答SHA-256はcommit内の各ファイルと一致。
- HTML・CSS・JavaScript・画像・音声asset取得：PASS。実画面のCSS適用、全表示画像読み込みを確認。
- PC 1280×900：タイトル → STORY 1 → 通常難易度準備戦 → HCl組成完成 → 18ダメージ → サポート選択 → Ga戦を実操作。ページサイズ1280×900。
- 390×844：通常難易度Ga戦、手札8枚、HP 110 / 110、候補・操作ボタンを確認。ページサイズ390×844、主要戦闘UIの縦スクロールなし。
- BGM：準備戦meadow_adventure.wavとボス戦battle_theme.mp3の再生・切替をaudio要素の状態で確認。SE ONで化合物完成操作。端末スピーカーによる主観的聴取は未実施。
- 元素図鑑22体の画像正常、化合物図鑑73件。リロード後もHCl発見済みで、公開URLのlocalStorage保持を確認。
- PUBLIC_CONSOLE_ERROR: 0。
- 公開版ではGa/In/Snの全救出通しプレイを再実施していない。ローカル境界検証と実行ファイルの公開hash一致を併用。
- IPHONE_REAL_DEVICE_PUBLIC_TEST: PENDING。390×844の実ブラウザ幅検証であり、iPhone実機Safari確認とは区別。
- 保護対象の安定ファイル889件は作業前後SHA-256一致。旧版・0.12・118 MASTER未変更。稼働中配信ログ2件は除外。

公開HTTPS URLは自宅PCの起動、同一Wi-Fi、ローカルFirewall設定に依存しない。端末/ブラウザ別のlocalStorage保存となり、ローカル版保存は自動移行しない。

Pagesの設定根拠: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

公開および上記の実アクセス検証は完了。次の安定版は開発版を保護したままdocs更新 → diff/秘密情報確認 → commit → push → Pages反映 → 公開再検証。通常URLを固定して運用する。
