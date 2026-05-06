export class SheetService {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;
  }

  async fetch(index = 0) {
    try {
      const url = this.resolveUrl(index);

      const res = await fetch(url);
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

  resolveUrl(index) {
    const { url } = this.CONFIG;

    if (Array.isArray(url)) {
      if (url.length === 0) {
        throw new Error("CONFIG.url array is empty");
      }

      if (index < 0 || index >= url.length) {
        throw new Error(`URL index out of range: ${index}`);
      }

      return url[index];
    }

    if (typeof url === "string") {
      return url;
    }

    throw new Error("CONFIG.url must be string or array");
  }

  parse(text) {
    const rows = this.parseCSV(text);
    const header = rows[this.CONFIG.headerRowIndex - 1];

    let data = rows
      .slice(this.CONFIG.headerRowIndex)
      .map(r => this.normalize(r));

    if (this.CONFIG.primaryCol) {
      data = data.filter(r => this.isValid(r));
    }

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
    return row[this.CONFIG.primaryCol]?.trim();
  }
}