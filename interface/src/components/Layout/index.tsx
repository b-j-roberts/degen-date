import NavBar from 'components/NavBar'

export default function Layout({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
