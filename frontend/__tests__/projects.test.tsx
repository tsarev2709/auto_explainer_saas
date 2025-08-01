import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewProject } from '../pages/projects/new';
import { EditProject } from '../pages/projects/[id]/edit';

beforeEach(() => {
  (global.fetch as any) = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

const sampleData = {
  title: 't',
  description: 'd',
  target_audience: 'aud',
  format: '16:9',
  tone: 'friendly',
  style: 'modern',
  goals: 'g'
};

test('loads project data on edit page', async () => {
  (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => sampleData });
  render(<EditProject id="1" isPro={false} onSuccess={jest.fn()} />);
  expect(fetch).toHaveBeenCalledWith('/api/projects/1');
  await waitFor(() => expect(screen.getByDisplayValue('t')).toBeInTheDocument());
});

test('submits new project to correct API', async () => {
  (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => ({}) });
  render(<NewProject isPro={false} onSuccess={jest.fn()} />);
  await userEvent.type(screen.getByLabelText('Название'), 'Title');
  await userEvent.type(screen.getByLabelText('Описание'), 'Desc');
  await userEvent.type(screen.getByLabelText('Целевая аудитория'), 'TA');
  await userEvent.selectOptions(screen.getByLabelText('Формат'), '16:9');
  await userEvent.type(screen.getByLabelText('Тон'), 'T');
  await userEvent.type(screen.getByLabelText('Стиль'), 'S');
  await userEvent.type(screen.getByLabelText('Цели'), 'G');
  await userEvent.click(screen.getByRole('button', { name: /сохранить/i }));
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      '/api/projects',
      expect.objectContaining({ method: 'POST' })
    )
  );
});

test('microphones shown only for pro users', () => {
  const { unmount } = render(<NewProject isPro={true} onSuccess={jest.fn()} />);
  expect(screen.getAllByLabelText('voice input').length).toBe(6);
  unmount();
  render(<NewProject isPro={false} onSuccess={jest.fn()} />);
  expect(screen.queryByLabelText('voice input')).toBeNull();
});

test('inserts text after speech recognition', async () => {
  const start = jest.fn(function(this: any) {
    this.onresult({ results: [[{ transcript: 'hello' }]] });
  });
  (window as any).webkitSpeechRecognition = function() { this.start = start; } as any;
  render(<NewProject isPro={true} onSuccess={jest.fn()} />);
  const mic = screen.getAllByLabelText('voice input')[0];
  userEvent.click(mic);
  await waitFor(() => expect(screen.getByLabelText('Название')).toHaveValue('hello'));
});
