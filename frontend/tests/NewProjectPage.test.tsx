import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewProjectPage from '../pages/projects/new';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('next-auth/react', () => ({ useSession: jest.fn() }));

const fillForm = () => {
  fireEvent.change(screen.getByLabelText('Название проекта'), {
    target: { value: 't' },
  });
  fireEvent.change(screen.getByLabelText('Описание'), {
    target: { value: 'd' },
  });
  fireEvent.change(screen.getByLabelText('Формат'), {
    target: { value: '16:9' },
  });
  fireEvent.change(screen.getByLabelText('Целевая аудитория'), {
    target: { value: 'aud' },
  });
  fireEvent.change(screen.getByLabelText('Цель видео'), {
    target: { value: 'g' },
  });
  fireEvent.change(screen.getByLabelText('Тональность'), {
    target: { value: 'Информативный' },
  });
  fireEvent.change(screen.getByLabelText('Визуальный стиль'), {
    target: { value: '2D' },
  });
};

describe('NewProjectPage', () => {
  it('submits form and redirects', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { mode: 'pro' } },
    });
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as any;

    render(<NewProjectPage />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /Сохранить/i }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/projects',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(push).toHaveBeenCalledWith('/projects');
  });
});
