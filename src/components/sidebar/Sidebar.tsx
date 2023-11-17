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
    <div className="flex flex-col w-[30%] h-[80%] border rounded-md m-4 p-6">
      <BackgroundSelector setBackground={setBackground} />
      <LintThemes setLintTheme={setLintTheme} />
      <Format setShouldFormat={setShouldFormat} />
    </div>
  );
}

export default Sidebar;
