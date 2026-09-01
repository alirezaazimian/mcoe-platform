MCOE Dashboard M04 - Articles CRUD

Backend
-------
- Converts ArticleViewSet to ModelViewSet.
- Public article GET requests still return only published articles.
- Staff requests to /api/articles/?admin=true return all article statuses.
- POST/PATCH/DELETE require an authenticated Django staff user.
- JSON and multipart requests are supported.
- No model changes and no migration is required.

Frontend
--------
- /dashboard/articles is now a real article management page.
- Supports list/search/create/edit/delete.
- Supports draft, pending review, approved, published, archived.
- Supports categories, tags, author, reading time, publish date.
- Supports featured image upload/replacement and featured toggle.
- Supports Persian and English title, summary, body and slugs.
- Public /articles and /articles/:id continue using the public published-only API.
- No Base44 runtime is added.

Apply
-----
cd ~/Downloads/mcoe
unzip -o ~/Downloads/mcoe_m04_articles_crud_patch.zip -d .

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
http://localhost:5173/dashboard/articles

Recommended runtime test
------------------------
1. Create a Draft article.
2. Confirm it appears in /dashboard/articles.
3. Confirm it does NOT appear on public /articles.
4. Edit it and set status=published + publish date.
5. Confirm it appears on public /articles.
6. Test image replacement.
7. Delete only a disposable test article.
