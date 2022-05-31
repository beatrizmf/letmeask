import copyImg from '../../assets/images/copy.svg'

import './styles.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="RoomCode" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Room #{props.code}</span>
    </button>
  )
}
