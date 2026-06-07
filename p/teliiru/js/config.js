export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1DcrplaiwuEOXP58lmgDptD8uCu85zzltztLKT4kmFTY/export?format=csv&gid=815885868",
  /** ツイキャスのユーザID */
  twicasName: "teliiru",
  /** ヘッダー行 */
  headerRowIndex: 2,
  /** 表示対象列 */
  displayColumns: ["C", "D", "E", "F","L"],
  primaryCol: "D",
  secondaryCol: "E",
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9, K:10},

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "てぃーるさんの歌える曲リスト",
  /** ソートタブ(対象列,表示名) */
  sortTab: { I:"曲名順", J:"作者順", F:"年代順", C:"ｵｽｽﾒ順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"I", type:"曲名", icon:"🎵", appendCol:"D"}, 1:{col:"J", type:"作者名", icon:"👤", appendCol:"E"}},
  /** 検索種類 */
  matchingConditions : "include",
  /** テーブル拡大率 */
  tableHeightRatio: 0.88,
  /** 情報アイコンを出す列 */
  infoIconCol: "D",
  /** 情報アイコンホバー時の情報ソース列 */
  infoSrcCol: "H",
  /** URL列 */
  urlSrcCol: "G",
  /** URL表示列 */
  urlTargetCol: "C",
  /** リクエストボタン表示列 */
  requestButtonColumn: "L"
};
