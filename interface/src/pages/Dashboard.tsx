import { useDisconnect } from '@starknet-react/core'
import { Button } from 'rebass'

export default function DashboardPage() {
  const { disconnect } = useDisconnect()

  return <Button onClick={() => disconnect()}>Disconnect</Button>
}
