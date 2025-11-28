import express from 'express';
import cors from 'cors';
import { promises as fs, constants as fsConstants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3101;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({ 
  origin: isProduction ? true : 'http://localhost:3100' 
}));
app.use(express.json());

// In production, serve static files from dist/
if (isProduction) {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Temp folder for bootstrap files
const TEMP_DIR = path.join(__dirname, 'temp');
const BOOTSTRAP_MAX_AGE_HOURS = 24; // Auto-cleanup after 24 hours

// Ensure temp directory exists
(async () => {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create temp directory:', err);
  }
})();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Save bootstrap prompt to temp file
app.post('/api/bootstrap/save', async (req, res) => {
  try {
    const { content, name } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeName = (name || 'audit').replace(/[^a-zA-Z0-9-_]/g, '_');
    const filename = `${safeName}-${timestamp}.bootstrap.md`;
    const filepath = path.join(TEMP_DIR, filename);
    
    await fs.writeFile(filepath, content, 'utf-8');
    
    res.json({ 
      success: true, 
      filename,
      path: filepath,
      expiresIn: `${BOOTSTRAP_MAX_AGE_HOURS} hours`
    });
  } catch (err) {
    console.error('Save bootstrap error:', err);
    res.status(500).json({ error: 'Failed to save bootstrap file' });
  }
});

// List bootstrap files in temp
app.get('/api/bootstrap/list', async (req, res) => {
  try {
    const entries = await fs.readdir(TEMP_DIR, { withFileTypes: true });
    const files = [];
    
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.bootstrap.md')) {
        const filepath = path.join(TEMP_DIR, entry.name);
        const stats = await fs.stat(filepath);
        files.push({
          name: entry.name,
          path: filepath,
          created: stats.mtime.toISOString(),
          size: stats.size
        });
      }
    }
    
    // Sort by date, newest first
    files.sort((a, b) => new Date(b.created) - new Date(a.created));
    
    res.json({ files });
  } catch (err) {
    console.error('List bootstrap error:', err);
    res.json({ files: [] });
  }
});

// Cleanup old bootstrap files
app.post('/api/bootstrap/cleanup', async (req, res) => {
  try {
    const maxAgeMs = BOOTSTRAP_MAX_AGE_HOURS * 60 * 60 * 1000;
    const now = Date.now();
    let deleted = 0;
    
    const entries = await fs.readdir(TEMP_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.bootstrap.md')) {
        const filepath = path.join(TEMP_DIR, entry.name);
        const stats = await fs.stat(filepath);
        
        if (now - stats.mtime.getTime() > maxAgeMs) {
          await fs.unlink(filepath);
          deleted++;
        }
      }
    }
    
    res.json({ 
      success: true, 
      deleted,
      message: `Removed ${deleted} file(s) older than ${BOOTSTRAP_MAX_AGE_HOURS} hours`
    });
  } catch (err) {
    console.error('Cleanup error:', err);
    res.status(500).json({ error: 'Failed to cleanup temp files' });
  }
});

// Delete specific bootstrap file
app.delete('/api/bootstrap/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Security: only allow .bootstrap.md files in temp dir
    if (!filename.endsWith('.bootstrap.md')) {
      return res.status(400).json({ error: 'Invalid file type' });
    }
    
    const filepath = path.join(TEMP_DIR, filename);
    
    // Ensure file is within temp directory
    if (!filepath.startsWith(TEMP_DIR)) {
      return res.status(400).json({ error: 'Invalid path' });
    }
    
    await fs.unlink(filepath);
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    console.error('Delete bootstrap error:', err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Auto-cleanup on server start (run once)
(async () => {
  try {
    const maxAgeMs = BOOTSTRAP_MAX_AGE_HOURS * 60 * 60 * 1000;
    const now = Date.now();
    const entries = await fs.readdir(TEMP_DIR, { withFileTypes: true });
    let deleted = 0;
    
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.bootstrap.md')) {
        const filepath = path.join(TEMP_DIR, entry.name);
        const stats = await fs.stat(filepath);
        
        if (now - stats.mtime.getTime() > maxAgeMs) {
          await fs.unlink(filepath);
          deleted++;
        }
      }
    }
    
    if (deleted > 0) {
      console.log(`   Cleaned up ${deleted} expired bootstrap file(s)`);
    }
  } catch (err) {
    // Ignore errors during startup cleanup
  }
})();

