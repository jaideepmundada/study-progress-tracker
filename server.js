/**
 * StudySync Tracker - Backend REST API & Static Server
 * Runs on http://localhost:3000
 * Uses native Node.js HTTP + Database layer (Zero external dependencies required!)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const db = require('./database');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper: Send JSON Response
function sendJSON(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

// Helper: Parse JSON Body from Request
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

// Serve Static Frontend Assets (Checks public/ first, then root __dirname)
function serveStaticFile(req, res, pathname) {
  let safePath = pathname === '/' ? '/index.html' : pathname;
  
  // Try public folder first, then fallback to root directory
  let filePath = path.normalize(path.join(PUBLIC_DIR, safePath));
  let rootFallbackPath = path.normalize(path.join(__dirname, safePath));

  function tryReadFile(targetPath, onFail) {
    fs.stat(targetPath, (err, stats) => {
      if (!err && stats.isFile()) {
        const ext = path.extname(targetPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        fs.readFile(targetPath, (readErr, content) => {
          if (readErr) return onFail();
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache'
          });
          res.end(content);
        });
      } else {
        onFail();
      }
    });
  }

  tryReadFile(filePath, () => {
    tryReadFile(rootFallbackPath, () => {
      // Fallback to index.html
      const fallbackIndex = fs.existsSync(path.join(__dirname, 'index.html'))
        ? path.join(__dirname, 'index.html')
        : path.join(PUBLIC_DIR, 'index.html');
        
      fs.readFile(fallbackIndex, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(content);
      });
    });
  });
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS Pre-flight Options
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Length': 0
    });
    return res.end();
  }

  // --- REST API ROUTES ---
  if (pathname.startsWith('/api/')) {
    try {
      // POST /api/auth/verify
      if (pathname === '/api/auth/verify' && method === 'POST') {
        const body = await parseBody(req);
        if (body && body.passcode === '4501') {
          return sendJSON(res, 200, { success: true, message: 'Passcode verified successfully' });
        } else {
          return sendJSON(res, 401, { success: false, error: 'Incorrect passcode' });
        }
      }

      // GET /api/health
      if (pathname === '/api/health' && method === 'GET') {
        return sendJSON(res, 200, {
          status: 'ok',
          service: 'StudySync Tracker API',
          port: PORT,
          database: 'connected',
          timestamp: new Date().toISOString()
        });
      }

      // GET /api/stats
      if (pathname === '/api/stats' && method === 'GET') {
        const stats = db.getOverallStats();
        return sendJSON(res, 200, { success: true, data: stats });
      }

      // GET /api/subjects
      if (pathname === '/api/subjects' && method === 'GET') {
        const subjects = db.getAllSubjects();
        return sendJSON(res, 200, { success: true, data: subjects });
      }

      // GET /api/subjects/:id
      const subjectMatch = pathname.match(/^\/api\/subjects\/([a-zA-Z0-9_-]+)$/);
      if (subjectMatch && method === 'GET') {
        const subjectId = subjectMatch[1];
        const subject = db.getSubject(subjectId);
        if (!subject) return sendJSON(res, 404, { success: false, error: 'Subject not found' });
        return sendJSON(res, 200, { success: true, data: subject });
      }

      // POST /api/subjects/:id/mark-all
      const markAllMatch = pathname.match(/^\/api\/subjects\/([a-zA-Z0-9_-]+)\/mark-all$/);
      if (markAllMatch && method === 'POST') {
        const subjectId = markAllMatch[1];
        const body = await parseBody(req);
        const shouldComplete = body.completed !== false; // default true
        const updated = db.markSubjectAll(subjectId, shouldComplete);
        if (!updated) return sendJSON(res, 404, { success: false, error: 'Subject not found' });
        return sendJSON(res, 200, { success: true, data: updated });
      }

      // PATCH /api/units/:id
      const unitPatchMatch = pathname.match(/^\/api\/units\/([a-zA-Z0-9_-]+)$/);
      if (unitPatchMatch && (method === 'PATCH' || method === 'PUT')) {
        const unitId = unitPatchMatch[1];
        const body = await parseBody(req);
        const result = db.updateUnit(unitId, body);
        if (!result) return sendJSON(res, 404, { success: false, error: 'Unit not found' });
        return sendJSON(res, 200, { success: true, data: result.unit, subject: result.subject });
      }

      // POST /api/units/:id/revise
      const reviseMatch = pathname.match(/^\/api\/units\/([a-zA-Z0-9_-]+)\/revise$/);
      if (reviseMatch && method === 'POST') {
        const unitId = reviseMatch[1];
        const updatedUnit = db.incrementUnitRevision(unitId);
        if (!updatedUnit) return sendJSON(res, 404, { success: false, error: 'Unit not found' });
        return sendJSON(res, 200, { success: true, data: updatedUnit });
      }

      // PUT /api/units/:id/notes
      const notesMatch = pathname.match(/^\/api\/units\/([a-zA-Z0-9_-]+)\/notes$/);
      if (notesMatch && (method === 'PUT' || method === 'POST')) {
        const unitId = notesMatch[1];
        const body = await parseBody(req);
        const updatedUnit = db.updateUnitNotes(unitId, body.notes);
        if (!updatedUnit) return sendJSON(res, 404, { success: false, error: 'Unit not found' });
        return sendJSON(res, 200, { success: true, data: updatedUnit });
      }

      // PUT /api/units/:id/title
      const titleMatch = pathname.match(/^\/api\/units\/([a-zA-Z0-9_-]+)\/title$/);
      if (titleMatch && (method === 'PUT' || method === 'POST')) {
        const unitId = titleMatch[1];
        const body = await parseBody(req);
        const updatedUnit = db.updateUnitTitle(unitId, body.title);
        if (!updatedUnit) return sendJSON(res, 404, { success: false, error: 'Unit not found' });
        return sendJSON(res, 200, { success: true, data: updatedUnit });
      }

      // POST /api/reset
      if (pathname === '/api/reset' && method === 'POST') {
        db.resetAllProgress();
        return sendJSON(res, 200, { success: true, message: 'All progress reset successfully' });
      }

      // GET /api/export
      if (pathname === '/api/export' && method === 'GET') {
        const dump = db.exportData();
        return sendJSON(res, 200, dump);
      }

      // POST /api/import
      if (pathname === '/api/import' && method === 'POST') {
        const body = await parseBody(req);
        db.importData(body);
        return sendJSON(res, 200, { success: true, message: 'Data imported successfully' });
      }

      // Route Not Found
      return sendJSON(res, 404, { success: false, error: 'Endpoint not found' });

    } catch (apiErr) {
      console.error('API Error:', apiErr);
      return sendJSON(res, 500, { success: false, error: apiErr.message || 'Internal error' });
    }
  }

  // --- STATIC ASSET SERVING ---
  serveStaticFile(req, res, pathname);
});

// Start Server
server.listen(PORT, '0.0.0.0', () => {
  const stats = db.getOverallStats();
  console.log(`====================================================`);
  console.log(`🚀 StudySync Tracker Server is running!`);
  console.log(`📡 Localhost URL : http://localhost:${PORT}`);
  console.log(`💾 Database      : database.json (Persistent)`);
  console.log(`📚 Total Subjects: ${stats.totalSubjects} Subjects`);
  console.log(`📖 Total Units   : ${stats.totalUnits} Units`);
  console.log(`====================================================`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('\nStopping StudySync Tracker server...');
  server.close(() => {
    process.exit(0);
  });
});
