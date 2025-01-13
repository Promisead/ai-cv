import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState(null);
    const { resumeId } = useParams();
  
    useEffect(() => {
      console.log("Resume ID:", resumeId);
      GetResumeInfo();
    }, [resumeId]);
  
    const GetResumeInfo = () => {
      GlobalApi.GetResumeById(resumeId)
        .then(resp => {
          console.log("Fetched resume data:", resp.data.data);
          setResumeInfo(resp.data.data || {});
        })
        .catch(error => {
          console.error("Error fetching resume:", error);
          setResumeInfo({}); // Provide a fallback
        });
    };
  
    const HandleDownload = () => {
      window.print();
    };
  
    if (!resumeInfo) {
      return <div>Loading resume...</div>; // Show a loading state while fetching
    }
  
    return (
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="no-print">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI-generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and share your unique URL with friends and family.
            </p>
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:px-44 my-10">
              <Button
                className="flex gap-2 bg-[#2563EB] text-white hover:bg-blue-700"
                onClick={HandleDownload}
              >
                Download
              </Button>
              <RWebShare
                data={{
                  text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                  url: `${import.meta.env.VITE_BASE_URL || 'http://localhost:5173'}/my-resume/${resumeId}/view`,
                  title: `${resumeInfo.firstName} ${resumeInfo.lastName} Resume`,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button className="flex gap-2 bg-[#2563EB] text-white hover:bg-blue-700">
                  Share
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>
      </ResumeInfoContext.Provider>
    );
  }
  
  export default ViewResume;
  