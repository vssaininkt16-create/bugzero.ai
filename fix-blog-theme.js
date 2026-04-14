const fs = require('fs');

const files = [
  'app/blog/page.js',
  'app/blog/[slug]/page.js',
  'app/blog/loading.js'
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
// Fix buttons that might have been accidentally turned into dark text
  newContent = newContent.replace(/bg-red-[56]00([^"']*)text-gray-900/g, 'bg-red-600$1text-white');

  // specific fix for prose
  newContent = newContent.replace(/prose-invert/g, ''); // Turn off prose-invert for dark text
  newContent = newContent.replace(/prose-headings:text-white/g, 'prose-headings:text-gray-900');
  newContent = newContent.replace(/prose-strong:text-white/g, 'prose-strong:text-gray-900');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
}
