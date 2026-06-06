export const post = async (musicInfo, config) => {

  try {
    const res = await fetch("https://sing-request.ponzu946.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "a8F3kL9xQ2pZ7wR6mN4sT1vB0yC"
      },
      body: JSON.stringify({
        user: config.twicasName,
        comment: `「${musicInfo}」がリクエストされました！`
      })
    });

    if (!res.ok) {
      const text = await res.text();
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
    alert(`リクエストに成功しました！`);
  } catch (err) {
    console.error("通信エラー:", err);
    alert(`リクエストに失敗しました: （${err}）`);
  }
}