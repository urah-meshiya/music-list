export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: "https://docs.google.com/spreadsheets/d/15CVfl5eyirU20CJBmpEKiz_nKEDlnJo3uT32mwk0th0/export?format=csv&gid=815885868_",
  /** ヘッダー行 */
  headerRowIndex: 4,
  /** 表示対象列 */
  displayColumns: ["C", "D", "E", "F"],
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9},

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "おばけの歌える曲リスト",
  /** ソートタブ(対象列,表示名) */
  sortTab: { H:"曲名順", I:"作者順", F:"年代順", J:"ｵｽｽﾒ順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"H", type:"曲名", icon:"🎵", appendCol:"D"}, 1:{col:"I", type:"作者名", icon:"👤", appendCol:"E"}},
  /** 検索種類 */
  matchingConditions : "include"
};
