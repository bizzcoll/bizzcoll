import DashboardLayout from '@/app/components/Layout/DashboardLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="INFLUENCER">{children}</DashboardLayout>
}
