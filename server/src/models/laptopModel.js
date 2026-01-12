export default class Laptop {
  constructor({
    id = null,
    name,
    brand,
    price = 0,
    stock = 0,
    cpu_id = null,
    cpu_name = null,
    gpu_id = null,
    gpu_name = null,
    ram_id = null,
    ram_name = null,
    storage_id = null,
    storage_name = null,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price !== null ? Number(price) : null;
    this.stock = stock !== null ? Number(stock) : 0;
    this.cpu_id = cpu_id;
    this.cpu_name = cpu_name;
    this.gpu_id = gpu_id;
    this.gpu_name = gpu_name;
    this.ram_id = ram_id;
    this.ram_name = ram_name;
    this.storage_id = storage_id;
    this.storage_name = storage_name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Laptop({
      id: row.Id,
      name: row.Name,
      brand: row.Brand,
      price: row.Price,
      stock: row.Stock,
      cpu_id: row.CpuId,
      cpu_name: row.CpuName,
      gpu_id: row.GpuId,
      gpu_name: row.GpuName,
      ram_id: row.RamId,
      ram_name: row.RamName,
      storage_id: row.StorageId,
      storage_name: row.StorageName,
      created_at: row.CreatedAt,
      updated_at: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.cpu_id,
      this.gpu_id,
      this.ram_id,
      this.storage_id,
    ];
  }

  toUpdateParams() {
    return [
      this.name,
      this.brand,
      this.price,
      this.stock,
      this.cpu_id,
      this.gpu_id,
      this.ram_id,
      this.storage_id,
      this.id,
    ];
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
