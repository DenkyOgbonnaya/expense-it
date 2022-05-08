import React from 'react';
import {render} from '@testing-library/react-native';
import ExpenseSummaryCard from './ExpenseSummaryCard';

describe('ExpenseSummaryCard', () => {
  it('renders correctly', () => {
    const {getByText} = render(<ExpenseSummaryCard amount={100} />);
    expect(getByText('Total Expense Summary')).toBeTruthy();
  });
  it('it should show the correct total expense amount', () => {
    const {getByText} = render(<ExpenseSummaryCard amount={100} />);
    expect(getByText('100')).toBeTruthy();
  });
});
