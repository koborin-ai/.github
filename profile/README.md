<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/koborin-ai/brand/raw/main/lockup/pixel/png/transparent/horizontal@2x.png">
    <img src="https://github.com/koborin-ai/brand/raw/main/lockup/pixel/png/on-light/horizontal@2x.png" alt="koborin.ai">
  </picture>
</p>

Personal org for orbiting code, sound, and pause.

[![Built on Blacksmith](https://img.shields.io/badge/Built%20on-Blacksmith-F0FB29?style=for-the-badge&labelColor=202020)](https://www.blacksmith.sh/)

## Architecture

The site is static Astro on Cloudflare Workers. It is a TerraDart stack applied from GitHub Actions, with Terraform state in R2.

<p align="center">
  <img src="https://github.com/koborin-ai/.github/raw/main/profile/architecture.svg" alt="koborin.ai architecture: GitHub Actions deploy to Cloudflare (DNS, Workers, R2)">
</p>

| Host | Repository | Runs on |
| --- | --- | --- |
| [koborin.ai](https://koborin.ai) | [koborin-ai/site](https://github.com/koborin-ai/site#readme) | Cloudflare Workers (static assets) |

Each repository's README has the detailed architecture and CI/CD. The diagram source is [`architecture.drawio`](./architecture.drawio).

Owned by [@nozomi-koborinai](https://github.com/nozomi-koborinai).
