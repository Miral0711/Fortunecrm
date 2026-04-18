import { useState } from 'react'
import { Plus, MoreVertical, Play, ExternalLink, FileText, BookOpen, File, ClipboardList, Monitor } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type TabId = 'videos' | 'ebooks' | 'documents' | 'forms' | 'presentations'

interface ResourceItem {
  id: string
  title: string
  urlFile: string
  isUrl: boolean
  tab: TabId
}

// ── Data ──────────────────────────────────────────────────────────────────────

const RESOURCES: ResourceItem[] = [
  // Training & Videos
  { id:'1',  tab:'videos', title:'How to submit a property enquiry, property search request and reservation form', urlFile:'Forms-PIAB.mp4',                          isUrl:false },
  { id:'2',  tab:'videos', title:'How to create a WordPress website',                                              urlFile:'Wordpress-PIAB.mp4',                      isUrl:false },
  { id:'3',  tab:'videos', title:'How to create a property brochure with your own branding',                       urlFile:'Brochures-PIAB.mp4',                      isUrl:false },
  { id:'4',  tab:'videos', title:'How to create a landing page',                                                   urlFile:'How-to-Create-Landing-Pages.mp4',         isUrl:false },
  { id:'5',  tab:'videos', title:'How to modify your Real Estate and Wealth Creation Website',                     urlFile:'Modify-Websites-PIAB.mp4',                isUrl:false },
  { id:'6',  tab:'videos', title:'How to add a client (manual or bulk upload)',                                    urlFile:'Clients-PIAB.mp4',                        isUrl:false },
  { id:'7',  tab:'videos', title:'How to add a referral partner account',                                          urlFile:'Referral-Partner-PIAB.mp4',               isUrl:false },
  { id:'8',  tab:'videos', title:'How to update a client and referral partner accounts',                           urlFile:'Updating-Referral-Partner-Info-PIAB.mp4', isUrl:false },
  { id:'9',  tab:'videos', title:'How to login to Fusion CRM and update your account profile',                     urlFile:'Log-in-and-Profile-Update-PIAB.mp4',      isUrl:false },
  { id:'10', tab:'videos', title:'How to search for properties and commissions payable',                           urlFile:'How-to-Search-for-Properties-PIAB.mp4',   isUrl:false },
  { id:'11', tab:'videos', title:'How to setup your email settings and mail list creation',                        urlFile:'Mail-list-and-Email-Settings-PIAB.mp4',   isUrl:false },
  { id:'12', tab:'videos', title:'Bot In A Box',                                                                   urlFile:'BotInABox_2.mp4',                         isUrl:false },
  { id:'13', tab:'videos', title:'Property Info Session APRIL 2024 – Gallery Group & PI Store',                   urlFile:'https://youtu.be/lGFVN3_Sc58',            isUrl:true  },
  { id:'14', tab:'videos', title:'Property Info Session MAY 2024 – PI Store & Altitude Homes',                    urlFile:'https://youtu.be/GaHbFYuNc.k',            isUrl:true  },
  { id:'15', tab:'videos', title:'Property Info Session JUNE 2024 – Property Investment Store',                   urlFile:'https://youtu.be/DUJ8BkWrl',              isUrl:true  },
  { id:'16', tab:'videos', title:'Property Info Session JULY 2024 – Gallery Group & PI Store',                    urlFile:'https://www.youtube.com/watch?v=9aR4FLbrwEU', isUrl:true },
  { id:'17', tab:'videos', title:'Property Info Session FEBRUARY 2025 – Tony Vallone & Hartik Shah',              urlFile:'https://www.youtube.com/watch?v=2vJqp6EkRrm', isUrl:true },
  { id:'18', tab:'videos', title:'Training Module 6 – Systems & Processes',                                       urlFile:'https://youtu.be/90spU-LJt8M',            isUrl:true  },
  { id:'19', tab:'videos', title:'17 July 2025 Property Info Session – Your Prop, AusHomes and Flexi Property Solutions', urlFile:'https://youtu.be/lgZly2Cct1E', isUrl:true },
  { id:'20', tab:'videos', title:'Oct 2025 Property Info Session with Select Project Marketing',                   urlFile:'https://youtu.be/hRLlGQVoxkM',            isUrl:true  },
  // Ebooks
  { id:'21', tab:'ebooks', title:'Real Estate Investment Guide 2025',          urlFile:'RE-Investment-Guide-2025.pdf',   isUrl:false },
  { id:'22', tab:'ebooks', title:'First Home Buyer Handbook',                  urlFile:'First-Home-Buyer-Handbook.pdf',  isUrl:false },
  { id:'23', tab:'ebooks', title:'Property Market Outlook – Q2 2026',          urlFile:'Market-Outlook-Q2-2026.pdf',     isUrl:false },
  { id:'24', tab:'ebooks', title:'SMSF Property Investment Explained',         urlFile:'SMSF-Property-Guide.pdf',        isUrl:false },
  // Documents
  { id:'25', tab:'documents', title:'Referral Partner Agreement Template',     urlFile:'Referral-Partner-Agreement.docx', isUrl:false },
  { id:'26', tab:'documents', title:'Client Onboarding Checklist',             urlFile:'Client-Onboarding-Checklist.pdf', isUrl:false },
  { id:'27', tab:'documents', title:'Commission Structure Overview',            urlFile:'Commission-Structure.pdf',        isUrl:false },
  { id:'28', tab:'documents', title:'Privacy Policy & Terms of Service',       urlFile:'Privacy-Policy.pdf',              isUrl:false },
  // Forms
  { id:'29', tab:'forms', title:'Property Enquiry Form Template',              urlFile:'Property-Enquiry-Form.pdf',       isUrl:false },
  { id:'30', tab:'forms', title:'Finance Assessment Form',                     urlFile:'Finance-Assessment-Form.pdf',     isUrl:false },
  { id:'31', tab:'forms', title:'Property Reservation Form',                   urlFile:'Property-Reservation-Form.pdf',  isUrl:false },
  // Presentations
  { id:'32', tab:'presentations', title:'Fusion CRM Platform Overview – 2025', urlFile:'Platform-Overview-2025.pptx',    isUrl:false },
  { id:'33', tab:'presentations', title:'Property Investment Masterclass Deck', urlFile:'Investment-Masterclass.pptx',   isUrl:false },
  { id:'34', tab:'presentations', title:'BDM Onboarding Presentation',         urlFile:'BDM-Onboarding.pptx',            isUrl:false },
]

