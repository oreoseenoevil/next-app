import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery } from 'react-query'
import { useMemo } from 'react'

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('books').select()

  return data
}

const useBooks = () => {
  const data = useQuery('books', getData)

  const books: Tables<'books'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return { books, isLoading: data.isLoading }
}

export default useBooks
