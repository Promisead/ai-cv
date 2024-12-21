import React, { useState, useEffect, useRef } from "react";
import './preview2.css';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun, Header, Footer, PageBreak } from "docx"; // Import necessary classes from docx
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv } from "../store/action/userAppStorage";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

const Preview2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cv: formData, isCvAvailable } = useSelector(state => state.userAuth);
  const navigate = useNavigate();
  const pdfRef = useRef();
  const { user } = useSelector(state => state.userAuth);
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const dispatch = useDispatch();
  let location = useLocation()
  const shareUrl = window.location.origin + location.pathname;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!isCvAvailable) {
      navigate('/template');
    }
  }, [isCvAvailable, navigate]);

  if (!isCvAvailable) {
    return null;
  }

  const downloadPDF = () => {
    if (!pdfRef.current) return;
    const element = pdfRef.current;
    const options = {
      margin: 1,
      filename: `${formData?.name || 'CV'}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          headers: {
            default: new Header({
              children: [new Paragraph("Header Text")],
            }),
          },
          footers: {
            default: new Footer({
              children: [new Paragraph("Footer Text")],
            }),
          },
          children: [
            new Paragraph({
              text: `${formData?.name || 'Your Name'}'s CV`,
              heading: "TITLE",
            }),
            new Paragraph({
              text: `Phone: ${formData?.phone || 'N/A'}`,
            }),
            new Paragraph({
              text: `Location: ${formData?.location || 'N/A'}`,
            }),
            new Paragraph({
              text: `Email: ${formData?.email || 'N/A'}`,
            }),
            new Paragraph({
              text: "Education",
              heading: "HEADING_1",
            }),
            ...formData.education.map(edu =>
              new Paragraph({
                children: [
                  new TextRun(edu?.year || ''),
                  new TextRun({
                    text: ` ${edu?.degree || 'Degree'}, ${edu?.institution || 'Institution'}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: ` - ${edu?.details || 'Details'}`,
                  }),
                ],
              })
            ),
            new PageBreak(),
            new Paragraph({
              text: "Additional Skills",
              heading: "HEADING_1",
            }),
            new Paragraph(`R: ${formData?.skills?.R || 'N/A'}`),
            new Paragraph(`Spanish: ${formData?.skills?.Spanish || 'N/A'}`),
            new Paragraph(`Mandarin: ${formData?.skills?.Mandarin || 'N/A'}`),
            new PageBreak(),
            new Paragraph({
              text: "Publications",
              heading: "HEADING_1",
            }),
            ...formData.publications.map(pub =>
              new Paragraph({
                text: `${pub?.title || 'Title'}. ${pub?.journal || 'Journal'} (${pub?.year || 'Year'}): ${pub?.pages || 'Pages'}.`,
              })
            ),
            new PageBreak(),
            new Paragraph({
              text: "Research Experience",
              heading: "HEADING_1",
            }),
            ...formData.researchExperience.map(exp =>
              new Paragraph({
                children: [
                  new TextRun(exp?.duration || ''),
                  new TextRun({
                    text: ` ${exp?.role || 'Role'}, ${exp?.institution || 'Institution'}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: ` - ${exp?.description || 'Description'}`,
                  }),
                ],
              })
            ),
            new PageBreak(),
            new Paragraph({
              text: "Awards & Honors",
              heading: "HEADING_1",
            }),
            ...formData.awards.map(award =>
              new Paragraph({
                text: `${award?.year || ''} - ${award?.title || 'Title'}, ${award?.institution || 'Institution'}`,
              })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData?.name || 'CV'}.docx`;
      link.click();
      URL.revokeObjectURL(url);
    }).catch(error => {
      console.error("Error creating DOCX file:", error);
    });
  };

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
      setIsLoading(false);
      navigate(`/cvs`);
    }
  };

  const closeModal = () => {
    setIsError(false);
  };

  return (
    <div style={{ width: '100vw' }}>
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

      <div className="cv-container shadow-lg p-4" ref={pdfRef} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div className="cv-header">
          <h1 className="cv-title">{formData?.name || 'Your Name'}</h1>
          <div className="contact-info">
            <p><i className="fas fa-phone"></i> {formData?.phone || 'N/A'}</p>
            <p><i className="fas fa-map-marker-alt"></i> {formData?.location || 'N/A'}</p>
            <p><i className="fas fa-envelope"></i> {formData?.email || 'N/A'}</p>
          </div>
        </div>
        <div className="cv-main">
          <div className="cv-left">
            <section className="section education">
              <h3>Education</h3>
              {formData?.education?.map((edu, index) => (
                <div className="education-item" key={index}>
                  <p>{edu?.year || ''}</p>
                  <div>
                    <h4>{edu?.degree || 'Degree'}</h4>
                    <p>{edu?.institution || 'Institution'}</p>
                    <p>{edu?.details || 'Details'}</p>
                  </div>
                </div>
              ))}
            </section>
            <section className="section skills">
              <h3>Additional Skills</h3>
              <ul>
                <li>R: {formData?.skills?.R || 'N/A'}</li>
                <li>Spanish: {formData?.skills?.Spanish || 'N/A'}</li>
                <li>Mandarin: {formData?.skills?.Mandarin || 'N/A'}</li>
              </ul>
            </section>
          </div>
          <div className="cv-right">
            <section className="section publications">
              <h3>Publications</h3>
              {formData?.publications?.map((pub, index) => (
                <p key={index}>
                  {pub?.title || 'Title'}. <i>{pub?.journal || 'Journal'}</i> ({pub?.year || 'Year'}): {pub?.pages || 'Pages'}.
                </p>
              ))}
            </section>
            <section className="section research-experience">
              <h3>Research Experience</h3>
              {formData?.researchExperience?.map((exp, index) => (
                <div key={index}>
                  <p>{exp?.duration || ''}</p>
                  <div>
                    <h4>{exp?.role || 'Role'}</h4>
                    <p>{exp?.institution || 'Institution'}</p>
                    <p>{exp?.description || 'Description'}</p>
                  </div>
                </div>
              ))}
            </section>
            <section className="section awards">
              <h3>Awards & Honors</h3>
              {formData?.awards?.map((award, index) => (
                <p key={index}>{award?.year || ''} - {award?.title || 'Title'}, {award?.institution || 'Institution'}</p>
              ))}
            </section>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
        <button className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button>
        <button className="btn btn-primary" onClick={downloadDOCX}>Download as DOCX</button>
        <button className="btn btn-primary" onClick={editHandler}>Edit CV</button>
        <button className="btn btn-primary" onClick={deleteHandler}>Delete CV</button>
      </div>



      <div className="social-share-buttons text-center mt-3">
        <h3>Share your CV</h3>
        <div className="share-buttons-container">
          <FacebookShareButton url={shareUrl} quote="Check out my CV!" className="share-button">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title="Check out my CV!" className="share-button">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} className="share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} title="Check out my CV!" className="share-button">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default Preview2;










