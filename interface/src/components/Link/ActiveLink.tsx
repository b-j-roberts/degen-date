import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import React from 'react'
import { Link as RouterLink, LinkProps, useLocation } from 'react-router-dom'

interface ActiveLinkProps extends LinkProps {
  to: string
  children: React.ReactElement
}

export function ActiveLink({ children, to, ...props }: ActiveLinkProps) {
  const { pathname } = useLocation()
  const childClassName = children?.props.className ?? ''

  const formatUrl = useCallback((url: string) => url.replace(/\/$/, '').toLowerCase(), [])

  const className = useMemo(() => {
    const formatedPathname = formatUrl(pathname)
    const formatedHref = formatUrl(to)

    return formatedPathname.indexOf(formatedHref) === 0 ? clsx(childClassName, 'active') : childClassName
  }, [formatUrl, pathname, to, childClassName])

  console.log(className)

  if (!children) return null

  return (
    <RouterLink to={to} {...props}>
      {React.cloneElement(children, { className: className || null })}
    </RouterLink>
  )
}
