export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1lcjprurI_9bDvQ6EO1OifqhAVVrACih2l50BU2Awhns/export?format=csv&gid=815885868",
  /** ヘッダー行 */
  headerRowIndex: 2,
  /** 表示対象列 */
  displayColumns: ["C", "D"],
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9},
  primaryCol: "C",
  /** secondaryCol: "D", **/

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "Music List For Tsukishiro Oboro",
  /** ソートタブ(対象列,表示名) */
  sortTab: { G:"曲名順", H:"作者順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"G", type:"曲名", icon:"🎵", appendCol:"C"}, 1:{col:"H", type:"作者名", icon:"👤", appendCol:"D"}},
  /** 検索種類 */
  matchingConditions : "startsWith",

  randomDisplayDefaultText: "push START!"
};
