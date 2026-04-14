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

  // Additional cyber cleanup
  content = content.replace(/from-cyber-blue(\/[0-9]+)?/g, 'from-red-50');
  content = content.replace(/via-cyber-purple(\/[0-9]+)?/g, 'via-red-50');
  content = content.replace(/to-cyber-purple(\/[0-9]+)?/g, 'to-gray-50');
  content = content.replace(/to-cyber-green(\/[0-9]+)?/g, 'to-red-50');
  
  content = content.replace(/bg-cyber-blue(\/[0-9]+)?/g, 'bg-red-600');
  content = content.replace(/bg-cyber-purple(\/[0-9]+)?/g, 'bg-red-50');
  content = content.replace(/bg-cyber-green(\/[0-9]+)?/g, 'bg-green-50');
  content = content.replace(/bg-cyber-saffron(\/[0-9]+)?/g, 'bg-orange-50');
  content = content.replace(/bg-cyber-dark(\/[0-9]+)?/g, 'bg-gray-100');
  
  // ensure text-gray-900 instead of cyber-
  content = content.replace(/text-cyber-blue/g, 'text-red-600');
  content = content.replace(/text-cyber-green/g, 'text-green-600');
  
  // weird duplication
  content = content.replace(/bg-bg-white/g, 'bg-white');
  content = content.replace(/shadow-sm\/50/g, 'shadow-sm');
  content = content.replace(/disabled:/g, 'disabled:opacity-50 disabled:cursor-not-allowed');
  content = content.replace(/disabled:opacity-50 disabled:cursor-not-allowedopacity-50 disabled:cursor-not-allowed/g, 'disabled:opacity-50 disabled:cursor-not-allowed');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
