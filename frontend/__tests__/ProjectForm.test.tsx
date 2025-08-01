import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectForm, { ProjectFormData } from '../components/ProjectForm';

describe('ProjectForm', () => {
  test('renders all fields', () => {
    render(<ProjectForm onSave={jest.fn()} />);
    expect(screen.getByLabelText('Название проекта')).toBeInTheDocument();
    expect(screen.getByLabelText('Описание')).toBeInTheDocument();
    expect(screen.getByLabelText('Формат')).toBeInTheDocument();
    expect(screen.getByLabelText('Целевая аудитория')).toBeInTheDocument();
    expect(screen.getByLabelText('Цели')).toBeInTheDocument();
    expect(screen.getByLabelText('Тон')).toBeInTheDocument();
    expect(screen.getByLabelText('Стиль')).toBeInTheDocument();
  });

  test('input text and submit', async () => {
    const onSave = jest.fn();
    render(<ProjectForm onSave={onSave} />);
    await userEvent.type(screen.getByLabelText('Название проекта'), 'Test');
    await userEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(onSave).toHaveBeenCalled();
  });

  test('voice input works', async () => {
    const start = jest.fn(function(this: any) {
      this.onresult({ results: [[{ transcript: 'voice' }]] });
    });
    (window as any).SpeechRecognition = function() { this.start = start; } as any;
    render(<ProjectForm onSave={jest.fn()} isPro />);
    await userEvent.click(screen.getByLabelText('voice-title'));
    expect(start).toHaveBeenCalled();
    expect((screen.getByLabelText('Название проекта') as HTMLInputElement).value).toBe('voice');
  });

  test('validation prevents submit', async () => {
    const onSave = jest.fn();
    render(<ProjectForm onSave={onSave} />);
    await userEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(onSave).not.toHaveBeenCalled();
    expect(await screen.findByText('Обязательное поле')).toBeInTheDocument();
  });
});
