<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/koborin-ai/brand/raw/main/lockup/pixel/png/transparent/horizontal@2x.png">
    <img src="https://github.com/koborin-ai/brand/raw/main/lockup/pixel/png/on-light/horizontal@2x.png" alt="koborin.ai">
  </picture>
</p>

Personal org for orbiting code, sound, and pause.

[![Built on Blacksmith](https://img.shields.io/badge/Built%20on-Blacksmith-F0FB29?style=for-the-badge&labelColor=202020)](https://www.blacksmith.sh/)

## Architecture

Two hosts share the `koborin.ai` Cloudflare zone. The site is static Astro on Cloudflare Workers. Langfuse runs on a single GCE Spot VM, reachable only through a Cloudflare Tunnel, with Cloudflare Access in front of the UI. Both are TerraDart stacks applied from GitHub Actions, with Terraform state in R2.

<p align="center">
  <img src="https://github.com/koborin-ai/.github/raw/main/profile/architecture.svg" alt="koborin.ai architecture: GitHub Actions deploy to Cloudflare (DNS, Workers, Access, Tunnel, R2) and to Google Cloud (a GCE Spot VM running Langfuse)">
</p>

| Host | Repository | Runs on |
| --- | --- | --- |
| [koborin.ai](https://koborin.ai) | [koborin-ai/site](https://github.com/koborin-ai/site#readme) | Cloudflare Workers (static assets) |
| [langfuse.koborin.ai](https://langfuse.koborin.ai) | [koborin-ai/langfuse](https://github.com/koborin-ai/langfuse#readme) | Langfuse v4 on Docker Compose, GCE Spot VM in `n-koborinai`, behind Cloudflare Tunnel and Access |

Each repository's README has the detailed architecture and CI/CD. The diagram source is [`architecture.drawio`](./architecture.drawio).

Owned by [@nozomi-koborinai](https://github.com/nozomi-koborinai).
