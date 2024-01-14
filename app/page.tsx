'use client'

import useBooks, { BookData } from '@/hooks/useBooks'
import { Tables } from '@/types/supabase'
import moment from 'moment'

type Books = Tables<'books'> & {
  author: Tables<'authors'>
  genre: Tables<'genres'>
}

export default function Index() {
  const { books, bookMutation } = useBooks()

  const data: BookData = {
    id: Math.floor(Math.random() * (100000 - 1 + 1)) + 1,
    author: 1,
    title: 'Testing',
    genre: 1
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 w-full">
        <main className="flex w-full justify-between">
          <h2 className="font-bold text-4xl">Books ({books.length})</h2>
          <button
            className="font-bold border px-4 py-2 rounded-md"
            onClick={() => {
              bookMutation.mutate(data)
            }}
          >
            Add a Book
          </button>
        </main>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {books.map((item: Books) => (
          <div
            className="border p-4 rounded-md flex items-center justify-between"
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
            <div className="flex flex-col gap-2">
              <button className="border text-xs px-2 py-2 rounded-md">
                Edit
              </button>
              <button className="border text-xs px-2 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
