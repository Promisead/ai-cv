import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv } from "../store/action/userAppStorage";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

const Preview4 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);
  const cvRef = useRef();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  let location = useLocation();
  const shareUrl = window.location.origin + location.pathname;

  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 1,
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: formData?.name || "Full Name", heading: "Title" }),
            new Paragraph({ text: formData?.jobTitle || "Job Title", heading: "Heading2" }),
            new Paragraph(formData?.phone || "Phone"),
            new Paragraph(formData?.email || "Email"),
            new Paragraph(formData?.address || "Address"),
            new Paragraph("ABOUT ME"),
            new Paragraph(formData?.aboutMe || "Description not provided"),
            new Paragraph("EXPERIENCE"),
            ...(formData?.experiences || []).map(
              (exp) =>
                new Paragraph(
                  `${exp.title || "Job Title"} - ${exp.company || "Company"} | ${exp.dateRange || "Date Range"}`
                )
            ),
            new Paragraph("EDUCATION"),
            ...(formData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree || "Degree"} - ${edu.institution || "Institution"} | ${edu.dateRange || "Date Range"}`
                )
            ),
            new Paragraph("SKILLS"),
            new Paragraph(formData?.skills4 ? formData.skills4.join(", ") : "Skills not provided"),
            new Paragraph("LANGUAGES"),
            ...(formData?.languages || []).map(
              (lang) => new Paragraph(`${lang.language} - ${lang.proficiency}`)
            ),
          ],
        },
      ],
    });

    try {
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CV.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  if (!isCvAvailable) {
    return <div>No CV available</div>;
  }

  const editHandler = () => {
    navigate(`/editcv/${formData.cvTemplateType}`);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await dispatch(deleteCv(formData));
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
    } else {
      navigate(`/cvs`);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsError(false);
  };

  return (
    <div className="container mx-auto p-6">
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
      <div
        ref={cvRef}
        className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto transition-all duration-500 ease-out transform hover:scale-105"
        style={{
          fontFamily: "Georgia, serif",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{formData?.name || "Name Not Provided"}</h1>
          <p className="text-xl italic text-gray-600">{formData?.jobTitle || "Job Title Not Provided"}</p>
          <div className="text-lg text-gray-700 mt-4">
            <p>{formData?.address || "Address Not Provided"}</p>
            <p>Tel: {formData?.phone || "Phone Not Provided"} | {formData?.email || "Email Not Provided"}</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
          <p className="text-lg text-gray-700">{formData?.aboutMe || "No description provided"}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experience</h2>
          {formData?.experiences?.map((exp, index) => (
            <div key={index} className="mb-6 hover:bg-gray-50 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
              <p className="text-xl font-semibold text-gray-800">{exp?.title || "Job Title"}</p>
              <p className="text-lg font-medium text-gray-600">{exp?.company || "Company"} | {exp?.location || "Location"} | {exp?.dateRange || "Date Range"}</p>
              <ul className="list-disc pl-6 text-gray-600">
                {exp?.responsibilities?.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
          {formData?.education?.map((edu, index) => (
            <div key={index} className="mb-4 hover:bg-gray-50 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
              <p className="text-lg font-semibold text-gray-800">{edu?.degree || "Degree"}</p>
              <p className="text-gray-600">{edu?.institution || "Institution"} | {edu?.dateRange || "Date Range"}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {formData?.skills4?.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Languages</h2>
          <ul className="list-disc pl-6 text-gray-600">
            {formData?.languages?.map((lang, index) => (
              <li key={index}>{lang.language} - {lang.proficiency}</li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            Download PDF
          </button>
          <button
            onClick={downloadDOCX}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            Download DOCX
          </button>
          <button
            onClick={editHandler}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            Edit CV
          </button>
          <button
            onClick={deleteHandler}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            Delete CV
          </button>
        </div>

        <div className="text-center mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Share your CV</h3>
          <div className="flex justify-center gap-6">
            <FacebookShareButton url={shareUrl} quote="Check out my CV!" className="transform hover:scale-110 transition duration-300 ease-in-out">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title="Check out my CV!" className="transform hover:scale-110 transition duration-300 ease-in-out">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} className="transform hover:scale-110 transition duration-300 ease-in-out">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl} title="Check out my CV!" className="transform hover:scale-110 transition duration-300 ease-in-out">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};



const sectionHeaderStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#000",
  borderBottom: "1px solid #000",
  paddingBottom: "5px",
  marginBottom: "15px",
};

const jobTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
};

const responsibilitiesListStyle = {
  paddingLeft: "20px",
  margin: "5px 0",
};

const skillTagStyle = {
  backgroundColor: "#f1f1f1",
  padding: "5px 10px",
  margin: "5px",
  borderRadius: "5px",
  fontSize: "14px",
  color: "#333",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Preview4;