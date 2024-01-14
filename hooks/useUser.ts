import { useState, useEffect } from 'react'

const useUser = () => {
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${window.location.origin}/api/user`)
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`)
        }

        const user = await response.json()
        setUserData(user)
        setLoading(false)
      } catch (error: any) {
        console.error('Error fetching user data:', error.message)
        setLoading(false)
      }
    }

    getData()
  }, [])

  return {
    userData,
    isLoading
  }
}

export default useUser
