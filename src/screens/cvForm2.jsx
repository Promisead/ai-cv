import React, { useState, useEffect } from 'react';
import './form.css'; // Assuming you have form-specific styles here
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeCv } from '../store/action/userAppStorage';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";


const CvForm2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    education: [
      { degree: '', institution: '', year: '', details: '' },
      { degree: '', institution: '', year: '', details: '' }
    ],
    publications: [
      { title: '', journal: '', year: '', pages: '' },
      { title: '', journal: '', year: '', pages: '' },
      { title: '', journal: '', year: '', pages: '' }
    ],
    researchExperience: [
      { role: '', institution: '', duration: '', description: '' }
    ],
    awards: [
      { title: '', institution: '', year: '' },
      { title: '', institution: '', year: '' }
    ],
    skills: { R: '', Spanish: '', Mandarin: '' },
    cvTemplateType: 'template2'
  });


  let { user } = useSelector(state => state.userAuth); // Fetch user from Redux store
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [isError, setIsError] = useState(false)
  let [isErrorInfo, setIsErrorInfo] = useState('')
  let [isLoading, setIsLoading] = useState(false)



  // Protect the dashboard - if no user is present, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login page if user is not found
    }
  }, [user, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    // Dispatch action or handle form submission
    let response = await dispatch(makeCv(formData))
    if (!response.bool) {
      setIsLoading(false)
      setIsError(true)
      setIsErrorInfo(response.message)
    }
    setIsLoading(false)
    console.log(formData)
     window.location.href = `/cvs`;
  }

  let closeModal = () => {
    setIsError(false)

  }



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
                required
              />
            </div>

            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

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
                  required
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
                  required
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
                  required
                />
                <textarea
                  placeholder="Details"
                  value={edu.details}
                  onChange={(e) => {
                    const education = [...formData.education];
                    education[index].details = e.target.value;
                    setFormData({ ...formData, education });
                  }}
                  required
                />
              </div>
            ))}

            <h3>Publications</h3>
            {formData.publications.map((pub, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Publication Title"
                  value={pub.title}
                  onChange={(e) => {
                    const publications = [...formData.publications];
                    publications[index].title = e.target.value;
                    setFormData({ ...formData, publications });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Journal"
                  value={pub.journal}
                  onChange={(e) => {
                    const publications = [...formData.publications];
                    publications[index].journal = e.target.value;
                    setFormData({ ...formData, publications });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={pub.year}
                  onChange={(e) => {
                    const publications = [...formData.publications];
                    publications[index].year = e.target.value;
                    setFormData({ ...formData, publications });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Pages"
                  value={pub.pages}
                  onChange={(e) => {
                    const publications = [...formData.publications];
                    publications[index].pages = e.target.value;
                    setFormData({ ...formData, publications });
                  }}
                  required
                />
              </div>
            ))}

            <h3>Research Experience</h3>
            {formData.researchExperience.map((research, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Role"
                  value={research.role}
                  onChange={(e) => {
                    const researchExperience = [...formData.researchExperience];
                    researchExperience[index].role = e.target.value;
                    setFormData({ ...formData, researchExperience });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={research.institution}
                  onChange={(e) => {
                    const researchExperience = [...formData.researchExperience];
                    researchExperience[index].institution = e.target.value;
                    setFormData({ ...formData, researchExperience });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={research.duration}
                  onChange={(e) => {
                    const researchExperience = [...formData.researchExperience];
                    researchExperience[index].duration = e.target.value;
                    setFormData({ ...formData, researchExperience });
                  }}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={research.description}
                  onChange={(e) => {
                    const researchExperience = [...formData.researchExperience];
                    researchExperience[index].description = e.target.value;
                    setFormData({ ...formData, researchExperience });
                  }}
                  required
                />
              </div>
            ))}

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
                  required
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={award.institution}
                  onChange={(e) => {
                    const awards = [...formData.awards];
                    awards[index].institution = e.target.value;
                    setFormData({ ...formData, awards });
                  }}
                  required
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
                  required
                />
              </div>
            ))}

            <h3>Skills</h3>
            <div>
              <label>R:</label>
              <input
                type="text"
                name="R"
                value={formData.skills.R}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    skills: { ...formData.skills, R: e.target.value },
                  });
                }}
                required
              />
            </div>
            <div>
              <label>Spanish:</label>
              <input
                type="text"
                name="Spanish"
                value={formData.skills.Spanish}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    skills: { ...formData.skills, Spanish: e.target.value },
                  });
                }}
                required
              />
            </div>
            <div>
              <label>Mandarin:</label>
              <input
                type="text"
                name="Mandarin"
                value={formData.skills.Mandarin}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    skills: { ...formData.skills, Mandarin: e.target.value },
                  });
                }}
                required
              />
            </div>

            <button type="submit">Generate CV</button>
          </form>

        </div>

      </div>
    </>


  );
};

export default CvForm2;
