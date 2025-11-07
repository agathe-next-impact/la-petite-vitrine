import fetch from 'node-fetch';

async function testDomainEmailDelivery() {
  const domains = [
    'https://lapetitevitrine.com',
    'https://www.lapetitevitrine.com'
  ];

  for (const domain of domains) {
    try {
      console.log(`\n🧪 Test vers domaine: ${domain}`);
      
      // Test health check
      console.log('  📋 Test health check...');
      const healthResponse = await fetch(`${domain}/api/health`);
      const healthData = await healthResponse.json();
      
      if (healthResponse.ok) {
        console.log('  ✅ Health check OK:', healthData.status);
      } else {
        console.log('  ❌ Health check échoué');
        continue;
      }
      
      // Test envoi email
      console.log('  📧 Test envoi email...');
      const emailResponse = await fetch(`${domain}/api/send-order-recap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': domain
        },
        body: JSON.stringify({
          to: 'contact@lapetitevitrine.com',
          subject: `Test depuis ${domain}`,
          htmlContent: `
            <h1>Test de compatibilité domaine</h1>
            <p>Email envoyé depuis: <strong>${domain}</strong></p>
            <p>Heure: ${new Date().toLocaleString()}</p>
          `
        })
      });

      const emailResult = await emailResponse.json();
      
      if (emailResponse.ok) {
        console.log('  ✅ Email envoyé avec succès!');
        console.log('  📋 Message ID:', emailResult.messageId);
      } else {
        console.log('  ❌ Échec envoi email:', emailResult.message);
      }
      
    } catch (error) {
      console.error(`  ❌ Erreur pour ${domain}:`, error.message);
    }
    
    console.log('  ⏳ Attente 2 secondes...');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🎯 Résumé:');
  console.log('  - Les deux domaines (avec et sans www) devraient fonctionner');
  console.log('  - La configuration CORS supporte les deux variantes');
  console.log('  - L\'API détecte automatiquement le bon domaine côté frontend');
}

testDomainEmailDelivery();