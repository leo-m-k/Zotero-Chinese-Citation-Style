document.getElementById('generate-btn').addEventListener('click', async function() {
    // Basis-CSL-Code laden (kann auch lokal im Projekt gespeichert sein)
    const response = await fetch('basis.csl');
    let cslCode = await response.text();

    // Optionen auslesen
    const options = {
        titleHanzi: document.getElementById('title-hanzi').checked,
        titleTranslationSquare: document.getElementById('title-translation-square').checked,
        titleTranslationCurved: document.getElementById('title-translation-curved').checked,
        journalNameHanzi: document.getElementById('journal-name-hanzi').checked,
        journalTranslationSquare: document.getElementById('journal-translation-square').checked,
        journalTranslationCurved: document.getElementById('journal-translation-curved').checked,
        publisherHanzi: document.getElementById('publisher-hanzi').checked,
        publisherTranslationSquare: document.getElementById('publisher-translation-square').checked,
        publisherTranslationCurved: document.getElementById('publisher-translation-curved').checked, 
    };

    // Modifikationen anwenden
    cslCode = applyModifications(cslCode, options);

    // Ergebnis anzeigen und Download-Link erstellen
    document.getElementById('generated-csl').textContent = cslCode;
    const blob = new Blob([cslCode], { type: 'application/xml' });
    document.getElementById('download-link').href = URL.createObjectURL(blob);
    document.getElementById('download-section').style.display = 'block';
});

// Funktion zum Kopieren in die Zwischenablage
document.getElementById('copy-btn').addEventListener('click', function() {
    const cslCode = document.getElementById('generated-csl').textContent;

    // Text in die Zwischenablage kopieren
    navigator.clipboard.writeText(cslCode)
        .then(() => {
            // Erfolgreich kopiert
            alert('CSL-Code wurde in die Zwischenablage kopiert!');
        })
        .catch(err => {
            // Fehler beim Kopieren
            console.error('Fehler beim Kopieren:', err);
            alert('Das Kopieren hat nicht funktioniert. Bitte kopiere den Code manuell.');
        });
});

/**
 * Passt den CSL-Code basierend auf den ausgewählten Optionen an.
 * @param {string} cslCode - Der Basis-CSL-Code.
 * @param {Object} options - Die ausgewählten Optionen.
 * @returns {string} - Der angepasste CSL-Code.
 */
function applyModifications(cslCode, options) {
    // Title in Chinese Characters
    if (options.titleHanzi) {
        cslCode = cslCode.replace(
            /<!--\s*options\.titleHanzi (.*?) -->/g,
            "$1"
        );
    }

    // Title translation in square brackets
    if (options.titleTranslationSquare) {
        cslCode = cslCode.replace(
            /<!--\s*options\.titleTranslationSquare (.*?) -->/g,
            "$1"
        );
    }

    // Title translation in curved brackets
    if (options.titleTranslationCurved) {
        cslCode = cslCode.replace(
            /<!--\s*options\.titleTranslationCurved (.*?) -->/g,
            "$1"
        );
    }

    // Journal name in Chinese characters
    if (options.journalNameHanzi) {
        cslCode = cslCode.replace(
            /<!--\s*options\.journalNameHanzi (.*?) -->/g,
            "$1"
        );
    }

    // Journal name translation in square brackets
    if (options.journalTranslationSquare) {
        cslCode = cslCode.replace(
            /<!--\s*options\.journalTranslationSquare (.*?) -->/g,
            "$1"
        );
    }

    // Journal name translation in curved brackets
    if (options.journalTranslationCurved) {
        cslCode = cslCode.replace(
            /<!--\s*options\.journalTranslationCurved (.*?) -->/g,
            "$1"
        );
    }

    // Publisher name in Chinese characters
    if (options.publisherHanzi) {
        cslCode = cslCode.replace(
            /<!--\s*options\.publisherHanzi (.*?) -->/g,
            "$1"
        );
    }
    // Publisher name translation in square brackets
    if (options.publisherTranslationSquare) {
        cslCode = cslCode.replace(
            /<!--\s*options\.publisherTranslationSquare (.*?) -->/g,
            "$1"
        );
    }
    // Publisher name translation in curved brackets
    if (options.publisherTranslationCurved) {
        cslCode = cslCode.replace(
            /<!--\s*options\.publisherTranslationCurved (.*?) -->/g,
            "$1"
        );
    }

    return cslCode;
}
