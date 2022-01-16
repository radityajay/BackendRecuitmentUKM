const sql = require("./db.js");

// constructor
const Recuitmen = function(recuitmen) {
    this.name = recuitmen.name,
    this.nim = recuitmen.nim,
    this.angkatan = recuitmen.angkatan,
    this.noTlp = recuitmen.noTlp,
    this.ukmId = recuitmen.ukmId,
    this.prodiId = recuitmen.prodiId
};

Recuitmen.create = (newRecuitmen, result) => {
  sql.query("INSERT INTO recuitmens SET ?", newRecuitmen, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created recuitmen: ", { id: res.insertId, ...newRecuitmen });
    result(null, { id: res.insertId, ...newRecuitmen });
  });
};

Recuitmen.findById = (id, result) => {
  sql.query(`SELECT * FROM recuitmens WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found recuitmen: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Recuitmen with the id
    result({ kind: "not_found" }, null);
  });
};

Recuitmen.getAll = (title, result) => {
  let query = "SELECT * FROM `recuitmens` JOIN ukms ON recuitmens.id = ukms.id JOIN prodis ON recuitmens.id = prodis.id";
 
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("recuitmens: ", res);
    result(null, res);
  });
};

Recuitmen.getAllJoin = result => {
  sql.query("SELECT recuitmens.name, recuitmens.nim, recuitmens.angkatan, recuitmens.noTlp, ukms.name AS ukmId, prodis.name AS prodiId FROM recuitmens JOIN ukms ON recuitmens.id = ukms.id JOIN prodis ON recuitmens.id = prodis.id ORDER BY recuitmens.id DESC;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("recuitmens: ", res);
    result(null, res);
  });
};

Recuitmen.updateById = (id, recuitmen, result) => {
  sql.query(
    "UPDATE recuitmens SET title = ?, description = ?, published = ? WHERE id = ?",
    [recuitmen.title, recuitmen.description, recuitmen.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Recuitmen with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated recuitmen: ", { id: id, ...recuitmen });
      result(null, { id: id, ...recuitmen });
    }
  );
};

Recuitmen.remove = (id, result) => {
  sql.query("DELETE FROM recuitmens WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Recuitmen with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recuitmen with id: ", id);
    result(null, res);
  });
};

Recuitmen.removeAll = result => {
  sql.query("DELETE FROM recuitmens", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recuitmens`);
    result(null, res);
  });
};

module.exports = Recuitmen;