import hljs from 'highlight.js/lib/common';
import '../../stylesheets/LintThemes.scss';
import '../../stylesheets/Background.scss';
import Header from './Header';
import { useRef, useEffect } from 'react';
import { formatCode } from '../../utils/formatting';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CodeEditorProps {
  background: string;
  lintTheme: string;
  shouldFormat: boolean;
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
  setDetectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  detectedLanguage: string;
  userSelected: undefined | string[];
  snippetRef: React.MutableRefObject<null>;
  setFileName: React.Dispatch<React.SetStateAction<string | undefined>>;
  fileName: string | undefined;
}

function CodeEditor({
  background,
  lintTheme,
  shouldFormat,
  setShouldFormat,
  setDetectedLanguage,
  detectedLanguage,
  userSelected,
  snippetRef,
  setFileName,
  fileName,
}: CodeEditorProps): JSX.Element {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const inputBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const invokeFormat = async () => {
      try {
        const formatLang = userSelected ? userSelected[0] : detectedLanguage;
        const code = codeBlockRef.current!.innerText;
        const formattedCode = await formatCode(code, formatLang);
        if (formattedCode) {
          const highlightedCode = hljs.highlightAuto(formattedCode);
          codeBlockRef.current!.innerHTML = highlightedCode.value;
          inputBlockRef.current!.innerText = formattedCode;
          if (shouldFormat === true) toast('✅ Formatted successfully.');
        }
      } catch (error) {
        console.log(error);
        toast.error(
          'Unable to format code. Check the console logs for details.'
        );
      }
      setShouldFormat(false);
    };
    if (shouldFormat === true) invokeFormat();
  }, [shouldFormat]);

  const handleCodeChange = async (event: React.SyntheticEvent<HTMLElement>) => {
    const inputValue = event.currentTarget.innerText;
    const highlightedCode = hljs.highlightAuto(inputValue);
    setDetectedLanguage(highlightedCode.language!);
    codeBlockRef.current!.innerHTML = highlightedCode.value;
  };

  return (
    // Background color
    <div ref={snippetRef} className='relative block rounded-md w-[680px] p-4'>
      <div
        data-testid='backgroundWrapper'
        className={`flex flex-col w-[600px] p-10 rounded-md m-auto ${background}`}
      >
        <pre className=' ml-auto mr-auto'>
          <Header
            lintTheme={lintTheme}
            setFileName={setFileName}
            fileName={fileName}
          />
          {/* Display Code */}
          <code
            className={`${`language-${detectedLanguage}`} hljs rounded-br-lg rounded-bl-lg w-[500px] min-h-[300px] !break-words left-0 right-0 ml-auto mr-auto shadow-lg`}
            ref={codeBlockRef}
          ></code>
        </pre>
        <pre className=' min-h-[300px] w-[500px] left-0 right-0 ml-auto mr-auto absolute'>
          {/* Invisible Spacer */}
          <div className='rounded-tr-lg rounded-tl-lg h-8 p-2'></div>
          {/* Handle Input */}
          <code
            ref={inputBlockRef}
            className={`${`language-${detectedLanguage}`} hljs !caret-gray-500 min-h-[300px] !outline-none !bg-transparent !text-transparent rounded-br-lg rounded-bl-lg shadow-lg !break-words `}
            contentEditable={true}
            onInput={handleCodeChange}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                event.preventDefault();
                const inputElement = inputBlockRef.current!;
                const selection = window.getSelection();
                const range = selection?.getRangeAt(0);

                if (range) {
                  const tabNode = document.createTextNode('  ');
                  range.deleteContents();
                  range.insertNode(tabNode);
                  range.setStartAfter(tabNode);
                  range.collapse(true);

                  selection?.removeAllRanges();
                  selection?.addRange(range);

                  inputElement.dispatchEvent(
                    new Event('input', { bubbles: true })
                  );
                }
              }
            }}
          ></code>
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
