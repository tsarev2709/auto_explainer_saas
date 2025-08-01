import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewProjectPage from '../pages/projects/new';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NewProjectPage', () => {
  test('redirects after submit', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })) as any;

    render(<NewProjectPage />);
    await userEvent.type(screen.getByLabelText('Название проекта'), 'Title');
    fireEvent.submit(screen.getByRole('button', { name: 'Сохранить' }).closest('form')!);
    await waitFor(() => expect(push).toHaveBeenCalledWith('/projects'));
  });
});
