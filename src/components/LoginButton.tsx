import { ReactElement } from 'react'

const LoginButton = ({
  icon,
  children,
  onClick,
}: {
  icon: ReactElement
  children: ReactElement | String
  onClick?: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-xl bg-third w-52 px-3 py-1 rounded-md bg-opacity-60 hover:bg-opacity-100"
    >
      {icon}
      {children}
    </button>
  )
}

export default LoginButton
