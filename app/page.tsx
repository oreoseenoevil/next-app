'use client'

import useBooks, { BookData } from '@/hooks/useBooks'
import useUser from '@/hooks/useUser'
import { Tables } from '@/types/supabase'
import moment from 'moment'
import SkeletonLoader from '@/components/SkeletonLoader'
import { useMemo, useState } from 'react'
import Modal from '@/components/Modal'
import useAuthors from '@/hooks/useAuthors'
import useGenres from '@/hooks/useGenres'

type Books = Tables<'books'> & {
  author: Tables<'authors'>
  genre: Tables<'genres'>
}

const initForm = {
  title: '',
  author: 1,
  genre: 1
}

export default function Index() {
  const { userData, isLoading } = useUser()
  const {
    books,
    addBook,
    isLoading: booksLoading,
    deleteBook,
    updateBook
  } = useBooks()
  const { authors, isLoading: authorsLoading } = useAuthors()
  const { genres, isLoading: genresLoading } = useGenres()
  const [modal, setModal] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookData>(initForm)

  const onLoading = useMemo(() => {
    return ![isLoading, booksLoading, authorsLoading, genresLoading].every(
      item => !!item
    )
  }, [isLoading, booksLoading, authorsLoading, genresLoading])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === 'title') {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
      return
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: +e.target.value }))
      return
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (modal === 'create') {
      const data: BookData = {
        ...formData,
        id: Math.floor(Math.random() * (100000 - 1 + 1)) + 1,
        created_at: new Date().toISOString()
      }

      addBook(data, {
        onSuccess: () => {
          setFormData(initForm)
          setModal(null)
        }
      })
    }

    if (modal === 'edit') {
      updateBook(formData, {
        onSuccess: () => {
          setFormData(initForm)
          setModal(null)
        }
      })
    }
  }

  const loaders = (
    <div className="border rounded-md flex items-center gap-2 justify-between p-4">
      <div className="flex items-center flex-col gap-2 justify-between overflow-hidden">
        <SkeletonLoader height="15px">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </SkeletonLoader>
        <SkeletonLoader height="15px">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </SkeletonLoader>
        <SkeletonLoader height="15px">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </SkeletonLoader>
        <SkeletonLoader height="15px">
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
            Books {books.length > 0 && <>({books.length})</>}
          </h2>
          {userData && (
            <button
              className="font-bold border px-4 py-2 rounded-md"
              onClick={() => setModal('create')}
            >
              Add a Book
            </button>
          )}
        </main>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full">
        {onLoading && books.length > 0 ? (
          <>
            {books.map((item: Books) => (
              <div
                className="border p-4 rounded-md flex items-center justify-between gap-1"
                key={item.id}
              >
                <div className="flex flex-col w-full">
                  <div className="text-xs font-bold">{item.genre.name}</div>
                  <div className="text-2xl">{item.title}</div>
                  <div className="text-sm font-thin">{item.author.name}</div>
                  <div className="text-[10px] font-bold">
                    {moment(item.created_at).calendar()}
                  </div>
                </div>
                {userData && (
                  <div className="flex flex-col gap-2">
                    <button
                      className="border text-xs px-2 py-2 rounded-md"
                      onClick={() => {
                        setModal('edit')
                        setFormData({
                          ...item,
                          author: item.author.id,
                          genre: item.genre.id
                        } as BookData)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="border text-xs px-2 py-2 rounded-md"
                      onClick={() => deleteBook(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : !onLoading ? (
          <>
            <>{loaders}</>
            <>{loaders}</>
            <>{loaders}</>
            <>{loaders}</>
          </>
        ) : (
          <div>No Book found</div>
        )}
      </div>
      {modal && (
        <Modal title={`${modal} Book`} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md border-none outline-none text-black"
                placeholder="Title"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium">
                Author
              </label>
              <select
                id="author"
                name="author"
                className="mt-1 p-2 w-full border rounded-md border-none outline-none text-black"
                value={formData?.author}
                onChange={handleChange}
                placeholder="Choose an Author"
              >
                {authors.map((item: Tables<'authors'>) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="genre" className="block text-sm font-medium">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                className="mt-1 p-2 w-full border rounded-md border-none outline-none text-black"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Choose a Genre"
              >
                {genres.map((item: Tables<'genres'>) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-500/70 transition duration-300"
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
