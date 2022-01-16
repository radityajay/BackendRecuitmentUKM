const sql = require("./db.js");

// constructor
const Ukm = function(ukm) {
  this.name = ukm.name;
};

Ukm.create = (newUkm, result) => {
  sql.query("INSERT INTO ukms SET ?", newUkm, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ukm: ", { id: res.insertId, ...newUkm });
    result(null, { id: res.insertId, ...newUkm });
  });
};

Ukm.findById = (id, result) => {
  sql.query(`SELECT * FROM ukms WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ukm: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Ukm with the id
    result({ kind: "not_found" }, null);
  });
};

Ukm.getAll = (title, result) => {
  let query = "SELECT * FROM ukms";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ukms: ", res);
    result(null, res);
  });
};

Ukm.getAllPublished = result => {
  sql.query("SELECT * FROM ukms WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ukms: ", res);
    result(null, res);
  });
};

Ukm.updateById = (id, ukm, result) => {
  sql.query(
    "UPDATE ukms SET name = ? WHERE id = ?",
    [ukm.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Ukm with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ukm: ", { id: id, ...ukm });
      result(null, { id: id, ...ukm });
    }
  );
};

Ukm.remove = (id, result) => {
  sql.query("DELETE FROM ukms WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Ukm with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ukm with id: ", id);
    result(null, res);
  });
};

Ukm.removeAll = result => {
  sql.query("DELETE FROM ukms", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ukms`);
    result(null, res);
  });
};

module.exports = Ukm;