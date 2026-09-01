MCOE CMS BATCH PATCH
====================

This is a cumulative dashboard/content patch.

Real CRUD modules included:
- Working Groups
- Articles
- News
- Events

Existing public behavior preserved:
- Working Groups remain publicly readable.
- Articles: public API returns published only.
- News: public API returns published only.
- Events: public API remains publicly readable.
- POST/PATCH/DELETE require authenticated Django staff.

Admin routes:
- /dashboard/workgroups
- /dashboard/articles
- /dashboard/news
- /dashboard/events

JWT:
- Admin write requests use the existing Django JWT access token.
- 401 can refresh the access token once.

Uploads:
- Working Group image
- Article featured image
- News featured image
- Event banner image

No Django model changes.
No migration required.

Not implemented as fake CRUD:
- Teachers
- Students
- Online Classes
- SMS
- Site Content

Those remain placeholders because the current Django project does not yet
have a confirmed data model/API contract for them. They should be designed
and added together in the next backend expansion instead of invented piecemeal.

APPLY
-----
cd ~/Downloads/mcoe
unzip -o ~/Downloads/mcoe_cms_batch_patch.zip -d .

CHECK
-----
cd ~/Downloads/mcoe/backend
source .venv/bin/activate
python manage.py check

cd ~/Downloads/mcoe
npm run lint
npm run typecheck
npm run build

RUNTIME TEST
------------
Start Django and Vite, then test:

/dashboard/workgroups
/dashboard/articles
/dashboard/news
/dashboard/events

For Articles and News:
- create draft
- verify dashboard sees it
- verify public site does not
- publish it
- verify public site sees it

For Events:
- create an upcoming disposable event
- edit it
- verify public events page updates
- delete the disposable event
