# token replace

## 認証コード取得
- c:sing_request で[開発用ページ](https://ja.twitcasting.tv/indexapi.php)にログイン
- [開発者向けページ](https://ja.twitcasting.tv/developer.php)でsing_requestの情報を確認
  * ClientID(A)
  * ClientSecret(B)
  * Callback URL = https://example.com
- 以下にアクセスし認証
  * https://apiv2.twitcasting.tv/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://example.com
  * YOUR_CLIENT_ID を (A) に置換
- リダイレクト先のURLのパラメータにcode(C)が表示される　（ 例：https://example.com/?code=AUTH_CODE ）

## アクセストークン取得
- 上記で(A)(B)(C)を確認
- [Online REST & SOAP API Testing Tool](https://reqbin.com) を開く
- 以下を入力
  * URL : https://apiv2.twitcasting.tv/oauth2/access_token
  * 種別を「POST」に変更
  * "Body"の"Form(url-encode)"に以下を入力
    ```
    code=XXXXX(C)
    grant_type=authorization_code
    client_id=XXXXX(A)
    client_secret=XXXXX(B)
    redirect_uri=https://example.com
    ```
- Send押下後、認証に成功するとトークンと有効期限が表示される

## トークン更新履歴
|  | 日時 | メモ |
| ---- | ---- | ---- |
| 1 | 2026-06-07 | 初回取得 |
| 2 | 2026-12-01 | 更新予定 | 
| 3 | 2027-06-01 | 更新予定 | 
| 4 |  |  | 
| 5 |  |  | 
