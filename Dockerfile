FROM public.ecr.aws/docker/library/node:20.11

WORKDIR /workspace

COPY package.json .
COPY package-lock.json .

# Since we're using npm workspaces, we need to copy the package.json files for each app
COPY apps/admin/package.json apps/admin/package.json
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm install

COPY . .