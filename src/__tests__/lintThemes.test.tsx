import LintThemes from '../components/sidebar/LintThemes';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { highlightStyles } from '../constants';

let getByTestId: RenderResult['getByTestId'];
const setLintTheme = vi.fn();

beforeEach(() => {
  ({ getByTestId } = render(<LintThemes setLintTheme={setLintTheme} />));
});

describe('lint theme', async () => {
  it('should show and hide the list of lint themes when dropdown is clicked', async () => {
    const rightIcon = getByTestId('lintThemeRightIcon');
    const content = getByTestId('lintThemeContent');

    expect(content).toHaveTextContent('');

    fireEvent.click(rightIcon);

    await waitFor(() => {
      highlightStyles.forEach((lintTheme) => {
        expect(content).toHaveTextContent(lintTheme);
      });
    });

    const downIcon = getByTestId('lintThemeDownIcon');
    fireEvent.click(downIcon);

    await waitFor(() => {
      expect(content).toHaveTextContent('');
    });
  });

  it('should update the lint theme when clicked', async () => {
    const rightIcon = getByTestId('lintThemeRightIcon');
    fireEvent.click(rightIcon);
    const index = Math.floor(Math.random() * highlightStyles.length);
    const selectedTheme = highlightStyles[index];
    const selectedThemeButton = getByTestId(selectedTheme);
    fireEvent.click(selectedThemeButton);
    expect(setLintTheme).toHaveBeenCalledWith(selectedTheme);
    const currentTheme = document.documentElement.getAttribute('data-theme');
    expect(currentTheme).toBe(selectedTheme);
  });
});
