const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = [...walk('app'), ...walk('components')];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Global theme cleanups for cyber- tags that shouldn't be there anymore
  content = content.replace(/cyber-card/g, 'bg-white border border-gray-200 shadow-sm');
  content = content.replace(/border-cyber-border/g, 'border-gray-200');
  content = content.replace(/bg-cyber-bg/g, 'bg-white');
  content = content.replace(/grid-bg|radial-glow-blue|radial-glow/g, '');
  content = content.replace(/text-cyber-muted/g, 'text-gray-500');
  content = content.replace(/text-cyber-blue/g, 'text-red-600');
  content = content.replace(/border-cyber-blue\/[0-9]+/g, 'border-red-200');
  content = content.replace(/bg-cyber-blue\/[0-9]+/g, 'bg-red-50');
  content = content.replace(/hover:border-cyber-blue\/30/g, 'hover:border-red-300');
  content = content.replace(/hover:text-cyber-blue/g, 'hover:text-red-600');
  content = content.replace(/text-cyber-green/g, 'text-green-600');
  content = content.replace(/bg-cyber-green\/[0-9]+/g, 'bg-green-50');
  content = content.replace(/border-cyber-green\/[0-9]+/g, 'border-green-200');
  content = content.replace(/text-cyber-purple/g, 'text-red-700');
  content = content.replace(/bg-cyber-purple\/[0-9]+/g, 'bg-red-50');
  content = content.replace(/border-cyber-purple\/[0-9]+/g, 'border-red-200');
  content = content.replace(/text-cyber-saffron/g, 'text-red-600');
  content = content.replace(/bg-cyber-saffron\/[0-9]+/g, 'bg-red-50');
  content = content.replace(/border-cyber-saffron\/[0-9]+/g, 'border-red-200');

  // Input fields fix (often had bg-white/5 text-white)
  content = content.replace(/bg-white\/[0-9]+/g, 'bg-gray-50');
  content = content.replace(/focus:border-cyber-blue/g, 'focus:border-red-600');
  content = content.replace(/focus:ring-cyber-blue/g, 'focus:ring-red-600');

  // Any remaining generic white opacity replacements
  content = content.replace(/text-white\/[0-9]+/g, 'text-gray-600');
  
  // Convert standard text-white to text-gray-900 (most everything is light theme now)
  content = content.replace(/text-white/g, 'text-gray-900');

  // Convert old dark text sizes
  content = content.replace(/text-gray-200|text-gray-300/g, 'text-gray-600');
  content = content.replace(/text-gray-[1-4]00/g, 'text-gray-600');

  // IMPORTANT: Revert valid buttons to having text-white
  // bg-red-600 ... text-gray-900 -> text-white
  content = content.replace(/bg-red-[56]00([^"']*)text-gray-900/g, 'bg-red-600$1text-white');
  content = content.replace(/bg-gray-[89]00([^"']*)text-gray-900/g, 'bg-gray-900$1text-white');
  content = content.replace(/bg-black([^"']*)text-gray-900/g, 'bg-black$1text-white');
  
  // Revert specific icons or smaller items if they are clearly inside a red block
  content = content.replace(/btn-primary([^"']*)text-gray-900/g, 'btn-primary$1text-white');

  // In Next.js sometimes <User className="w-4 h-4 text-white" /> is inside a block that is changed to gray-900.
  // We accepted them being dark inside a light bg (which is what we want for white backgrounds).

  // Also fix prose if any remaining
  content = content.replace(/prose-headings:text-white|prose-headings:text-gray-900/g, 'prose-headings:text-gray-900');
  content = content.replace(/prose-invert/g, ''); // Turn off prose-invert for dark text

  // Paragraph tags without text color getting forced to text-gray-700
  content = content.replace(/<p className="([^"]*)"/g, (match, p1) => {
    if (!p1.includes('text-')) {
      return `<p className="${p1} text-gray-700"`;
    }
    return match;
  });
  content = content.replace(/<p>/g, '<p className="text-gray-700">');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
