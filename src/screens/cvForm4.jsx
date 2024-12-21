import React, { useState, useEffect } from 'react';
import './form.css'; // Assuming you have form-specific styles here
import { makeCv } from '../store/action/userAppStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";


const CVForm = () => {
    let navigate = useNavigate();
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)

    let dispatch = useDispatch();



    let { user } = useSelector(state => state.userAuth); // Fetch user from Redux store

    // Protect the dashboard - if no user is present, redirect to login
    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not found
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        aboutMe: '',
        experiences: [
            { title: '', company: '', location: '', dateRange: '', responsibilities: [''] },
        ],
        education: { degree: '', institution: '', dateRange: '' },
        skills4: [''],
        languages: [{ language: '', proficiency: '' }],
        cvTemplateType: 'template4'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index][name] = value;
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleResponsibilityChange = (expIndex, resIndex, value) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[expIndex].responsibilities[resIndex] = value;
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experiences: [...formData.experiences, { title: '', company: '', location: '', dateRange: '', responsibilities: [''] }],
        });
    };

    const handleAddResponsibility = (index) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index].responsibilities.push('');
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, education: { ...prevData.education, [name]: value } }));
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills4];
        updatedSkills[index] = value;
        setFormData({ ...formData, skills4: updatedSkills });
    };

    const handleAddSkill = () => {
        setFormData((prevData) => ({ ...prevData, skills4: [...prevData.skills4, ''] }));
    };
    
    

    const handleLanguageChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLanguages = [...formData.languages];
        updatedLanguages[index][name] = value;
        setFormData({ ...formData, languages: updatedLanguages });
    };

    const handleAddLanguage = () => {
        setFormData((prevData) => ({ ...prevData, languages: [...prevData.languages, { language: '', proficiency: '' }] }));
    };

    const handleSubmit = async (e) => {
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
                    <form onSubmit={handleSubmit}>
                        <h2>Personal Information</h2>
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                        <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

                        <h2>About Me</h2>
                        <textarea name="aboutMe" placeholder="Brief description" onChange={handleChange} />

                        <h2>Experience</h2>
                        {formData.experiences.map((exp, index) => (
                            <div key={index}>
                                <input type="text" name="title" placeholder="Job Title" onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="company" placeholder="Company" onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="location" placeholder="Location" onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="dateRange" placeholder="Date Range" onChange={(e) => handleExperienceChange(index, e)} />
                                {exp.responsibilities.map((res, resIndex) => (
                                    <input
                                        key={resIndex}
                                        type="text"
                                        placeholder="Responsibility"
                                        onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)}
                                    />
                                ))}
                                <button type="button" onClick={() => handleAddResponsibility(index)}>Add Responsibility</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddExperience}>Add Experience</button>

                        <h2>Education</h2>
                        <input type="text" name="degree" placeholder="Degree" onChange={handleEducationChange} required />
                        <input type="text" name="institution" placeholder="Institution" onChange={handleEducationChange} required />
                        <input type="text" name="dateRange" placeholder="Date Range" onChange={handleEducationChange} />

                        <h2>Skills</h2>
                        {formData.skills4.map((skill, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="Skill"
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                            />
                        ))}
                        
                        <button type="button" onClick={handleAddSkill}>Add Skill</button>

                        <h2>Languages</h2>
                        {formData.languages.map((lang, index) => (
                            <div key={index}>
                                <input type="text" name="language" placeholder="Language" onChange={(e) => handleLanguageChange(index, e)} />
                                <input type="text" name="proficiency" placeholder="Proficiency" onChange={(e) => handleLanguageChange(index, e)} />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddLanguage}>Add Language</button>

                        <button type="submit">Generate CV</button>
                    </form>
                </div>
            </div >
        </>

    );
};

export default CVForm;