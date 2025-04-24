# scripts/admin-register.ps1
$body = @{
  full_name = "Admin Dishi"  # השתמש באותיות לטיניות כדי למנוע תקלות קידוד
  email     = "dvirdishi@gmail.com"
  password  = "123456"
  secret    = "dvirdishi@gmail.com"
} | ConvertTo-Json -Depth 3

$response = Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/register-admin" `
  -ContentType "application/json" -Body $body

Write-Host "`n--- תוצאת הקריאה ---`n"
$response | Format-List
