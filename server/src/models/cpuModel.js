export default class Cpu {
  constructor({
    id = null,
    name,
    brand,
    price = 0,
    stock = 0,
    cores = 1,
    threads = 1,
    base_clock = 0.0,
    igpu,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price !== null ? Number(price) : null;
    this.stock = stock !== null ? Number(stock) : 0;
    this.cores = cores !== null ? Number(cores) : 1;
    this.threads = threads !== null ? Number(threads) : 1;
    this.base_clock = base_clock !== null ? Number(base_clock) : 0.0;
    this.igpu = igpu;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Cpu({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: row.price,
      stock: row.stock,
      cores: row.cores,
      threads: row.threads,
      base_clock: row.base_clock,
      igpu: row.igpu,
      created_at: row.created_at,
      updated_at: row.updated_at,
    });
  }
  toInsertParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.cores,
      this.threads,
      this.base_clock,
      this.igpu,
    ];
  }
  toUpdateParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.cores,
      this.threads,
      this.base_clock,
      this.igpu,
      this.id,
    ];
  }

  validate() {
    const errors = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push("Name is required");
    }
    if (!this.brand || this.brand.trim().length === 0) {
      errors.push("Brand is required");
    }
    if (this.price === null || Number.isNaN(Number(this.price))) {
      errors.push("Price must be a number");
    }
    if (!Number.isInteger(Number(this.stock))) {
      errors.push("Stock must be an integer");
    }
    return errors;
  }
}
