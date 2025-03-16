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

// Executar build do frontend
console.log('🏗️ Executando build do frontend...');
try {
  execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
  console.log('✅ Build do frontend concluído com sucesso');
} catch (error) {
  console.error('❌ Erro ao executar build do frontend:');
  console.error('Mensagem do erro:', error.message);
  console.error('Saída padrão (stdout):', error.stdout?.toString() || 'Nenhum stdout disponível');
  console.error('Saída de erro (stderr):', error.stderr?.toString() || 'Nenhum stderr disponível');
  process.exit(1);
}

console.log('🎉 Script de build concluído com sucesso!');
