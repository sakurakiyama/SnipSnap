import BackgroundSelector from './BackgroundSelector';
import LintThemes from './LintThemes';

interface SidebarProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
function Sidebar({ setTheme }: SidebarProps) {
  return (
    <div className='flex flex-col w-[30%] h-[80%] border rounded-md m-4 p-6'>
      <BackgroundSelector setTheme={setTheme} />
      <LintThemes />
    </div>
  );
}

export default Sidebar;
