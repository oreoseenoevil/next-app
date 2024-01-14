import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useMemo } from 'react'

export type BookData = {
  author?: number
  genre?: number
  id?: number
  title?: string
  created_at?: string
}

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase
    .from('books')
    .select('*, author:authors(*), genre:genres(*)')

  return data
}

const useBooks = () => {
  const data = useQuery('books', getData)
  const queryClient = useQueryClient()

  const supabase = createClient()

  const { mutate: addBook } = useMutation(
    async (params: BookData) => await supabase.from('books').insert(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('books')
      },
      onError: err => console.log(err)
    }
  )

  const { mutate: deleteBook } = useMutation(
    async (id: number) => await supabase.from('books').delete().match({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('books')
      },
      onError: err => console.log(err)
    }
  )

  const { mutate: updateBook } = useMutation(
    async (params: BookData) =>
      await supabase.from('books').update(params).match({ id: params.id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('books')
      },
      onError: err => console.log(err)
    }
  )

  const books: Tables<'books'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return { books, isLoading: data.isLoading, addBook, deleteBook, updateBook }
}

export default useBooks
