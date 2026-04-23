import {
  Users, DollarSign, TrendingUp, FileText, Activity,
  ArrowUpRight,
  Building2, MapPin, LayoutGrid, CalendarClock,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts'
import StatCard from '../components/dashboard/StatCard'
import ChartCard from '../components/dashboard/ChartCard'
import DataTable from '../components/ui/DataTable'
import StatusBadge from '../components/ui/StatusBadge'
import PageHeader from '../components/layout/PageHeader'
import TasksCard from '../components/dashboard/TasksCard'
import FeaturedProperties from '../components/dashboard/FeaturedProperties'
import ProjectUpdatesTable from '../components/dashboard/ProjectUpdatesTable'
import QuickSummary from '../components/dashboard/QuickSummary'
import CommissionInsight from '../components/dashboard/CommissionInsight'
import type { TableColumn, BadgeVariant } from '../types'

// ── Static data ───────────────────────────────────────────────────────────────

const revenueData = [
  { month: 'Jan', sales: 18000, enquiries: 12000 },
  { month: 'Feb', sales: 22000, enquiries: 15000 },
  { month: 'Mar', sales: 19000, enquiries: 13000 },
  { month: 'Apr', sales: 27000, enquiries: 18000 },
  { month: 'May', sales: 34345, enquiries: 41145 },
  { month: 'Jun', sales: 28000, enquiries: 22000 },
  { month: 'Jul', sales: 31000, enquiries: 24000 },
  { month: 'Aug', sales: 29000, enquiries: 21000 },
  { month: 'Sep', sales: 36000, enquiries: 27000 },
  { month: 'Oct', sales: 33000, enquiries: 25000 },
  { month: 'Nov', sales: 38000, enquiries: 29000 },
  { month: 'Dec', sales: 42000, enquiries: 32000 },
]

const activityData = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 52 },
  { day: 'Thu', value: 78 },
  { day: 'Fri', value: 61 },
  { day: 'Sat', value: 35 },
  { day: 'Sun', value: 28 },
]

const conversionData = [
  { name: 'Converted', value: 62 },
  { name: 'Pending',   value: 25 },
  { name: 'Lost',      value: 13 },
]
const PIE_COLORS = ['#f97316', '#fed7aa', '#e5e7eb']

interface RecentLead {
  id: string; name: string; email: string; type: string
  status: BadgeVariant; statusLabel: string; date: string; value: string
}

const recentLeads: RecentLead[] = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@example.com', type: 'Client',           status: 'success', statusLabel: 'Active',   date: '17 Apr 2026', value: '$12,500' },
  { id: '2', name: 'James Thornton', email: 'james@example.com', type: 'Affiliate',         status: 'info',    statusLabel: 'Pending',  date: '16 Apr 2026', value: '$8,200'  },
  { id: '3', name: 'Priya Sharma',   email: 'priya@example.com', type: 'Subscriber',        status: 'warning', statusLabel: 'Review',   date: '15 Apr 2026', value: '$3,400'  },
  { id: '4', name: 'David Chen',     email: 'david@example.com', type: 'BDM',               status: 'success', statusLabel: 'Active',   date: '14 Apr 2026', value: '$21,000' },
  { id: '5', name: 'Emma Wilson',    email: 'emma@example.com',  type: 'Sales Agent',       status: 'danger',  statusLabel: 'Inactive', date: '13 Apr 2026', value: '$5,750'  },
  { id: '6', name: 'Liam Nguyen',    email: 'liam@example.com',  type: 'Referral Partner',  status: 'success', statusLabel: 'Active',   date: '12 Apr 2026', value: '$9,100'  },
  { id: '7', name: 'Noah Patel',     email: 'noah@example.com',  type: 'Client',            status: 'info',    statusLabel: 'Pending',  date: '11 Apr 2026', value: '$6,850'  },
  { id: '8', name: 'Olivia Reed',    email: 'olivia@example.com',type: 'Affiliate',         status: 'success', statusLabel: 'Active',   date: '10 Apr 2026', value: '$11,200' },
]

