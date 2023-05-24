

import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../../hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const initialValue = 'initial';
    const delay = 500;

    const { result } = renderHook(() => useDebounce(initialValue, delay));

    expect(result.current).toBe(initialValue);
  });

  it('should debounce the value change', () => {
    const initialValue = 'initial';
    const updatedValue = 'updated';
    const delay = 500;

    const { result, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
      initialProps: { value: initialValue, delay },
    });

    act(() => {
      rerender({ value: updatedValue, delay });
    });

    expect(result.current).toBe(initialValue);

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(result.current).toBe(updatedValue);
  });
});