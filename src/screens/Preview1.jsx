import React, { useState, useEffect, useRef } from "react";
import './preview1.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { deleteCv } from "../store/action/userAppStorage";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { useLocation } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

// Helper function for generating DOCX
const generateDocx = async (formData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: formData?.name || "Full Name", heading: "Title" }),
          new Paragraph({ text: formData?.jobTitle || "Job Title", heading: "Heading2" }),
          new Paragraph("SUMMARY"),
          new Paragraph(`Phone: ${formData.phone}`),
          new Paragraph(`Email: ${formData.email}`),
          new Paragraph(`Location: ${formData.location}`),
          new Paragraph(`Social Media: ${formData.socialMedia}`),
          new Paragraph("AWARDS"),
          ...(formData?.awards || []).map((award) =>
            new Paragraph(`${award.title} - ${award.organization} / ${award.year} / ${award.location}`)
          ),
          new Paragraph("ACHIEVEMENTS"),
          ...(formData?.achievements || []).map((achievement) => new Paragraph(achievement.description)),
          new Paragraph("EDUCATION"),
          ...(formData?.education || []).map((edu) =>
            new Paragraph(`${edu.degree} - ${edu.institution} / ${edu.year}`)
          ),
          new Paragraph("WORK EXPERIENCE"),
          ...(formData?.workExperience || []).map((work) => {
            const responsibilities = work?.responsibilities?.map(
              (responsibility) => new Paragraph(`• ${responsibility}`)
            );
            return [
              new Paragraph(`${work.title} - ${work.company} / ${work.duration}`),
              ...responsibilities,
            ];
          }).flat(),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "CV.docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Preview1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const { cv: formData, isCvAvailable } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cvRef = useRef();
  const location = useLocation();
  const shareUrl = window.location.origin + location.pathname;

  // Redirect to template page if CV is not available
  useEffect(() => {
    if (!isCvAvailable) navigate('/template');
  }, [isCvAvailable, navigate]);

  if (!isCvAvailable) return null;

  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 1,
      filename: 'CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
  };

  const editHandler = () => navigate(`/editcv/${formData.cvTemplateType}`);

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await dispatch(deleteCv(formData));
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
    } else {
      setIsLoading(false);
      navigate(`/cvs`);
    }
  };

  const closeModal = () => setIsError(false);

  return (
    <div className=" flex flex-col items-center p-6 bg-gray-100 min-h-screen" >
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

      <div className="cv-containers flex flex-col md:flex-row justify-between gap-6 max-w-screen-6xl bg-white p-8 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105 duration-300 ease-in-out"  style={{width:'75%'}}>
  {/* Left Column (Personal Info & Summary) */}
  <div className="left-column w-full md:w-1/2 lg:w-2/5 xl:w-2/5">
    <h1 className="name text-4xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-all duration-300 ease-in-out">{formData.name}</h1>
    <h2 className="job-title text-xl text-gray-600 mb-6">{formData.jobTitle}</h2>

    {/* Summary Section */}
    <section className="section summary-section mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">SUMMARY</h3>
      <ul className="text-sm text-gray-600">
        <li><i className="fas fa-phone mr-2"></i>{formData.phone}</li>
        <li><i className="fas fa-envelope mr-2"></i>{formData.email}</li>
        <li><i className="fas fa-map-marker-alt mr-2"></i>{formData.location}</li>
        <li><i className="fas fa-globe mr-2"></i>{formData.socialMedia}</li>
      </ul>
    </section>

    {/* Awards Section */}
    <section className="section awards-section mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">AWARDS</h3>
      {formData.awards.map((award, index) => (
        <p key={index} className="text-sm text-gray-600">
          <strong>{award.title}</strong><br />
          {award.organization} / {award.year} / {award.location}
        </p>
      ))}
    </section>

    {/* Achievements Section */}
    <section className="section achievements-section mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">ACHIEVEMENTS</h3>
      {formData.achievements.map((achievement, index) => (
        <p key={index} className="text-sm text-gray-600">{achievement.description}</p>
      ))}
    </section>
  </div>

  {/* Right Column (Education & Work Experience) */}
  <div className="right-column w-full md:w-1/2 lg:w-3/5 xl:w-3/5">
    {/* Education Section */}
    <section className="section education mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">EDUCATION</h3>
      {formData.education.map((edu, index) => (
        <div className="education-item mb-4" key={index}>
          <h4 className="text-sm font-semibold text-gray-800">{edu.degree}</h4>
          <p className="text-xs text-gray-600">{edu.institution} / {edu.year}</p>
          <p className="text-xs text-gray-500">{edu.details}</p>
        </div>
      ))}
    </section>

    {/* Work Experience Section */}
    <section className="section work-experience mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">WORK EXPERIENCE</h3>
      {formData.workExperience.map((work, index) => (
        <div className="work-item mb-4" key={index}>
          <h4 className="text-sm font-semibold text-gray-800">{work.title}</h4>
          <p className="text-xs text-gray-600">{work.company} / {work.duration}</p>
          <ul className="list-disc ml-6 text-xs text-gray-500">
            {work.responsibilities.map((responsibility, i) => (
              <li key={i}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  </div>
</div>



      {/* Action Buttons */}
      <div className="cv-button-con flex flex-wrap justify-center gap-6 mb-6">
        <button onClick={downloadPDF} className="btn bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:translate-y-[-3px]">
          Download PDF
        </button>
        <button onClick={() => generateDocx(formData)} className="btn bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:translate-y-[-3px]">
          Download DOCX
        </button>
        <button onClick={editHandler} className="btn bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:translate-y-[-3px]">
          Edit CV
        </button>
        <button onClick={deleteHandler} className="btn bg- blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-transform duration-300 ease-in-out transform hover:translate-y-[-3px]">
          Delete CV
        </button>
      </div>

      {/* Social Share Buttons */}
      <div className="social-share-buttons text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Share your CV</h3>
        <div className="share-buttons-container flex justify-center gap-4">
          <FacebookShareButton url={shareUrl} className="m-2">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} className="m-2">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} className="m-2">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} className="m-2">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default Preview1;
































































