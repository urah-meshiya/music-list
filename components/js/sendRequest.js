import { common } from "./common.js";

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

const CLIENT_ID_KEY = "utaRikuClientId";

const getClientId = () => {
  try {
    let clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
      clientId = crypto.randomUUID();
      localStorage.setItem(CLIENT_ID_KEY, clientId);
    }
    return clientId;
  } catch (err) {
    // セッション中は同じIDを使い回す
    console.warn("localStorage利用不可:", err);
    if (!window.__utaRikuClientIdFallback) {
      window.__utaRikuClientIdFallback = crypto.randomUUID();
    }
    return window.__utaRikuClientIdFallback;
  }
};

export const showRequestModal = (message, config, onRequest) => {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: min(90vw, 420px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  modal.innerHTML = `
    <div style="font-size:16px;line-height:1.6;">
      ${message}<br>
      <span style="font-size:11px;line-height:1.6;">
        (リクエストは${config.rateLimitWindow ?? common.rateLimitWindow}分あたり${config.rateLimitMax ?? common.rateLimitMax}件まで送信できます)
      </span>
    </div>

    <div class="requestModalResult"></div>

    <div style="display:flex;gap:8px;justify-content:space-around;">
      <button class="requestCancelBtn">やめる</button>
      <button class="requestOkBtn">する！</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const resultEl = modal.querySelector(".requestModalResult");
  const okBtn = modal.querySelector(".requestOkBtn");
  const cancelBtn = modal.querySelector(".requestCancelBtn");

  const close = () => {
    overlay.remove();
  };

  cancelBtn.addEventListener("click", close);

  okBtn.addEventListener("click", async () => {
    cancelBtn.disabled = true;
    okBtn.disabled = true;

    okBtn.innerHTML = `<span class="requestSpinner"></span>`;
    resultEl.innerHTML = `<div style="color:#00c;">送信中･･･ちょっと待ってね</div>`;
    try {
      const result = await onRequest();
      resultEl.innerHTML = `
        <div style="color:${result.success ? "#0a7a0a" : "#c00"};">
          ${result.message}
        </div>
      `;
    } catch (err) {
      resultEl.innerHTML = `
        <div style="color:#c00;line-height:1.5;">
        ${err?.message ?? err ?? "エラーが発生しました"}
        </div>
      `;
    }

    okBtn.textContent = "閉じる";
    okBtn.disabled = false;
    cancelBtn.style.display = "none";

    okBtn.onclick = close;
  });

  if (!document.getElementById("requestModalStyle")) {
    const style = document.createElement("style");
    style.id = "requestModalStyle";
    style.textContent = `
      .requestSpinner{
        width:18px;
        height:18px;
        border:2px solid #ccc;
        border-top-color:#333;
        border-radius:50%;
        display:inline-block;
        animation:requestSpin .8s linear infinite;
      }

      @keyframes requestSpin{
        from{transform:rotate(0deg);}
        to{transform:rotate(360deg);}
      }
    `;
    document.head.appendChild(style);
  }
};

export const sendRequest = async (musicInfo, url = null, config) => {
  try {
    const res = await fetch("https://sing-request.ponzu946.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "a8F3kL9xQ2pZ7wR6mN4sT1vB0yC"
      },
      body: JSON.stringify({
        user: config.twicasName,
        comment: musicInfo,
        movieUrl: url,
        clientId: getClientId(),
        rateLimit: {
          max: config.rateLimitMax,      // 件数上限(件)
          window: config.rateLimitWindow // 件数上限を適用する時間(分)
        }
      })
    });

    if (!res.ok) {
      const text = await res.text();

      const rateMatch = text.match(/RATE_LIMIT:(\d+)/);
      if (rateMatch) {
        console.error("レート制限:", text);

        return {
          success: false,
          message: `リクエストが多すぎます。${rateMatch[1]}秒後に再試行してください`
        };
      }

      const twitcasMatch = text.match(/TWITCAS_ERROR:(\d+)/);
      if (twitcasMatch) {
        const code = parseInt(twitcasMatch[1], 10);
        const message =
          TWITCAS_ERRORS[code] ?? `不明なエラー (code: ${code})`;

        console.error("TwitCastingエラー:", res.status, text);

        return {
          success: false,
          message: `リク失敗: ${message}`
        };
      }

      try {
        const obj = JSON.parse(text);

        return {
          success: false,
          message: obj.error ?? `リク失敗: HTTPエラー ${res.status}`
        };
      } catch {
        return {
          success: false,
          message: text
        };
      }
    }

    let data;

    try {
      data = await res.json();
    } catch {
      console.warn("JSONでないレスポンス");

      return {
        success: false,
        message: "リクエストは成功しましたが、レスポンス形式が不正です"
      };
    }

    console.log("成功:", data);

    return {
      success: true,
      message: "リクエストに成功しました！"
    };

  } catch (err) {
    console.error("通信エラー:", err);

    return {
      success: false,
      message: `リクエストに失敗しました: ${err}`
    };
  }
};