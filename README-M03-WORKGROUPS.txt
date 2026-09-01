MCOE Dashboard M03 - Working Groups CRUD

This patch is based on the correct school-admin UI and the current Django WorkingGroup model.

Backend
-------
- Adds PublicReadAdminWritePermission.
- Converts WorkingGroupViewSet from ReadOnlyModelViewSet to ModelViewSet.
- Public GET/list/detail remain available.
- POST/PATCH/DELETE require an authenticated Django staff user.
- Multipart uploads are enabled for the WorkingGroup image field.
- No database model changes, so no migration is required.

Frontend
--------
- Adds a Base44-free EntityManager adapted from the correct school admin export.
- /dashboard/workgroups is now a real management page.
- Supports list, search, create, edit, delete, image replacement, bilingual fields, slug, icon, and sort order.
- Uses the current Django JWT tokens.
- Automatically refreshes the access token once if an admin write returns 401.
- Does not add Base44 SDK/runtime code.

Apply
-----
cd ~/Downloads/mcoe
unzip -o ~/Downloads/mcoe_m03_workgroups_crud_patch.zip -d .

Checks
------
cd ~/Downloads/mcoe/backend
source .venv/bin/activate
python manage.py check

cd ~/Downloads/mcoe
npm run lint
npm run typecheck
npm run build

Open
----
http://localhost:5173/dashboard/workgroups
