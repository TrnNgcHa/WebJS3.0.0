export default class Laptop {
  constructor({
    id = null,
    name,
    brand,
    price = 0,
    stock = 0,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price !== null ? Number(price) : null;
    this.stock = stock !== null ? Number(stock) : 0;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Laptop({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: row.price,
      stock: row.stock,
      created_at: row.created_at,
      updated_at: row.updated_at,
    });
  }

  toInsertParams() {
    return [this.name, this.brand, this.price, this.stock];
  }

  toUpdateParams() {
    return [this.name, this.brand, this.price, this.stock, this.id];
  }

  validate() {
    const errors = [];
    if (!this.name || String(this.name).trim() === "")
      errors.push("name is required");
    if (!this.brand || String(this.brand).trim() === "")
      errors.push("brand is required");
    if (this.price === null || Number.isNaN(Number(this.price)))
      errors.push("price must be a number");
    if (!Number.isInteger(Number(this.stock)))
      errors.push("stock must be an integer");
    return errors;
  }
}
