import BackgroundSelector from './BackgroundSelector';
import LintThemes from './LintThemes';

interface SidebarProps {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setLintTheme: React.Dispatch<React.SetStateAction<string>>;
}
function Sidebar({ setBackground, setLintTheme }: SidebarProps) {
  return (
    <div className='flex flex-col w-[30%] h-[80%] border rounded-md m-4 p-6'>
      <BackgroundSelector setBackground={setBackground} />
      <LintThemes setLintTheme={setLintTheme} />
    </div>
  );
}

export default Sidebar;
