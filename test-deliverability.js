import fetch from 'node-fetch';

async function testEmailDelivery() {
  const testEmails = [
    'contact@lapetitevitrine.com', // Email professionnel (devrait marcher)
    'test@gmail.com', // Gmail (peut être filtré)
    'test@outlook.com', // Outlook (peut être filtré)
    'invalide@domaine-inexistant.xyz' // Domaine inexistant (devrait échouer)
  ];

  for (const email of testEmails) {
    try {
      console.log(`\n🧪 Test vers: ${email}`);
      
      const response = await fetch('http://localhost:3001/api/send-order-recap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: `Test délivrabilité - ${new Date().toLocaleTimeString()}`,
          htmlContent: `
            <h1>Test de délivrabilité</h1>
            <p>Email envoyé vers: <strong>${email}</strong></p>
            <p>Heure: ${new Date().toLocaleString()}</p>
            <p>Si vous recevez cet email, la délivrabilité fonctionne.</p>
          `
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Succès:', result.message);
        console.log('📋 Détails:', result.deliveryInfo);
      } else {
        console.log('❌ Échec:', result.message);
      }
      
      // Attendre 2 secondes entre chaque test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Erreur pour ${email}:`, error.message);
    }
  }
}

testEmailDelivery();