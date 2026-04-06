export class SheetService {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;
  }

  async fetch() {
    try {
      const res = await fetch(this.CONFIG.url);
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }

      const text = await res.text();
      const parsed = this.parse(text);
      return parsed;

    } catch (err) {
      console.error("fetch failed:", err);
      throw err;
    }
  }

  parse(text) {
    const rows = this.parseCSV(text);
    const header = rows[this.CONFIG.headerRowIndex -1];
    const data = rows
      .slice(this.CONFIG.headerRowIndex)
      .map(r => this.normalize(r))
      .filter(r => this.isValid(r));
    return { header, data };
  }

  parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    const pushField = () => {
      row.push(field);
      field = "";
    };

    const pushRow = () => {
      pushField();
      rows.push(row);
      row = [];
    };

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const next = text[i + 1];

      if (inQuotes) {
        if (c === '"' && next === '"') {
          field += '"';
          i++;
        } else if (c === '"') {
          inQuotes = false;
        } else {
          field += c;
        }
        continue;
      }

      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        pushField();
      } else if (c === "\n") {
        pushRow();
      } else if (c !== "\r") {
        field += c;
      }
    }

    if (field !== "" || row.length) pushRow();
    return rows;
  }

  normalize(row) {
    const obj = {};
    for (const key in this.CONFIG.columnIndex) {
      obj[key] = row[this.CONFIG.columnIndex[key]] ?? "";
    }
    return obj;
  }

  isValid(row) {
    return row.D?.trim();
  }
}