import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EditProjectPage from '../pages/projects/[id]/edit';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('next-auth/react', () => ({ useSession: jest.fn() }));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { id: '1' },
    push: jest.fn()
  });
  (useSession as jest.Mock).mockReturnValue({ data: null });
  global.fetch = jest.fn((url, opts) => {
    if (opts && opts.method === 'PUT')
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ title: 't' })
    });
  }) as any;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('loads initial data and submits update', async () => {
  render(<EditProjectPage />);
  expect(global.fetch).toHaveBeenCalledWith('/api/projects/1');
  await waitFor(() =>
    expect(screen.getByDisplayValue('t')).toBeInTheDocument()
  );
  fireEvent.change(screen.getByLabelText('Название проекта'), {
    target: { value: 'new' }
  });
  fireEvent.submit(screen.getByRole('button', { name: 'Сохранить проект' }));
  await waitFor(() =>
    expect(
      (useRouter as jest.Mock).mock.results[0].value.push
    ).toHaveBeenCalledWith('/projects')
  );
});
