import BackgroundSelector from './BackgroundSelector';
import LintThemes from './LintThemes';
import Format from './Format';
import SaveSnippet from './SaveSnippet';

interface SidebarProps {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setLintTheme: React.Dispatch<React.SetStateAction<string>>;
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
  detectedLanguage: string;
  userSelected: undefined | string[];
  setUserSelected: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  snippetRef: React.MutableRefObject<null>;
  fileName: string | undefined;
}
function Sidebar({
  setBackground,
  setLintTheme,
  setShouldFormat,
  detectedLanguage,
  userSelected,
  setUserSelected,
  snippetRef,
  fileName,
}: SidebarProps) {
  return (
    <div className='flex flex-col w-[30%] h-full max-h-[700px] min-w-[350px] border border-[var(--border-color)] rounded-md m-4 p-6 overflow-scroll bg-[#171616] shadow-lg'>
      <BackgroundSelector setBackground={setBackground} />
      <LintThemes setLintTheme={setLintTheme} />
      <Format
        userSelected={userSelected}
        setUserSelected={setUserSelected}
        setShouldFormat={setShouldFormat}
        detectedLanguage={detectedLanguage}
      />
      <SaveSnippet snippetRef={snippetRef} fileName={fileName} />
    </div>
  );
}

export default Sidebar;
