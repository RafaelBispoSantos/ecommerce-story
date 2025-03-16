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

// Mostrar versão do Node
console.log('📊 Versão do Node:');
try {
  console.log(execSync('node --version').toString());
} catch (error) {
  console.error('❌ Erro ao verificar versão do Node:', error);
}

// Listar conteúdo do diretório frontend
console.log('📋 Conteúdo do diretório frontend:');
try {
  console.log(execSync(`ls -la ${frontendDir}`).toString());
} catch (error) {
  console.error('❌ Erro ao listar diretório frontend:', error);
}

// Verificar package.json do frontend
const frontendPackageJsonPath = path.join(frontendDir, 'package.json');
if (!fs.existsSync(frontendPackageJsonPath)) {
  console.error('❌ package.json do frontend não encontrado!');
  process.exit(1);
}

// Ler e mostrar dependências
try {
  const packageJson = JSON.parse(fs.readFileSync(frontendPackageJsonPath, 'utf8'));
  console.log('📦 Dependências do frontend:');
  console.log(JSON.stringify(packageJson.dependencies, null, 2));
  console.log('📦 DevDependências do frontend:');
  console.log(JSON.stringify(packageJson.devDependencies, null, 2));
} catch (error) {
  console.error('❌ Erro ao ler package.json do frontend:', error);
}

// Limpar node_modules do frontend (para garantir uma instalação limpa)
console.log('🧹 Limpando node_modules do frontend...');
try {
  execSync(`rm -rf ${path.join(frontendDir, 'node_modules')}`);
  console.log('✅ node_modules limpo com sucesso');
} catch (error) {
  console.log('⚠️ Erro ao limpar node_modules (pode não existir):', error.message);
}

// Instalar dependências do frontend
console.log('📥 Instalando dependências do frontend...');
try {
  execSync('npm install --legacy-peer-deps', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Dependências do frontend instaladas com sucesso');
} catch (error) {
  console.error('❌ Erro ao instalar dependências do frontend:', error);
  process.exit(1);
}

// Verificar se @vitejs/plugin-react foi instalado
try {
  const pluginPath = path.join(frontendDir, 'node_modules', '@vitejs', 'plugin-react');
  if (fs.existsSync(pluginPath)) {
    console.log('✅ @vitejs/plugin-react encontrado em node_modules');
  } else {
    console.error('❌ @vitejs/plugin-react não encontrado!');
    console.log('🔄 Tentando instalar @vitejs/plugin-react especificamente...');
    execSync('npm install @vitejs/plugin-react --save-dev', { cwd: frontendDir, stdio: 'inherit' });
  }
} catch (error) {
  console.error('❌ Erro ao verificar plugin:', error);
}

// Executar build do frontend
console.log('🏗️ Executando build do frontend...');
try {
  execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Build do frontend concluído com sucesso');
} catch (error) {
  console.error('❌ Erro ao executar build do frontend:', error);
  process.exit(1);
}

console.log('🎉 Script de build concluído com sucesso!');