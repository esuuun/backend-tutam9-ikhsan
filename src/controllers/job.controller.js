const jobRepository = require("../repository/job.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createJob = async (req, res) => {
  if (!req.body.company || !req.body.position) {
    return baseResponse(res, false, 400, "Company and position are required");
  }

  if (!req.body.date_applied) {
    return baseResponse(res, false, 400, "Date applied is required");
  }

  try {
    const job = await jobRepository.createJob(req.body);
    if (!job) {
      return baseResponse(res, false, 400, "Error creating job", null);
    }
    return baseResponse(res, true, 201, "Job created", job);
  } catch (error) {
    return baseResponse(res, false, 500, "Error creating job", error);
  }
};

exports.getAllUserJobs = async (req, res) => {
  try {
    const jobs = await jobRepository.getAllUserJobs(req.query.user_id);
    if (!jobs) {
      return baseResponse(res, false, 400, "Error fetching jobs", null);
    }
    return baseResponse(res, true, 200, "Jobs fetched", jobs);
  } catch (error) {
    return baseResponse(res, false, 500, "Error fetching jobs", error);
  }
};

exports.getJobById = async (req, res) => {
  if (!req.params.id) {
    return baseResponse(res, false, 400, "Job ID is required");
  }

  try {
    const job = await jobRepository.getJobById(req.params.id);
    if (!job) {
      return baseResponse(res, false, 404, "Job not found", null);
    }
    return baseResponse(res, true, 200, "Job found", job);
  } catch (error) {
    return baseResponse(res, false, 500, "Error getting job", error);
  }
};

exports.updateJob = async (req, res) => {
  if (!req.params.id) {
    return baseResponse(res, false, 400, "Job ID is required");
  }

  try {
    const job = await jobRepository.updateJob(req.params.id, req.body);
    if (!job) {
      return baseResponse(res, false, 400, "Error updating job", null);
    }
    return baseResponse(res, true, 200, "Job updated", job);
  } catch (error) {
    return baseResponse(res, false, 500, "Error updating job", error);
  }
};

exports.deleteJob = async (req, res) => {
  if (!req.params.id) {
    return baseResponse(res, false, 400, "Job ID is required");
  }

  try {
    const job = await jobRepository.deleteJob(req.params.id);
    if (!job) {
      return baseResponse(res, false, 400, "Error deleting job", null);
    }
    return baseResponse(res, true, 200, "Job deleted", job);
  } catch (error) {
    return baseResponse(res, false, 500, "Error deleting job", error);
  }
};
