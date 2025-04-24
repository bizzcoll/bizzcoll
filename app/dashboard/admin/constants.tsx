import { Briefcase, ShieldCheck, User } from 'lucide-react'
import { JSX } from 'react';

export const roleDisplayMap: Record<string, { label: string; icon: JSX.Element }> = {
  INFLUENCER: { label: 'Influencer', icon: <User className="w-4 h-4" /> },
  DEAL_MAKER: { label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
  ADMIN: { label: 'Admin', icon: <ShieldCheck className="w-4 h-4" /> },
}
