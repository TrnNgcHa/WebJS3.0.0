export default class Gpu {
  constructor({
    id = null,
    name,
    brand,
    price = 0,
    stock = 0,
    cuda_core = 1,
    base_clock = 0.0,
    vram,
    pcie,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price !== null ? Number(price) : null;
    this.stock = stock !== null ? Number(stock) : 0;
    this.cuda_core = cuda_core !== null ? Number(cuda_core) : 1;
    this.base_clock = base_clock !== null ? Number(base_clock) : 0.0;
    this.vram = vram;
    this.pcie = pcie;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Gpu({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: row.price,
      stock: row.stock,
      cuda_core: row.cuda_core,
      base_clock: row.base_clock,
      vram: row.vram,
      pcie: row.pcie,
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
      this.cuda_core,
      this.base_clock,
      this.vram,
      this.pcie,
      this.updated_at,
    ];
  }
  toInsertParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.cuda_core,
      this.base_clock,
      this.vram,
      this.pcie,
      this.updated_at,
    ];
  }
  toUpdateParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.cuda_core,
      this.base_clock,
      this.vram,
      this.pcie,
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
