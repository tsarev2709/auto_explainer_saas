import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewProjectPage from '../pages/projects/new';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('next-auth/react', () => ({ useSession: jest.fn() }));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: jest.fn(), query: {} });
  (useSession as jest.Mock).mockReturnValue({ data: null });
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ id: '1' }) })
  ) as any;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('redirects after submit', async () => {
  render(<NewProjectPage />);
  fireEvent.change(screen.getByLabelText('Название проекта'), {
    target: { value: 'Test' }
  });
  fireEvent.submit(screen.getByRole('button', { name: 'Сохранить проект' }));

  await waitFor(() =>
    expect(
      (useRouter as jest.Mock).mock.results[0].value.push
    ).toHaveBeenCalledWith('/projects')
  );
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/projects',
    expect.any(Object)
  );
});
