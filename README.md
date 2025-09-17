# Template Utils

## Overview


## Features


## Directory Structure

```
.
├── .devcontainer/                # Development container configuration
├── .github/                      # GitHub configuration
│   ├── ISSUE_TEMPLATE/           # GitHub issue templates
│   └── PULL_REQUEST_TEMPLATE/    # GitHub PR templates
├── .vscode/                      # VSCode configuration
├── src/                          # Complete application directory (source code, Docker configs, etc.)
├── bin/                          # Utility scripts
└── docs/                         # Project documentation
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Dev Containers](https://containers.dev/) extension (`anysphere.remote-containers`) for VSCode
- UNIX/Linux-based OS (Windows users should use WSL2)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repo-url> <project-name>
   cd <project-name>
   ```

2. **Initialize the project**
   ```bash
   make init
   ```

3. **Open in Dev Container**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) in VSCode
   - Type `Dev Containers: Open Folder in Container`
   - Select and execute the command

4. **Start the development environment**
   ```bash
   make up
   ```
