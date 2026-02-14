const fs = require("fs");
const path = require("path");

exports.handler = async function() {
  try {
    
    // Netlify deploy root path
    const directoryPath = path.join(__dirname, "../../images/gallery");
    
    const files = fs.readdirSync(directoryPath);
    
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(imageFiles)
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};