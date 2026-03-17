const fs = require('fs');
const path = require('path');

const schemasDir = path.join(__dirname, 'glbslCMS/schemas/documents');
const files = fs.readdirSync(schemasDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(path.join(schemasDir, file), 'utf8');
    
    // Remove the language field definition completely
    content = content.replace(/    defineField\(\{\s*name:\s*'language',\s*title:\s*'Language',\s*type:\s*'string',\s*readOnly:\s*true,\s*hidden:\s*true,\s*\}\),\s*/g, '');
    
    // Quick translation replacers
    const translatableFields = ['title', 'description', 'content', 'name', 'designation', 'message', 'seoTitle', 'seoDescription', 'objective', 'features', 'benefits', 'terms'];
    
    translatableFields.forEach(field => {
      let regexStr = new RegExp(\
ame:\s*'\',\s*title:\s*'([^']+)',\s*type:\s*'string'\, 'g');
      content = content.replace(regexStr, \
ame: '\',\n      title: '\',\n      type: 'localeString'\);
      
      let regexText = new RegExp(\
ame:\s*'\',\s*title:\s*'([^']+)',\s*type:\s*'text'\, 'g');
      content = content.replace(regexText, \
ame: '\',\n      title: '\',\n      type: 'localeText'\);
      
      let regexBlock = new RegExp(\
ame:\s*'\',\s*title:\s*'([^']+)',\s*type:\s*'array',\s*of:\s*\\[\\{type:\s*'block'\\}\\]\, 'g');
      content = content.replace(regexBlock, \
ame: '\',\n      title: '\',\n      type: 'localeBlock'\);
    });
    
    fs.writeFileSync(path.join(schemasDir, file), content);
  }
});
console.log('Schemas updated');
