import Logo from '../assets/Logo.png';

function NavBar(): JSX.Element {
  return (
    <div className='p-4 flex w-full justify-between items-center text-[var(--text-color)] mt-2'>
      <div className='flex flex-row items-center pl-4'>
        <img
          data-testid='appLogo'
          className='h-[60px] w-auto pr-4'
          src={Logo}
        ></img>
        <div data-testid='appName' className='pr-1 text-xl'>
          SnipSnap
        </div>
      </div>
      <div className=' flex flex-row items-center pr-4'>
        <div className='cursor-pointer pr-4'>
          <a
            data-testid='githubLink'
            href='https://github.com/sakurakiyama/SnipSnap'
          >
            Github
          </a>
        </div>
        |
        <div className='pl-4'>
          <a data-testid='portfolioLink' href='https://sakurakiyama.com/'>
            🌸
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
