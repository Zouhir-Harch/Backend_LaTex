const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Dossier pour stocker les fichiers générés
const OUTPUT_DIR = path.join(__dirname, '../../uploads');

// Créer le dossier uploads s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Templates disponibles
const templates = {
  classic: generateClassicTemplate,
  modern: generateModernTemplate
};

// Template Classic - Style classique et élégant
function generateClassicTemplate(data) {
  return `\\documentclass[12pt, a4paper]{report}
\\usepackage[utf8]{inputenc}
\\usepackage[french]{babel}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{color}
\\usepackage{xcolor}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}

\\geometry{
  top=3cm,
  bottom=3cm,
  left=3cm,
  right=3cm
}

\\definecolor{darkblue}{RGB}{0, 51, 102}
\\definecolor{goldcolor}{RGB}{184, 134, 11}

\\begin{document}

\\begin{titlepage}
  \\centering

  %% Ligne en haut
  \\begin{tikzpicture}[remember picture, overlay]
    \\draw[darkblue, line width=3pt] (current page.north west) -- (current page.north east);
    \\draw[goldcolor, line width=1pt] ([yshift=-0.3cm]current page.north west) -- ([yshift=-0.3cm]current page.north east);
  \\end{tikzpicture}

  \\vspace{2cm}

  %% Titre du document
  {\\fontsize{18}{22}\\selectfont \\textbf{\\textcolor{darkblue}{PAGE DE GARDE}}\\par}
  \\vspace{0.5cm}
  {\\fontsize{14}{18}\\selectfont \\textcolor{goldcolor}{\\rule{8cm}{0.5pt}}\\par}
  \\vspace{1.5cm}

  %% Titre du projet (si disponible)
  ${data.titre_projet ? `
  {\\fontsize{16}{20}\\selectfont \\textbf{\\textcolor{darkblue}{${data.titre_projet}}}\\par}
  \\vspace{1cm}
  ` : ''}

  %% Présenté par
  {\\fontsize{13}{16}\\selectfont \\textcolor{darkblue}{\\textbf{Présenté par :}}\\par}
  \\vspace{0.3cm}
  {\\fontsize{20}{24}\\selectfont \\textbf{${data.prenom} ${data.nom}}\\par}
  \\vspace{0.2cm}

  %% Etablissement
  ${data.etablissement ? `
  {\\fontsize{13}{16}\\selectfont \\textcolor{darkblue}{\\textbf{Établissement :}}\\par}
  \\vspace{0.2cm}
  {\\fontsize{14}{18}\\selectfont ${data.etablissement}\\par}
  \\vspace{0.3cm}
  ` : ''}

  %% Filière
  ${data.filiere ? `
  {\\fontsize{13}{16}\\selectfont \\textcolor{darkblue}{\\textbf{Filière :}}\\par}
  \\vspace{0.2cm}
  {\\fontsize{14}{18}\\selectfont ${data.filiere}\\par}
  \\vspace{0.5cm}
  ` : ''}

  %% Ligne séparatrice
  {\\textcolor{goldcolor}{\\rule{6cm}{0.4pt}}\\par}
  \\vspace{0.8cm}

  %% Encadrant
  ${data.encadrant ? `
  {\\fontsize{13}{16}\\selectfont \\textcolor{darkblue}{\\textbf{Encadré par :}}\\par}
  \\vspace{0.3cm}
  {\\fontsize{14}{18}\\selectfont ${data.encadrant}\\par}
  \\vspace{0.5cm}
  ` : ''}

  %% Jury
  ${data.jury && data.jury.length > 0 && data.jury[0] !== '' ? `
  {\\fontsize{13}{16}\\selectfont \\textcolor{darkblue}{\\textbf{Membres du jury :}}\\par}
  \\vspace{0.3cm}
  ${data.jury.map(membre => `{\\fontsize{13}{16}\\selectfont ${membre}\\par}`).join('\n  \\vspace{0.15cm}\n  ')}
  \\vspace{0.5cm}
  ` : ''}

  \\vfill

  %% Ligne en bas
  {\\textcolor{goldcolor}{\\rule{4cm}{0.4pt}}\\par}
  \\vspace{0.3cm}

  %% Année
  {\\fontsize{12}{14}\\selectfont \\textcolor{darkblue}{Année académique : ${data.année || '2024 - 2025'}}\\par}

  \\vspace{0.8cm}

  %% Ligne en bas de page
  \\begin{tikzpicture}[remember picture, overlay]
    \\draw[darkblue, line width=3pt] (current page.south west) -- (current page.south east);
    \\draw[goldcolor, line width=1pt] ([yshift=0.3cm]current page.south west) -- ([yshift=0.3cm]current page.south east);
  \\end{tikzpicture}

\\end{titlepage}

\\end{document}`;
}

