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

// Listar arquivos no diretório frontend para diagnóstico
console.log('📋 Listando arquivos no diretório frontend:');
try {
  execSync('dir', { cwd: frontendDir, stdio: 'inherit' }); // Para Windows
} catch (error) {
  console.error('⚠️ Erro ao listar arquivos');
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

// Instalar autoprefixer e postcss explicitamente
console.log('🔧 Instalando autoprefixer e postcss explicitamente...');
try {
  execSync('npm install autoprefixer postcss --save-dev', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Autoprefixer e PostCSS instalados com sucesso');
} catch (error) {
  console.error('⚠️ Aviso ao instalar autoprefixer:', error.message);
  // Continue mesmo se houver erro aqui
}

// Verificar se postcss.config.js existe e criar se necessário
const postcssConfigPath = path.join(frontendDir, 'postcss.config.js');
if (!fs.existsSync(postcssConfigPath)) {
  console.log('📝 Criando configuração mínima de PostCSS...');
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`;
  fs.writeFileSync(postcssConfigPath, postcssConfig);
}

// Criar configuração mínima do Vite
console.log('📝 Criando configuração mínima do Vite...');
const minimalViteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [],  // Configuração mínima de PostCSS sem autoprefixer
    },
  },
});`;
fs.writeFileSync(path.join(frontendDir, 'vite.config.minimal.js'), minimalViteConfig);

// Executar build do frontend com configuração mínima
console.log('🏗️ Executando build do frontend com configuração mínima...');
try {
  execSync('npx vite build --config vite.config.minimal.js', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Build do frontend concluído com sucesso');
} catch (error) {
  console.error('❌ Erro ao executar build do frontend:');
  console.error('Mensagem do erro:', error.message);
  console.error('Saída padrão (stdout):', error.stdout?.toString() || 'Nenhum stdout disponível');
  console.error('Saída de erro (stderr):', error.stderr?.toString() || 'Nenhum stderr disponível');
  process.exit(1);
}

console.log('🎉 Script de build concluído com sucesso!');