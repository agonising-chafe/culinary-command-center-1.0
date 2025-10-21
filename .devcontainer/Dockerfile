FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Helpful CLI tools for grepping/searching and HTTPS
USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git curl ca-certificates ripgrep \
    && rm -rf /var/lib/apt/lists/*

# Enable Corepack and activate pnpm/yarn so you can choose your package manager
RUN corepack enable \
    && corepack prepare pnpm@latest --activate \
    && corepack prepare yarn@stable --activate || true

# Default workdir is set by devcontainers to /workspaces/<repo>
USER node
