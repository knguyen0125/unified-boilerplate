FROM public.ecr.aws/docker/library/node:20.11

# Install development tools
RUN apt update && apt install -y \
    curl \
    git \
    jq \
    unzip \
    zip \
    vim

WORKDIR /workspace

COPY package.json .
COPY package-lock.json .

# Since we're using npm workspaces, we need to copy the package.json files for each app
COPY apps/admin/package.json apps/admin/package.json
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json

COPY migrations/package.json migrations/package.json

COPY patches patches

RUN npm install

COPY . .

USER node
