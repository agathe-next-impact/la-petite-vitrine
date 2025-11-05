import fetch from 'node-fetch';

async function testEmail() {
  try {
    console.log('🧪 Test envoi email...');
    
    const response = await fetch('http://localhost:3001/api/add-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test',
        contact: '0123456789',
        email: 'test@example.com'
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