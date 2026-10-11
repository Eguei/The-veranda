# The Veranda

Essays on Ghana's built environment by Joseph Eguei Yartey.

This folder is the complete website. It is built with Eleventy, hosted free on Netlify, and edited through Pages CMS, a simple writing panel that runs in your browser.

---

## Going live (about 30 minutes, one time only)

### 1. Put the site on GitHub (free)

1. Create an account at **github.com**.
2. Click **+ → New repository**. Name it `the-veranda`, keep it **Public** or **Private**, and click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Unzip `the-veranda.zip` on your computer. Open the `the-veranda` folder, select **everything inside it**, and drag it into the GitHub upload box. Click **Commit changes**.

   Make sure the hidden files `.pages.yml` and `.gitignore` are included. On Windows, turn on *View → Show → Hidden items* in File Explorer. On a Mac, press **Cmd + Shift + .** in Finder.

### 2. Publish with Netlify (free)

1. Go to **netlify.com** and sign up with your GitHub account.
2. Click **Add new site → Import an existing project → GitHub**, and choose `the-veranda`.
3. Netlify reads the settings from `netlify.toml`, so leave them as they are. Click **Deploy**.
4. After about a minute, your site is live at an address like `random-name-123.netlify.app`. Under **Site configuration → Change site name**, rename it to `the-veranda` (or the closest available name).
5. Turn on newsletter sign-ups: go to **Forms** and click **Enable form detection**, then click **Deploy site** once more under **Deploys → Trigger deploy**. Each new subscriber's email address appears under **Forms → letter**.

### 3. Connect theverandajournal.com (domain on Cloudflare)

The site is already set to use https://theverandajournal.com.

1. In Netlify, go to **Domain management → Add a domain**, type `theverandajournal.com` and confirm. Netlify will offer to add `www.theverandajournal.com` too; accept, and set **theverandajournal.com** as the primary domain.
2. In Netlify, choose **external DNS** (do not move your DNS to Netlify). Note your Netlify site address, e.g. `the-veranda.netlify.app`.
3. In Cloudflare, open **theverandajournal.com → DNS → Records** and add two records:

   | Type | Name | Target | Proxy status |
   |---|---|---|---|
   | CNAME | `@` | `the-veranda.netlify.app` | **DNS only** (grey cloud) |
   | CNAME | `www` | `the-veranda.netlify.app` | **DNS only** (grey cloud) |

   Use your own Netlify address as the target. Delete any older A or CNAME records for `@` or `www` first. The grey cloud matters: Netlify can't issue your security certificate if the orange cloud is on.
4. Back in Netlify, under **Domain management → HTTPS**, click **Verify DNS configuration**, then **Provision certificate**. Within an hour or so, https://theverandajournal.com is live.

### Email on your domain (free)

In Cloudflare, open **theverandajournal.com → Email → Email Routing**, turn it on, and create an address such as `joseph@theverandajournal.com` that forwards to your Gmail. Cloudflare adds the needed records for you.

### 4. Set up your writing panel

1. Go to **app.pagescms.org** and sign in with GitHub.
2. Install Pages CMS on your `the-veranda` repository when it asks.
3. Open the repository. You'll see **Essays** and **Journal settings** in the menu.

---

## Publishing an essay

1. In Pages CMS, open **Essays → Add an entry**.
2. Fill in the **Title** and **Summary**. The summary appears under the title and in LinkedIn, X and WhatsApp previews.
3. Choose a **Section** and **Publish date**, and add a wide **Cover photo** with a short caption.
4. Write the essay in the **Essay** box. Use headings for sections and the quote button for pull quotes.
5. Leave **Draft** ticked while you're writing. When you're ready, untick it and click **Save**.
6. Netlify rebuilds the site automatically, and the essay is live within about a minute.

To make an essay the big cover story on the home page, tick **Show as the cover essay**. Only tick it on one essay at a time. If none is ticked, the newest essay becomes the cover.

### Photos with captions

In the essay editor, insert an image and give it a **title**. The title appears as a caption under the photo.

### Changing the home page

In **Journal settings** you can change the issue line at the top ("Issue Nº 01 · October 2026"), the About paragraph, your LinkedIn and X links, and the **Coming next** list on the home page. Upcoming titles disappear from the list as real essays take their place.

---

## Folder guide

| Path | What it is |
|---|---|
| `src/posts/` | Your essays (one file each) |
| `src/media/` | Photos and images |
| `src/_data/site.json` | Journal settings |
| `src/about.md` | The About page |
| `src/_includes/` | Page layouts (design) |
| `src/assets/` | Styles, fonts and the cover animation |
| `.pages.yml` | Writing panel settings |
| `netlify.toml` | Hosting settings |

## Previewing on your own computer (optional)

Install Node.js, then run in this folder:

```
npm install
npm start
```

Open http://localhost:8080 to see the site.
