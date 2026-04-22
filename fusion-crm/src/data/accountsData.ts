import type { AccountRow } from '../components/accounts/AccountsTable'
import type { BadgeVariant } from '../types'

// ── Extended client row type ──────────────────────────────────────────────────
export interface ClientRow {
  id: string
  firstName: string
  lastName: string
  leadSource: string
  status: BadgeVariant
  statusLabel: string
  phone: string
  suburb: string
  state: string
  lastUpdated: string
  createdOn: string
}

const FIRST_NAMES = [
  'Chris','Chris','Jobandeep','Isla','Sabitha Andrews and Santhosh','Andy',
  'Ilein','Ilein','Gordan','Robert','Sarah','James','Priya','David','Emma',
  'Liam','Olivia','Noah','Ava','Ethan','Sophia','Mason','Isabella','Logan',
  'Mia','Lucas','Charlotte','Elijah','Amelia','Oliver',
]
const LAST_NAMES = [
  'Bockisch','Bockisch','Singh','Chen','Chandy','Lak',
  'Ratilla','Ratilla','Francis','Colevski','Mitchell','Thornton','Sharma','Chen','Wilson',
  'Nguyen','Park','Williams','Johnson','Brown','Davis','Garcia','Martinez','Anderson',
  'Taylor','Thomas','Jackson','White','Harris','Martin',
]
const LEAD_SOURCES = [
  'API','API','','PHP Website','','Wordpress Website',
  'PHP Website','PHP Website','','','API','PHP Website','','Wordpress Website','PHP Website',
  'API','','PHP Website','Wordpress Website','API','PHP Website','','API','PHP Website',
  '','Wordpress Website','PHP Website','API','','PHP Website',
]
const PHONES = [
  '+61414274357','+61414274357','0434781405','02152998905','0422603076','0112345678',
  '0478608112','0414741028','0455609986','0424 599 914','+61400111222','+61400222333',
  '+61400333444','+61400444555','+61400555666','+61400666777','+61400777888','+61400888999',
  '+61400999000','+61401111222','+61401222333','+61401333444','+61401444555','+61401555666',
  '+61401666777','+61401777888','+61401888999','+61401999000','+61402111222','+61402222333',
]
const SUBURBS = Array(30).fill('N/A')
const STATES = [
  'N/A','N/A','QLD','NSW','N/A','N/A',
  'NSW','NSW','WA','NSW','VIC','NSW','QLD','WA','SA',
  'TAS','NT','ACT','VIC','NSW','QLD','WA','SA','VIC',
  'NSW','QLD','WA','SA','TAS','NT',
]
const LAST_UPDATED = [
  '17 Apr 2026','17 Apr 2026','16 Apr 2026','15 Apr 2026','14 Apr 2026','13 Apr 2026',
  '13 Apr 2026','13 Apr 2026','09 Apr 2026','09 Apr 2026','08 Apr 2026','07 Apr 2026',
  '06 Apr 2026','05 Apr 2026','04 Apr 2026','03 Apr 2026','02 Apr 2026','01 Apr 2026',
  '31 Mar 2026','30 Mar 2026','29 Mar 2026','28 Mar 2026','27 Mar 2026','26 Mar 2026',
  '25 Mar 2026','24 Mar 2026','23 Mar 2026','22 Mar 2026','21 Mar 2026','20 Mar 2026',
]
const CREATED_ON = [
  '17 Apr 2026','17 Apr 2026','23 Jan 2026','15 Apr 2026','14 Apr 2026','13 Apr 2026',
  '13 Apr 2026','13 Apr 2026','09 Apr 2026','09 Apr 2026','01 Jan 2026','15 Jan 2026',
  '03 Feb 2026','20 Feb 2026','05 Mar 2026','18 Mar 2026','02 Apr 2026','10 Apr 2026',
  '12 Apr 2026','14 Apr 2026','15 Apr 2026','16 Apr 2026','17 Apr 2026','01 Mar 2026',
  '22 Feb 2026','08 Feb 2026','25 Jan 2026','11 Jan 2026','30 Dec 2025','15 Dec 2025',
]
const CLIENT_STATUSES: { s: BadgeVariant; l: string }[] = [
  { s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },
  { s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },
  { s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },
  { s: 'success', l: 'Active' },{ s: 'info',    l: 'Pending' },{ s: 'success', l: 'Active' },
  { s: 'warning', l: 'Review' },{ s: 'success', l: 'Active' },{ s: 'danger',  l: 'Inactive'},
  { s: 'success', l: 'Active' },{ s: 'info',    l: 'Pending' },{ s: 'success', l: 'Active' },
  { s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },
  { s: 'warning', l: 'Review' },{ s: 'success', l: 'Active' },{ s: 'info',    l: 'Pending' },
  { s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },{ s: 'danger',  l: 'Inactive'},
  { s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },{ s: 'success', l: 'Active' },
]

export const clientsFullData: ClientRow[] = FIRST_NAMES.map((fn, i) => ({
  id: String(i + 1),
  firstName: fn,
  lastName: LAST_NAMES[i],
  leadSource: LEAD_SOURCES[i],
  status: CLIENT_STATUSES[i].s,
  statusLabel: CLIENT_STATUSES[i].l,
  phone: PHONES[i],
  suburb: SUBURBS[i],
  state: STATES[i],
  lastUpdated: LAST_UPDATED[i],
  createdOn: CREATED_ON[i],
}))

