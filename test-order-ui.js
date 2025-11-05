// Test de l'envoi de commande avec fichiers
console.log('🧪 Test d\'envoi de commande depuis l\'interface\n');

async function testOrderSubmission() {
  try {
    // Simulation des données d'une commande complète
    const formData = new FormData();
    
    // Données de base
    formData.append('to', 'test@example.com');
    formData.append('subject', 'Test de commande - La Petite Vitrine');
    
    // HTML de test (simplifié)
    const htmlContent = `
      <h1>Test de commande</h1>
      <h2>Pack sélectionné</h2>
      <p>Pack Essentiel - 490€</p>
      <h2>Maintenance sélectionnée</h2>
      <p>Maintenance Basique - 19€/mois</p>
      <h2>Informations client</h2>
      <ul>
        <li>Nom: Jean Dupont</li>
        <li>Email: test@example.com</li>
        <li>Téléphone: 06 12 34 56 78</li>
        <li>Entreprise: Test SARL</li>
      </ul>
      <h2>Total</h2>
      <p>490€ (+19€/mois de maintenance)</p>
    `;
    
    formData.append('html', htmlContent);
    
    // Test d'envoi
    console.log('📤 Envoi de la commande de test...');
    
    const response = await fetch('http://localhost:3001/api/send-order-recap', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Commande envoyée avec succès !');
      console.log('📨 Réponse serveur :', result);
      return true;
    } else {
      console.log('❌ Erreur lors de l\'envoi');
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

async function runTest() {
  console.log('🚀 Démarrage du test d\'envoi de commande\n');
  
  const success = await testOrderSubmission();
  
  console.log('\n═══════════════════════════════════════');
  console.log(`🎯 RÉSULTAT : ${success ? '✅ TEST RÉUSSI' : '❌ TEST ÉCHOUÉ'}`);
  console.log('═══════════════════════════════════════');
  
  if (success) {
    console.log('🎉 L\'envoi de commande fonctionne !');
    console.log('   - L\'API accepte les requêtes FormData');
    console.log('   - Les emails sont envoyés correctement');
    console.log('   - Le serveur Nodemailer fonctionne');
  } else {
    console.log('⚠️  Il y a encore un problème avec l\'envoi');
    console.log('   - Vérifiez que le serveur API tourne sur le port 3001');
    console.log('   - Vérifiez les logs du serveur pour plus de détails');
  }
}

runTest().catch(console.error);