import UserCard from './UserCard'
import { User } from '@/app/dashboard/admin/types'

type Props = {
  users: User[]
  onDelete?: (id: string) => void
}

export default function UserList({ users, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
    </ul>
  )
}
