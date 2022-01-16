const sql = require("./db.js");

// constructor
const Prodi = function(prodi) {
  this.name = prodi.name;
};

Prodi.create = (newProdi, result) => {
  sql.query("INSERT INTO prodis SET ?", newProdi, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created prodi: ", { id: res.insertId, ...newProdi });
    result(null, { id: res.insertId, ...newProdi });
  });
};

Prodi.findById = (id, result) => {
  sql.query(`SELECT * FROM prodis WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found prodi: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Prodi with the id
    result({ kind: "not_found" }, null);
  });
};

Prodi.getAll = (title, result) => {
  let query = "SELECT * FROM prodis";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("prodis: ", res);
    result(null, res);
  });
};

Prodi.getAllPublished = result => {
  sql.query("SELECT * FROM prodis WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("prodis: ", res);
    result(null, res);
  });
};

Prodi.updateById = (id, prodi, result) => {
  sql.query(
    "UPDATE prodis SET title = ?, description = ?, published = ? WHERE id = ?",
    [prodi.title, prodi.description, prodi.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Prodi with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated prodi: ", { id: id, ...prodi });
      result(null, { id: id, ...prodi });
    }
  );
};

Prodi.remove = (id, result) => {
  sql.query("DELETE FROM prodis WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Prodi with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted prodi with id: ", id);
    result(null, res);
  });
};

Prodi.removeAll = result => {
  sql.query("DELETE FROM prodis", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} prodis`);
    result(null, res);
  });
};

module.exports = Prodi;