// Template Modern - Style moderne avec des formes géométriques
function generateModernTemplate(data) {
  return `\\documentclass[12pt, a4paper]{report}
\\usepackage[utf8]{inputenc}
\\usepackage[french]{babel}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{xcolor}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}

\\geometry{
  top=2.5cm,
  bottom=2.5cm,
  left=2.5cm,
  right=2.5cm
}

\\definecolor{navy}{RGB}{10, 25, 60}
\\definecolor{accent}{RGB}{52, 152, 219}
\\definecolor{lightgray}{RGB}{240, 240, 240}

\\begin{document}

\\begin{titlepage}

  %% Fond géométrique en haut
  \\begin{tikzpicture}[remember picture, overlay]
    \\fill[navy] (current page.north west) rectangle ([xshift=0cm, yshift=-5cm]current page.north east);
    \\fill[accent, opacity=0.3] ([xshift=-2cm, yshift=-1cm]current page.north east) circle (4cm);
    \\fill[accent, opacity=0.15] ([xshift=-5cm, yshift=-3cm]current page.north east) circle (3cm);
  \\end{tikzpicture}

  \\vspace{2.5cm}
  \\centering

  %% Titre principal en blanc sur fond sombre
  {\\fontsize{22}{26}\\selectfont \\textbf{\\textcolor{white}{PAGE DE GARDE}}\\par}
  \\vspace{0.3cm}
  {\\textcolor{accent}{\\rule{5cm}{2pt}}\\par}

  \\vspace{3cm}

  %% Titre du projet
  ${data.titre_projet ? `
  {\\fontsize{16}{20}\\selectfont \\textbf{\\textcolor{navy}{${data.titre_projet}}}\\par}
  \\vspace{1cm}
  ` : ''}

  %% Boîte avec les informations
  \\begin{tikzpicture}
    \\fill[lightgray, rounded corners=0.3cm] (0, 0) rectangle (14, -8);
    \\fill[navy, rounded corners=0.3cm] (0.3, -0.3) rectangle (13.7, -0.9);
    \\node[white, font=\\large\\bfseries, anchor=west] at (0.6, -0.6) {Informations du présentateur};
  \\end{tikzpicture}

  \\vspace{-7.5cm}
  \\begin{tabular}{ll}
    & \\\\[0.8cm]
    \\textbf{\\textcolor{navy}{Nom :}} & \\textbf{\\large ${data.nom}} \\\\[0.3cm]
    \\textbf{\\textcolor{navy}{Prénom :}} & \\textbf{\\large ${data.prenom}} \\\\[0.3cm]
    ${data.etablissement ? `\\textbf{\\textcolor{navy}{Établissement :}} & ${data.etablissement} \\\\[0.3cm]` : ''}
    ${data.filiere ? `\\textbf{\\textcolor{navy}{Filière :}} & ${data.filiere} \\\\[0.3cm]` : ''}
    ${data.encadrant ? `\\textbf{\\textcolor{navy}{Encadrant :}} & ${data.encadrant} \\\\[0.3cm]` : ''}
    ${data.jury && data.jury.length > 0 && data.jury[0] !== '' ? `\\textbf{\\textcolor{navy}{Jury :}} & ${data.jury.join(', ')} \\\\[0.3cm]` : ''}
  \\end{tabular}

  \\vspace{1.5cm}

  %% Année
  {\\fontsize{12}{14}\\selectfont \\textcolor{navy}{Année académique : ${data.année || '2024 - 2025'}}\\par}

  \\vfill

  %% Ligne en bas
  \\begin{tikzpicture}[remember picture, overlay]
    \\fill[navy] (current page.south west) rectangle ([yshift=1.5cm]current page.south east);
    \\fill[accent, opacity=0.4] ([xshift=2cm, yshift=1.5cm]current page.south west) circle (2cm);
  \\end{tikzpicture}

\\end{titlepage}

\\end{document}`;
}

// Fonction principale pour générer le PDF
async function generateLatexPDF(data, style = 'classic') {
  const templateFn = templates[style] || templates.classic;
  const latexCode = templateFn(data);

  const timestamp = Date.now();
  const baseName = `page-garde-${timestamp}`;
  const texPath = path.join(OUTPUT_DIR, `${baseName}.tex`);
  const pdfPath = path.join(OUTPUT_DIR, `${baseName}.pdf`);

  // Écrire le fichier .tex
  fs.writeFileSync(texPath, latexCode, 'utf-8');

  try {
    // Compiler avec pdflatex
    execSync(`pdflatex -interaction=nonstopmode -output-directory="${OUTPUT_DIR}" "${texPath}"`, {
      stdio: 'pipe',
      timeout: 30000 // 30 secondes max
    });

    // Vérifier que le PDF existe
    if (!fs.existsSync(pdfPath)) {
      throw new Error('PDF non généré après compilation');
    }

    // Nettoyer les fichiers temporaires (.aux, .log)
    const auxPath = path.join(OUTPUT_DIR, `${baseName}.aux`);
    const logPath = path.join(OUTPUT_DIR, `${baseName}.log`);
    if (fs.existsSync(auxPath)) fs.unlinkSync(auxPath);
    if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
    if (fs.existsSync(texPath)) fs.unlinkSync(texPath);

    return `${baseName}.pdf`;
  } catch (error) {
    console.error('Erreur de compilation LaTeX:', error.message);
    // Nettoyer les fichiers même en cas d'erreur
    ['.tex', '.aux', '.log'].forEach(ext => {
      const filePath = path.join(OUTPUT_DIR, `${baseName}${ext}`);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
    throw new Error('Échec de la compilation LaTeX. Vérifiez que MiKTeX est installé.');
  }
}

// Obtenir la liste des styles disponibles
function getAvailableStyles() {
  return Object.keys(templates);
}

module.exports = { generateLatexPDF, getAvailableStyles };
