import Airtable from 'airtable';

export async function POST(request) {
  console.log('API route called');
  
  try {
    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    
    // Always use the Resources table directly
    const resourcesTable = 'tbleVsSnoiPJrfM3J';
    
    // Configure Airtable
    Airtable.configure({ apiKey });
    const base = Airtable.base(baseId);
    
    // Parse request data
    const data = await request.json();
    console.log('Received data:', data);
    
    console.log('Using Resources table:', resourcesTable);
    
    // Create a record with the fields that match the Resources table
    const record = {
      title: data.title,
      description: data.description,
      link: data.link,
      thumbnail: data.thumbnailUrl || '',
      tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
      submitter: data.submitterName || 'Website Form Submission',
      email: data.submitterEmail || ''
    };
    
    console.log('Final record to submit:', record);
    
    // Create record in Airtable Resources table
    console.log('Attempting to create record in Resources table');
    const createdRecord = await base(resourcesTable).create([{ fields: record }]);
    
    console.log('Record created:', createdRecord);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Resource submitted successfully!',
      id: createdRecord[0].id
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit resource to database',
      details: error.message
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}