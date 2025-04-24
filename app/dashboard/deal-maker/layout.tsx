import DashboardLayout from '@/app/components/Layout/DashboardLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="DEAL_MAKER">{children}</DashboardLayout>
}
