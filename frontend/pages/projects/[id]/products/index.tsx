import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import ProductCrudForm, { ProductData } from '../../../../components/ProductCrudForm'

interface Product {
  id: number
  project_id: number
  title: string
  type: string
  description?: string
  status: string
}

export default function ProjectProductsPage() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data: session } = useSession()
  const isPro = (session as any)?.user?.mode === 'pro'

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const fetchProducts = () => {
    if (!id) return
    fetch(`/api/products?project_id=${id}`)
      .then(r => (r.ok ? r.json() : []))
      .then(setProducts)
      .finally(() => setLoading(false))
  }

  useEffect(fetchProducts, [id])

  const handleDelete = async (product: Product) => {
    if (!confirm('Удалить продукт?')) return
    const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Удалено')
      fetchProducts()
    } else {
      toast.error('Ошибка удаления')
    }
  }

  const handleSave = async (data: ProductData) => {
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/products/${editing.id}` : '/api/products'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, project_id: id })
    })
    if (res.ok) {
      toast.success('Сохранено')
      setOpen(false)
      setEditing(null)
      fetchProducts()
    } else {
      toast.error('Ошибка')
    }
  }

  const startCreate = () => {
    setEditing(null)
    setOpen(true)
  }

  const startEdit = (p: Product) => {
    setEditing(p)
    setOpen(true)
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-2xl font-bold mb-2">Продукты</h1>
        <button aria-label="create" onClick={startCreate} className="bg-brandTurquoise text-white px-4 py-2 rounded">
          Создать продукт
        </button>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : products.length === 0 ? (
        <p>Нет продуктов</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Название</th>
                <th className="px-4 py-2 text-left">Тип</th>
                <th className="px-4 py-2 text-left">Статус</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button aria-label="edit" onClick={() => startEdit(p)} className="text-brandTurquoise hover:underline">
                      Редактировать
                    </button>
                    <button aria-label="delete" onClick={() => handleDelete(p)} className="text-red-500 hover:underline">
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {editing ? 'Редактировать продукт' : 'Новый продукт'}
            </Dialog.Title>
            <ProductCrudForm initial={editing ?? undefined} onSave={handleSave} isPro={isPro} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
