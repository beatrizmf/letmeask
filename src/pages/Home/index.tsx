import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { Button } from '../../components/Button'
import { WithAsideIllustration } from '../../components/ContentWithAsideIllustration'
import { GoogleButton } from '../../components/GoogleButton'

import './styles.scss'

export function Home() {
  const navigate = useNavigate()

  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new')
  }

  return (
    <WithAsideIllustration className="Home">
      <GoogleButton onClick={handleCreateRoom}>
        Create your room with Google
      </GoogleButton>

      <div className="HomeSeparator">or join a created room</div>

      <form>
        <input type="text" placeholder="Enter room code" />
        <Button type="submit">Join</Button>
      </form>
    </WithAsideIllustration>
  )
}
