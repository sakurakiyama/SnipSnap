import hljs from 'highlight.js/lib/common';
import '../../stylesheets/LintThemes.scss';
import '../../stylesheets/Background.scss';
import Header from './Header';
import { useRef, useState, useEffect } from 'react';
import { formatCode } from '../../utils/formatting';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CodeEditorProps {
  background: string;
  lintTheme: string;
  shouldFormat: boolean;
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
}

function CodeEditor({
  background,
  lintTheme,
  shouldFormat,
  setShouldFormat,
}: CodeEditorProps): JSX.Element {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const inputBlockRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>('javascript');

  useEffect(() => {
    const invokeFormat = async () => {
      try {
        const code = codeBlockRef.current!.innerText;
        const formattedCode = await formatCode(code, language);
        if (formattedCode) {
          const highlightedCode = hljs.highlightAuto(formattedCode);
          codeBlockRef.current!.innerHTML = highlightedCode.value;
          inputBlockRef.current!.innerText = formattedCode;
          if (shouldFormat === true) toast('✅ Formatted successfully.');
        }
      } catch (error) {
        console.log(error);
        toast.error(
          'Formatting: Unable to format code. Check the console logs for details.'
        );
      }
      setShouldFormat(false);
    };
    if (shouldFormat === true) invokeFormat();
  }, [shouldFormat]);

  const handleCodeChange = async (event: React.SyntheticEvent<HTMLElement>) => {
    const inputValue = event.currentTarget.innerText;
    const highlightedCode = hljs.highlightAuto(inputValue);
    setLanguage(highlightedCode.language!);
    codeBlockRef.current!.innerHTML = highlightedCode.value;
  };

  return (
    // Background color
    <div className='relative block rounded-md w-[680px] p-4'>
      <div
        className={`flex flex-col w-[600px] p-4 rounded-md m-auto ${background}`}
      >
        <pre className=' ml-auto mr-auto'>
          <Header lintTheme={lintTheme} />
          {/* Display Code */}
          <code
            className={`${`language-${language}`} hljs rounded-br-lg rounded-bl-lg w-[500px] min-h-[300px] !break-words left-0 right-0 ml-auto mr-auto`}
            ref={codeBlockRef}
          ></code>
        </pre>
        <pre className=' min-h-[300px] w-[500px] left-0 right-0 ml-auto mr-auto absolute'>
          {/* Invisible Spacer */}
          <div className='rounded-tr-lg rounded-tl-lg h-8 p-2'></div>
          {/* Handle Input */}
          <code
            ref={inputBlockRef}
            className={`${`language-${language}`} hljs !caret-gray-500 min-h-[300px] !outline-none !bg-transparent !text-transparent rounded-br-lg rounded-bl-lg !break-words `}
            contentEditable={true}
            onInput={handleCodeChange}
          ></code>
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
