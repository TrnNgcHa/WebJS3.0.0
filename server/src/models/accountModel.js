class Account {
  constructor({
    id = null,
    email,
    passwordHash,
    userName,
    balance = 0,
    isActive = true,
    role = "user",
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.userName = userName;
    this.balance = balance !== null ? Number(balance) : 0;
    this.isActive = isActive === true || isActive === 1;
    this.role = role || "user";
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Account({
      id: row.Id,
      email: row.Email,
      passwordHash: row.PasswordHash,
      userName: row.UserName,
      balance: row.Balance,
      isActive: row.IsActive,
      role: row.Role,
      created_at: row.CreatedAt,
      updated_at: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.email,
      this.passwordHash,
      this.userName,
      this.balance,
      this.isActive,
      this.role,
    ];
  }

  toUpdateParams() {
    return [
      this.email,
      this.passwordHash,
      this.userName,
      this.balance,
      this.isActive,
      this.role,
      this.id,
    ];
  }
}

module.exports = Account;
