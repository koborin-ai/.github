<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/koborin-ai/brand/raw/main/lockup/lockup-dark-256.png">
    <img src="https://github.com/koborin-ai/brand/raw/main/lockup/lockup-light-256.png" alt="koborin.ai" width="440">
  </picture>
</p>

Personal org for orbiting code, sound, and pause.

[![Built on Blacksmith](https://img.shields.io/badge/Built%20on-Blacksmith-F0FB29?style=for-the-badge&labelColor=202020)](https://www.blacksmith.sh/)

## Architecture

The site is static Astro on Cloudflare Workers. GitHub Actions runs the TerraDart site stack with the `terradart` CLI, which fetches the OpenTofu engine. `plan-infra` runs `terradart plan`. `release-infra` runs `terradart apply`. State is in the R2 bucket `koborin-ai-tfstate`.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/koborin-ai/.github/raw/main/profile/architecture-dark.svg">
    <img src="https://github.com/koborin-ai/.github/raw/main/profile/architecture-light.svg" alt="koborin.ai architecture. GitHub Actions deploys to Cloudflare DNS, Workers static assets, and R2 state.">
  </picture>
</p>

| Host | Repository | Runs on |
| --- | --- | --- |
| [koborin.ai](https://koborin.ai) | [koborin-ai/site](https://github.com/koborin-ai/site#readme) | Cloudflare Workers (static assets) |

Each repository's README has the detailed architecture and CI/CD.

Owned by [@nozomi-koborinai](https://github.com/nozomi-koborinai).
