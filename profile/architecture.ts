import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type ThemeName = "dark" | "light";

type Theme = {
  file: string;
  bg: string;
  fg: string;
  accent: string;
  muted: string;
};

const themes: Record<ThemeName, Theme> = {
  dark: {
    file: "architecture-dark.svg",
    bg: "#0b0d12",
    fg: "#eceae5",
    accent: "#d5dae1",
    muted: "#eceae56b",
  },
  light: {
    file: "architecture-light.svg",
    bg: "#faf9f6",
    fg: "#16161a",
    accent: "#4a5260",
    muted: "#16161a73",
  },
};

const mono =
  "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const sans = "'Geist', ui-sans-serif, system-ui, sans-serif";

function render(theme: Theme): string {
  const { bg, fg, accent, muted } = theme;
  const parts: string[] = [];

  function rect(
    x: number,
    y: number,
    w: number,
    h: number,
    stroke?: string,
    fill?: string,
  ): void {
    const paint = stroke
      ? ` fill="none" stroke="${stroke}" stroke-width="1" vector-effect="non-scaling-stroke"`
      : ` fill="${fill ?? bg}" stroke="none"`;
    parts.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" ry="2"${paint}/>`,
    );
  }

  function label(
    x: number,
    y: number,
    text: string,
    size: number,
    fill: string,
    family: string,
    anchor = "middle",
  ): void {
    parts.push(
      `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" text-anchor="${anchor}" dominant-baseline="middle">${text}</text>`,
    );
  }

  function chevronEast(x: number, y: number): void {
    parts.push(
      `<path d="M${x - 5} ${y - 3.5} L${x} ${y} L${x - 5} ${y + 3.5}" fill="none" stroke="${accent}" stroke-width="1" vector-effect="non-scaling-stroke"/>`,
    );
  }

  function chevronSouth(x: number, y: number): void {
    parts.push(
      `<path d="M${x - 3.5} ${y - 5} L${x} ${y} L${x + 3.5} ${y - 5}" fill="none" stroke="${accent}" stroke-width="1" vector-effect="non-scaling-stroke"/>`,
    );
  }

  function hline(x1: number, x2: number, y: number, dashed = false): void {
    const dash = dashed ? ' stroke-dasharray="3 3"' : "";
    parts.push(
      `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${accent}" stroke-width="1" vector-effect="non-scaling-stroke"${dash}/>`,
    );
  }

  function vline(x: number, y1: number, y2: number, dashed = false): void {
    const dash = dashed ? ' stroke-dasharray="3 3"' : "";
    parts.push(
      `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${accent}" stroke-width="1" vector-effect="non-scaling-stroke"${dash}/>`,
    );
  }

  function edgeLabel(x: number, y: number, text: string): void {
    const width = text.length * 7.4 + 12;
    rect(x - width / 2, y - 9, width, 18, undefined, bg);
    label(x, y, text, 12, muted, mono);
  }

  parts.push('<?xml version="1.0" encoding="UTF-8"?>');
  parts.push(
    '<svg xmlns="http://www.w3.org/2000/svg" width="880" height="572" viewBox="0 0 880 572" role="img">',
  );
  parts.push("<title>koborin.ai architecture</title>");
  parts.push(
    "<desc>GitHub Actions runs the TerraDart site stack with terradart plan and terradart apply. Wrangler deploys static assets to Worker koborin-ai-web. State is in R2.</desc>",
  );
  parts.push(`<rect width="880" height="572" fill="${bg}"/>`);

  rect(548, 20, 280, 56, accent);
  label(688, 40, "readers", 15, fg, mono);
  label(688, 60, "public", 13, muted, mono);
  vline(688, 76, 118);
  chevronSouth(688, 124);

  label(32, 108, "GitHub Actions", 15, fg, sans, "start");
  label(520, 108, "Cloudflare", 15, fg, sans, "start");

  rect(32, 124, 360, 152, accent);
  label(212, 176, "plan-infra · release-infra", 15, fg, mono);
  label(212, 200, "terradart plan", 13, muted, mono);
  label(212, 224, "terradart apply", 13, muted, mono);

  rect(520, 124, 336, 152, accent);
  label(688, 176, "koborin.ai", 15, fg, mono);
  label(688, 200, "DNS zone", 13, muted, mono);
  label(688, 222, "custom domain", 13, muted, mono);

  hline(392, 510, 200);
  chevronEast(516, 200);

  rect(32, 292, 360, 116, accent);
  label(212, 328, "app-ci · app-release", 15, fg, mono);
  label(212, 352, "astro build", 13, muted, mono);
  label(212, 374, "wrangler deploy", 13, muted, mono);

  rect(520, 292, 336, 116, accent);
  label(688, 338, "koborin-ai-web", 15, fg, mono);
  label(688, 362, "static assets", 13, muted, mono);

  hline(392, 510, 350);
  chevronEast(516, 350);

  hline(392, 456, 256, true);
  vline(456, 256, 472, true);
  hline(456, 510, 472, true);
  chevronEast(516, 472);
  edgeLabel(492, 400, "state");

  rect(520, 424, 336, 96, accent);
  label(688, 472, "koborin-ai-tfstate", 15, fg, mono);

  label(32, 472, "runners · blacksmith", 13, muted, mono, "start");
  label(
    32,
    548,
    "Scoped API token for Cloudflare. Dashed line is state, via R2 keys.",
    13,
    muted,
    mono,
    "start",
  );

  parts.push("</svg>");
  return `${parts.join("\n")}\n`;
}

const here = dirname(fileURLToPath(import.meta.url));

for (const theme of Object.values(themes)) {
  const svg = render(theme);
  if (/terraform/i.test(svg)) {
    throw new Error(`${theme.file} still contains a terraform label`);
  }
  const path = join(here, theme.file);
  writeFileSync(path, svg);
  console.log(path);
}
