import React from 'react'
import {render, fireEvent} from '@testing-library/react-native';
import AppButton from './AppButton';

describe('AppButton', () => {
  it('should render with correct btn text', () => {
    const mockFn = jest.Fn;
    const {getByText} = render(
      <AppButton btnText="Button" onPressHandler={mockFn} />,
    );

    expect(getByText("Button")).not.toBeNull();
  });
  it('should call the press handler function when clicked', () => {
    const mockFn = jest.Fn;
    const {getByText} = render(
      <AppButton btnText="Button" onPressHandler={mockFn} />,
    );
    fireEvent.press(getByText("Button"))

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
