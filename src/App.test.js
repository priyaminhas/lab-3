import React from 'react';
import { render,screen,waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
 import mockData from './mockData';

beforeEach(() => {
  fetchMock.once(JSON.stringify(mockData));
});
describe('<App /> tests', () => {
  it('renders <App />', () => {
    render(<App />);
    //await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });
  it('should add a todo item', async () => {
    fetchMock.once(
      JSON.stringify({
        userId: 3,
        id: Math.floor(Math.random()*100)+1,
        title:'Do math homework',
        completed: false,
      })
    );

    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.type(screen.getAllByRole('textbox'),'Do math homework');
    userEvent.click(screen.getAllByText(/Add new todo/i));
    await waitForElementToBeRemoved(() => screen.getByText(/saving/i));
    expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
  });

  it('remove todo from list',async() => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    userEvent.click(screen.getByTestId('close-btn-3'));
    expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
  })
});
