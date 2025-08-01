import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectVideoForm, {
  ProjectFormData
} from '../components/ProjectVideoForm';

function setup(
  props: Partial<{
    initial: Partial<ProjectFormData>;
    isPro: boolean;
    onSave: (d: ProjectFormData) => void;
  }> = {}
) {
  const onSave = jest.fn();
  render(<ProjectVideoForm onSave={onSave} isPro={false} {...props} />);
  return { onSave };
}

describe('ProjectVideoForm', () => {
  test('renders all fields', () => {
    setup();
    expect(screen.getByLabelText('Название проекта')).toBeInTheDocument();
    expect(screen.getByLabelText('Описание')).toBeInTheDocument();
    expect(screen.getByLabelText('Формат')).toBeInTheDocument();
    expect(screen.getByLabelText('Целевая аудитория')).toBeInTheDocument();
    expect(screen.getByLabelText('Цель видео')).toBeInTheDocument();
    expect(screen.getByLabelText('Тональность')).toBeInTheDocument();
    expect(screen.getByLabelText('Визуальный стиль')).toBeInTheDocument();
  });

  test('validation prevents submit without title', async () => {
    const { onSave } = setup();
    fireEvent.submit(screen.getByRole('button', { name: 'Сохранить проект' }));
    expect(onSave).not.toHaveBeenCalled();
    expect(await screen.findByText('Обязательное поле')).toBeInTheDocument();
  });

  test('submits data', async () => {
    const { onSave } = setup();
    fireEvent.change(screen.getByLabelText('Название проекта'), {
      target: { value: 'Test' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Сохранить проект' }));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    expect(onSave.mock.calls[0][0]).toMatchObject({ title: 'Test' });
  });

  test('voice input fills field', () => {
    const recognitionStart = jest.fn();
    (window as any).webkitSpeechRecognition = function () {
      this.start = recognitionStart;
    } as any;
    setup({ isPro: true });
    fireEvent.click(screen.getAllByLabelText('Ввод голосом')[0]);
    expect(recognitionStart).toHaveBeenCalled();
  });
});
