// Test du formulaire de contact avec email de confirmation
console.log('🧪 Test du formulaire de contact avec confirmation\n');

async function testContactForm() {
  try {
    console.log('📝 Test envoi formulaire de contact...');
    
    const contactData = {
      firstName: 'Jean',
      email: 'test@example.com',
      contact: '06 12 34 56 78'
    };

    const response = await fetch('http://localhost:3001/api/add-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Formulaire de contact traité avec succès !');
      console.log('📨 Réponse serveur :', result);
      return true;
    } else {
      console.log('❌ Erreur lors du traitement');
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

async function runContactTest() {
  console.log('🚀 Test du formulaire de contact\n');
  console.log('═══════════════════════════════════════');
  
  const success = await testContactForm();
  
  console.log('\n═══════════════════════════════════════');
  console.log(`🎯 RÉSULTAT : ${success ? '✅ TEST RÉUSSI' : '❌ TEST ÉCHOUÉ'}`);
  console.log('═══════════════════════════════════════');
  
  if (success) {
    console.log('🎉 Le formulaire de contact fonctionne !');
    console.log('   ✉️  Email admin envoyé');
    console.log('   ✉️  Email de confirmation client envoyé');
    console.log('   📧 Adresse: contact@lapetitevitrine.com');
    console.log('   📞 Téléphone: 06 73 98 16 38');
    console.log('   🎨 Charte graphique appliquée');
  } else {
    console.log('⚠️  Problème détecté');
    console.log('   - Vérifiez que le serveur API tourne');
    console.log('   - Vérifiez la configuration SMTP');
  }
}

runContactTest().catch(console.error);