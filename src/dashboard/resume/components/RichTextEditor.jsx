import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

// Prompt to get experience points
const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }

    setLoading(true);

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      // Remove unwanted characters including { }, ", [ ], etc.
      const cleanedResponse = responseText
        .replace(/[\{\}\"\[\]]/g, '') // Remove {, }, ", [, ]
        .split('\n') // Split by new lines only
        .map((item) => item.trim()) // Trim spaces around each line
        .filter((item) => item); // Remove empty lines

      // Format as an HTML unordered list
      const formattedList = `<ul>${cleanedResponse.map((item) => `<li>${item}</li>`).join('')}</ul>`;

      setValue(formattedList);
    } catch (error) {
      toast('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Experience</label>
        <Button variant="outline" size="sm" 
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-[#2563EB] text-[#2563EB]"
        >
          {loading ? 
            <LoaderCircle className='animate-spin'/> :  
            <>
              <Brain className='h-4 w-4'/> Generate from AI 
            </>
          }
        </Button>
      </div>

      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
