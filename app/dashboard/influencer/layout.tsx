import DashboardLayout from '@/app/components/Layout/DashboardLayout'
import ApprovalGuardWrapper from './ApprovalGuardWrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="INFLUENCER">
      <ApprovalGuardWrapper />
      {children}
    </DashboardLayout>
  )
}
