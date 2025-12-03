#!/usr/bin/env node

/**
 * Next.js Migration Fix Script
 * Automatically fixes:
 * 1. Adds "use client" to files with hooks/events
 * 2. Removes version suffixes from imports
 * 3. Converts relative imports to absolute (@/) imports
 */

const fs = require('fs');
const path = require('path');

// Patterns to detect if file needs "use client"
const CLIENT_INDICATORS = [
  /useState/,
  /useEffect/,
  /useContext/,
  /useRef/,
  /useCallback/,
  /useMemo/,
  /useReducer/,
  /createContext/,
  /onClick/,
  /onChange/,
  /onSubmit/,
  /onFocus/,
  /onBlur/,
  /window\./,
  /document\./,
  /localStorage/,
  /sessionStorage/,
];

// Version patterns to remove
const VERSION_PATTERNS = [
  { pattern: /@radix-ui\/react-(\w+)@[\d.]+/g, replacement: '@radix-ui/react-$1' },
  { pattern: /lucide-react@[\d.]+/g, replacement: 'lucide-react' },
  { pattern: /class-variance-authority@[\d.]+/g, replacement: 'class-variance-authority' },
  { pattern: /embla-carousel-react@[\d.]+/g, replacement: 'embla-carousel-react' },
  { pattern: /sonner@[\d.]+/g, replacement: 'sonner' },
  { pattern: /next-themes@[\d.]+/g, replacement: 'next-themes' },
  { pattern: /react-day-picker@[\d.]+/g, replacement: 'react-day-picker' },
  { pattern: /recharts@[\d.]+/g, replacement: 'recharts' },
  { pattern: /date-fns@[\d.]+/g, replacement: 'date-fns' },
  { pattern: /react-hook-form@[\d.]+/g, replacement: 'react-hook-form' },
  { pattern: /clsx@[\d.]+/g, replacement: 'clsx' },
  { pattern: /tailwind-merge@[\d.]+/g, replacement: 'tailwind-merge' },
  { pattern: /cmdk@[\d.]+/g, replacement: 'cmdk' },
  { pattern: /vaul@[\d.]+/g, replacement: 'vaul' },
];

// Relative import patterns to convert to absolute
const RELATIVE_IMPORT_PATTERNS = [
  { pattern: /from ['"]\.\.\/\.\.\/components\//g, replacement: "from '@/components/" },
  { pattern: /from ['"]\.\.\/components\//g, replacement: "from '@/components/" },
  { pattern: /from ['"]\.\/components\//g, replacement: "from '@/components/" },
  { pattern: /from ['"]\.\.\/\.\.\/contexts\//g, replacement: "from '@/contexts/" },
  { pattern: /from ['"]\.\.\/contexts\//g, replacement: "from '@/contexts/" },
  { pattern: /from ['"]\.\/contexts\//g, replacement: "from '@/contexts/" },
  { pattern: /from ['"]\.\.\/\.\.\/lib\//g, replacement: "from '@/lib/" },
  { pattern: /from ['"]\.\.\/lib\//g, replacement: "from '@/lib/" },
  { pattern: /from ['"]\.\/lib\//g, replacement: "from '@/lib/" },
  { pattern: /from ['"]\.\.\/ui\//g, replacement: "from '@/components/ui/" },
  { pattern: /from ['"]\.\/ui\//g, replacement: "from '@/components/ui/" },
];

function needsUseClient(content) {
  return CLIENT_INDICATORS.some(pattern => pattern.test(content));
}

function hasUseClient(content) {
  return /['"]use client['"];?\s*\n/.test(content);
}

function fixVersionedImports(content) {
  let fixed = content;
  VERSION_PATTERNS.forEach(({ pattern, replacement }) => {
    fixed = fixed.replace(pattern, replacement);
  });
  return fixed;
}

function fixRelativeImports(content) {
  let fixed = content;
  RELATIVE_IMPORT_PATTERNS.forEach(({ pattern, replacement }) => {
    fixed = fixed.replace(pattern, replacement);
  });
  return fixed;
}

function addUseClient(content) {
  // Check if file already has 'use client'
  if (hasUseClient(content)) {
    return content;
  }
  
  // Add 'use client' at the very top, before any comments or imports
  return `'use client';\n\n${content}`;
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix versioned imports
    const afterVersionFix = fixVersionedImports(content);
    if (afterVersionFix !== content) {
      content = afterVersionFix;
      modified = true;
    }
    
    // Fix relative imports
    const afterRelativeFix = fixRelativeImports(content);
    if (afterRelativeFix !== content) {
      content = afterRelativeFix;
      modified = true;
    }
    
    // Add "use client" if needed
    if (needsUseClient(content) && !hasUseClient(content)) {
      content = addUseClient(content);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir, fileCallback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .next, dist, etc.
      if (!['node_modules', '.next', 'dist', '.git'].includes(file)) {
        walkDirectory(filePath, fileCallback);
      }
    } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      fileCallback(filePath);
    }
  });
}

function main() {
  console.log('🚀 Starting Next.js Migration Fix...\n');
  
  const rootDir = process.cwd();
  let filesProcessed = 0;
  let filesModified = 0;
  
  walkDirectory(rootDir, (filePath) => {
    filesProcessed++;
    if (processFile(filePath)) {
      filesModified++;
    }
  });
  
  console.log(`\n✨ Complete!`);
  console.log(`📊 Stats:`);
  console.log(`   - Files processed: ${filesProcessed}`);
  console.log(`   - Files modified: ${filesModified}`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review the changes`);
  console.log(`   2. Test with: npm run dev`);
  console.log(`   3. Fix any remaining TypeScript errors`);
}

main();
