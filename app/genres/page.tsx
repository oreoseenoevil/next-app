'use client'

import { useMemo, useState } from 'react'
import Modal from '@/components/Modal'
import SkeletonLoader from '@/components/SkeletonLoader'
import useGenres from '@/hooks/useGenres'
import useUser from '@/hooks/useUser'
import { Tables } from '@/types/supabase'

interface Genre {
  name?: string
  id?: number
}

const initForm = {
  name: ''
}

export default function Page() {
  const [modal, setModal] = useState<string | null>(null)
  const { genres, isLoading: genresLoading } = useGenres()
  const { userData, isLoading } = useUser()
  const [formData, setFormData] = useState<Genre>(initForm)

  const onLoading = useMemo(() => {
    return ![isLoading, genresLoading].every(item => !!item)
  }, [isLoading, genresLoading])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const loaders = (
    <div className="border rounded-md flex items-center gap-2 justify-between p-4">
      <div className="flex items-center flex-col gap-2 justify-between w-full">
        <SkeletonLoader height="40px" width="100%">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </SkeletonLoader>
      </div>
    </div>
  )

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 w-full">
        <main className="flex w-full justify-between">
          <h2 className="font-bold text-4xl">
            Genres {genres.length > 0 && <>({genres.length})</>}
          </h2>
          {userData && (
            <button
              className="font-bold border px-4 py-2 rounded-md"
              onClick={() => setModal('create')}
            >
              Add a Genre
            </button>
          )}
        </main>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        {onLoading && genres.length > 0 ? (
          <>
            {genres.map((item: Tables<'genres'>) => (
              <div
                className="border p-4 rounded-md flex items-center justify-between gap-1"
                key={item.id}
              >
                <div className="flex flex-col w-full">
                  <div className="text-2xl">{item.name}</div>
                </div>
                {userData && (
                  <div className="flex flex-col gap-2">
                    <button
                      className="border text-xs px-2 py-2 rounded-md"
                      onClick={() => {
                        setModal('edit')
                        setFormData(item as Genre)
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : !onLoading ? (
          <>
            <>{loaders}</>
          </>
        ) : (
          <div>No Genre found</div>
        )}
      </div>
      {modal && (
        <Modal title={`${modal} Genre`} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md border-none outline-none text-black"
                placeholder="Title"
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-500/70 transition duration-300"
            >
              {modal === 'edit' ? 'Update' : 'Submit'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
