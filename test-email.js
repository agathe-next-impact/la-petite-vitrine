import fetch from 'node-fetch';

async function testEmail() {
  try {
    console.log('🧪 Test envoi email de commande...');
    
    const response = await fetch('http://localhost:3001/api/send-order-recap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'contact@lapetitevitrine.com',
        subject: 'Test email de commande',
        htmlContent: '<h1>Test</h1><p>Ceci est un test d\'email de commande</p>'
      })
    });

    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Résultat:', result);
    
    if (response.ok) {
      console.log('✅ Test réussi - Email envoyé !');
    } else {
      console.log('❌ Test échoué:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

testEmail();