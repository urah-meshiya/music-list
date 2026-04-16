export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1qEAgchkcRZ2Wqxpd0YMfjHbQnqDBYufwK9swauBEae0/export?format=csv&gid=815885868",
  /** ヘッダー行 */
  headerRowIndex: 2,
  /** 表示対象列 */
  displayColumns: ["D", "E"],
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9},
  primaryCol: "D",
  secondaryCol: "E",

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "Music List",
  /** ソートタブ(対象列,表示名) */
  sortTab: { H:"曲名順", I:"作者順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"H", type:"曲名", icon:"🎵", appendCol:"D"}, 1:{col:"I", type:"作者名", icon:"👤", appendCol:"E"}},
  /** 検索種類 */
  matchingConditions : "include",

  /** テーブル拡大率 */
  tableHeightRatio: 0.8,

  /** 情報アイコンを出す列 */
  infoIconCol: "D",
  /** 情報アイコンホバー時の情報ソース列 */
  infoSrcCol: "G"
};
