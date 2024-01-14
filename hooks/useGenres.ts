import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery } from 'react-query'
import { useMemo } from 'react'

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('genres').select()

  return data
}

const useGenres = () => {
  const data = useQuery('genres', getData)

  const genres: Tables<'genres'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return { genres, isLoading: data.isLoading }
}

export default useGenres
