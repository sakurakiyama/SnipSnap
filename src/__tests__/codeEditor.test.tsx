import CodeEditor from '../components/preview/CodeEditor';
import {
  render,
  RenderResult,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as formattingUtils from '../utils/formatting';

let getByTestId: RenderResult['getByTestId'];

const setShouldFormatMock = vi.fn();
const setDetectedLanguage = vi.fn();
const setFileName = vi.fn();
const formatCodeMock = vi.fn().mockRejectedValue(new Error('Format error'));
vi.spyOn(formattingUtils, 'formatCode').mockImplementation(formatCodeMock);

const testCodeBlock = `
  function helloWorld() {
    console.log('hello world');
  }
`;

afterEach(() => {
  vi.clearAllMocks();
});

function renderCodeEditor(
  background: string,
  lintTheme: string,
  shouldFormat: boolean,
  detectedLanguage: string,
  userSelected: undefined | string[],
  fileName: undefined | string
) {
  ({ getByTestId } = render(
    <CodeEditor
      snippetRef={{ current: null }}
      background={background}
      lintTheme={lintTheme}
      setShouldFormat={setShouldFormatMock}
      shouldFormat={shouldFormat}
      setDetectedLanguage={setDetectedLanguage}
      detectedLanguage={detectedLanguage}
      userSelected={userSelected}
      setFileName={setFileName}
      fileName={fileName}
    />
  ));
}

describe('code editor', async () => {
  it('should render the default background theme', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      false,
      '',
      undefined,
      undefined
    );
    const backgroundWrapper = getByTestId('backgroundWrapper');
    expect(backgroundWrapper).toHaveClass('blush');
  });

  it('formats code when shouldFormat is true and language is detected', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      true,
      'javascript',
      undefined,
      undefined
    );

    await waitFor(() => {
      expect(formatCodeMock).toHaveBeenCalledWith(undefined, 'javascript');
      expect(setShouldFormatMock).toHaveBeenCalledWith(false);
    });
  });

  it('throws an errow when attempting to format but detected language is not formattable', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      true,
      'csharp',
      undefined,
      undefined
    );

    await waitFor(async () => {
      expect(formatCodeMock).toHaveBeenCalledWith(undefined, 'csharp');
      expect(setShouldFormatMock).toHaveBeenCalledWith(false);
      await expect(formatCodeMock).rejects.toThrowError('Format error');
    });
  });

  it('throws an errow when attempting to format but user selected language is not formattable', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      true,
      '',
      ['csharp', 'C#'],
      undefined
    );

    await waitFor(async () => {
      expect(formatCodeMock).toHaveBeenCalledWith(undefined, 'csharp');
      expect(setShouldFormatMock).toHaveBeenCalledWith(false);
      await expect(formatCodeMock).rejects.toThrowError('Format error');
    });
  });

  it('formats code with the user selected language even if language is detected', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      true,
      'javascript',
      ['graphql', 'GraphQL'],
      undefined
    );

    await waitFor(() => {
      expect(formatCodeMock).toHaveBeenCalledWith(undefined, 'graphql');
      expect(setShouldFormatMock).toHaveBeenCalledWith(false);
    });
  });

  it('updates code block when typing in content-editable', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      false,
      '',
      undefined,
      undefined
    );

    const inputBlock = getByTestId('inputBlock');

    await userEvent.type(inputBlock, 'a');
    expect(inputBlock.innerHTML).toBe('a');
    await userEvent.type(inputBlock, 'b');
    expect(inputBlock.innerHTML).toBe('ab');
  });

  it('should detect languages correctly', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      false,
      '',
      undefined,
      undefined
    );

    const inputBlock = getByTestId('inputBlock');
    fireEvent.input(inputBlock, { target: { innerText: testCodeBlock } });

    await waitFor(() => {
      expect(setDetectedLanguage).toHaveBeenCalledWith('javascript');
    });
  });

  it('inserts two spaces when "Tab" key is pressed', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      false,
      '',
      undefined,
      undefined
    );

    const inputBlock = getByTestId('inputBlock');
    await userEvent.type(inputBlock, '{tab}');
    expect(inputBlock.innerHTML).toBe('  ');
  });

  it('should not format when setFormat is set to false', async () => {
    renderCodeEditor(
      'blush',
      'atelier-lakeside',
      false,
      '',
      undefined,
      undefined
    );

    expect(formatCodeMock).not.toHaveBeenCalled();
  });
});
