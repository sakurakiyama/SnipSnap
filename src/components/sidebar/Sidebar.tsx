import ThemeSelector from './ThemeSelector';

interface SidebarProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
function Sidebar({ setTheme }: SidebarProps) {
  return (
    <div className='flex w-[30%] h-[80%] border rounded-md m-4 p-6'>
      <ThemeSelector setTheme={setTheme} />
    </div>
  );
}

export default Sidebar;
