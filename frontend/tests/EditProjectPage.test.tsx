import { render, screen, waitFor } from '@testing-library/react';
import EditProjectPage from '../pages/projects/[id]/edit';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('next-auth/react', () => ({ useSession: jest.fn() }));

describe('EditProjectPage', () => {
  it('loads project data', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1' },
      push: jest.fn(),
    });
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { mode: 'pro' } },
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          title: 't',
          description: 'd',
          format: '16:9',
          target_audience: 'aud',
          goals: 'g',
          tone: 'Информативный',
          style: '2D',
        }),
    }) as any;

    render(<EditProjectPage />);

    await waitFor(() =>
      expect(screen.getByLabelText('Название проекта')).toHaveValue('t'),
    );
    expect(global.fetch).toHaveBeenCalledWith('/api/projects/1');
  });
});
