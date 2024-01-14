import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return NextResponse.json(user)
}
