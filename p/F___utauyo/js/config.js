export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1VM287aWQJVFz2ycHikQM0-1Tym--V1WOfOFbpbxPmLw/export?format=csv&gid=815885868",
  /** ツイキャスのユーザID */
  twicasName: "F___utauyo",
  /** ヘッダー行 */
  headerRowIndex: 2,
  /** 表示対象列 */
  displayColumns: ["C", "D", "E", "F","Z"],
  primaryCol: "D",
  secondaryCol: "E",
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9, K:10},

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "Omame's Music List",
  /** ソートタブ(対象列,表示名) */
  sortTab: { H:"曲名順", I:"作者順", F:"年代順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"H", type:"曲名", icon:"🎵", appendCol:"D"}, 1:{col:"I", type:"作者名", icon:"👤", appendCol:"E"}},
  /** 検索種類 */
  matchingConditions : "include",
  /** テーブル拡大率 */
  tableHeightRatio: 0.88,
  /** 情報アイコンを出す列 */
  infoIconCol: "D",
  /** 情報アイコンホバー時の情報ソース列 */
  infoSrcCol: "G",
  /** URL列 */
  /*urlSrcCol: "G",*/
  /** URL表示列 */
  /*urlTargetCol: "C",*/
  /** リクエストボタン表示列 */
  requestButtonColumn: "Z",

  /** 流れ星用画像 */
  ss_imageUrls: ["./img/bird.png"],
  /** 流れ星間隔 */
  ss_interval: 50,
};
