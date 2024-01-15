import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useMemo } from 'react'

export type GenreData = {
  id?: number
  title?: string
}

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('genres').select()

  return data
}

const useGenres = () => {
  const data = useQuery('genres', getData)
  const queryClient = useQueryClient()

  const supabase = createClient()

  const { mutate: addGenre } = useMutation(
    async (params: GenreData) => await supabase.from('genres').insert(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('genres')
      },
      onError: err => console.log(err)
    }
  )

  const { mutate: deleteGenre } = useMutation(
    async (id: number) => await supabase.from('genres').delete().match({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('genres')
      },
      onError: err => console.log(err)
    }
  )

  const { mutate: updateGenre } = useMutation(
    async (params: GenreData) =>
      await supabase.from('genres').update(params).match({ id: params.id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('genres')
      },
      onError: err => console.log(err)
    }
  )

  const genres: Tables<'genres'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return {
    genres,
    isLoading: data.isLoading,
    addGenre,
    deleteGenre,
    updateGenre
  }
}

export default useGenres
