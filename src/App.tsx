import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './components/layout/RequireAuth'
import AppShell from './components/layout/AppShell'
import DashboardPage from './pages/DashboardPage'
import GenericPage from './pages/GenericPage'
import LoginPage from './pages/LoginPage'

// Agent Portal
import ListingsPage from './portal/pages/ListingsPage'
import PropertyDetailPage from './portal/pages/PropertyDetailPage'
import SavedSearchesPage from './portal/pages/SavedSearchesPage'

// Documents
import DocumentsPage from './pages/DocumentsPage'

// Distribution
import DistributionPage from './pages/DistributionPage'

// Accounts
import ClientsPage from './pages/accounts/ClientsPage'

// Marketing
import WebsitePage from './pages/marketing/WebsitePage'
import BrochuresPage from './pages/marketing/BrochuresPage'

// Property
import ProjectsPage from './pages/property/ProjectsDashboardPage'
import LotsPage from './pages/property/LotsDashboardPage'
import PackageBuilderPage from './pages/property/PackageBuilderPage'

// Construction Library
import ConstructionLibraryPage from './pages/property/ConstructionLibraryPage'

// Sales
import SalesPage from './pages/SalesPage'
import SalesCreatePage from './pages/SalesCreatePage'

// Tools
import ResourcesPage from './pages/ResourcesPage'

// Reports
import NetworkActivityPage from './pages/reports/NetworkActivityPage'

// Website
import WordPressPage from './pages/website/WordPressPage'

// Online Forms
import PropertyEnquiryPage from './pages/forms/PropertyEnquiryPage'
import PropertyEnquiryCreatePage from './pages/forms/PropertyEnquiryCreatePage'

// Other
import OtherServicesPage from './pages/OtherServicesPage'
import BotInABoxPage from './pages/BotInABoxPage'
import AddBotPage from './pages/AddBotPage'
import AffiliatesPage from './pages/accounts/AffiliatesPage'
import SubscribersPage from './pages/accounts/SubscribersPage'
import BDMsPage from './pages/accounts/BDMsPage'
import SalesAgentsPage from './pages/accounts/SalesAgentsPage'
import ReferralPartnersPage from './pages/accounts/ReferralPartnersPage'
import DevelopersPage from './pages/accounts/DevelopersPage'
import PIABAdminsPage from './pages/accounts/PIABAdminsPage'
import PropertyManagersPage from './pages/accounts/PropertyManagersPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="dashboard" element={<DashboardPage />} />

          {/* Agent Portal — inside CRM shell */}
          <Route path="portal/listings" element={<ListingsPage />} />
          <Route path="portal/listings/:id" element={<PropertyDetailPage />} />
          <Route path="portal/saved-searches" element={<SavedSearchesPage />} />

          {/* Documents */}
          <Route path="documents" element={<DocumentsPage />} />

          {/* Distribution */}
          <Route path="distribution" element={<DistributionPage />} />

          {/* Accounts */}
          <Route path="accounts/clients" element={<ClientsPage />} />
          <Route path="accounts/affiliates" element={<AffiliatesPage />} />
          <Route path="accounts/subscribers" element={<SubscribersPage />} />
          <Route path="accounts/bdms" element={<BDMsPage />} />
          <Route path="accounts/sales-agents" element={<SalesAgentsPage />} />
          <Route path="accounts/referral-partners" element={<ReferralPartnersPage />} />
          <Route path="accounts/developers" element={<DevelopersPage />} />
          <Route path="accounts/piab-admins" element={<PIABAdminsPage />} />
          <Route path="accounts/property-managers" element={<PropertyManagersPage />} />

          {/* Marketing */}
          <Route path="marketing/website" element={<WebsitePage />} />
          <Route path="marketing/landing-page" element={<GenericPage title="Landing Page" subtitle="Manage landing pages" />} />
          <Route path="marketing/brochures" element={<BrochuresPage />} />

          {/* Property Portal */}
          <Route path="property/projects" element={<ProjectsPage />} />
          <Route path="property/lots" element={<LotsPage />} />
          <Route path="property/package-builder" element={<PackageBuilderPage />} />
          <Route path="property/construction-library" element={<ConstructionLibraryPage />} />
          <Route path="property/favourites" element={<GenericPage title="Favourites" subtitle="Saved favourite properties" />} />
          <Route path="property/featured" element={<GenericPage title="Featured" subtitle="Featured property listings" />} />
          <Route path="property/potential-properties" element={<GenericPage title="Potential Properties" subtitle="Prospective property pipeline" />} />

          {/* Sales */}
          <Route path="sales" element={<SalesPage />} />
          <Route path="sales/create" element={<SalesCreatePage />} />

          {/* Reports */}
          <Route path="reports/network-activity" element={<NetworkActivityPage />} />
          <Route path="reports/notes-history" element={<GenericPage title="Notes History" subtitle="All notes across accounts" />} />
          <Route path="reports/login-history" element={<GenericPage title="Log In History" subtitle="User login audit trail" />} />
          <Route path="reports/same-device" element={<GenericPage title="Same Device Detection" subtitle="Multi-account device detection" />} />
          <Route path="reports/reservations" element={<GenericPage title="Reservations" subtitle="Property reservation reports" />} />
          <Route path="reports/tasks" element={<GenericPage title="Tasks" subtitle="Task completion reports" />} />
          <Route path="reports/spr-history" element={<GenericPage title="SPR History" subtitle="Search property request history" />} />

          {/* Website */}
          <Route path="website/wordpress" element={<WordPressPage />} />
          <Route path="website/landing-page" element={<GenericPage title="Landing Page" subtitle="Website landing pages" />} />
          <Route path="website/api-keys" element={<GenericPage title="Approved API Keys" subtitle="Manage approved API keys" />} />

          {/* Online Forms */}
          <Route path="forms/property-enquiry" element={<PropertyEnquiryPage />} />
          <Route path="forms/property-enquiry/create" element={<PropertyEnquiryCreatePage />} />
          <Route path="forms/property-search" element={<GenericPage title="Property Search Request" subtitle="Search request submissions" />} />
          <Route path="forms/property-reservation" element={<GenericPage title="Property Reservation" subtitle="Online reservation forms" />} />
          <Route path="forms/finance-assessment" element={<GenericPage title="Finance Assessment" subtitle="Finance assessment submissions" />} />

          {/* Tools */}
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="mail-list" element={<GenericPage title="Mail List" subtitle="Email subscriber lists" />} />
          <Route path="mail-status" element={<GenericPage title="Mail Status" subtitle="Email delivery status" />} />
          <Route path="bot-in-a-box" element={<BotInABoxPage />} />
          <Route path="bot-in-a-box/add" element={<AddBotPage />} />
          <Route path="ad-management" element={<GenericPage title="Ad Management" subtitle="Advertising campaign management" />} />
          <Route path="other-services" element={<OtherServicesPage />} />

          <Route path="*" element={<GenericPage title="Not Found" subtitle="This page does not exist" />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
