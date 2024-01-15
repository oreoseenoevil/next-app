import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/types/supabase'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useMemo } from 'react'

export type AuthorData = {
  id?: number
  title?: string
}

const getData = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('authors').select()

  return data
}

const useAuthors = () => {
  const supabase = createClient()
  const data = useQuery('authors', getData)
  const queryClient = useQueryClient()

  const { mutate: addAuthor } = useMutation(
    async (params: AuthorData) => await supabase.from('authors').insert(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authors')
      },
      onError: err => console.log(err)
    }
  )

  const { mutate: deleteAuthor } = useMutation(
    async (id: number) => await supabase.from('authors').delete().match({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authors')
      },
      onError: err => console.log(err)
    }
  )

  const { mutate: updateAuthor } = useMutation(
    async (params: AuthorData) =>
      await supabase.from('authors').update(params).match({ id: params.id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authors')
      },
      onError: err => console.log(err)
    }
  )

  const authors: Tables<'authors'>[] | any = useMemo(() => {
    return data.data || []
  }, [data])

  return {
    authors,
    isLoading: data.isLoading,
    addAuthor,
    updateAuthor,
    deleteAuthor
  }
}

export default useAuthors
