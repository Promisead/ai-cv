import React, { useState, useEffect } from 'react';
import './form.css';
import { updateCv } from '../store/action/userAppStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";

const CVForm = () => {
    const { cv, user } = useSelector(state => state.userAuth);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        aboutMe: '',
        experiences: [{ title: '', company: '', location: '', dateRange: '', responsibilities: [''] }],
        education: [{ degree: '', institution: '', dateRange: '' }],
        skills4: [''],
        languages: [{ language: '', proficiency: '' }],
        cvTemplateType: 'template4'
    });

    useEffect(() => {
        if (cv) setFormData(cv);
    }, [cv]);

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

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...formData.education];
        updatedEducation[index][name] = value;
        setFormData({ ...formData, education: updatedEducation });
    };

    const handleAddEducation = () => {
        setFormData((prevData) => ({
            ...prevData,
            education: [...prevData.education, { degree: '', institution: '', dateRange: '' }],
        }));
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

    const handleSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await dispatch(updateCv(formData));
        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            setIsLoading(false);
           // navigate(`/preview/${formData.cvTemplateType}`);
           window.location.href = `/cvs`;
        }
    };

    const closeModal = () => {
        setIsError(false);
    };

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">

                    <form clasName='space-y-6' onSubmit={handleSubmitHandler}>
                        <h2>Personal Information</h2>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                        <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                        <h2>About Me</h2>
                        <textarea name="aboutMe" placeholder="Brief description" value={formData.aboutMe} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                        <h2>Experience</h2>
                        {formData.experiences.map((exp, index) => (
                            <div key={index}>
                                <input type="text" name="title" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                                <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                                <input type="text" name="location" placeholder="Location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                                <input type="text" name="dateRange" placeholder="Date Range" value={exp.dateRange} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                                {exp.responsibilities.map((res, resIndex) => (
                                    <input
                                        key={resIndex}
                                        type="text"
                                        placeholder="Responsibility"
                                        value={res}
                                        onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)}
                                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                    />
                                ))}
                                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" type="button" onClick={() => handleAddResponsibility(index)}>Add Responsibility</button>
                            </div>
                        ))}
                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" type="button" onClick={handleAddExperience}>Add Experience</button>

                        <h2>Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    required
                                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    required
                                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="dateRange"
                                    placeholder="Date Range"
                                    value={edu.dateRange}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                />
                            </div>
                        ))}
                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" type="button" onClick={handleAddEducation}>Add Education</button>

                        <h2>Skills</h2>
                        {formData.skills4.map((skill, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="Skill"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        ))}
                        <button type="button" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleAddSkill}>Add Skill</button>

                        <h2>Languages</h2>
                        {formData.languages.map((lang, index) => (
                            <div key={index}>
                                <input type="text" name="language" placeholder="Language" value={lang.language} onChange={(e) => handleLanguageChange(index, e)}
                                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />

                                <input type="text" name="proficiency" placeholder="Proficiency" value={lang.proficiency} onChange={(e) => handleLanguageChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />
                            </div>
                        ))}
                        <button type="button" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleAddLanguage}>Add Language</button>

                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Update CV</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CVForm;

