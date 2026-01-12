export default class Ram {
  constructor({
    id = null,
    name,
    brand,
    price = 0,
    stock = 0,
    capacity = 1,
    gen,
    speed = 1,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price !== null ? Number(price) : null;
    this.stock = stock !== null ? Number(stock) : 0;
    this.capacity = capacity !== null ? Number(capacity) : 1;
    this.gen = gen;
    this.speed = speed !== null ? Number(speed) : 1;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Ram({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: row.price,
      stock: row.stock,
      capacity: row.capacity,
      gen: row.gen,
      speed: row.speed,
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
      this.capacity,
      this.gen,
      this.speed,
    ];
  }
  toUpdateParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.capacity,
      this.gen,
      this.speed,
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
