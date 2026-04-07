export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1-_wNvwxHU2pvSiOAEf4Lmqx_XqY9iovghxYoC97fw1g/export?format=csv&gid=1256301545",
  /** ヘッダー行 */
  headerRowIndex: 1,
  /** 表示対象列 */
  displayColumns: ["B"],
  primaryCol: "B",
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9},

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "SEE:Dの歌える曲リスト",
  /** ソートタブ(対象列,表示名) */
  sortTab: { B:"曲名順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"B", type:"曲名", icon:"🎵", appendCol:"B"}},
  /** 検索種類 */
  matchingConditions : "include"
};
