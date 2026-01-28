/**
 * NOVACOEUR Backend API
 * Node.js/Express server with JSON file storage
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files (HTML, CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Database file path
const dbPath = path.join(__dirname, 'data', 'pages.json');
const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Helper functions to read/write database
function readDatabase() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading database:', err);
        return [];
    }
}

function writeDatabase(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error('Error writing database:', err);
        return false;
    }
}

// ===== API ENDPOINTS =====

/**
 * GET /api/pages
 * Retrieve all pages
 */
app.get('/api/pages', (req, res) => {
    try {
        const pages = readDatabase();
        res.json({
            success: true,
            data: pages
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la lecture des pages'
        });
    }
});

/**
 * GET /api/pages/:id
 * Retrieve a single page by ID
 */
app.get('/api/pages/:id', (req, res) => {
    try {
        const pages = readDatabase();
        const page = pages.find(p => p.id == req.params.id);
        if (!page) {
            return res.status(404).json({
                success: false,
                error: 'Page non trouvée'
            });
        }
        res.json({
            success: true,
            data: page
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la lecture de la page'
        });
    }
});

/**
 * POST /api/pages
 * Create a new page
 */
app.post('/api/pages', (req, res) => {
    try {
        const pageData = req.body;
        const pages = readDatabase();

        const newPage = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...pageData
        };

        pages.push(newPage);
        if (writeDatabase(pages)) {
            res.status(201).json({
                success: true,
                data: newPage
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la création de la page'
            });
        }
    } catch (err) {
        console.error('Error creating page:', err);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur'
        });
    }
});

/**
 * PUT /api/pages/:id
 * Update an existing page
 */
app.put('/api/pages/:id', (req, res) => {
    try {
        const pages = readDatabase();
        const index = pages.findIndex(p => p.id == req.params.id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: 'Page non trouvée'
            });
        }

        pages[index] = {
            ...pages[index],
            ...req.body,
            id: pages[index].id, // preserve ID
            createdAt: pages[index].createdAt // preserve creation date
        };

        if (writeDatabase(pages)) {
            res.json({
                success: true,
                data: pages[index]
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la mise à jour'
            });
        }
    } catch (err) {
        console.error('Error updating page:', err);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur'
        });
    }
});

/**
 * DELETE /api/pages/:id
 * Delete a page
 */
app.delete('/api/pages/:id', (req, res) => {
    try {
        const pages = readDatabase();
        const index = pages.findIndex(p => p.id == req.params.id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: 'Page non trouvée'
            });
        }

        pages.splice(index, 1);

        if (writeDatabase(pages)) {
            res.json({
                success: true,
                message: 'Page supprimée'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la suppression'
            });
        }
    } catch (err) {
        console.error('Error deleting page:', err);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur'
        });
    }
});

/**
 * GET /api/health
 * Health check
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'NOVACOEUR API is running'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`[NOVACOEUR] Serveur démarré sur http://localhost:${PORT}`);
    console.log(`[NOVACOEUR] Base de données: ${dbPath}`);
});
