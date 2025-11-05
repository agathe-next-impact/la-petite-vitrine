// Test d'envoi de différents types de fichiers pour identifier le problème
console.log('🧪 Test des types de fichiers envoyés par email\n');

async function testFileTypes() {
  try {
    console.log('📧 Test envoi de fichiers multiples...');
    
    // Création de fichiers fictifs de différents types
    const formData = new FormData();
    
    formData.append('to', 'test@example.com');
    formData.append('subject', 'Test - Différents types de fichiers');
    formData.append('html', '<h1>Test de fichiers multiples</h1><p>Test avec différents types de fichiers</p>');
    
    // Simulation de fichiers de différents types
    
    // 1. Fichier PDF
    const pdfBlob = new Blob(['%PDF-1.4 fake pdf content'], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'test.pdf', { type: 'application/pdf' });
    formData.append('otherFiles', pdfFile);
    
    // 2. Fichier JPG
    const jpgBlob = new Blob(['fake jpg content'], { type: 'image/jpeg' });
    const jpgFile = new File([jpgBlob], 'test.jpg', { type: 'image/jpeg' });
    formData.append('visualFiles', jpgFile);
    
    // 3. Fichier PNG
    const pngBlob = new Blob(['fake png content'], { type: 'image/png' });
    const pngFile = new File([pngBlob], 'test.png', { type: 'image/png' });
    formData.append('visualFiles', pngFile);
    
    // 4. Fichier TXT
    const txtBlob = new Blob(['Contenu de test text'], { type: 'text/plain' });
    const txtFile = new File([txtBlob], 'test.txt', { type: 'text/plain' });
    formData.append('textFiles', txtFile);
    
    // 5. Fichier DOC
    const docBlob = new Blob(['fake doc content'], { type: 'application/msword' });
    const docFile = new File([docBlob], 'test.doc', { type: 'application/msword' });
    formData.append('otherFiles', docFile);
    
    console.log('📎 Fichiers à tester:');
    console.log('  - PDF: test.pdf (application/pdf)');
    console.log('  - JPG: test.jpg (image/jpeg)');
    console.log('  - PNG: test.png (image/png)');
    console.log('  - TXT: test.txt (text/plain)');
    console.log('  - DOC: test.doc (application/msword)');
    
    const response = await fetch('http://localhost:3001/api/send-order-recap', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ Test envoyé avec succès !');
      console.log('📨 Réponse serveur :', result);
      console.log('\n💡 Vérifiez les logs du serveur pour voir quels fichiers ont été traités');
      return true;
    } else {
      console.log('\n❌ Erreur lors de l\'envoi');
      console.log('📨 Statut :', response.status, response.statusText);
      const errorText = await response.text();
      console.log('📨 Détails :', errorText);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Erreur réseau :', error.message);
    return false;
  }
}

async function runFileTest() {
  console.log('🚀 Test des types de fichiers\n');
  console.log('═══════════════════════════════════════');
  
  const success = await testFileTypes();
  
  console.log('\n═══════════════════════════════════════');
  console.log(`🎯 RÉSULTAT : ${success ? '✅ TEST ENVOYÉ' : '❌ TEST ÉCHOUÉ'}`);
  console.log('═══════════════════════════════════════');
  
  if (success) {
    console.log('📋 Prochaines étapes:');
    console.log('   1. Regardez les logs du serveur API');
    console.log('   2. Vérifiez quels fichiers sont reçus');
    console.log('   3. Vérifiez les pièces jointes dans l\'email');
    console.log('   4. Identifiez si seuls les PDF passent');
  }
}

runFileTest().catch(console.error);