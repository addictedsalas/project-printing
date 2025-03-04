// Simple script to test the API endpoint directly
import fetch from 'node-fetch';

async function testApi() {
  console.log('Testing API endpoint...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'API Test',
    message: 'This is a test message from the API test script.'
  };
  
  try {
    console.log('Sending request to http://localhost:3000/api/send-email');
    console.log('Request data:', testData);
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    try {
      const responseData = JSON.parse(responseText);
      console.log('Response data:', responseData);
    } catch (e) {
      console.error('Could not parse response as JSON:', e);
    }
    
    if (response.ok) {
      console.log('API test successful!');
    } else {
      console.error('API test failed!');
    }
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testApi();