const leadColumns: TableColumn<RecentLead>[] = [
  { key: 'name', label: 'Name', render: row => (
    <div>
      <p className="font-medium text-gray-800 text-xs">{row.name}</p>
      <p className="text-[11px] text-gray-400">{row.email}</p>
    </div>
  )},
  { key: 'type', label: 'Type', render: row => (
    <span className="text-[11px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{row.type}</span>
  )},
  { key: 'status', label: 'Status', render: row => (
    <StatusBadge variant={row.status}>{row.statusLabel}</StatusBadge>
  )},
  { key: 'date', label: 'Date' },
  { key: 'value', label: 'Value', render: row => (
    <span className="font-semibold text-gray-800">{row.value}</span>
  )},
]

interface ActivityItem {
  id: string; user: string; action: string; time: string; avatar: string
}

const recentActivity: ActivityItem[] = [
  { id: '1', user: 'Sarah M.',  action: 'Submitted a property enquiry for Lot 42',    time: '2m ago',  avatar: 'SM' },
  { id: '2', user: 'James T.',  action: 'Registered as a new Affiliate',               time: '18m ago', avatar: 'JT' },
  { id: '3', user: 'Admin',     action: 'Approved API key for dev.example.com',        time: '1h ago',  avatar: 'AD' },
  { id: '4', user: 'Priya S.',  action: 'Completed Finance Assessment form',           time: '2h ago',  avatar: 'PS' },
  { id: '5', user: 'David C.',  action: 'Created reservation for Project Horizon',     time: '3h ago',  avatar: 'DC' },
]

const leadFunnel = [
  { stage: 'New Leads', count: 248, pct: 100 },
  { stage: 'Contacted', count: 182, pct: 73 },
  { stage: 'Qualified', count: 118, pct: 48 },
  { stage: 'Converted', count: 46, pct: 19 },
]

const upcomingFollowUps = [
  { id: 'f1', who: 'Sarah Mitchell', when: 'Today · 11:30 AM', note: 'Finance docs follow-up' },
  { id: 'f2', who: 'James Thornton', when: 'Today · 3:00 PM', note: 'Affiliate onboarding call' },
  { id: 'f3', who: 'David Chen', when: 'Tomorrow · 10:15 AM', note: 'Reservation confirmation' },
]

interface MetricItem {
  label: string
  value: string
  change: string
  changeType: 'up' | 'down'
  icon: typeof Users
  iconBg: string
  iconColor: string
}

