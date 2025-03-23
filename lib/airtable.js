import Airtable from 'airtable';

// Initialize Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Function to get all content from all tables
export async function getAllContent() {
  try {
    console.log('Fetching content from all Airtable tables...');
    
    // Define tables with their content types
    const tables = [
      { name: process.env.AIRTABLE_TABLE_NAME, type: '360 Video' },
      { name: process.env.AIRTABLE_TABLE_NAME_2, type: 'Immersive Experience' },
      { name: process.env.AIRTABLE_TABLE_NAME_3, type: 'VR App' }
    ];
    
    let allContent = [];
    
    // Log environment variables for debugging
    console.log('Base ID:', process.env.AIRTABLE_BASE_ID);
    console.log('Table 1:', process.env.AIRTABLE_TABLE_NAME);
    console.log('Table 2:', process.env.AIRTABLE_TABLE_NAME_2);
    console.log('Table 3:', process.env.AIRTABLE_TABLE_NAME_3);
    
    // Fetch data from each table
    for (const table of tables) {
      if (!table.name) {
        console.log(`Skipping undefined table name for ${table.type}`);
        continue;
      }
      
      try {
        console.log(`Querying table: ${table.name}`);
        const records = await base(table.name).select({}).all();
        console.log(`Found ${records.length} records in ${table.name}`);
        
        if (records.length > 0) {
          console.log(`Sample record fields from ${table.name}:`, Object.keys(records[0].fields));
        }
        
        // Map fields and add content type
        const contentFromTable = records.map((record) => {
          // Create a standardized item with the content type
          const item = {
            id: record.id,
            contentType: table.type,
            // Add all fields from the record
            ...record.fields
          };
          
          // Standardize the thumbnailUrl field for the frontend
          // Check for Cloudinary URLs first
          if (record.fields.thumbnail && record.fields.thumbnail.includes('cloudinary.com')) {
            item.thumbnailUrl = record.fields.thumbnail;
          } else if (record.fields.thumbnail_image_url && record.fields.thumbnail_image_url.includes('cloudinary.com')) {
            item.thumbnailUrl = record.fields.thumbnail_image_url;
          } else {
            // Fall back to other thumbnail fields
            item.thumbnailUrl = record.fields.thumbnail_image_url || record.fields.thumbnail || '';
          }
          
          // Standardize title field
          item.title = record.fields.title || record.fields.Name || 'Unnamed Resource';
          
          // Standardize description field
          item.description = record.fields.description_header || record.fields.Description || '';
          
          // Standardize link field
          item.link = record.fields.link || record.fields.url || '';
          
          // Ensure tags is an array
          item.tags = Array.isArray(record.fields.tags) ? record.fields.tags : [];
          
          return item;
        });
        
        allContent = [...allContent, ...contentFromTable];
      } catch (e) {
        console.error(`Error fetching from table "${table.name}":`, e.message);
      }
    }
    
    console.log(`Total content items fetched from all tables: ${allContent.length}`);
    return allContent;
  } catch (error) {
    console.error('Error fetching all content:', error);
    return [];
  }
}

// Function to get a single content item by ID
export async function getContentById(id) {
  try {
    const tables = [
      { name: process.env.AIRTABLE_TABLE_NAME, type: '360 Video' },
      { name: process.env.AIRTABLE_TABLE_NAME_2, type: 'Immersive Experience' },
      { name: process.env.AIRTABLE_TABLE_NAME_3, type: 'VR App' }
    ];
    
    for (const table of tables) {
      if (!table.name) continue;
      
      try {
        // Try to find the record in this table
        const record = await base(table.name).find(id);
        
        // If we found it, log which table it was found in
        console.log(`Found record ${id} in table "${table.name}" with type "${table.type}"`);
        
        // Create a standardized item with the content type
        const item = {
          id: record.id,
          contentType: table.type,
          // Add all fields from the record
          ...record.fields
        };
        
        // Standardize the thumbnailUrl field for the frontend
        // Check for Cloudinary URLs first
        if (record.fields.thumbnail && record.fields.thumbnail.includes('cloudinary.com')) {
          item.thumbnailUrl = record.fields.thumbnail;
        } else if (record.fields.thumbnail_image_url && record.fields.thumbnail_image_url.includes('cloudinary.com')) {
          item.thumbnailUrl = record.fields.thumbnail_image_url;
        } else {
          // Fall back to other thumbnail fields
          item.thumbnailUrl = record.fields.thumbnail_image_url || record.fields.thumbnail || '';
        }
        
        // Standardize title field
        item.title = record.fields.title || record.fields.Name || 'Unnamed Resource';
        
        // Standardize description field
        item.description = record.fields.description_header || record.fields.Description || '';
        
        // Standardize link field
        item.link = record.fields.link || record.fields.url || '';
        
        // Ensure tags is an array
        item.tags = Array.isArray(record.fields.tags) ? record.fields.tags : [];
        
        return item;
      } catch (e) {
        // Continue to the next table if not found
        console.log(`Record ${id} not found in table "${table.name}"`);
      }
    }
    
    // If not found in any table
    console.log(`Could not find content with ID ${id} in any table`);
    return {
      id: id,
      contentType: 'Unknown',
      title: 'Content Not Found',
      description: 'The requested content could not be found.',
      thumbnailUrl: '',
      link: '',
      tags: []
    };
  } catch (error) {
    console.error(`Error fetching content with ID ${id}:`, error);
    return {
      id: id,
      contentType: 'Error',
      title: 'Error Loading Content',
      description: 'There was an error loading this content.',
      thumbnailUrl: '',
      link: '',
      tags: []
    };
  }
}

// Keep the existing functions for backward compatibility
export async function getAllTools() {
  return getAllContent();
}

export async function getToolById(id) {
  return getContentById(id);
}

// Function to get the most common tags
export async function getMostCommonTags(limit = 10) {
  try {
    const content = await getAllContent();
    const tagCounts = {};
    
    // Count occurrences of each tag
    content.forEach(item => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // Convert to array and sort by count (descending)
    const sortedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map(item => item.tag);
    
    return sortedTags;
  } catch (error) {
    console.error('Error fetching common tags:', error);
    return [];
  }
}