import hljs from 'highlight.js/lib/common';
import { useRef, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';

function CodeEditor(): JSX.Element {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>('javascript');

  const handleCodeChange = () => {
    const inputValue = inputRef.current!.innerText;
    const highlightedCode = hljs.highlightAuto(inputValue);
    setLanguage(highlightedCode.language!);
    codeBlockRef.current!.innerHTML = highlightedCode.value;
  };

  return (
    <pre className='flex rounded-md m-auto max-w-[60vw] max-h-[50vh] hljs atom-one-dark'>
      {/* Display Code */}
      <code
        className={`${`language-${language}`}  max-w-[60vw] max-h-[50vh] hljs rounded-lg`}
        ref={codeBlockRef}
      ></code>
      {/* Handle Input */}
      <code
        className='max-w-[60vw] max-h-[50vh] hljs !caret-black !bg-transparent !text-transparent rounded-lg absolute '
        contentEditable={true}
        onInput={handleCodeChange}
        ref={inputRef}
      ></code>
    </pre>
  );
}

export default CodeEditor;
