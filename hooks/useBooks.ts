import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery, useQueryClient, useMutation, MutationKey } from 'react-query'
import { useMemo } from 'react'

export type BookData = {
  author?: number
  genre?: number
  id?: number
  title?: string
}

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase
    .from('books')
    .select('*, author:authors(*), genre:genres(*)')

  return data
}

const insertData = async (data: BookData) => {
  const supabase = createClient()
  const { data: res } = await supabase.from('books').upsert(data)

  return res
}

const useBooks = () => {
  const data = useQuery('books', getData)
  const queryClient = useQueryClient()

  const bookMutation = useMutation((params: BookData) => insertData(params), {
    onSuccess: () => queryClient.invalidateQueries('books'),
    onError: err => console.log(err)
  })

  const books: Tables<'books'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return { books, isLoading: data.isLoading, bookMutation }
}

export default useBooks
