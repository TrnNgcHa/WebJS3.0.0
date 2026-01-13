export default class User {
  constructor({
    id = null,
    email,
    passwordHash,
    userName,
    balance = 0,
    created_at = null,
    updated_at = null,
  } = {}) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.userName = userName;
    this.balance = balance !== null ? Number(balance) : 0;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDb(row) {
    if (!row) return null;
    return new User({
      id: row.Id,
      email: row.Email,
      passwordHash: row.PasswordHash,
      userName: row.UserName,
      balance: row.Balance,
      created_at: row.CreatedAt,
      updated_at: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [this.email, this.passwordHash, this.userName, this.balance];
  }

  toUpdateParams() {
    return [
      this.email,
      this.passwordHash,
      this.userName,
      this.balance,
      this.id,
    ];
  }
}
