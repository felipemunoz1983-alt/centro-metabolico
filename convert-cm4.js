const sharp = require('sharp');
sharp('C:/Users/papur/Downloads/cm4.jpg')
  .resize(1200, 900, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile('C:/Users/papur/proyectos/centro-metabolico/public/cm4.webp', (e, i) => {
    if (e) { console.error(e); process.exit(1); }
    else { console.log('OK', i); }
  });
