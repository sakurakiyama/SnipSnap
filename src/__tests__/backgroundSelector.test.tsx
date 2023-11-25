import BackgroundSelector from '../components/sidebar/BackgroundSelector';
import CodeEditor from '../components/preview/CodeEditor';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { backgrounds } from '../constants';

let getByTestId: RenderResult['getByTestId'];
const setBackgroundMock = vi.fn();

beforeEach(() => {
  ({ getByTestId } = render(
    <BackgroundSelector setBackground={setBackgroundMock} />
  ));
});

describe('background selector', async () => {
  it('should show and hide the list of backgrounds when dropdown is clicked', async () => {
    const rightIcon = getByTestId('rightIcon');
    const content = getByTestId('content');

    expect(content).toHaveTextContent('');

    fireEvent.click(rightIcon);

    await waitFor(() => {
      backgrounds.forEach((background) => {
        expect(content).toHaveTextContent(background);
      });
    });

    const downIcon = getByTestId('downIcon');
    fireEvent.click(downIcon);

    await waitFor(() => {
      expect(content).toHaveTextContent('');
    });
  });

  it('should select a background theme and change the background', async () => {
    fireEvent.click(getByTestId('rightIcon'));
    const index = Math.floor(Math.random() * backgrounds.length);
    const backgroundTheme = backgrounds[index].toLowerCase();
    fireEvent.click(getByTestId(backgroundTheme));
    expect(setBackgroundMock).toHaveBeenCalledWith(backgroundTheme);

    const codeEditor = render(
      <CodeEditor
        snippetRef={{ current: null }}
        background={backgroundTheme}
        lintTheme={''}
        setShouldFormat={vi.fn()}
        shouldFormat={false}
        setDetectedLanguage={vi.fn()}
        detectedLanguage={''}
        userSelected={undefined}
        setFileName={vi.fn()}
        fileName={undefined}
      />
    );

    const backgroundWrapper = codeEditor.getByTestId('backgroundWrapper');
    expect(backgroundWrapper.className).toContain(backgroundTheme);
  });
});
