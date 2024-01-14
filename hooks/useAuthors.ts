import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery } from 'react-query'
import { useMemo } from 'react'

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('authors').select()

  return data
}

const useAuthors = () => {
  const data = useQuery('authors', getData)

  const authors: Tables<'authors'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return { authors, isLoading: data.isLoading }
}

export default useAuthors
