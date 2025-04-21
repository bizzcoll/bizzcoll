import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.auth_users.findMany({
    where: {
      role: 'authenticated',
    },
    include: {
      public_user: {
        select: {
          type: true,
        },
      },
    },
  })

  console.log('🧍 Authenticated Users (with full info + dashboard role):\n')

  users.forEach((user, index) => {
    const {
      id,
      email,
      role,
      aud,
      encrypted_password,
      confirmed_at,
      created_at,
      updated_at,
      last_sign_in_at,
      raw_user_meta_data,
    } = user

    const dashboardRole = (raw_user_meta_data as any)?.role ?? '❌ Missing'
    const fullName = (raw_user_meta_data as any)?.full_name ?? '❌ Missing'

    console.log(`📦 User #${index + 1}`)
    console.log(`🆔 ID:               ${id}`)
    console.log(`📧 Email:            ${email}`)
    console.log(`👤 Display Name:     ${fullName}`)
    console.log(`🔐 Encrypted PW:     ${encrypted_password}`)
    console.log(`🧩 Role:             ${role} | 🎭 Audience: ${aud}`)
    console.log(`✅ Confirmed At:     ${confirmed_at}`)
    console.log(`🕐 Created At:       ${created_at}`)
    console.log(`🔄 Updated At:       ${updated_at}`)
    console.log(`🧠 Last Sign-In:     ${last_sign_in_at}`)
    console.log(`🎯 Dashboard Role:   ${dashboardRole}`)
    console.log('---------------------------\n')
  })
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
