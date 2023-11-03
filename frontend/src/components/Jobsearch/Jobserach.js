import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Jobsearch.module.css";
import searchIcon from "../../assets/search.svg";
import { jobsearch } from "../../apis/job";

const Jobsearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loggedin, setloggedin] = useState(false);
  const redirect = useNavigate();

  const tokenTime = JSON.parse(localStorage.getItem("recuirterDetail"));
  useEffect(() => {
    const currentTime = new Date().getTime();
    const logg =
      tokenTime !== null
        ? tokenTime.expiry > currentTime
          ? true
          : false
        : false;
    setloggedin(logg);
  }, [tokenTime]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // getJobListings(searchTerm, selectedSkills);
  };

  const handleSelectChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      //   getJobListings(searchTerm, updatedSkills);
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((item) => item !== skill);
    setSelectedSkills(updatedSkills);
    // getJobListings(searchTerm, updatedSkills);
  };

  const clearSkills = () => {
    setSelectedSkills([]);
    // getJobListings(searchTerm, []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search operation with the search term and selected skills
    console.log("Search Term:", searchValue);
    console.log("Selected Skills:", selectedSkills);
  };

  const addJobButton = () => {
    redirect("/addJob");
  };

  return (
    <div className={styles.jobsearch}>
      <form className={styles.searchform} onSubmit={handleSearchSubmit}>
        <div className={styles.searchbar}>
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Type any job title"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <div className={styles.jobsearchFooter}>
        <div className={styles.selectskills}>
          <select value={selectedSkills} onChange={handleSelectChange}>
            <option value="">Skills</option>
            {/* {skills.map((skill, index) => {
              return <option key={index}>{skill}</option>;
            })} */}
          </select>
          <div className={styles.selectedskills}>
            {selectedSkills.map((skill) => (
              <div className={styles.selectedskill} key={skill}>
                {skill}
                <button
                  className={styles.removeskill}
                  onClick={() => handleRemoveSkill(skill)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <button className={styles.clearskills} onClick={clearSkills}>
              Clear
            </button>
          )}
        </div>
        {loggedin && (
          <button className={styles.addjobbtn} onClick={addJobButton}>
            + Add Job
          </button>
        )}
      </div>
    </div>
  );
};

export default Jobsearch;
