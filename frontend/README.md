# Trust No Code Audit Dashboard

A modern React frontend for configuring AI-powered code audits and viewing reports.

## Features

- **Audit Configuration** — Select audit type (Security, Architecture, Production Readiness) and configure paths
- **Bootstrap Prompt Generation** — One-click copy of complete audit prompts for AI IDEs
- **Report Viewer** — Browse and view Markdown/JSON audit reports with syntax highlighting
- **Recent Reports** — Quick access to previously viewed audit reports
- **Dark Theme** — Developer-focused UI optimized for extended use

## Quick Start

### Option 1: Docker (Recommended for Distribution)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t trust-no-code-audit .
docker run -d -p 3100:3100 --name trust-no-code-audit trust-no-code-audit
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server (frontend + backend)
npm run dev
```

Opens at **http://localhost:3100**

## Architecture

Domain-driven modular structure:

```
src/
├── features/
│   ├── audit/       # Audit type selection, prompt generation
│   ├── paths/       # Path input with validation
│   └── reports/     # Report listing and viewing
├── shared/          # Layout, common utilities
└── App.jsx          # Router configuration
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend (3100) + backend (3101) concurrently |
| `npm run build` | Production build |
| `npm start` | Start production server (Linux/Mac) |
| `npm run start:win` | Start production server (Windows) |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |
| `npm run docker:stop` | Stop and remove container |
| `npm run docker:logs` | View container logs |

## API Endpoints

The local Express server provides file system access:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/drives` | GET | List drives (Windows) or mount points (Linux/Mac) |
| `/api/validate` | POST | Validate path (read/write) |
| `/api/browse` | GET | List directory contents |
| `/api/reports` | GET | List report files in folder |
| `/api/report` | GET | Read report file content |

## Usage

1. **Select Audit Type** — Choose Security, Architecture, or Production Readiness
2. **Configure Paths** — Enter codebase path and reports output folder
3. **Copy Prompt** — Click "Copy to Clipboard" to get the bootstrap prompt
4. **Paste in AI IDE** — Use in Windsurf, Cursor, or any AI-powered IDE
5. **View Reports** — Navigate to Reports tab to browse generated audit files

## Docker Deployment

### Mounting Local Directories

To access your projects and reports from within the container, mount volumes:

```bash
# Mount your projects directory (read-only for security)
docker run -d -p 3100:3100 \
  -v /path/to/projects:/mnt/projects:ro \
  -v /path/to/reports:/mnt/reports \
  --name trust-no-code-audit \
  trust-no-code-audit
```

Or edit `docker-compose.yml`:

```yaml
volumes:
  - C:/Projects:/mnt/projects:ro    # Windows
  - /home/user/projects:/mnt/projects:ro  # Linux/Mac
  - ./reports:/mnt/reports
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3100` | Server port |
| `NODE_ENV` | `production` | Environment mode |

### Publishing to Docker Hub

```bash
# Tag and push
docker tag trust-no-code-audit yourusername/trust-no-code-audit:latest
docker push yourusername/trust-no-code-audit:latest

# Others can then run:
docker pull yourusername/trust-no-code-audit
docker run -d -p 3100:3100 yourusername/trust-no-code-audit
```

## Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, React Router, Lucide Icons
- **Backend**: Express.js, CORS
- **Rendering**: react-markdown for report viewing
- **Container**: Docker with multi-stage build

## Cross-Platform Support

The dashboard runs on **Windows, Linux, and macOS**.

| Feature | Windows | Linux/Mac |
|---------|---------|-----------|
| Frontend UI | ✅ | ✅ |
| Report Viewer | ✅ | ✅ |
| Path Validation | ✅ | ✅ |
| File Browser | ✅ | ✅ |
| Drive/Mount Listing | ✅ Drives (C:, D:) | ✅ Mount points (/, /home, /mnt) |

### Docker (Linux Container)

When running in Docker, the folder browser shows:
- Common mount points: `/`, `/home`, `/mnt`, `/opt`, `/var`, `/tmp`
- User home directory from `$HOME`
- All subdirectories under `/mnt` (for volume mounts)

Mount your host directories to `/mnt/` for easy access:
```bash
docker run -v /host/projects:/mnt/projects trust-no-code-audit
```
