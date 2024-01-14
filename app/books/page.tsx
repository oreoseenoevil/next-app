'use client'

import useBooks from '@/hooks/useBooks'

export default function Page() {
  const { books } = useBooks()

  return <div>{books.length} Books</div>
}
