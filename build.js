import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório do frontend
const frontendDir = path.join(__dirname, "frontend");

console.log("🔍 Verificando ambiente...");
console.log("📂 Diretório atual:", __dirname);
console.log("📂 Diretório frontend:", frontendDir);

// Verificar se o diretório frontend existe
if (!fs.existsSync(frontendDir)) {
  console.error("❌ Diretório frontend não encontrado!");
  process.exit(1);
}

// Mostrar versão do Node.js
try {
  console.log("📊 Versão do Node.js:", execSync("node --version").toString().trim());
} catch (error) {
  console.error("❌ Erro ao verificar versão do Node.js:", error);
}

// Listar conteúdo do diretório frontend
try {
  console.log("📋 Conteúdo do diretório frontend:");
  console.log(execSync(`ls -la ${frontendDir}`).toString());
} catch (error) {
  console.error("❌ Erro ao listar diretório frontend:", error);
}

// Verificar package.json do frontend
const frontendPackageJsonPath = path.join(frontendDir, "package.json");
if (!fs.existsSync(frontendPackageJsonPath)) {
  console.error("❌ package.json do frontend não encontrado!");
  process.exit(1);
}

// Ler e mostrar dependências do package.json
try {
  const packageJson = JSON.parse(fs.readFileSync(frontendPackageJsonPath, "utf8"));
  console.log("📦 Dependências do frontend:", JSON.stringify(packageJson.dependencies, null, 2));
  console.log("📦 DevDependências do frontend:", JSON.stringify(packageJson.devDependencies, null, 2));
} catch (error) {
  console.error("❌ Erro ao ler package.json do frontend:", error);
}

// Instalar dependências do frontend
console.log("📥 Instalando dependências do frontend...");
try {
  execSync("npm install --legacy-peer-deps", { cwd: frontendDir, stdio: "inherit" });
  console.log("✅ Dependências instaladas com sucesso");
} catch (error) {
  console.error("❌ Erro ao instalar dependências do frontend:", error);
  process.exit(1);
}

// Verificar e instalar @vitejs/plugin-react se necessário
try {
  const pluginPath = path.join(frontendDir, "node_modules", "@vitejs", "plugin-react");
  if (!fs.existsSync(pluginPath)) {
    console.log("🔄 @vitejs/plugin-react não encontrado. Instalando...");
    execSync("npm install @vitejs/plugin-react --save-dev", { cwd: frontendDir, stdio: "inherit" });
  } else {
    console.log("✅ @vitejs/plugin-react encontrado.");
  }
} catch (error) {
  console.error("❌ Erro ao verificar ou instalar @vitejs/plugin-react:", error);
  process.exit(1);
}

// Executar build do frontend
console.log("🏗️ Executando build do frontend...");
try {
  execSync("npm run build", { cwd: frontendDir, stdio: "inherit" });
  console.log("✅ Build do frontend concluído com sucesso!");
} catch (error) {
  console.error("❌ Erro ao executar build do frontend:", error);
  process.exit(1);
}

console.log("🎉 Script de build concluído com sucesso!");
