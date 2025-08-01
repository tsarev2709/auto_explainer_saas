import { render, screen, fireEvent } from '@testing-library/react';
import ProjectVideoForm from '../components/ProjectVideoForm';

describe('ProjectVideoForm', () => {
  const onSave = jest.fn();

  it('shows microphones only for pro users', () => {
    const { rerender } = render(<ProjectVideoForm onSave={onSave} isPro />);
    expect(screen.getAllByLabelText(/Voice input/).length).toBe(7);

    rerender(<ProjectVideoForm onSave={onSave} isPro={false} />);
    expect(screen.queryByLabelText(/Voice input/)).toBeNull();
  });

  it('inserts text after speech recognition', () => {
    const recognitionInstance: any = { start: jest.fn(), onresult: null };
    (window as any).webkitSpeechRecognition = jest.fn(
      () => recognitionInstance,
    );
    render(<ProjectVideoForm onSave={onSave} isPro />);

    fireEvent.click(screen.getByLabelText('Voice input for title'));
    recognitionInstance.onresult({ results: [[{ transcript: 'hello' }]] });

    expect(screen.getByLabelText('Название проекта')).toHaveValue('hello');
  });
});