const TOP_METRICS: MetricItem[] = [
  { label: 'Total Revenue', value: '$75,490', change: '+9% this month', changeType: 'up', icon: DollarSign, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { label: 'Active Clients', value: '2,841', change: '+12% vs last month', changeType: 'up', icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: 'Properties Sold', value: '2,355', change: '+7% this quarter', changeType: 'up', icon: TrendingUp, iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  { label: 'Conversion Rate', value: '12.5%', change: '-2% vs last month', changeType: 'down', icon: Activity, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { label: 'Total Lots Available', value: '1,842', change: '+34 this week', changeType: 'up', icon: MapPin, iconBg: 'bg-teal-50', iconColor: 'text-teal-500' },
  { label: 'Total Lots Sold', value: '2,355', change: '+7% this quarter', changeType: 'up', icon: Building2, iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  { label: 'Total Projects', value: '48', change: '+3 this month', changeType: 'up', icon: LayoutGrid, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { label: 'Pending Reservations', value: '47', change: '+3 today', changeType: 'up', icon: FileText, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500' },
]

const BOTTOM_METRICS: MetricItem[] = [
  { label: 'New Subscribers', value: '1,284', change: '+5% this week', changeType: 'up', icon: Users, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { label: 'Active BDMs', value: '38', change: '-2 this month', changeType: 'down', icon: TrendingUp, iconBg: 'bg-pink-50', iconColor: 'text-pink-500' },
  { label: 'Open Enquiries', value: '193', change: '+22 this week', changeType: 'up', icon: Activity, iconBg: 'bg-teal-50', iconColor: 'text-teal-500' },
  { label: 'Total Affiliates', value: '415', change: '+6% this month', changeType: 'up', icon: Users, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { label: 'Sales Agents', value: '124', change: '+4% this month', changeType: 'up', icon: TrendingUp, iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  { label: 'Referral Partners', value: '203', change: '+8% this month', changeType: 'up', icon: Activity, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
]

function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
            {item.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-800 leading-snug">{item.user}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.action}</p>
            <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function LeadFunnelCard() {
  return (
    <ChartCard title="Lead Funnel" subtitle="Current pipeline progression">
      <div className="space-y-2.5">
        {leadFunnel.map(item => (
          <div key={item.stage}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-gray-600">{item.stage}</span>
              <span className="font-semibold text-gray-800">{item.count}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

function UpcomingFollowUpsCard() {
  return (
    <ChartCard title="Upcoming Follow-ups" subtitle="Today and tomorrow reminders">
      <div className="space-y-2.5">
        {upcomingFollowUps.map(item => (
          <div key={item.id} className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
              <CalendarClock className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-800 truncate">{item.who}</p>
              <p className="text-[11px] text-gray-500">{item.note}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.when}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-300">{p.name}:</span>
          <span className="font-medium">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin. Here's what's happening today."
      />

      <div className="flex-1 overflow-y-auto">
        <div className="w-full space-y-4">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
            {TOP_METRICS.map(item => (
              <StatCard
                key={item.label}
                label={item.label}
                value={item.value}
                change={item.change}
                changeType={item.changeType}
                icon={item.icon}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
              />
            ))}
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Left column */}
            <div className="col-span-12 xl:col-span-9 space-y-4">
              <ChartCard title="Revenue Overview" subtitle="Sales vs Enquiries — This Year">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />Sales
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-200 inline-block" />Enquiries
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={revenueData} barSize={14} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                    <Bar dataKey="sales" name="Sales" fill="#f97316" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="enquiries" name="Enquiries" fill="#fed7aa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ChartCard title="Active Sales" subtitle="$24,064 this month">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-gray-800">$24,064</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">+12%</span>
                  </div>
                  <ResponsiveContainer width="100%" height={58}>
                    <AreaChart data={activityData}>
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <button className="mt-2 text-xs text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    See Details <ArrowUpRight className="w-3 h-3" />
                  </button>
                </ChartCard>

                <ChartCard title="Total Visits" subtitle="191,886 this month">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xl font-bold text-gray-800">191,886</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">+8.5%</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Mobile — 115,132</span><span>60%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full w-[60%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Desktop — 76,754</span><span>40%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-200 rounded-full w-[40%]" />
                      </div>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Weekly Activity" subtitle="Logins & interactions">
                  <ResponsiveContainer width="100%" height={98}>
                    <LineChart data={activityData}>
                      <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 3 }} />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={v => [`${v} actions`, 'Activity']} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                <ChartCard
                  title="Recent Leads"
                  subtitle="Latest account registrations"
                  className="xl:col-span-8"
                  actions={
                    <button className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      All Leads <ArrowUpRight className="w-3 h-3" />
                    </button>
                  }
                >
                  <div className="max-h-[300px] overflow-y-auto">
                    <DataTable columns={leadColumns} data={recentLeads} keyField="id" />
                  </div>
                </ChartCard>

                <ChartCard
                  title="Recent Activity"
                  subtitle="Live platform events"
                  className="xl:col-span-4"
                  actions={
                    <button className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      View all <ArrowUpRight className="w-3 h-3" />
                    </button>
                  }
                >
                  <ActivityList items={recentActivity} />
                </ChartCard>
              </div>

              <ProjectUpdatesTable />

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {BOTTOM_METRICS.map(item => (
                  <StatCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    change={item.change}
                    changeType={item.changeType}
                    icon={item.icon}
                    iconBg={item.iconBg}
                    iconColor={item.iconColor}
                  />
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-span-12 xl:col-span-3">
              <div className="flex flex-col gap-4">
                <ChartCard title="Conversion Rate" subtitle="Lead outcome breakdown">
                  <div className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={170}>
                      <PieChart>
                        <Pie data={conversionData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                          {conversionData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                        </Pie>
                        <Tooltip formatter={v => `${v}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="w-full space-y-2 mt-1">
                      {conversionData.map((d, i) => (
                        <div key={d.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                            <span className="text-gray-600">{d.name}</span>
                          </div>
                          <span className="font-semibold text-gray-800">{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ChartCard>

                <LeadFunnelCard />
                <UpcomingFollowUpsCard />
                <QuickSummary />
                <CommissionInsight />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <TasksCard />
            <FeaturedProperties />
          </div>
        </div>
      </div>
    </div>
  )
}
