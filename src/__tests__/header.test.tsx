import Header from '../components/preview/Header';
import {
  render,
  RenderResult,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

let getByTestId: RenderResult['getByTestId'];
let getByPlaceholderText: RenderResult['getByPlaceholderText'];

const setFileNameMock = vi.fn();

function renderHeader(lintTheme: string, fileName: undefined | string) {
  ({ getByTestId, getByPlaceholderText } = render(
    <Header
      lintTheme={lintTheme}
      setFileName={setFileNameMock}
      fileName={fileName}
    />
  ));
}

describe('header', async () => {
  it('should render with the default lint themes background color', async () => {
    renderHeader('atelier-lakeside', '');
    await waitFor(() => {
      const headerContainer = getByTestId('headerWrapper');
      expect(headerContainer).toBeInTheDocument();

      const codeEditor = document.querySelector('.hljs');
      if (codeEditor) {
        const computedStyle = window.getComputedStyle(codeEditor);
        const backgroundColor = computedStyle.backgroundColor;
        expect(headerContainer).toHaveStyle(
          `background-color: ${backgroundColor}`
        );
      }
    });
  });

  it('sets placeholder correctly when fileName is undefined', () => {
    renderHeader('atelier-lakeside', undefined);
    const inputField = getByPlaceholderText('Untitled');
    expect(inputField).toBeInTheDocument();
  });

  it('clears placeholder on input field focus', () => {
    renderHeader('atelier-lakeside', undefined);
    const inputField = getByPlaceholderText('Untitled') as HTMLInputElement;
    fireEvent.focus(inputField);
    expect(inputField.placeholder).toBe('');
  });

  it('resets placeholder on input field blur if user has not entered a filename', () => {
    renderHeader('atelier-lakeside', undefined);
    const inputField = getByPlaceholderText('Untitled') as HTMLInputElement;

    fireEvent.focus(inputField);
    fireEvent.blur(inputField);

    expect(inputField.placeholder).toBe('Untitled');
  });

  it('calls setFileName when input field value changes', () => {
    renderHeader('atelier-lakeside', undefined);
    const inputField = getByPlaceholderText('Untitled') as HTMLInputElement;

    fireEvent.change(inputField, { target: { value: 'Test File Name' } });

    expect(setFileNameMock).toHaveBeenCalledWith('Test File Name');
  });

  it('renders buttons with correct background colors', () => {
    renderHeader('atelier-lakeside', undefined);

    const redButton = getByTestId('redButton');
    const yellowButton = getByTestId('yellowButton');
    const greenButton = getByTestId('greenButton');

    expect(redButton.className).toContain('#fb5d55');
    expect(yellowButton.className).toContain('#fab930');
    expect(greenButton.className).toContain('#28c63e');
  });
});
