import NavBar from 'components/NavBar'

export default function AppLayout({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
