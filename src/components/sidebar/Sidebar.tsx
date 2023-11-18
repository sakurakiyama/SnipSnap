import BackgroundSelector from './BackgroundSelector';
import LintThemes from './LintThemes';
import Format from './Format';

interface SidebarProps {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setLintTheme: React.Dispatch<React.SetStateAction<string>>;
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
}
function Sidebar({
  setBackground,
  setLintTheme,
  setShouldFormat,
}: SidebarProps) {
  return (
    <div className='flex flex-col w-[30%] h-full max-h-[700px] border border-[var(--border-color)] rounded-md m-4 p-6 overflow-scroll bg-[#171616] shadow-lg'>
      <BackgroundSelector setBackground={setBackground} />
      <LintThemes setLintTheme={setLintTheme} />
      <Format setShouldFormat={setShouldFormat} />
    </div>
  );
}

export default Sidebar;
