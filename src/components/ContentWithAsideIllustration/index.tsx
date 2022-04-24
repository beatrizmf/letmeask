import { ReactNode } from 'react'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.scss'

type WithAsideIllustrationProps = {
  className?: string
  children: ReactNode
}

export function WithAsideIllustration({
  children,
  className = ''
}: WithAsideIllustrationProps) {
  return (
    <div className="WithAsideIllustration">
      <aside>
        <img src={illustrationImg} alt="illustration with questions" />
        <h1>Create live Q&amp;A rooms</h1>
        <h2>Answer your audience's questions in real time</h2>
      </aside>

      <main>
        <div className={className}>
          <img src={logoImg} alt="letmeask logo" />
          {children}
        </div>
      </main>
    </div>
  )
}
