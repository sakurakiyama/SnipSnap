import NavBar from '../components/NavBar';
import { render, RenderResult } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

let getByTestId: RenderResult['getByTestId'];

beforeEach(() => {
  ({ getByTestId } = render(<NavBar />));
});

describe('navigation bar', async () => {
  it('should render the navigation bar', () => {
    expect(getByTestId('appName')).toHaveTextContent('SnipSnap');
    expect(getByTestId('githubLink')).toHaveTextContent('Github');
    expect(getByTestId('portfolioLink')).toHaveTextContent('🌸');
  });

  it('should navigate to github', async () => {
    expect(getByTestId('githubLink')).toHaveAttribute(
      'href',
      'https://github.com/sakurakiyama/SnipSnap'
    );
  });

  it('should navigate to portfolio page', async () => {
    expect(getByTestId('portfolioLink')).toHaveAttribute(
      'href',
      'https://sakurakiyama.com/'
    );
  });

  it('should contain the logo', async () => {
    const logoElement = getByTestId('appLogo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', '/src/assets/Logo.png');
  });
});
