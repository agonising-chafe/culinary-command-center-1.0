# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- 

## [0.5.0] - 2025-10-20
### Added
- Unified /api/recipes CRUD with schema-aware handling and env-safe client
- /api/health endpoint for env and Supabase reachability
- Navbar data source chip (Live DB vs Mock) with link to health
- PWA dev/prod UX: dev unregister, update prompt, manual refresh, post-reload toast
- VS Code Dev Container (Node 20; pnpm/yarn/npm via Corepack)
- AGENTS.md context and docs/BLUEPRINT.md architecture

### Changed
- Frontend store wired to API (initialize/refresh/save/delete) with 1 retry backoff
- Recipe modal: Save/Delete actions, Edit Mode fields, lightweight validation and toasts
- Mock images replaced with /placeholder.svg

### Fixed
- Avoid 502 by creating Supabase client per request and returning JSON errors
- Remove invalid vercel.json regions; add per-route preferredRegion hints

[Unreleased]: https://github.com/agonising-chafe/culinary-command-center-1.0/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/agonising-chafe/culinary-command-center-1.0/releases/tag/v0.5.0