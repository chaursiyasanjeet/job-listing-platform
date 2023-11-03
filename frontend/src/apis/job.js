import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;
export const addjob = async (
  companyName,
  addLogoURL,
  jobPosition,
  monthlySalary,
  jobType,
  remoteOffice,
  jobLocation,
  jobDescription,
  aboutCompany,
  skillsRequired,
  information
) => {
  try {
    const requrl = `${backendURL}/addjob`;
    const payload = {
      companyName: companyName,
      logoUrl: addLogoURL,
      jobPosition: jobPosition,
      jobType: jobType,
      mode: remoteOffice,
      location: jobLocation,
      jobDescription: jobDescription,
      aboutCompany: aboutCompany,
      skills: skillsRequired,
      additionalInformation: information,
      salary: monthlySalary,
    };

    const token = JSON.parse(localStorage.getItem("recuirterDetail"));
    const config = {
      headers: {
        token: token.token,
      },
    };

    console.log(payload);
    const response = await axios.post(requrl, payload, config);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const jobsearch = async () => {
  try {
    const requrl = `${backendURL}/getjobs`;

    const response = await axios.get(requrl);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const getJobDetails = async (id) => {
  try {
    const requrl = `${backendURL}/jobdetails/${id}`;
    const response = await axios.get(requrl);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const editjob = async (
  id,
  companyName,
  addLogoURL,
  jobPosition,
  monthlySalary,
  jobType,
  remoteOffice,
  jobLocation,
  jobDescription,
  aboutCompany,
  skillsRequired,
  information
) => {
  try {
    const requrl = `${backendURL}/editJob/${id}`;
    console.log(requrl);
    const payload = {
      companyName: companyName,
      logoUrl: addLogoURL,
      jobPosition: jobPosition,
      jobType: jobType,
      mode: remoteOffice,
      location: jobLocation,
      jobDescription: jobDescription,
      aboutCompany: aboutCompany,
      skills: skillsRequired,
      additionalInformation: information,
      salary: monthlySalary,
    };

    const token = JSON.parse(localStorage.getItem("recuirterDetail"));
    const config = {
      headers: {
        token: token.token,
      },
    };

    const response = await axios.put(requrl, payload, config);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};
