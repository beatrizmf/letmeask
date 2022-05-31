import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { Button } from '../../components/Button'
import { WithAsideIllustration } from '../../components/ContentWithAsideIllustration'
import { GoogleButton } from '../../components/GoogleButton'

import './styles.scss'
import { database } from '../../services/firebase'
import { get, ref } from 'firebase/database'

export function Home() {
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

  const { user, signInWithGoogle } = useAuth()

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/new-room')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await get(ref(database, `rooms/${roomCode}`))

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    navigate(`room/${roomCode}`)
  }

  return (
    <WithAsideIllustration className="Home">
      <GoogleButton onClick={handleSignIn}>
        Create your room with Google
      </GoogleButton>

      <div className="HomeSeparator">or join a created room</div>

      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          placeholder="Enter room code"
          value={roomCode}
          onChange={event => setRoomCode(event.target.value)}
        />
        <Button type="submit">Join</Button>
      </form>
    </WithAsideIllustration>
  )
}
