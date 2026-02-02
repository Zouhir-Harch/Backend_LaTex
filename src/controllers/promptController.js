const { generateLatexPDF, getAvailableStyles } = require('../services/latexService');

// Route: Analyser un prompt
async function parsePrompt(req, res) {
  try {
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Route: Générer une page de garde depuis le formulaire
async function generatePage(req, res) {
  try {
    const { data, style } = req.body;

    if (!data || (!data.nom && !data.prenom)) {
      return res.status(400).json({ error: 'Le nom et le prénom sont obligatoires' });
    }

    console.log('Données reçues:', JSON.stringify(data));
    console.log('Style choisi:', style);

    // Générer le PDF avec LaTeX
    const pdfFileName = await generateLatexPDF(data, style || 'classic');
    console.log('PDF généré:', pdfFileName);

    res.json({
      success: true,
      data: data,
      pdfUrl: '/uploads/' + pdfFileName,
      styles: getAvailableStyles()
    });
  } catch (error) {
    console.error('Erreur:', error.message);
    res.status(500).json({ error: 'Erreur: ' + error.message });
  }
}

module.exports = { parsePrompt, generatePage };