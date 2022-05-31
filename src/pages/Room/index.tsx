import {
  ref,
  onValue,
  push,
  query,
  equalTo,
  orderByChild,
  get
} from 'firebase/database'
import { useEffect } from 'react'
import { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { database } from '../../services/firebase'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'

import logoImg from '../../assets/images/logo.svg'

import './styles.scss'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
  }
>

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  const params = useParams<RoomParams>()
  const roomId = params.id

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`)

    // child added or changed
    onValue(roomRef, snapshot => {
      const room = snapshot.val()

      const firebaseQuestions: FirebaseQuestions = room.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        }
      )

      setTitle(room.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    const questionsRef = ref(database, `rooms/${roomId}/questions`)

    await push(questionsRef, question)

    setNewQuestion('')
  }

  return (
    <div className="Room">
      <header>
        <div>
          <img src={logoImg} alt="let me ask logo" />
          <RoomCode code={roomId as string} />
        </div>
      </header>

      <main>
        <div className="RoomTitle">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="What do you want to ask?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="RoomFormFooter">
            {user ? (
              <div className="RoomUserInfo">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                To send a question, <button>do login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Send question
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  )
}
