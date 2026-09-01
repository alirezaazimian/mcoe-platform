MCOE Correct Admin UI - M01

Source basis:
- admin-panel-mcoe(1).zip
- Uses the School Administration UI, not the earlier project-management dashboard.

What M01 does:
- Adds the actual school admin visual shell under /dashboard
- Preserves the warm neumorphic design, school sidebar, topbar, Jalali clock/date, bilingual FA/EN controls, mobile navigation
- Uses the existing Django JWT AuthContext
- Uses the existing Django read API on the dashboard overview for:
  * working groups
  * events
  * articles
  * news
- Leaves Students / Teachers / Online Classes / SMS / Site Content as visible modules but not yet connected
- Does not add @base44/sdk, Base44 auth, Base44 entities, or Base44 plugins

Important:
- M01 protects /dashboard by authentication only.
- Staff/superuser authorization is M02 and must be completed before production.
- CRUD migration comes after visual verification.

Apply:
  cd ~/Downloads/mcoe
  unzip -o ~/Downloads/mcoe_admin_correct_m01_patch.zip -d .

Test:
  npm run lint
  npm run typecheck
  npm run build

Run:
  npm run dev

Open:
  http://127.0.0.1:5173/dashboard
