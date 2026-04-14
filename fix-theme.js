const fs = require('fs');

const files = [
  'app/solutions/page.js',
  'app/terms-of-service/page.js',
  'app/privacy-policy/page.js',
  'app/vapt-dashboard/page.js',
  'app/vapt-payment-success/page.js',
  'app/vapt-report/[scanId]/page.js',
  'components/ServicesPageClient.js',
  'components/VaptLandingClient.js',
  'components/Navigation.js'
];

for (const file of files) {
  let content = '';
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (err) {
    if (err.code !== 'ENOENT') console.error(err);
    continue;
  }

  let newContent = content
    .replace(/text-white/g, 'text-gray-900')
    .replace(/text-gray-200/g, 'text-gray-700')
    .replace(/text-gray-300/g, 'text-gray-600')
    .replace(/text-gray-400([^/])/g, 'text-gray-600$1')
    .replace(/text-gray-400\/[0-9]+/g, 'text-gray-500')
    .replace(/text-white\/[0-9]+/g, 'text-gray-700')
    .replace(/cyber-card/g, 'bg-white border border-gray-200 shadow-sm')
    .replace(/border-cyber-border/g, 'border-gray-200')
    .replace(/bg-cyber-bg/g, 'bg-white')
    .replace(/grid-bg|radial-glow-blue|radial-glow/g, '')
    .replace(/bg-white\/[0-9]+/g, 'bg-gray-50')
    .replace(/text-cyber-muted/g, 'text-gray-500')
    .replace(/text-cyber-blue/g, 'text-red-600')
    .replace(/border-cyber-blue\/[0-9]+/g, 'border-red-200')
    .replace(/bg-cyber-blue\/[0-9]+/g, 'bg-red-50')
    .replace(/hover:text-white/g, 'hover:text-gray-900')
    .replace(/hover:border-cyber-blue\/30/g, 'hover:border-red-300')
    .replace(/hover:text-cyber-blue/g, 'hover:text-red-600')
    .replace(/text-cyber-green/g, 'text-green-600')
    .replace(/bg-cyber-green\/[0-9]+/g, 'bg-green-50')
    .replace(/border-cyber-green\/[0-9]+/g, 'border-green-200')
    .replace(/text-cyber-purple/g, 'text-red-700')
    .replace(/bg-cyber-purple\/[0-9]+/g, 'bg-red-50')
    .replace(/border-cyber-purple\/[0-9]+/g, 'border-red-200')
    .replace(/text-cyber-saffron/g, 'text-red-600')
    .replace(/bg-cyber-saffron\/[0-9]+/g, 'bg-red-50')
    .replace(/border-cyber-saffron\/[0-9]+/g, 'border-red-200')
    .replace(/text-red-400/g, 'text-red-600')
    .replace(/bg-red-500\/[0-9]+/g, 'bg-red-50')
    .replace(/border-red-500\/[0-9]+/g, 'border-red-200')
    .replace(/text-[A-Za-z0-9]+-400\/[0-9]+/g, 'text-gray-600')
    .replace(/text-gray-500\/50/g, 'text-gray-400')
    .replace(/text-gray-[1-4]00/g, 'text-gray-600')
    // Fix buttons
    .replace(/<button([^>]*)bg-red-600([^>]*)text-gray-900/g, '<button$1bg-red-600$2text-white');

  // Fix specific issues where button text got replaced, like bg-red-600 text-gray-900 
  newContent = newContent.replace(/bg-red-600([^"']*)text-gray-900/g, 'bg-red-600$1text-white');
  newContent = newContent.replace(/bg-red-500([^"']*)text-gray-900/g, 'bg-red-500$1text-white');
  // Also red buttons shouldn't have dark text.

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
}
