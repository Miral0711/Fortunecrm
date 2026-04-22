import { useState } from 'react'
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge'
import type { BadgeVariant } from '../../types'

interface Task {
  id: string
  title: string
  due: string
  status: 'Completed' | 'Pending' | 'Overdue'
}

const STATUS_MAP: Record<Task['status'], { variant: BadgeVariant; icon: typeof Clock }> = {
  Completed: { variant: 'success', icon: CheckCircle2 },
  Pending:   { variant: 'info',    icon: Clock },
  Overdue:   { variant: 'danger',  icon: AlertCircle },
}

const defaultTasks: Task[] = [
  { id: '1', title: 'Follow up with Sarah Mitchell re: Lot 42',  due: '18 Apr 2026', status: 'Overdue' },
  { id: '2', title: 'Review finance assessment — David Chen',     due: '19 Apr 2026', status: 'Pending' },
  { id: '3', title: 'Send brochure pack to Horizon Project leads',due: '20 Apr 2026', status: 'Pending' },
  { id: '4', title: 'Approve API key for dev.example.com',        due: '15 Apr 2026', status: 'Completed' },
  { id: '5', title: 'Update featured listings — April refresh',   due: '17 Apr 2026', status: 'Completed' },
  { id: '6', title: 'Onboard new BDM — Liam Nguyen',             due: '21 Apr 2026', status: 'Pending' },
]

interface Props {
  tasks?: Task[]
}

export default function TasksCard({ tasks = defaultTasks }: Props) {
  const [items, setItems] = useState<Task[]>(tasks)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  function addTask() {
    if (!newTitle.trim()) return
    setItems(prev => [...prev, {
      id: String(Date.now()),
      title: newTitle.trim(),
      due: 'TBD',
      status: 'Pending',
    }])
    setNewTitle('')
    setAdding(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Tasks</h3>
          <p className="text-xs text-gray-400 mt-0.5">This month</p>
        </div>
        <button
          onClick={() => setAdding(a => !a)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-3 h-3" /> Add Task
        </button>
      </div>

      {/* Add input */}
      {adding && (
        <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
          <input
            autoFocus
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Task title..."
            className="flex-1 text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
          />
          <button onClick={addTask} className="text-xs px-2.5 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Save
          </button>
          <button onClick={() => setAdding(false)} className="text-xs px-2 py-1.5 text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </div>
      )}

      {/* Task list */}
      <div className="divide-y divide-gray-50 max-h-[272px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs text-gray-400">No tasks yet. Add one above.</p>
          </div>
        ) : (
          items.map(task => {
            const { variant, icon: Icon } = STATUS_MAP[task.status]
            return (
              <div key={task.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/60 transition-colors">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${task.status === 'Completed' ? 'text-green-500' : task.status === 'Overdue' ? 'text-red-400' : 'text-blue-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Due {task.due}</p>
                </div>
                <StatusBadge variant={variant}>{task.status}</StatusBadge>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
