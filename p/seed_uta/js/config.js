export const CONFIG = {
  /** Googleスプレッドシート(公開)のURL */
  url: ["https://docs.google.com/spreadsheets/d/10UHIruPvjFVuuvr9UfO8sjk4jLYeiG-56OOWVSStX64/export?format=csv&gid=815885868","https://docs.google.com/spreadsheets/d/10UHIruPvjFVuuvr9UfO8sjk4jLYeiG-56OOWVSStX64/export?format=csv&gid=710254558","https://docs.google.com/spreadsheets/d/10UHIruPvjFVuuvr9UfO8sjk4jLYeiG-56OOWVSStX64/export?format=csv&gid=529399285"],
  /** ツイキャスのユーザID */
  twicasName: "seed_uta",
  /** ヘッダー行 */
  headerRowIndex: 2,
  /** 表示対象列 */
  displayColumns: ["B","C","Z"],
  primaryCol: "B",
  secondaryCol: "C",
  /** 列番号(ソート目的も含む) */
  columnIndex: { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J:9},

  /************ カスタマイズ項目 ************/
  /** ページタイトル */
  title: "SEE:Dの歌える曲リスト",
  /** ソートタブ(対象列,表示名) */
  sortTab: { F:"曲名順",G:"作者順"},
  /** 検索対象 */
  searchTargets: { 0:{col:"F", type:"曲名", icon:"🎵", appendCol:"B"},1:{col:"G", type:"ｱｰﾃｨｽﾄ/作品", icon:"👤", appendCol:"E"}},
  /** 検索種類 */
  matchingConditions : "include",
  /** テーブル拡大率 */
  tableHeightRatio: 0.88,
  /** コピーボタンの対象列 */
  copyButtonColumn: "Z"
};
