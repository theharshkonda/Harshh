# Data Engineering + AI Portfolio

Premium static portfolio built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, GSAP, and shadcn-style UI components.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber / Three.js
- GSAP
- Static JSON content
- GitHub Pages compatible

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site is configured for static hosting with `base: "./"` in [vite.config.js](/C:/Users/harsh/Downloads/20260504_143302__elementor_elementor__35514_boosted-20260527T041643Z-3-001/20260504_143302__elementor_elementor__35514_boosted/vite.config.js).

## Customize content

Edit the JSON file at [public/data/portfolio.json](/C:/Users/harsh/Downloads/20260504_143302__elementor_elementor__35514_boosted-20260527T041643Z-3-001/20260504_143302__elementor_elementor__35514_boosted/public/data/portfolio.json).

You can update:

- Hero copy and metrics
- About timeline
- Skills
- Experience
- Projects
- Certifications
- Contact links

## Resume asset

The resume download button points to `./Harshvardhan_Konda_AI.pdf`. Replace that file in the repo root if you want a newer PDF with the same link.

## GitHub Pages deployment

1. Push this repo to GitHub.
2. In GitHub, open `Settings > Pages`.
3. Set the source to `GitHub Actions`.
4. The workflow at `.github/workflows/deploy.yml` will build and publish the `dist/` folder on every push to `main`.

## Notes

- The project is fully static. No backend, database, or SSR is required.
- Asset URLs are relative, so the site works on GitHub Pages project sites.
- The 3D hero scene is lazy-loaded to keep initial load lighter.
