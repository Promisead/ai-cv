import React, { useRef, useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { useNavigate, useLocation } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import Modal from '../components/Modal/Modal';
import Loader from '../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCv } from "../store/action/userAppStorage";
import './preview.css';

const CVPreview = () => {
    const cvRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);

    const shareUrl = window.location.origin + location.pathname;

    const downloadPDF = () => {
        const element = cvRef.current;
        if (element) {
            const options = {
                margin: 1,
                filename: 'CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter' }
            };
            html2pdf().from(element).set(options).save();
        }
    };

    const downloadDOCX = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph(formData.name || ''),
                        new Paragraph(formData.contact?.address || ''),
                        new Paragraph(formData.contact?.phone || ''),
                        new Paragraph(formData.contact?.email || ''),
                        new Paragraph(formData.profile || '')
                    ]
                }
            ]
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV.docx';
        a.click();
    };

    const editHandler = () => {
        navigate(`/editcv/${formData.cvTemplateType}`);
    };

    const deleteHandler = async () => {
        setIsLoading(true);
        const response = await dispatch(deleteCv(formData));
        setIsLoading(false);
        if (!response.bool) {
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            navigate('/cvs');
        }
    };

    return (
        <div className="flex justify-center w-full">
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />}
            <div className="mt-4">
                <div ref={cvRef} className="bg-white shadow-lg p-6 rounded-lg max-w-4xl mx-auto transition-all duration-300 ease-in-out hover:scale-105">
                    <header className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                            <p><i className="fas fa-map-marker-alt"></i> {formData.contact.address}</p>
                            <p><i className="fas fa-phone"></i> {formData.contact.phone}</p>
                            <p><i className="fas fa-envelope"></i> {formData.contact.email}</p>
                        </div>
                    </header>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4"><i className="fas fa-user-circle"></i> Profile</h3>
                        <p className="text-gray-700">{formData.profile}</p>
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4"><i className="fas fa-briefcase"></i> Employment History</h3>
                        {formData.employmentHistory.map((job, idx) => (
                            <div key={idx} className="mt-4 p-4 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <h4 className="font-semibold text-gray-800">{job.title} — {job.location}</h4>
                                <p className="text-gray-600">{job.date}</p>
                                <ul className="list-disc pl-6 text-gray-600">
                                    {job.responsibilities.map((task, i) => <li key={i}>{task}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4"><i className="fas fa-graduation-cap"></i> Education</h3>
                        {formData.education.map((edu, idx) => (
                            <div key={idx} className="mt-4 p-4 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <h4 className="font-semibold text-gray-800">{edu.degree} — {edu.location}</h4>
                                <p className="text-gray-600">{edu.date}</p>
                                <p className="text-gray-600">{edu.honors}</p>
                            </div>
                        ))}
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4"><i className="fas fa-cogs"></i> Skills</h3>
                        <ul className="list-disc pl-6 text-gray-600">
                            {formData.skillset.map((skill, idx) => (
                                <li key={idx} className="hover:text-blue-600 transition duration-300 ease-in-out">{skill.skill}: {skill.level}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4"><i className="fas fa-users"></i> References</h3>
                        {formData.references.map((ref, idx) => (
                            <div key={idx} className="mt-4 p-4 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <p className="font-semibold text-gray-800">{ref.name}</p>
                                <p className="text-gray-600">{ref.email} | {ref.phone}</p>
                            </div>
                        ))}
                    </section>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={downloadPDF} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out">Download PDF</button>
                    <button onClick={downloadDOCX} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out">Download DOCX</button>
                    <button onClick={editHandler} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out">Edit CV</button>
                    <button onClick={deleteHandler} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out">Delete CV</button>
                </div>

                <div className="text-center mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Share your CV</h3>
                    <div className="flex justify-center gap-6">
                        <FacebookShareButton url={shareUrl} quote="Check out my CV!">
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title="Check out my CV!">
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareUrl}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>
                        <WhatsappShareButton url={shareUrl} title="Check out my CV!">
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVPreview;












