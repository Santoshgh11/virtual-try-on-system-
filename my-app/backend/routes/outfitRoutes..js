// const express = require('express');
// const router = express.Router();
// const bodyScannerController = require('../controllers/bodyScannerController');

// router.post('/', bodyScannerController.scanBody);  // Post to scan body

// module.exports = router;


// const express = require('express');
// const Outfit = require('../models/Outfit');
// const router = express.Router();

// // ✅ Fetch All Outfits
// router.get('/', async (req, res) => {
//   try {
//     const outfits = await Outfit.findAll();
//     res.json(outfits);
//   } catch (error) {
//     console.error("Error fetching outfits:", error);
//     res.status(500).json({ error: 'Could not fetch outfits' });
//   }
// });

// // ✅ Add New Outfit
// router.post('/add', async (req, res) => {
//   try {
//     const { name, size, style, availableStock } = req.body;
//     const newOutfit = await Outfit.create({ name, size, style, availableStock });
//     res.status(201).json(newOutfit);
//   } catch (error) {
//     console.error("Error adding outfit:", error);
//     res.status(500).json({ error: 'Failed to add outfit' });
//   }
// });

// // ✅ Fetch Outfit by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const outfit = await Outfit.findByPk(req.params.id);
//     if (!outfit) return res.status(404).json({ error: 'Outfit not found' });
//     res.json(outfit);
//   } catch (error) {
//     console.error("Error fetching outfit by ID:", error);
//     res.status(500).json({ error: 'Failed to fetch outfit' });
//   }
// });

// // ✅ Update Outfit
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, size, style, availableStock } = req.body;
//     const outfit = await Outfit.findByPk(req.params.id);
//     if (!outfit) return res.status(404).json({ error: 'Outfit not found' });

//     outfit.name = name || outfit.name;
//     outfit.size = size || outfit.size;
//     outfit.style = style || outfit.style;
//     outfit.availableStock = availableStock || outfit.availableStock;
    
//     await outfit.save();
//     res.json(outfit);
//   } catch (error) {
//     console.error("Error updating outfit:", error);
//     res.status(500).json({ error: 'Failed to update outfit' });
//   }
// });

// // ✅ Delete Outfit
// router.delete('/:id', async (req, res) => {
//   try {
//     const outfit = await Outfit.findByPk(req.params.id);
//     if (!outfit) return res.status(404).json({ error: 'Outfit not found' });

//     await outfit.destroy();
//     res.json({ message: 'Outfit deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting outfit:", error);
//     res.status(500).json({ error: 'Failed to delete outfit' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const Outfit = require('../models/Outfit'); // Sequelize Model
// const router = express.Router();

// // Fetch All Outfits
// router.get('/', async (req, res) => {
//   try {
//     const outfits = await Outfit.findAll();
//     res.json(outfits);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch outfits' });
//   }
// });

// // Add Outfit
// router.post('/add', async (req, res) => {
//   try {
//     const { name, size, style, availableStock } = req.body;
//     const outfit = await Outfit.create({ name, size, style, availableStock });
//     res.status(201).json(outfit);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add outfit' });
//   }
// });

// // Fetch Outfit by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const outfit = await Outfit.findByPk(req.params.id);
//     if (!outfit) return res.status(404).json({ error: 'Outfit not found' });
//     res.json(outfit);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch outfit' });
//   }
// });

// // Update Outfit
// router.put('/:id', async (req, res) => {
//   try {
//     const outfit = await Outfit.findByPk(req.params.id);
//     if (!outfit) return res.status(404).json({ error: 'Outfit not found' });

//     const { size, availableStock } = req.body;
//     outfit.size = size || outfit.size;
//     outfit.availableStock = availableStock || outfit.availableStock;

//     await outfit.save();
//     res.json(outfit);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update outfit' });
//   }
// });

// // Delete Outfit
// router.delete('/:id', async (req, res) => {
//   try {
//     const outfit = await Outfit.findByPk(req.params.id);
//     if (!outfit) return res.status(404).json({ error: 'Outfit not found' });

//     await outfit.destroy();
//     res.json({ message: 'Outfit deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete outfit' });
//   }
// });

// module.exports = router;






const express = require('express');
const Outfit = require('../models/Outfit');
const router = express.Router();

// Fetch All Outfits
router.get('/', async (req, res) => {
  try {
    const outfits = await Outfit.findAll();
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch outfits' });
  }
});

// Add Outfit
router.post('/add', async (req, res) => {
  try {
    const { name, size, style, availableStock } = req.body;
    const newOutfit = await Outfit.create({ name, size, style, availableStock });
    res.status(201).json(newOutfit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add outfit' });
  }
});

module.exports = router;
