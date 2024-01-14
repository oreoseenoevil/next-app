import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AuthLayout({ children }: PropsWithChildren) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <div className="container">
      <div className="navbar">
        {user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={signOut}>
              <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}
