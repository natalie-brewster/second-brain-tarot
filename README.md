# second-brain-tarot

A tarot/oracle deck generated from your own notes, instead of pre-written tarot copy.

## Concept

- Cards are sourced from clusters of `#oracle-public`-tagged notes in a
  personal knowledge vault — nothing untagged is ever exposed.
- Two lenses sit on top of the same underlying card groupings: a tarot-style
  legend (suit-equivalents) and a "brain" legend using the vault's own
  category names. Toggling relabels the groupings — it doesn't reshuffle them.
- Cards show a title + icon when fanned out across the screen like a real
  deck spread on a table, so you sift and pick rather than getting an
  auto-random draw.
- The picked card surfaces the underlying note fragment plus a short
  interpretive reading, generated live from your question at pick-time.

## Architecture

- **Frontend:** Next.js + TypeScript + Tailwind + Framer Motion, deployed
  publicly on Vercel.
- **Publish pipeline:** a local Python script scans the vault for
  `#oracle-public` notes, groups them into the taxonomy, runs a Haiku
  summary pass per note for title/icon/fragment, writes `cards.json`, and
  commits + pushes — triggering a Vercel redeploy.
- **Auto-publish:** a dedicated `launchd` watcher fires the publish script
  within ~20s of any vault change (separate from the existing
  `personal-rag-wiki-watch` agent).
- **Live reading:** a Next.js API route calls the Claude API at pick-time
  with the visitor's question + the card's already-public fragment.

## Status

Scaffolding in progress.

## Note on data

This repo is public. Real vault note content is personal and must never be
committed here — only code, the generated (already-curated) `cards.json`,
and synthetic/sample data for development.
