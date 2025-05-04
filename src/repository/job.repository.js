const db = require("../database/pg.database");

exports.createJob = async (job) => {
  try {
    const res = await db.query(
      "INSERT INTO job_applications (company, position, date_applied, status, notes, job_link, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        job.company,
        job.position,
        job.date_applied,
        job.status,
        job.notes,
        job.job_link,
        job.user_id,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.getAllUserJobs = async (user_id) => {
  try {
    const res = await db.query(
      "SELECT * FROM job_applications WHERE user_id = $1",
      [user_id]
    );
    return res.rows;
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.getJobById = async (id) => {
  try {
    const res = await db.query("SELECT * FROM job_applications WHERE id = $1", [
      id,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.updateJob = async (id, job) => {
  try {
    const res = await db.query(
      "UPDATE job_applications SET company = $1, position = $2, date_applied = $3, status = $4, notes = $5, job_link = $6 WHERE id = $7 RETURNING *",
      [
        job.company,
        job.position,
        job.date_applied,
        job.status,
        job.notes,
        job.job_link,
        id,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};

exports.deleteJob = async (id) => {
  try {
    const res = await db.query(
      "DELETE FROM job_applications WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
  }
};
