import React, { useState, useEffect } from 'react';
import './form.css'; // Assuming you have form-specific styles here
import { makeCv, updateCv } from '../store/action/userAppStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";

const CVForm3 = () => {
    const { cv,user } = useSelector(state => state.userAuth);
    console.log(cv)
 
    const [formData, setFormData] = useState({
        name: '',
        profile: '',
        phone: '',
        email: '',
        linkedin: '',
        location: '',
        experiences: [
            { title: '', company: '', duration: '', location: '', responsibilities: [''] },
        ],
        educations: { degree: '', institution: '', duration: '' },
        certifications: [],
        skills3: '',
        cvTemplateType: 'template3'
    });
    let navigate = useNavigate();
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)

    let dispatch = useDispatch();

// Fetch user from Redux store

    // Protect the dashboard - if no user is present, redirect to login
    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not found
        }
    }, [user, navigate]);


    useEffect(() => {
        setFormData(cv)
      }, [])
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...formData.experiences];
        if (name === 'responsibility') {
            updatedExperiences[index].responsibilities = [value];
        } else {
            updatedExperiences[index][name] = value;
        }
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, educations: { ...prevData.educations, [name]: value } }));
    };

    const handleCertificationsChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => ({ ...prevData, certifications: value.split(',').map(cert => cert.trim()) }));
    };

    const handleSkillsChange = (e) => {
        setFormData((prevData) => ({ ...prevData, skills3: e.target.value }));
    };

    
    const handleSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        // Dispatch action or handle form submission
        let response = await dispatch(updateCv(formData))
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
                    <form className="cv-form" onSubmit={handleSubmitHandler}>
                        <h2>CV Information</h2>
                        <div>
                            <label>
                                Name: </label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                        </div>
                        <div>
                            <label>
                                Profile: </label>
                            <textarea name="profile" value={formData.profile} onChange={handleChange} required />

                        </div>
                        <div>
                            <label>
                                Phone: </label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                        </div>
                        <div>
                            <label>
                                Email: </label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                        </div>
                        <div>
                            <label>
                                LinkedIn: </label>
                            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />

                        </div>
                        <div>
                            <label>
                                Location: </label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                        </div>

                        <h2>Experience</h2>
                        {formData.experiences.map((experience, index) => (
                            <div key={index} className="experience-section">
                                <div>
                                    <label>
                                        Job Title: </label>
                                    <input type="text" name="title" value={experience.title} onChange={(e) => handleExperienceChange(index, e)} />

                                </div>
                                <div>
                                    <label>
                                        Company: </label>
                                    <input type="text" name="company" value={experience.company} onChange={(e) => handleExperienceChange(index, e)} />

                                </div>
                                <div>
                                    <label>
                                        Duration:</label>
                                    <input type="text" name="duration" value={experience.duration} onChange={(e) => handleExperienceChange(index, e)} />
                                </div>
                                <div>
                                    <label>
                                        Location:</label>
                                    <input type="text" name="location" value={experience.location} onChange={(e) => handleExperienceChange(index, e)} />

                                </div>
                                <div>
                                    <label>
                                        Responsibilities:</label>
                                    <textarea name="responsibility" onChange={(e) => handleExperienceChange(index, e)} value={experience.responsibilities} />

                                </div>
                            </div>
                        ))}

                        <h2>Education</h2>
                        <div>
                            <label>
                                Degree:</label>
                            <input type="text" name="degree" value={formData.educations.degree} onChange={handleEducationChange} required />

                        </div>
                        <div>
                            <label>
                                Institution:</label>
                            <input type="text" name="institution" value={formData.educations.institution} onChange={handleEducationChange} required />

                        </div>
                        <div>
                            <label>
                                Duration:</label>
                            <input type="text" name="duration" value={formData.educations.duration} onChange={handleEducationChange} required />

                        </div>

                        <h2>Certifications</h2>
                        <div>
                            <label>
                                Certifications (comma-separated):</label>
                            <input type="text" name="certifications" value={formData.certifications} onChange={handleCertificationsChange} />

                        </div>

                        <h2>Technical Skills</h2>
                        <div>
                            <label>
                                Skills (comma-separated):</label>
                            <input type="text" name="skills" value={formData.skills3} onChange={handleSkillsChange} />

                        </div>

                        <button type="submit" className="submit-button">Update CV</button>
                    </form>
                </div>
            </div>

        </>

    );
};

export default CVForm3;