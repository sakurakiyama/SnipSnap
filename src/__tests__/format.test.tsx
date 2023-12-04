import Format from '../components/sidebar/Format';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { programmingLanguages } from '../constants';

let getByTestId: RenderResult['getByTestId'];

const setShouldFormatMock = vi.fn();
const setUserSelected = vi.fn();

function renderFormatComponent(
  detectedLanguage: string,
  userSelected: undefined | string[]
) {
  ({ getByTestId } = render(
    <Format
      setShouldFormat={setShouldFormatMock}
      detectedLanguage={detectedLanguage}
      userSelected={userSelected}
      setUserSelected={setUserSelected}
    />
  ));
}

describe('format', async () => {
  it('allow user to format code if the user selected language is not disabled', async () => {
    renderFormatComponent('', undefined);
    const rightIcon = getByTestId('formatRightIcon');
    fireEvent.click(rightIcon);
    const formatButton = getByTestId('javascript');
    expect(formatButton).not.toHaveClass('opacity-50 pointer-events-none');
    fireEvent.click(formatButton);
    expect(setShouldFormatMock).toHaveBeenCalledWith(true);
    expect(setUserSelected).toHaveBeenCalledWith(['javascript', 'JavaScript']);
  });

  it('does not allow user to format code if the user selected language is disabled', async () => {
    renderFormatComponent('', undefined);
    const rightIcon = getByTestId('formatRightIcon');
    fireEvent.click(rightIcon);
    const formatButton = getByTestId('csharp');
    expect(formatButton).toHaveClass('opacity-50 pointer-events-none');
  });

  it('renders with the default language', async () => {
    renderFormatComponent('', undefined);
    const defaultFormatButton = getByTestId('formatMainButton');
    expect(defaultFormatButton).toHaveTextContent('JavaScript (Default)');
  });

  it('displays title of autodetected language correctly', async () => {
    renderFormatComponent('bash', undefined);
    const autodetectedFormatButton = getByTestId('formatMainButton');
    expect(autodetectedFormatButton).toHaveTextContent('Bash (Autodetected)');
  });

  it('displays title of autodetected language correctly when user selects it', async () => {
    renderFormatComponent('bash', ['bash', 'Bash']);
    const autodetectedFormatButton = getByTestId('formatMainButton');
    expect(autodetectedFormatButton).toHaveTextContent('Bash (Autodetected)');
  });

  it('displays title of user selected language when not autodetected', async () => {
    renderFormatComponent('', ['bash', 'Bash']);
    const autodetectedFormatButton = getByTestId('formatMainButton');
    expect(autodetectedFormatButton).toHaveTextContent('Bash');
  });

  it('should show and hide the list of lint themes when dropdown is clicked', async () => {
    renderFormatComponent('', undefined);

    const rightIcon = getByTestId('formatRightIcon');
    const content = getByTestId('formatContent');

    expect(content).toHaveTextContent('');

    fireEvent.click(rightIcon);

    await waitFor(() => {
      programmingLanguages.forEach((language) => {
        expect(content).toHaveTextContent(language.readableLanguage);
      });
    });

    const downIcon = getByTestId('formatDownIcon');
    fireEvent.click(downIcon);

    await waitFor(() => {
      expect(content).toHaveTextContent('');
    });
  });
});
