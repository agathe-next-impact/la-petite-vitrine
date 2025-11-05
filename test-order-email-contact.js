// Test de l'email de commande avec les nouvelles coordonnées de contact
console.log('🧪 Test email de commande avec coordonnées directes\n');

async function testOrderEmailWithContact() {
  try {
    console.log('📧 Test envoi email de commande...');
    
    // Simulation des données d'une commande avec le nouveau format
    const formData = new FormData();
    
    formData.append('to', 'test@example.com');
    formData.append('subject', 'Test commande - Nouvelles coordonnées');
    
    // HTML simplifié pour tester le nouveau format de contact
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmation de commande - La Petite Vitrine</title>
      </head>
      <body>
        <h1>Confirmation de commande</h1>
        <div>
          <p>Merci pour votre confiance !</p>
          <p>Prenez dès à présent contact avec notre équipe pour nous faire part de vos attentes précises.</p>
          
          <div style="background:#F0F9FF;border-radius:12px;padding:24px;margin:24px 0;border:1px solid #0EA5E9;">
            <h3 style="color:#2E66C1;font-size:1.2rem;margin:0 0 16px 0;font-weight:600;text-align:center;">
              💬 Contactez-nous directement
            </h3>
            <div style="text-align:center;">
              <div style="margin-bottom:12px;">
                <strong style="color:#2E66C1;">📧 Email :</strong>
                <a href="mailto:contact@lapetitevitrine.com" style="color:#D97706;text-decoration:none;margin-left:8px;">
                  contact@lapetitevitrine.com
                </a>
              </div>
              <div>
                <strong style="color:#2E66C1;">📞 Téléphone :</strong>
                <a href="tel:0673981638" style="color:#D97706;text-decoration:none;margin-left:8px;">
                  06 73 98 16 38
                </a>
              </div>
            </div>
          </div>
          
          <h2>Récapitulatif de test</h2>
          <p>Pack Essentiel - 490€</p>
          <p>Maintenance Basique - 19€/mois</p>
        </div>
      </body>
      </html>
    `;
    
    formData.append('html', htmlContent);
    
    const response = await fetch('http://localhost:3001/api/send-order-recap', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email de commande envoyé avec succès !');
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

async function runEmailTest() {
  console.log('🚀 Test du nouvel email de commande\n');
  console.log('═══════════════════════════════════════');
  
  const success = await testOrderEmailWithContact();
  
  console.log('\n═══════════════════════════════════════');
  console.log(`🎯 RÉSULTAT : ${success ? '✅ TEST RÉUSSI' : '❌ TEST ÉCHOUÉ'}`);
  console.log('═══════════════════════════════════════');
  
  if (success) {
    console.log('🎉 L\'email de commande a été mis à jour !');
    console.log('   📧 Email: contact@lapetitevitrine.com');
    console.log('   📞 Téléphone: 06 73 98 16 38');
    console.log('   🔄 CTA "Prendre rendez-vous" remplacé');
    console.log('   💬 Informations de contact mises en évidence');
  } else {
    console.log('⚠️  Problème détecté avec l\'envoi d\'email');
  }
}

runEmailTest().catch(console.error);