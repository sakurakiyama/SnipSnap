import SaveSnippet from '../components/sidebar/SaveSnippet';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

let getByTestId: RenderResult['getByTestId'];
let snippetRef;
const useRefStub = () => ({ current: null });

beforeEach(() => {
  vi.spyOn(document.body, 'appendChild');
  vi.spyOn(document.body, 'removeChild');
  snippetRef = useRefStub();

  ({ getByTestId } = render(
    <SaveSnippet snippetRef={snippetRef} fileName='' />
  ));
});

describe('save snippet', async () => {
  it('should download a jpg if jpg is selected', async () => {
    const rightButton = getByTestId('rightIcon');
    fireEvent.click(rightButton);
    const jpgButton = getByTestId('jpg');
    fireEvent.click(jpgButton);

    await waitFor(() => {
      expect(document.body.appendChild).toHaveBeenCalled();
      waitFor(() => {
        expect(document.body.removeChild).toHaveBeenCalled();
      });
    });
  });

  it('should download a png if png is selected', async () => {
    const rightButton = getByTestId('rightIcon');
    fireEvent.click(rightButton);
    const pngButton = getByTestId('png');
    fireEvent.click(pngButton);

    await waitFor(() => {
      expect(document.body.appendChild).toHaveBeenCalled();
      waitFor(() => {
        expect(document.body.removeChild).toHaveBeenCalled();
      });
    });
  });

  it('should error on download if the snippet is not defined', async () => {
    snippetRef = null;
    const rightButton = getByTestId('rightIcon');
    fireEvent.click(rightButton);
    const jpgButton = getByTestId('jpg');

    let errorCaught = false;

    await act(async () => {
      try {
        fireEvent.click(jpgButton);
        await waitFor(() => {
          expect(document.body.appendChild).toHaveBeenCalled();
          expect(document.body.removeChild).toHaveBeenCalled();
        });
      } catch (error) {
        errorCaught = true;
      }
    });
    expect(errorCaught).toBe(true);
  });
});
