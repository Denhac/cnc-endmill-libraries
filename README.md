# cnc-endmill-libraries

Tool libraries for the endmills used on Denhac's CNC router.

- `F360.json` — Fusion 360 tool library. Import it in Fusion 360 from the
  **Manage → Tool Library** dialog.

## Endmill website

The `site/` directory holds a [Hugo](https://gohugo.io/) site that lists every
tool in `F360.json`, with its geometry and feeds & speeds presets. It is
published with GitHub Pages at:

https://denhac.github.io/cnc-endmill-libraries/

The site reads `F360.json` straight from the repository root, so updating the
library and merging to `main` is all it takes to update the site. The
[Endmill site workflow](.github/workflows/site.yml) builds and deploys it, and
also builds (without deploying) pull requests that change the library, which
catches invalid JSON before it's merged.

### Setting up GitHub Pages

This only needs to be done once, by a repository admin.

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Go to the **Actions** tab, select **Endmill site**, and click
   **Run workflow** on the `main` branch to publish the site for the first time.
   (Any later push to `main` that touches `F360.json` or `site/` deploys
   automatically.)
4. When the run finishes, the site is live at
   https://denhac.github.io/cnc-endmill-libraries/. The URL is also shown on
   the **Settings → Pages** screen.

If the deploy job fails with an environment protection error, go to
**Settings → Environments → github-pages** and make sure `main` is allowed
under **Deployment branches and tags**.

To use a custom domain (for example `endmills.denhac.org`), enter it under
**Settings → Pages → Custom domain** and add a `CNAME` DNS record pointing to
`denhac.github.io`. Then update `baseURL` in `site/hugo.toml` to match.

### Local development

Install Hugo (extended edition, v0.155 or later), then:

```sh
cd site
hugo server
```

Open http://localhost:1313/cnc-endmill-libraries/.

### Site layout

- `site/hugo.toml` — configuration; mounts `../F360.json` as Hugo data.
- `site/content/tools/_content.gotmpl` — generates one page per tool.
- `site/layouts/home.html` — searchable, sortable tool table.
- `site/layouts/page.html` — tool detail page.
- `site/layouts/_partials/` — tool lookup and number/fraction formatting.
