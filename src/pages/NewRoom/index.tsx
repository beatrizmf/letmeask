import { Link } from 'react-router-dom'

import { Button } from '../../components/Button'
import { WithAsideIllustration } from '../../components/ContentWithAsideIllustration'

import './styles.scss'

export function NewRoom() {
  return (
    <WithAsideIllustration className="NewRoom">
      <h2>Create a new room</h2>

      <form>
        <input type="text" placeholder="Room name" />
        <Button type="submit">Create room</Button>
      </form>

      <Link to="/">Join a created room</Link>
    </WithAsideIllustration>
  )
}
