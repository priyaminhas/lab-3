import React from 'react';
import '@testing-library/jest-dom';
import { render,screen, waitForElementToBeRemoved  } from "@testing-library/react";
import TodoItem from './TodoItem';
import mockData from '../../src/mockData';
import userEvent from '@testing-library/user-event';

describe('<TodoItem /> tests',() => {
    it('should render todo item properly',() => {
        render(<TodoItem todo={mockData[0]} />);
        expect(screen.queryByText(/eat Breakfast/i)).toBeInTheDocument();
        expect(screen.getByTestId('close-btn-1')).toBeInTheDocument();
    })

    it('should render todo item with checkbox.',() => {
        render(<TodoItem todo={mockData[0]} />);
        expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
        expect(screen.queryByText(/eat Breakfast/i)).toBeInTheDocument();
    });

    it('todo item should be crossed out after completing',async() => {
        render(<App />);
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
        userEvent.click(screen.getByTestId('checkbox-1'));
        expect(screen.getByText(/eat Breakfast/i)).toHaveClass('completed');
    });
})