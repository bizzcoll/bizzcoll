  //npx tsx prisma-test.ts
  import { PrismaClient } from '@prisma/client'
  import fs from 'fs'
  import readline from 'readline'

  const prisma = new PrismaClient()

  async function askToSaveCSV(data: string) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question('📁 do you want to save users in users.csv? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        fs.writeFileSync('users.csv',
          'Index,ID,Email,Full Name,Role,Dashboard Role,Created At,Last Sign-In\n' + data
        )
        console.log('✅ saved users.csv sucssecfuly!')
      } else {
        console.log('❌ file did not saved.')
      }
      rl.close()
    })
  }

  async function main() {
    const users = await prisma.auth_users.findMany({
      where: {
        role: 'authenticated',
      },
    })
    

    const tableData = users.map((user, index) => {
      const metadata = user.raw_user_meta_data as any
      return {
        '#': index + 1,
        ID: user.id.slice(0, 8) + '...',
        Email: user.email,
        Name: metadata?.full_name ?? '❌',
        Role: user.role,
        'Dashboard Role': metadata?.role ?? '❌',
        'Created At': user.created_at?.toISOString().split('T')[0],
        'Last Sign-In': user.last_sign_in_at?.toISOString().split('T')[0],
      }
    })

    console.log('\n🧍 Registered Authrized Users (Table View)):\n')
    console.table(tableData)

    // הכנה ל־CSV
    const csvData = users.map((user, index) => {
      const meta = user.raw_user_meta_data as any
      return [
        index + 1,
        user.id,
        user.email,
        meta?.full_name ?? '❌ Missing',
        user.role,
        meta?.role ?? '❌ Missing',
        user.created_at?.toISOString(),
        user.last_sign_in_at?.toISOString(),
      ].join(',')
    }).join('\n')

    await askToSaveCSV(csvData)
  }

  main()
    .catch((e) => {
      console.error('❌ Error:', e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