// ── Legacy helper (used by other account pages) ───────────────────────────────
function makeRows(
  names: string[],
  emails: string[],
  phones: string[],
  statuses: { s: BadgeVariant; l: string }[],
  dates: string[],
  extras?: string[]
): AccountRow[] {
  return names.map((name, i) => ({
    id: String(i + 1),
    name,
    email: emails[i],
    phone: phones[i],
    status: statuses[i % statuses.length].s,
    statusLabel: statuses[i % statuses.length].l,
    joined: dates[i % dates.length],
    extra: extras?.[i % extras.length],
  }))
}

const ACCT_NAMES = [
  'Sarah Mitchell', 'James Thornton', 'Priya Sharma', 'David Chen',
  'Emma Wilson', 'Liam Nguyen', 'Olivia Park', 'Noah Williams',
  'Ava Johnson', 'Ethan Brown', 'Sophia Davis', 'Mason Garcia',
  'Isabella Martinez', 'Logan Anderson', 'Mia Taylor', 'Lucas Thomas',
  'Charlotte Jackson', 'Elijah White', 'Amelia Harris', 'Oliver Martin',
]

const ACCT_EMAILS = ACCT_NAMES.map(n => `${n.split(' ')[0].toLowerCase()}@example.com`)
const ACCT_PHONES = [
  '+61 400 111 222', '+61 400 222 333', '+61 400 333 444', '+61 400 444 555',
  '+61 400 555 666', '+61 400 666 777', '+61 400 777 888', '+61 400 888 999',
  '+61 400 999 000', '+61 401 111 222', '+61 401 222 333', '+61 401 333 444',
  '+61 401 444 555', '+61 401 555 666', '+61 401 666 777', '+61 401 777 888',
  '+61 401 888 999', '+61 401 999 000', '+61 402 111 222', '+61 402 222 333',
]
const ACCT_DATES = [
  '01 Jan 2026', '15 Jan 2026', '03 Feb 2026', '20 Feb 2026',
  '05 Mar 2026', '18 Mar 2026', '02 Apr 2026', '10 Apr 2026',
  '12 Apr 2026', '14 Apr 2026', '15 Apr 2026', '16 Apr 2026',
  '17 Apr 2026', '01 Mar 2026', '22 Feb 2026', '08 Feb 2026',
  '25 Jan 2026', '11 Jan 2026', '30 Dec 2025', '15 Dec 2025',
]

const ACCT_STATUSES: { s: BadgeVariant; l: string }[] = [
  { s: 'success', l: 'Active' },
  { s: 'info', l: 'Pending' },
  { s: 'success', l: 'Active' },
  { s: 'success', l: 'Active' },
  { s: 'danger', l: 'Inactive' },
  { s: 'success', l: 'Active' },
  { s: 'warning', l: 'Pending' },
  { s: 'success', l: 'Active' },
]

export const clientsData = makeRows(ACCT_NAMES, ACCT_EMAILS, ACCT_PHONES, ACCT_STATUSES, ACCT_DATES, ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'])
export const affiliatesData = makeRows(ACCT_NAMES.slice(0, 15), ACCT_EMAILS.slice(0, 15), ACCT_PHONES.slice(0, 15), ACCT_STATUSES, ACCT_DATES, ['Gold', 'Silver', 'Bronze', 'Platinum'])
export const subscribersData = makeRows(ACCT_NAMES, ACCT_EMAILS, ACCT_PHONES, ACCT_STATUSES, ACCT_DATES, ['Newsletter', 'Updates', 'Promotions', 'All'])
export const bdmsData = makeRows(ACCT_NAMES.slice(0, 12), ACCT_EMAILS.slice(0, 12), ACCT_PHONES.slice(0, 12), ACCT_STATUSES, ACCT_DATES, ['VIC', 'NSW', 'QLD', 'WA'])
export const salesAgentsData = makeRows(ACCT_NAMES.slice(0, 14), ACCT_EMAILS.slice(0, 14), ACCT_PHONES.slice(0, 14), ACCT_STATUSES, ACCT_DATES, ['Team A', 'Team B', 'Team C'])
export const referralPartnersData = makeRows(ACCT_NAMES.slice(0, 10), ACCT_EMAILS.slice(0, 10), ACCT_PHONES.slice(0, 10), ACCT_STATUSES, ACCT_DATES, ['Finance', 'Legal', 'Real Estate', 'Insurance'])
export const developersData = makeRows(ACCT_NAMES.slice(0, 8), ACCT_EMAILS.slice(0, 8), ACCT_PHONES.slice(0, 8), ACCT_STATUSES, ACCT_DATES, ['Residential', 'Commercial', 'Mixed Use'])
export const piabAdminsData = makeRows(ACCT_NAMES.slice(0, 6), ACCT_EMAILS.slice(0, 6), ACCT_PHONES.slice(0, 6), ACCT_STATUSES, ACCT_DATES, ['Super Admin', 'Admin', 'Moderator'])
export const propertyManagersData = makeRows(ACCT_NAMES.slice(0, 10), ACCT_EMAILS.slice(0, 10), ACCT_PHONES.slice(0, 10), ACCT_STATUSES, ACCT_DATES, ['Residential', 'Commercial', 'Industrial'])
