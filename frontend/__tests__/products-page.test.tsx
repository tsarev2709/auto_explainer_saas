import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductsPage from '../pages/projects/[id]/products'
import React from 'react'

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { id: '1' }, push: jest.fn() })
}))

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: { mode: 'pro' } } })
}))

describe('ProductsPage', () => {
  beforeEach(() => {
    ;(global as any).fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1, project_id: 1, title: 'Test', type: 'script', status: 'draft' }]) })
    )
  })

  it('renders table with data', async () => {
    render(<ProductsPage />)
    expect(await screen.findByText('Test')).toBeInTheDocument()
  })

  it('opens form and submits new product', async () => {
    render(<ProductsPage />)
    fireEvent.click(screen.getByLabelText('create'))
    const title = await screen.findByLabelText('Название')
    fireEvent.change(title, { target: { value: 'New' } })
    fireEvent.click(screen.getByText('Сохранить'))
    await waitFor(() => (fetch as jest.Mock).mock.calls.find(c => c[0] === '/api/products' && c[1].method === 'POST'))
  })

  it('deletes product', async () => {
    window.confirm = jest.fn(() => true)
    render(<ProductsPage />)
    const del = await screen.findByLabelText('delete')
    fireEvent.click(del)
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/products/1', { method: 'DELETE' }))
  })

  it('voice input works', async () => {
    class FakeRec {
      onresult: any
      start() { this.onresult({ results: [[{ transcript: 'voice text' }]] }) }
    }
    ;(window as any).webkitSpeechRecognition = FakeRec
    render(<ProductsPage />)
    fireEvent.click(await screen.findByLabelText('create'))
    const mic = (await screen.findAllByLabelText('voice-input'))[0]
    fireEvent.click(mic)
    await waitFor(() => expect(screen.getByLabelText('Название')).toHaveValue('voice text'))
  })

  it('validation error without title', async () => {
    render(<ProductsPage />)
    fireEvent.click(screen.getByLabelText('create'))
    fireEvent.click(await screen.findByText('Сохранить'))
    expect(await screen.findByText('Обязательное поле')).toBeInTheDocument()
  })
})
