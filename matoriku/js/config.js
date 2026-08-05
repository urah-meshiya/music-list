// 表示対象のスプレッドシート一覧
// { name: '表示する人名', spreadsheetId: 'スプレッドシートのID', sheetName: 'シート名(タブ名)',
//   titleColumn: 'A', artistColumn: 'B', headerRow: 1 }
const SPREADSHEETS = [
  { name: '柊アオイ', spreadsheetId: '1xfqn2Nq5r5GXLpOPYnSm8BQsm4Rl1rzkzVc226zIqxM', sheetName: 'リスト本体',
    titleColumn: 'D', artistColumn: 'E', headerRow: 4 },
  { name: 'Omame.', spreadsheetId: '1VM287aWQJVFz2ycHikQM0-1Tym--V1WOfOFbpbxPmLw', sheetName: 'list',
    titleColumn: 'D', artistColumn: 'E', headerRow: 2 },
  { name: 'てぃーる', spreadsheetId: '1DcrplaiwuEOXP58lmgDptD8uCu85zzltztLKT4kmFTY', sheetName: 'list',
    titleColumn: 'D', artistColumn: 'E', headerRow: 2 },
  { name: 'SEE:D', spreadsheetId: '10UHIruPvjFVuuvr9UfO8sjk4jLYeiG-56OOWVSStX64', sheetName: 'メインリスト',
    titleColumn: 'B', artistColumn: 'C', headerRow: 2 },
  { name: 'あおは@', spreadsheetId: '1qEAgchkcRZ2Wqxpd0YMfjHbQnqDBYufwK9swauBEae0', sheetName: 'list',
    titleColumn: 'D', artistColumn: 'E', headerRow: 2 },
  { name: '柳屋おばけ', spreadsheetId: '15CVfl5eyirU20CJBmpEKiz_nKEDlnJo3uT32mwk0th0', sheetName: 'ボカロ',
    titleColumn: 'D', artistColumn: 'E', headerRow: 4 },
];
