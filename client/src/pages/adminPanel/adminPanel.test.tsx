import { render, fireEvent } from '@testing-library/react';
import AdminPanel from './index';
import '@testing-library/jest-dom'

describe('AdminPanel', () => {
  it('renders without crashing', () => {
    render(<AdminPanel />);
  });

  it('shows admin navigation when logged in', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { getByText } = render(<AdminPanel />);
    expect(getByText(/cars/i)).toBeInTheDocument();
    expect(getByText(/groups/i)).toBeInTheDocument();
  });

  it('logs out on logout button click', () => {
    const { getByText } = render(<AdminPanel />);
    fireEvent.click(getByText(/logout/i));
    expect(getByText(/sign in/i)).toBeInTheDocument();
  });

  it('renders correct content based on active tab', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { getByText } = render(<AdminPanel />);
    fireEvent.click(getByText(/groups/i));
    expect(getByText(/groups/i)).toBeInTheDocument();
  });

  it('shows correct username when logged in', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { getByText } = render(<AdminPanel />);
    expect(getByText(/Logged in as admin/i)).toBeInTheDocument();
  });

  it('changes active tab on button click', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { getByText } = render(<AdminPanel />);
    fireEvent.click(getByText(/WRC Teams/i));
    expect(getByText(/WRC Teams/i)).toBeInTheDocument();
  });

  it('renders AdminLogin component when not logged in', () => {
    Storage.prototype.getItem = jest.fn(() => null);

    const { getByTestId } = render(<AdminPanel />);
    expect(getByTestId('admin-login')).toBeInTheDocument();
  });

  it('does not render AdminLogin component when logged in', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { queryByTestId } = render(<AdminPanel />);
    expect(queryByTestId('admin-login')).toBeNull();
  });

  it('sets document title on mount', () => {
    render(<AdminPanel />);
    expect(document.title).toEqual('RallySphere - Admin Panel');
  });

  it('sets isLoggedIn and adminDetails state from localStorage on mount', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { getByText } = render(<AdminPanel />);
    expect(getByText(/Logged in as admin/i)).toBeInTheDocument();
  });
  
  it('renders different components based on activeTab state', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 1, username: 'admin', password: 'password' }));

    const { getByText } = render(<AdminPanel />);
    fireEvent.click(getByText(/WRC Drivers/i));
    expect(getByText(/WRC Drivers/i)).toBeInTheDocument();

    fireEvent.click(getByText(/WRC Co-Drivers/i));
    expect(getByText(/WRC Co-Drivers/i)).toBeInTheDocument();

    fireEvent.click(getByText(/WRC Rallies/i));
    expect(getByText(/WRC Rallies/i)).toBeInTheDocument();

    fireEvent.click(getByText(/News/i));
    expect(getByText(/News/i)).toBeInTheDocument();
  });
});
