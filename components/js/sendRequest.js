/*
export const post_simple = async (musicInfo, config) => {

  console.log(musicInfo);

  try {

    const formData = new FormData();
    formData.append('user', config.twicasName);
    formData.append('comment', musicInfo);

    const response = await fetch(
      "https://urah-meshiya.xo.je/api/sendRequest.php",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    console.log(result);

    return result;

  } catch (err) {

    console.error(err);

    return {
      success: false,
      message: err instanceof Error ? err.message : String(err)
    };

  }

};
*/

export const post = async (musicInfo, config) => {

  try {
    const res = await fetch("http://sing-request.ponzu946.workers.dev/", {
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

  } catch (err) {
    console.error("通信エラー:", err);
  }
}