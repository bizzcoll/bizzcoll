'use client'

import useApprovalGuard from '@/lib/auth/useApprovalGuard'

export default function ApprovalGuardWrapper() {
  useApprovalGuard()
  return null
}
