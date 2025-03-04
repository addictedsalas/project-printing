// Simple script to test the API endpoint directly
const http = require('http');

function testApi() {
  console.log('Testing API endpoint...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'API Test',
    message: 'This is a test message from the API test script.'
  };
  
  console.log('Request data:', testData);
  
  const data = JSON.stringify(testData);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/send-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`Response status: ${res.statusCode}`);
    
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response data:', responseData);
      
      try {
        const parsedData = JSON.parse(responseData);
        console.log('Parsed response:', parsedData);
        
        if (res.statusCode === 200) {
          console.log('API test successful!');
        } else {
          console.error('API test failed!');
        }
      } catch (e) {
        console.error('Could not parse response as JSON:', e);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Error testing API:', error);
  });
  
  req.write(data);
  req.end();
}

testApi();
