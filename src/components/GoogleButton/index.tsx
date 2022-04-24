import { ButtonHTMLAttributes, ReactNode } from 'react'

import googleIconImg from '../../assets/images/google-icon.svg'

import './styles.scss'

interface GoogleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function GoogleButton({ children, ...otherProps }: GoogleButtonProps) {
  return (
    <button className="GoogleButton" {...otherProps}>
      <img src={googleIconImg} alt="Google icon" />
      {children}
    </button>
  )
}
