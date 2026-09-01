MCOE M04 Typecheck Fix

Fixes only TypeScript inference errors introduced by M04.

Files:
- src/api/djangoApi.js
- src/components/dashboard/EntityManager.jsx

Changes:
- Adds JSDoc typing for the generic Django request helper.
- Uses Headers instead of spreading an inferred empty object.
- Normalizes React Query data to an array.
- Gives the save/delete mutation functions explicit variable shapes.
- Makes prepareRecordForForm and preparePayload optional so WorkgroupsAdmin remains valid.

Apply:
cd ~/Downloads/mcoe
unzip -o ~/Downloads/mcoe_m04_typecheck_fix.zip -d .

Then:
npm run lint
npm run typecheck
npm run build
