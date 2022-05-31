import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ref, push } from 'firebase/database'

import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

import { Button } from '../../components/Button'
import { WithAsideIllustration } from '../../components/ContentWithAsideIllustration'

import './styles.scss'

export function NewRoom() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [newRoomTitle, setNewRoomTitle] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoomTitle.trim() === '') {
      return
    }

    const roomRef = ref(database, 'rooms')

    const room = await push(roomRef, {
      title: newRoomTitle,
      authorId: user?.id
    })

    navigate(`/room/${room.key}`)
  }

  return (
    <WithAsideIllustration className="NewRoom">
      <h2>Create a new room</h2>

      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          placeholder="Room title"
          value={newRoomTitle}
          onChange={event => setNewRoomTitle(event.target.value)}
        />
        <Button type="submit">Create room</Button>
      </form>

      <Link to="/">Join a created room</Link>
    </WithAsideIllustration>
  )
}
