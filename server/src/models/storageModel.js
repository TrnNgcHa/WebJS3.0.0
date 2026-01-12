export default class Storage {
  constructor({
    id = null,
    name,
    brand,
    price = 0,
    stock = 0,
    storage_type,
    interface_type,
    capacity = 1,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price !== null ? Number(price) : null;
    this.stock = stock !== null ? Number(stock) : 0;
    this.storage_type = storage_type;
    this.interface_type = interface_type;
    this.capacity = capacity !== null ? Number(capacity) : 1;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Storage({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: row.price,
      stock: row.stock,
      storage_type: row.storage_type,
      interface_type: row.interface_type,
      capacity: row.capacity,
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
      this.storage_type,
      this.interface_type,
      this.capacity,
    ];
  }
  toUpdateParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.storage_type,
      this.interface_type,
      this.capacity,
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