// List available drives/mount points (cross-platform)
app.get('/api/drives', async (req, res) => {
  try {
    const platform = process.platform;
    
    // Linux/Mac: Return common mount points
    if (platform !== 'win32') {
      const commonPaths = ['/', '/home', '/mnt', '/opt', '/var', '/tmp'];
      const drives = [];
      
      for (const mountPoint of commonPaths) {
        try {
          await fs.stat(mountPoint);
          drives.push(mountPoint);
        } catch {
          // Mount point doesn't exist
        }
      }
      
      // Also check for user home directory
      const homeDir = process.env.HOME;
      if (homeDir && !drives.includes(homeDir)) {
        try {
          await fs.stat(homeDir);
          drives.push(homeDir);
        } catch {
          // Home doesn't exist
        }
      }
      
      // Check /mnt subdirectories (common for Docker volume mounts)
      try {
        const mntContents = await fs.readdir('/mnt');
        for (const dir of mntContents) {
          const fullPath = `/mnt/${dir}`;
          try {
            const stats = await fs.stat(fullPath);
            if (stats.isDirectory()) {
              drives.push(fullPath);
            }
          } catch {
            // Skip inaccessible
          }
        }
      } catch {
        // /mnt doesn't exist or not readable
      }
      
      return res.json({ drives: [...new Set(drives)].sort() });
    }
    
    // Windows: Use wmic to get all drives including network drives
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);
    
    try {
      // Get logical drives via wmic (works better for network drives)
      const { stdout } = await execAsync('wmic logicaldisk get name', { timeout: 5000 });
      const drives = stdout
        .split('\n')
        .map(line => line.trim())
        .filter(line => /^[A-Z]:$/.test(line))
        .map(drive => `${drive}\\`);
      
      return res.json({ drives });
    } catch {
      // Fallback: check common drive letters manually
      const driveLetters = 'BCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const drives = [];
      
      for (const letter of driveLetters) {
        const drivePath = `${letter}:\\`;
        try {
          await fs.stat(drivePath);
          drives.push(drivePath);
        } catch {
          // Drive doesn't exist
        }
      }
      
      return res.json({ drives });
    }
  } catch (err) {
    console.error('Drives error:', err);
    res.json({ drives: [] });
  }
});

// Validate path endpoint
app.post('/api/validate', async (req, res) => {
  try {
    const { path: inputPath, type } = req.body;
    
    if (!inputPath) {
      return res.json({ valid: false, error: 'Path is required' });
    }

    // Normalize the path
    const normalizedPath = path.normalize(inputPath);

    // Security: Check for path traversal attempts
    if (normalizedPath.includes('..')) {
      return res.json({ valid: false, error: 'Invalid path' });
    }

    try {
      const stats = await fs.stat(normalizedPath);
      
      if (type === 'write') {
        // For write validation, check if it's a directory we can write to
        if (!stats.isDirectory()) {
          return res.json({ valid: false, error: 'Path is not a directory' });
        }
        // Try to check write access by checking if we can access it
        await fs.access(normalizedPath, fsConstants.W_OK);
        return res.json({ valid: true });
      } else {
        // For read validation, just check if path exists
        if (stats.isDirectory() || stats.isFile()) {
          return res.json({ valid: true });
        }
        return res.json({ valid: false, error: 'Invalid path type' });
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Path doesn't exist
        if (type === 'write') {
          // For write paths, check if parent exists and is writable
          const parentDir = path.dirname(normalizedPath);
          try {
            const parentStats = await fs.stat(parentDir);
            if (parentStats.isDirectory()) {
              await fs.access(parentDir, fsConstants.W_OK);
              return res.json({ valid: true, willCreate: true });
            }
          } catch {
            return res.json({ valid: false, error: 'Parent directory does not exist or is not writable' });
          }
        }
        return res.json({ valid: false, error: 'Path does not exist' });
      }
      if (err.code === 'EACCES') {
        return res.json({ valid: false, error: 'Permission denied' });
      }
      throw err;
    }
  } catch (err) {
    console.error('Validation error:', err);
    res.json({ valid: false, error: 'Failed to validate path' });
  }
});

