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
      additionalIformation: information,
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
    return response;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};
