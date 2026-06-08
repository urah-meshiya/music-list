const TWITCAS_ERRORS = {
  1000: "アクセストークンが無効です",
  1001: "リクエストの形式が不正です",
  2000: "API実行回数の上限に達しました",
  2002: "合言葉配信のためコメントできません",
  2003: "リクエストが重複しています",
  2004: "コメント数が上限に達しています",
  2005: "コメントの投稿権限がありません",
  403:  "アクセスが拒否されました",
  404:  "配信が見つかりません",
};

export const sendRequest = async (musicInfo, config) => {

  try {
    const res = await fetch("https://sing-request.ponzu946.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "a8F3kL9xQ2pZ7wR6mN4sT1vB0yC"
      },
      body: JSON.stringify({
        user: config.twicasName,
        comment: musicInfo
      })
    });

    if (!res.ok) {
      const text = await res.text();

      const rateMatch = text.match(/RATE_LIMIT:(\d+)/);
      if (rateMatch) {
        alert(`投稿が多すぎます。${rateMatch[1]}秒後に再試行してください`);
        console.error("レート制限:", text);
        return;
      }

      const twitcasMatch = text.match(/TWITCAS_ERROR:(\d+)/);
      if (twitcasMatch) {
        const code = parseInt(twitcasMatch[1]);
        const message = TWITCAS_ERRORS[code] ?? `不明なエラー (code: ${code})`;
        alert(`リク失敗: ${message}`);
        console.error("TwitCastingエラー:", res.status, text);
        return;
      }

      try {
        const obj = JSON.parse(text);
        alert(obj.error ?? `リク失敗: HTTPエラー ${res.status}`);
      } catch {
        alert(text);
      }
      console.error("HTTPエラー:", res.status, text);
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      console.warn("JSONでないレスポンス:", text);
      return;
    }
    console.log("成功:", data);
    alert("リクエストに成功しました！");

  } catch (err) {
    console.error("通信エラー:", err);
    alert(`リクエストに失敗しました: （${err}）`);
  }
}