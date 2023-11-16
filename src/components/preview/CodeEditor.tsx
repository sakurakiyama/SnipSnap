import hljs from 'highlight.js/lib/common';
import { useRef, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import '../../stylesheets/Themes.scss';

interface CodeEditorProps {
  theme: string;
}

function CodeEditor({ theme }: CodeEditorProps): JSX.Element {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>('javascript');

  const handleCodeChange = () => {
    const inputValue = inputRef.current!.innerText;
    const highlightedCode = hljs.highlightAuto(inputValue);
    setLanguage(highlightedCode.language!);
    codeBlockRef.current!.innerHTML = highlightedCode.value;
  };
  console.log(language);
  return (
    // Background color
    <div className='relative block rounded-md w-[680px] p-4'>
      <pre className={`flex flex-col w-[600px] p-4 rounded-md m-auto ${theme}`}>
        {/* Display Code */}
        <code
          className={`${`language-${language}`} hljs rounded-lg w-[500px] min-h-[300px] !break-words  left-0 right-0 ml-auto mr-auto`}
          ref={codeBlockRef}
        ></code>
        {/* Handle Input */}
        <code
          className='hljs !caret-gray-500 w-[500px] !outline-none !bg-transparent min-h-[300px] !text-transparent rounded-lg absolute !break-words left-0 right-0 ml-auto mr-auto '
          contentEditable={true}
          onInput={handleCodeChange}
          ref={inputRef}
        ></code>
      </pre>
    </div>
  );
}

export default CodeEditor;
