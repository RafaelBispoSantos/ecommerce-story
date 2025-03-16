// build.js - Script de build personalizado (usando módulos ES)
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório do frontend
const frontendDir = path.join(__dirname, 'frontend');

console.log('🔍 Verificando ambiente...');
console.log(`📂 Diretório atual: ${__dirname}`);
console.log(`📂 Diretório frontend: ${frontendDir}`);

// Verificar se o diretório frontend existe
if (!fs.existsSync(frontendDir)) {
  console.error('❌ Diretório frontend não encontrado!');
  process.exit(1);
}

// Verificar package.json do frontend
const frontendPackageJsonPath = path.join(frontendDir, 'package.json');
if (!fs.existsSync(frontendPackageJsonPath)) {
  console.error('❌ package.json do frontend não encontrado!');
  process.exit(1);
}

// Criar arquivo .npmrc para resolver problemas de compatibilidade
console.log('📝 Criando arquivo .npmrc para resolver problemas de compatibilidade...');
const npmrcContent = `legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true`;
fs.writeFileSync(path.join(frontendDir, '.npmrc'), npmrcContent);

// Instalar dependências do frontend
console.log('📥 Instalando dependências do frontend...');
try {
  execSync('npm install --legacy-peer-deps', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Dependências do frontend instaladas com sucesso');
} catch (error) {
  console.error('❌ Erro ao instalar dependências do frontend:');
  console.error(error.message);
  console.error(error.stderr?.toString() || 'Nenhum stderr disponível');
  process.exit(1);
}

// Instalar pacotes específicos necessários para o build
console.log('🔧 Instalando pacotes específicos necessários para o build...');
try {
  execSync('npm install @vitejs/plugin-react vite autoprefixer postcss tailwindcss --save-dev', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Pacotes específicos instalados com sucesso');
} catch (error) {
  console.error('⚠️ Aviso ao instalar pacotes específicos:', error.message);
  // Continue mesmo se houver erro aqui
}

// Verificar se postcss.config.js existe e criar se necessário
const postcssConfigPath = path.join(frontendDir, 'postcss.config.js');
if (!fs.existsSync(postcssConfigPath)) {
  console.log('📝 Criando configuração mínima de PostCSS...');
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`;
  fs.writeFileSync(postcssConfigPath, postcssConfig);
}

// Usar o vite.config.js existente em vez de criar um novo
console.log('🏗️ Executando build do frontend com configuração existente...');
try {
  execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Build do frontend concluído com sucesso');
} catch (error) {
  console.error('❌ Erro ao executar build com configuração existente. Tentando com configuração mínima...');
  
  // Criar configuração mínima do Vite como fallback
  console.log('📝 Criando configuração mínima do Vite...');
  const minimalViteConfig = `// vite.config.js
module.exports = {
  plugins: [],
  css: {
    postcss: {
      plugins: [],
    },
  },
};`;
  fs.writeFileSync(path.join(frontendDir, 'vite.config.js.minimal'), minimalViteConfig);
  
  try {
    // Backup da configuração existente
    if (fs.existsSync(path.join(frontendDir, 'vite.config.js'))) {
      fs.renameSync(
        path.join(frontendDir, 'vite.config.js'),
        path.join(frontendDir, 'vite.config.js.backup')
      );
    }
    
    // Usar a configuração mínima
    fs.renameSync(
      path.join(frontendDir, 'vite.config.js.minimal'),
      path.join(frontendDir, 'vite.config.js')
    );
    
    // Tentar build novamente com a configuração mínima
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
    console.log('✅ Build do frontend concluído com sucesso usando configuração mínima');
  } catch (fallbackError) {
    console.error('❌ Falha no build com configuração mínima:');
    console.error(fallbackError.message);
    console.error(fallbackError.stderr?.toString() || 'Nenhum stderr disponível');
    
    // Restaurar a configuração original se existir
    if (fs.existsSync(path.join(frontendDir, 'vite.config.js.backup'))) {
      fs.renameSync(
        path.join(frontendDir, 'vite.config.js.backup'),
        path.join(frontendDir, 'vite.config.js')
      );
    }
    
    process.exit(1);
  }
}

console.log('🎉 Script de build concluído com sucesso!');