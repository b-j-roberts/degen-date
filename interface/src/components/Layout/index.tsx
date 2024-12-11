import { useIsConnected } from 'hooks/useAccount'
import { useEffect, useState } from 'react'

import AppLayout from './App'
import NotConnectedLayout from './NotConnected'

export default function Layout({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const [ready, setReady] = useState(false)
  const { isConnected } = useIsConnected()

  // wait 100ms to avoid wallet connection blinking
  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  if (!ready) {
    return null
  }

  if (isConnected()) {
    return <AppLayout>{children}</AppLayout>
  } else {
    return <NotConnectedLayout />
  }
}
