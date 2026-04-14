export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/1D9u0JTHiOb7WrnahR09Fq2DZMa5yYNGeMVnOH3rIFcw/export?format=csv&gid=1592307894",
  /** ヘッダー行 */
  headerRowIndex: 1,
  /** 表示対象列 */
  displayColumns: ["B", "E", "G", "H"],
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9},
  primaryCol: "E",
  secondaryCol: "G",
  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "天久夜の歌える曲リスト🦉",
  /** ソートタブ(対象列,表示名) */
  sortTab: { D:"曲名順", F:"作者順", J:"ｵｽｽﾒ順", H:"ジャンル別"},
  /** 検索対象 */
  searchTargets: { 0:{col:"D", type:"曲名", icon:"🎵", appendCol:"E"}, 1:{col:"F", type:"作者名", icon:"👤", appendCol:"G"}, 2:{col:"H", type:"ジャンル", icon:"🔖", appendCol:""}},
  /** 検索種類 */
  matchingConditions : "startsWith"
};