// Browse directory endpoint
app.get('/api/browse', async (req, res) => {
  try {
    const { path: inputPath } = req.query;
    
    // Default to user's home directory or root
    const targetPath = inputPath 
      ? path.normalize(inputPath)
      : process.env.USERPROFILE || process.env.HOME || 'C:\\';

    // Security: Check for path traversal
    if (targetPath.includes('..') && !path.isAbsolute(targetPath)) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    const entries = await fs.readdir(targetPath, { withFileTypes: true });
    
    const dirs = [];
    const files = [];

    for (const entry of entries) {
      try {
        const fullPath = path.join(targetPath, entry.name);
        const stats = await fs.stat(fullPath);
        
        const item = {
          name: entry.name,
          path: fullPath,
          modified: stats.mtime.toISOString(),
          size: stats.size,
        };

        if (entry.isDirectory()) {
          dirs.push(item);
        } else {
          files.push(item);
        }
      } catch {
        // Skip entries we can't access
      }
    }

    // Sort alphabetically
    dirs.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    res.json({
      path: targetPath,
      parent: path.dirname(targetPath),
      dirs,
      files,
    });
  } catch (err) {
    console.error('Browse error:', err);
    res.status(500).json({ error: 'Failed to browse directory' });
  }
});

// List reports in a directory
app.get('/api/reports', async (req, res) => {
  try {
    const { path: inputPath } = req.query;
    
    if (!inputPath) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const normalizedPath = path.normalize(inputPath);
    
    // Security check
    if (normalizedPath.includes('..') && !path.isAbsolute(normalizedPath)) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    const entries = await fs.readdir(normalizedPath, { withFileTypes: true });
    
    const reports = [];

    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.md' || ext === '.json') {
          try {
            const fullPath = path.join(normalizedPath, entry.name);
            const stats = await fs.stat(fullPath);
            reports.push({
              name: entry.name,
              path: fullPath,
              modified: stats.mtime.toISOString(),
              size: stats.size,
              type: ext === '.json' ? 'json' : 'markdown',
            });
          } catch {
            // Skip files we can't access
          }
        }
      }
    }

    // Sort by modified date, newest first
    reports.sort((a, b) => new Date(b.modified) - new Date(a.modified));

    res.json({ reports });
  } catch (err) {
    console.error('Reports error:', err);
    res.status(500).json({ error: 'Failed to list reports' });
  }
});

// Read a single report file
app.get('/api/report', async (req, res) => {
  try {
    const { path: inputPath } = req.query;
    
    if (!inputPath) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const normalizedPath = path.normalize(inputPath);
    
    // Security: Validate file extension
    const ext = path.extname(normalizedPath).toLowerCase();
    if (ext !== '.md' && ext !== '.json') {
      return res.status(400).json({ error: 'Only .md and .json files are allowed' });
    }

    const content = await fs.readFile(normalizedPath, 'utf-8');
    
    res.json({ content });
  } catch (err) {
    console.error('Report read error:', err);
    if (err.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(500).json({ error: 'Failed to read report' });
  }
});

// In production, serve the SPA for all non-API routes
if (isProduction) {
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'Endpoint not found' });
    }
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development: 404 handler for API routes only
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛡️  Trust No Code Audit Dashboard`);
  console.log(`   Mode: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
