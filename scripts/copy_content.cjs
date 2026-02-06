const fs = require('fs');
const path = require('path');

const VAULT_BLOG = path.resolve(__dirname, '../../Blog');
const QUARTZ_CONTENT = path.resolve(__dirname, '../content');
const BACKUP_CONTENT = path.resolve(__dirname, '../content_backup');

console.log(`🚀 Starting Sync: ${VAULT_BLOG} -> ${QUARTZ_CONTENT}`);

// 1. Initial Backup of default content (if not already done)
if (!fs.existsSync(BACKUP_CONTENT)) {
    console.log('📦 Creating backup of original Quartz content...');
    if (fs.existsSync(QUARTZ_CONTENT)) {
        fs.renameSync(QUARTZ_CONTENT, BACKUP_CONTENT);
        console.log('✅ Backup created at:', BACKUP_CONTENT);
    } else {
        console.log('⚠️ Original content folder not found, skipping backup.');
    }
}

// 2. Ensure Content Directory is clean
if (fs.existsSync(QUARTZ_CONTENT)) {
    console.log('🧹 Cleaning existing content...');
    fs.rmSync(QUARTZ_CONTENT, { recursive: true, force: true });
}
fs.mkdirSync(QUARTZ_CONTENT);

// 3. Copy Directory Function
function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`⚠️ Source directory not found: ${src}`);
        return;
    }
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// 4. Perform Copy
console.log('📂 Copying files...');
copyRecursiveSync(VAULT_BLOG, QUARTZ_CONTENT);

// 5. Ensure index.md exists
const indexFile = path.join(QUARTZ_CONTENT, 'index.md');
if (!fs.existsSync(indexFile)) {
    console.log('📄 Creating default index.md...');
    const content = `# Welcome to my Blog\n\nThis page was automatically generated because no index.md was found in your Blog folder.`;
    fs.writeFileSync(indexFile, content);
}

console.log('✨ Sync Complete!');
