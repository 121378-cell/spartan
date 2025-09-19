
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

// Mock the auth hook
vi.mock('react-firebase-hooks/auth');

describe('App', () => {
  it('renders the loading state', () => {
    (useAuthState as jest.Mock).mockReturnValue([undefined, true]);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the home page for logged-out users', async () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Welcome to the Fitness Tracker/i)).toBeInTheDocument();
    });
  });

  it('redirects to the dashboard for logged-in users', async () => {
    (useAuthState as jest.Mock).mockReturnValue([ { uid: '123' }, false]);
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Welcome to your Dashboard/i)).toBeInTheDocument();
    });
  });
});


