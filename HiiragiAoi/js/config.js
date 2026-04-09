export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1xfqn2Nq5r5GXLpOPYnSm8BQsm4Rl1rzkzVc226zIqxM/export?format=csv&gid=815885868",
  /** ヘッダー行 */
  headerRowIndex: 4,
  /** 表示対象列 */
  displayColumns: ["D", "E", "F"],
  primaryCol: "D",
  secondaryCol: "E",
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8 },

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "アオイの歌える曲リスト",
  /** ソートタブ(対象列,表示名) */
  sortTab: { H:"曲名順", I:"作者順", F:"年代順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"H", type:"曲名", icon:"🎵", appendCol:"D"}, 1:{col:"I", type:"作者名", icon:"👤", appendCol:"E"}},
  /** 検索種類 */
  matchingConditions : "startsWith",
  /** 流れ星用画像 */
  ss_imageUrls: ["./img/icon.png","./img/small_star_purple.png","./img/small_star_yellow.png"],
  /** 流れ星間隔 */
  ss_interval: 50,
  /** グレーアウト判定行 */
  grayoutTargetColumn: "C",
  /** グレーアウト判定内容 */
  grayoutTargetText: "-",
  /** テーブル拡大率 */
  tableHeightRatio: 0.75
};
