# Source images

The two **original, unedited** files are already here with the right names (they are the files the client sent). If you ever replace them, keep these exact names:

| File | What it is | Expected size |
|---|---|---|
| `logo-original.jpg` | Crest Advocates stacked logo on navy | 1080 × 1080 |
| `owner-original.jpg` | Lynn Ngugi's portrait (candid, at her desk) | 3072 × 4096 |

Then, from the project root:

```
node scripts/prepare-assets.mjs
```

This writes the web-ready files into `public/images/`. The script checks the sizes first and stops with a clear message if the files are not the originals, because the crop boxes were measured on these exact images.

**Do not display `owner-original.jpg` anywhere on the site.** The foreground shows client files.

When the client provides a professional headshot or an SVG/transparent PNG of the logo, replace the files here, update the crop boxes at the top of `scripts/prepare-assets.mjs`, and run it again.
