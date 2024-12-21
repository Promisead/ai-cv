import React, { useEffect, useState } from 'react';
import './form.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { updateCv } from '../store/action/userAppStorage';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";


const CVForm = () => {
  let { cv } = useSelector(state => state.userAuth);
  let { user } = useSelector(state => state.userAuth);
  let [isError, setIsError] = useState(false)
  let [isErrorInfo, setIsErrorInfo] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  // Protect the dashboard - if no user is present, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    phone: '',
    email: '',
    location: '',
    socialMedia: '',
    summary: '',
    awards: [{ title: '', organization: '', year: '', location: '' }],
    achievements: [{ description: '' }],
    education: [{ degree: '', institution: '', year: '', details: '' }],
    workExperience: [{ title: '', company: '', duration: '', responsibilities: [''] }],
  });

  let dispatch = useDispatch()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAward = () => {
    setFormData({
      ...formData,
      awards: [...formData.awards, { title: '', organization: '', year: '', location: '' }],
    });
  };

  const handleAddAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { description: '' }],
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '', details: '' }],
    });
  };

  const handleAddWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, { title: '', company: '', duration: '', responsibilities: [''] }],
    });
  };


  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Dispatch action or handle form submission
    let response = await dispatch(updateCv(formData));
  
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
      return; // Exit the function early if there was an error
    }
  
    // If successful, set isLoading to false and navigate
    setIsLoading(false);
    console.log(formData); // You may want to remove or handle this in production
  
    // Navigate to the preview page after a successful update
    //navigate(`/preview/${formData.cvTemplateType}`);
    window.location.href = `/cvs`;
  };
  

  let closeModal = () => {
    setIsError(false)

  }


  useEffect(() => {
    setFormData(cv)
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
      <div className='form-container'>
        <div className="cv-form-containers">
          <form onSubmit={handleSubmitHandler}>
            <h2>CV Information</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required // Make this field required
              />
            </div>
            <div>
              <label>Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required // Make this field required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required // Make this field required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required // Make this field required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required // Make this field required
              />
            </div>
            <div>
              <label>Social Media/Website:</label>
              <input
                type="text"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
                required // Make this field required
              />
            </div>
            <div>
              <label>Summary:</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required // Make this field required
              />
            </div>

            <h3>Awards</h3>
            {formData.awards.map((award, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Award Title"
                  value={award.title}
                  onChange={(e) => {
                    const awards = [...formData.awards];
                    awards[index].title = e.target.value;
                    setFormData({ ...formData, awards });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={award.organization}
                  onChange={(e) => {
                    const awards = [...formData.awards];
                    awards[index].organization = e.target.value;
                    setFormData({ ...formData, awards });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={award.year}
                  onChange={(e) => {
                    const awards = [...formData.awards];
                    awards[index].year = e.target.value;
                    setFormData({ ...formData, awards });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={award.location}
                  onChange={(e) => {
                    const awards = [...formData.awards];
                    awards[index].location = e.target.value;
                    setFormData({ ...formData, awards });
                  }}
                  required // Make this field required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddAward}>Add Another Award</button>

            <h3>Achievements</h3>
            {formData.achievements.map((achievement, index) => (
              <div key={index}>
                <textarea
                  placeholder="Achievement Description"
                  value={achievement.description}
                  onChange={(e) => {
                    const achievements = [...formData.achievements];
                    achievements[index].description = e.target.value;
                    setFormData({ ...formData, achievements });
                  }}
                  required // Make this field required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddAchievement}>Add Another Achievement</button>

            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const education = [...formData.education];
                    education[index].degree = e.target.value;
                    setFormData({ ...formData, education });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const education = [...formData.education];
                    education[index].institution = e.target.value;
                    setFormData({ ...formData, education });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const education = [...formData.education];
                    education[index].year = e.target.value;
                    setFormData({ ...formData, education });
                  }}
                  required // Make this field required
                />
                <textarea
                  placeholder="Details (optional)"
                  value={edu.details}
                  onChange={(e) => {
                    const education = [...formData.education];
                    education[index].details = e.target.value;
                    setFormData({ ...formData, education });
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>Add Another Education</button>

            <h3>Work Experience</h3>
            {formData.workExperience.map((work, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={work.title}
                  onChange={(e) => {
                    const workExperience = [...formData.workExperience];
                    workExperience[index].title = e.target.value;
                    setFormData({ ...formData, workExperience });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={work.company}
                  onChange={(e) => {
                    const workExperience = [...formData.workExperience];
                    workExperience[index].company = e.target.value;
                    setFormData({ ...formData, workExperience });
                  }}
                  required // Make this field required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={work.duration}
                  onChange={(e) => {
                    const workExperience = [...formData.workExperience];
                    workExperience[index].duration = e.target.value;
                    setFormData({ ...formData, workExperience });
                  }}
                  required // Make this field required
                />
                <textarea
                  placeholder="Responsibilities"
                  value={work.responsibilities.join('\n')} // Join with a newline for multi-line text
                  onChange={(e) => {
                    const responsibilities = e.target.value.split('\n'); // Split by new line
                    const workExperience = [...formData.workExperience];
                    workExperience[index].responsibilities = responsibilities;
                    setFormData({ ...formData, workExperience });
                  }}
                  required // Make this field required
                />

              </div>
            ))}
            <button type="button" onClick={handleAddWorkExperience}>Add Another Work Experience</button>

            <button type="submit">Update CV</button>
          </form>
        </div>
      </div>
    </>

  );
};

export default CVForm;