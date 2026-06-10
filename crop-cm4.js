const sharp = require('sharp');

// The bottle and tape are in the left ~45% of the 1200x900 image
// Extract that region and resize to fill the panel
sharp('C:/Users/papur/Downloads/cm4.jpg')
  .extract({ left: 0, top: 0, width: 540, height: 900 })
  .resize(900, 1200, { fit: 'cover', position: 'centre' })
  .webp({ quality: 85 })
  .toFile('C:/Users/papur/proyectos/centro-metabolico/public/cm4.webp', (e, i) => {
    if (e) { console.error(e); process.exit(1); }
    else { console.log('OK', i); }
  });