const TABS: { id: TabId; label: string; icon: typeof Monitor }[] = [
  { id: 'videos',        label: 'Training & Videos', icon: Monitor      },
  { id: 'ebooks',        label: 'Ebooks',            icon: BookOpen     },
  { id: 'documents',     label: 'Documents',         icon: File         },
  { id: 'forms',         label: 'Forms',             icon: ClipboardList},
  { id: 'presentations', label: 'Presentations',     icon: FileText     },
]

// ── Row menu ──────────────────────────────────────────────────────────────────

function RowMenu({ item }: { item: ResourceItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
          {['View / Play', 'Download', 'Edit', 'Delete'].map(a => (
            <button key={a} onClick={() => setOpen(false)}
              className={`w-full text-left px-3 py-2 text-xs transition-colors ${a === 'Delete' ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}>
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [activeTab,    setActiveTab]    = useState<TabId>('videos')
  const [activeVideo,  setActiveVideo]  = useState<ResourceItem | null>(null)
  const [menuOpen,     setMenuOpen]     = useState(false)

  const tabItems = RESOURCES.filter(r => r.tab === activeTab)

  function playItem(item: ResourceItem) {
    setActiveVideo(item)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-5">
      {/* ── Main card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Tabs + actions in one row */}
        <div className="flex items-center justify-between px-4 pt-4 pb-0 border-b border-gray-100">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map(tab => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4 pb-2">
            <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 text-gray-500 transition-colors">
              <Monitor className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        {/* Video player — only on videos tab */}
        {activeTab === 'videos' && (
          <div className="relative bg-black mx-4 mt-4 rounded-xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
            {activeVideo ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-12 h-12 mx-auto mb-3 text-orange-400" />
                  <p className="text-sm font-medium">{activeVideo.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{activeVideo.urlFile}</p>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="mt-3 text-xs text-orange-400 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <button
                  onClick={() => tabItems[0] && playItem(tabItems[0])}
                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-2xl"
                >
                  <Play className="w-7 h-7 text-white ml-1" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="px-4 py-4">
          {activeTab === 'videos' && (
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Fusion CRM Training Videos</h3>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="w-8 px-3 py-2.5" />
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">URL / File</th>
                  <th className="w-16 px-3 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {tabItems.map(item => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${activeVideo?.id === item.id ? 'bg-orange-50/50' : ''}`}
                  >
                    {/* Icon */}
                    <td className="px-3 py-2.5">
                      <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                        {activeTab === 'videos'        && <Monitor      className="w-3 h-3 text-gray-500" />}
                        {activeTab === 'ebooks'        && <BookOpen     className="w-3 h-3 text-gray-500" />}
                        {activeTab === 'documents'     && <File         className="w-3 h-3 text-gray-500" />}
                        {activeTab === 'forms'         && <ClipboardList className="w-3 h-3 text-gray-500" />}
                        {activeTab === 'presentations' && <FileText     className="w-3 h-3 text-gray-500" />}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-3 py-2.5">
                      <button
                        onClick={() => activeTab === 'videos' && playItem(item)}
                        className={`text-xs text-left leading-snug ${activeTab === 'videos' ? 'text-gray-700 hover:text-orange-600 transition-colors cursor-pointer' : 'text-gray-700 cursor-default'}`}
                      >
                        {item.title}
                      </button>
                    </td>

                    {/* URL / File */}
                    <td className="px-3 py-2.5">
                      {item.isUrl ? (
                        <a
                          href={item.urlFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-orange-500 hover:underline flex items-center gap-1 truncate max-w-[260px]"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{item.urlFile}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-orange-500 truncate max-w-[260px] block">{item.urlFile}</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-3 py-2.5 text-right">
                      <RowMenu item={item} />
                    </td>
                  </tr>
                ))}

                {tabItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-xs text-gray-400">
                      No {TABS.find(t => t.id === activeTab)?.label.toLowerCase()} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
