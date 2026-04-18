import { Locale } from "@/lib/i18n";

export interface BlogPost {
  slug: string;
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
  content: { en: string; es: string };
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  image: string;
}

export const posts: BlogPost[] = [
  {
    slug: "best-ai-tools-for-developers-2025",
    title: {
      en: "10 Best AI Tools for Developers in 2025",
      es: "Las 10 Mejores Herramientas de IA para Developers en 2025",
    },
    excerpt: {
      en: "Discover the most powerful AI tools that are transforming how developers write code, debug, and ship software faster.",
      es: "Descubre las herramientas de IA más potentes que están transformando cómo los developers escriben código, depuran y entregan software más rápido.",
    },
    content: {
      en: `## Introduction

The landscape of AI tools for developers has exploded in 2025. From code completion to automated testing, AI is fundamentally changing how we build software.

## What Are AI Developer Tools?

AI developer tools use machine learning models to assist with various aspects of software development — writing code, reviewing pull requests, generating tests, and even architecting systems.

## Why It Matters

Developers who adopt AI tools report **40-60% productivity gains**. That's not a marginal improvement — it's a paradigm shift.

## Step-by-Step: Getting Started

### 1. Choose Your AI Code Assistant

| Tool | Best For | Pricing |
|------|----------|---------|
| GitHub Copilot | General coding | $10/mo |
| Cursor | Full IDE experience | $20/mo |
| Lovable | Full-stack app building | Free tier |
| Codeium | Free alternative | Free |

### 2. Set Up Your Workflow

\`\`\`bash
# Install the CLI tool
npm install -g ai-dev-toolkit

# Initialize your project
ai-dev init --model gpt-5
\`\`\`

### 3. Integrate with Your Editor

Most AI tools offer VS Code extensions. Install them from the marketplace and configure your API keys.

## Use Cases

- 🔧 **Code Generation**: Write boilerplate code in seconds
- 🐛 **Bug Detection**: Find bugs before they reach production
- 📝 **Documentation**: Auto-generate docs from code
- 🧪 **Testing**: Generate unit tests automatically
- 🔍 **Code Review**: AI-powered pull request reviews

## Pros and Cons

**Pros:**
- ✅ Massive productivity boost
- ✅ Reduces repetitive work
- ✅ Helps learn new languages/frameworks
- ✅ Catches bugs early

**Cons:**
- ❌ Can generate incorrect code
- ❌ Privacy concerns with cloud models
- ❌ May reduce deep understanding
- ❌ Subscription costs add up

## Conclusion

AI tools for developers are no longer optional — they're essential. Start with one tool, master it, and gradually expand your AI-powered workflow. The developers who embrace these tools today will have a significant advantage tomorrow. 🚀`,
      es: `## Introducción

El panorama de las herramientas de IA para developers ha explotado en 2025. Desde la completación de código hasta las pruebas automatizadas, la IA está cambiando fundamentalmente cómo construimos software.

## ¿Qué Son las Herramientas de IA para Developers?

Las herramientas de IA para developers usan modelos de machine learning para asistir en varios aspectos del desarrollo de software — escribir código, revisar pull requests, generar tests e incluso diseñar arquitecturas.

## Por Qué Importa

Los developers que adoptan herramientas de IA reportan **ganancias de productividad del 40-60%**. No es una mejora marginal — es un cambio de paradigma.

## Paso a Paso: Primeros Pasos

### 1. Elige Tu Asistente de Código IA

| Herramienta | Mejor Para | Precio |
|-------------|------------|--------|
| GitHub Copilot | Coding general | $10/mes |
| Cursor | Experiencia IDE completa | $20/mes |
| v0 | Construcción full-stack | Tier gratuito |
| Codeium | Alternativa gratuita | Gratis |

### 2. Configura Tu Flujo de Trabajo

\`\`\`bash
# Instala la herramienta CLI
npm install -g ai-dev-toolkit

# Inicializa tu proyecto
ai-dev init --model gpt-5
\`\`\`

### 3. Integra con Tu Editor

La mayoría de las herramientas de IA ofrecen extensiones para VS Code. Instálalas desde el marketplace y configura tus API keys.

## Casos de Uso

- 🔧 **Generación de Código**: Escribe código boilerplate en segundos
- 🐛 **Detección de Bugs**: Encuentra bugs antes de que lleguen a producción
- 📝 **Documentación**: Auto-genera docs desde el código
- 🧪 **Testing**: Genera unit tests automáticamente
- 🔍 **Code Review**: Reviews de pull requests potenciados por IA

## Pros y Contras

**Pros:**
- ✅ Aumento masivo de productividad
- ✅ Reduce trabajo repetitivo
- ✅ Ayuda a aprender nuevos lenguajes/frameworks
- ✅ Detecta bugs tempranamente

**Contras:**
- ❌ Puede generar código incorrecto
- ❌ Preocupaciones de privacidad con modelos cloud
- ❌ Puede reducir la comprensión profunda
- ❌ Los costos de suscripción se acumulan

## Conclusión

Las herramientas de IA para developers ya no son opcionales — son esenciales. Comienza con una herramienta, domínala y gradualmente expande tu flujo de trabajo potenciado por IA. Los developers que abracen estas herramientas hoy tendrán una ventaja significativa mañana. 🚀`,
    },
    category: "ai-tools",
    tags: ["ai", "tools", "productivity", "copilot", "cursor"],
    author: "DevAI Team",
    publishedAt: "2025-03-10",
    readTime: 8,
    featured: true,
    image: "",
  },
  {
    slug: "automate-workflows-with-ai-agents",
    title: {
      en: "How to Automate Your Dev Workflows with AI Agents",
      es: "Cómo Automatizar Tus Flujos de Trabajo con Agentes de IA",
    },
    excerpt: {
      en: "Learn how to set up AI agents that automate repetitive tasks like code reviews, deployments, and issue triage.",
      es: "Aprende a configurar agentes de IA que automaticen tareas repetitivas como code reviews, deployments y triaje de issues.",
    },
    content: {
      en: `## Introduction

AI agents are autonomous programs that can execute multi-step tasks without human intervention. For developers, this means automating the tedious parts of your workflow.

## What Are AI Agents?

Unlike simple AI assistants that respond to prompts, agents can plan, execute, and iterate. They break down complex tasks into steps and work through them systematically.

## Why It Matters

Every hour spent on repetitive tasks is an hour not spent on creative problem-solving. AI agents can handle the routine so you can focus on what matters.

## Step-by-Step Setup

### 1. Define Your Automation Goals

Start by listing tasks you repeat daily:
- Reviewing boilerplate PRs
- Writing changelog entries
- Triaging bug reports
- Updating dependencies

### 2. Choose Your Agent Framework

\`\`\`typescript
import { Agent } from 'ai-agent-sdk';

const codeReviewAgent = new Agent({
  name: 'Code Reviewer',
  triggers: ['pull_request.opened'],
  actions: [
    'analyze_diff',
    'check_patterns',
    'post_review',
  ],
});
\`\`\`

### 3. Deploy and Monitor

Deploy your agents and monitor their performance. Start with low-risk tasks and gradually increase autonomy.

## Use Cases

- 🔄 **CI/CD Optimization**: AI-powered pipeline improvements
- 📋 **Issue Triage**: Auto-categorize and prioritize bugs
- 📊 **Performance Monitoring**: Detect anomalies automatically
- 🔐 **Security Scanning**: Continuous vulnerability detection

## Pros and Cons

**Pros:**
- ✅ Saves hours of manual work
- ✅ Consistent quality
- ✅ 24/7 operation
- ✅ Scales effortlessly

**Cons:**
- ❌ Initial setup complexity
- ❌ Requires monitoring
- ❌ May need fine-tuning
- ❌ Cost of AI API calls

## Conclusion

AI agents are the next frontier in developer productivity. Start small, automate one workflow, and scale from there.`,
      es: `## Introducción

Los agentes de IA son programas autónomos que pueden ejecutar tareas de múltiples pasos sin intervención humana. Para los developers, esto significa automatizar las partes tediosas de tu flujo de trabajo.

## ¿Qué Son los Agentes de IA?

A diferencia de los asistentes de IA simples que responden a prompts, los agentes pueden planificar, ejecutar e iterar. Descomponen tareas complejas en pasos y los trabajan sistemáticamente.

## Por Qué Importa

Cada hora gastada en tareas repetitivas es una hora no dedicada a la resolución creativa de problemas. Los agentes de IA pueden manejar la rutina para que te concentres en lo que importa.

## Configuración Paso a Paso

### 1. Define Tus Objetivos de Automatización

Comienza listando las tareas que repites diariamente:
- Revisar PRs de boilerplate
- Escribir entradas de changelog
- Clasificar reportes de bugs
- Actualizar dependencias

### 2. Elige Tu Framework de Agentes

\`\`\`typescript
import { Agent } from 'ai-agent-sdk';

const codeReviewAgent = new Agent({
  name: 'Code Reviewer',
  triggers: ['pull_request.opened'],
  actions: [
    'analyze_diff',
    'check_patterns',
    'post_review',
  ],
});
\`\`\`

### 3. Despliega y Monitorea

Despliega tus agentes y monitorea su rendimiento. Comienza con tareas de bajo riesgo y gradualmente aumenta la autonomía.

## Casos de Uso

- 🔄 **Optimización CI/CD**: Mejoras de pipeline potenciadas por IA
- 📋 **Triaje de Issues**: Auto-categoriza y prioriza bugs
- 📊 **Monitoreo de Rendimiento**: Detecta anomalías automáticamente
- 🔐 **Escaneo de Seguridad**: Detección continua de vulnerabilidades

## Pros y Contras

**Pros:**
- ✅ Ahorra horas de trabajo manual
- ✅ Calidad consistente
- ✅ Operación 24/7
- ✅ Escala sin esfuerzo

**Contras:**
- ❌ Complejidad de configuración inicial
- ❌ Requiere monitoreo
- ❌ Puede necesitar ajuste fino
- ❌ Costo de llamadas API de IA

## Conclusión

Los agentes de IA son la próxima frontera en productividad developer. Comienza en pequeño, automatiza un flujo de trabajo y escala desde ahí.`,
    },
    category: "automation",
    tags: ["ai-agents", "automation", "workflows", "productivity"],
    author: "DevAI Team",
    publishedAt: "2025-03-08",
    readTime: 6,
    featured: true,
    image: "",
  },
  {
    slug: "build-fullstack-app-with-ai",
    title: {
      en: "Build a Full-Stack App in 30 Minutes with AI",
      es: "Construye una App Full-Stack en 30 Minutos con IA",
    },
    excerpt: {
      en: "A step-by-step tutorial on using AI-powered tools to build and deploy a complete web application from scratch.",
      es: "Un tutorial paso a paso sobre cómo usar herramientas potenciadas por IA para construir y desplegar una aplicación web completa desde cero.",
    },
    content: {
      en: `## Introduction

What used to take weeks now takes minutes. In this tutorial, we'll build a complete full-stack application using AI-powered development tools.

## What We're Building

A task management app with authentication, real-time updates, and a clean UI — all built with AI assistance.

## Why It Matters

The ability to rapidly prototype and ship applications is a superpower. AI tools make this accessible to everyone, from students to senior engineers.

## Step-by-Step Tutorial

### 1. Describe Your App

Start by clearly describing what you want to build:

\`\`\`
"Build a task management app with user authentication, 
real-time collaboration, and a kanban board interface."
\`\`\`

### 2. Generate the Foundation

\`\`\`typescript
// The AI generates your data model
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
  createdAt: Date;
}
\`\`\`

### 3. Add Features Iteratively

Don't try to build everything at once. Add features one at a time:
1. Basic CRUD operations
2. User authentication
3. Real-time updates
4. Kanban board UI

### 4. Deploy

\`\`\`bash
# One-click deployment
v0 deploy --production
\`\`\`

## Use Cases

- 🎓 **Students**: Build portfolio projects quickly
- 🏢 **Startups**: Rapid MVP development
- 💼 **Freelancers**: Deliver client projects faster
- 🔬 **Researchers**: Build data tools rapidly

## Pros and Cons

**Pros:**
- ✅ Incredibly fast
- ✅ Low barrier to entry
- ✅ Production-quality code
- ✅ Built-in best practices

**Cons:**
- ❌ Limited customization for complex apps
- ❌ Learning curve for AI prompting
- ❌ Dependency on AI tools
- ❌ May need manual optimization

## Conclusion

AI-powered development is not about replacing developers — it's about amplifying them. Give it a try and see how much faster you can ship. ⚡`,
      es: `## Introducción

Lo que solía tomar semanas ahora toma minutos. En este tutorial, construiremos una aplicación full-stack completa usando herramientas de desarrollo potenciadas por IA.

## Qué Vamos a Construir

Una app de gestión de tareas con autenticación, actualizaciones en tiempo real y una UI limpia — todo construido con asistencia de IA.

## Por Qué Importa

La capacidad de prototipar rápidamente y entregar aplicaciones es un superpoder. Las herramientas de IA hacen esto accesible para todos, desde estudiantes hasta ingenieros senior.

## Tutorial Paso a Paso

### 1. Describe Tu App

Comienza describiendo claramente lo que quieres construir:

\`\`\`
"Construye una app de gestión de tareas con autenticación de usuarios, 
colaboración en tiempo real e interfaz de tablero kanban."
\`\`\`

### 2. Genera la Base

\`\`\`typescript
// La IA genera tu modelo de datos
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
  createdAt: Date;
}
\`\`\`

### 3. Agrega Funcionalidades Iterativamente

No intentes construir todo de una vez. Agrega funcionalidades una a la vez:
1. Operaciones CRUD básicas
2. Autenticación de usuarios
3. Actualizaciones en tiempo real
4. UI de tablero kanban

### 4. Despliega

\`\`\`bash
# Despliegue con un click
v0 deploy --production
\`\`\`

## Casos de Uso

- 🎓 **Estudiantes**: Construye proyectos de portafolio rápidamente
- 🏢 **Startups**: Desarrollo rápido de MVP
- 💼 **Freelancers**: Entrega proyectos de clientes más rápido
- 🔬 **Investigadores**: Construye herramientas de datos rápidamente

## Pros y Contras

**Pros:**
- ✅ Increíblemente rápido
- ✅ Baja barrera de entrada
- ✅ Código de calidad producción
- ✅ Mejores prácticas integradas

**Contras:**
- ❌ Personalización limitada para apps complejas
- ❌ Curva de aprendizaje para prompting con IA
- ❌ Dependencia de herramientas de IA
- ❌ Puede necesitar optimización manual

## Conclusión

El desarrollo potenciado por IA no se trata de reemplazar developers — se trata de amplificarlos. Pruébalo y ve cuánto más rápido puedes entregar. ⚡`,
    },
    category: "tutorials",
    tags: ["tutorial", "fullstack", "ai", "beginner"],
    author: "DevAI Team",
    publishedAt: "2025-03-05",
    readTime: 10,
    featured: true,
    image: "",
  },
  {
    slug: "boost-developer-productivity-with-ai",
    title: {
      en: "7 Ways to Boost Your Developer Productivity with AI",
      es: "7 Formas de Aumentar Tu Productividad Developer con IA",
    },
    excerpt: {
      en: "Practical tips and workflows to integrate AI into your daily development routine and get more done in less time.",
      es: "Tips prácticos y flujos de trabajo para integrar IA en tu rutina diaria de desarrollo y hacer más en menos tiempo.",
    },
    content: {
      en: `## Introduction

Productivity isn't about working more hours — it's about working smarter. AI tools can help you do exactly that.

## What Is AI-Powered Productivity?

It's using AI tools strategically throughout your development workflow to eliminate bottlenecks and automate repetitive tasks.

## Why It Matters

The most productive developers aren't necessarily the best coders — they're the ones who leverage the best tools.

## 7 Productivity Tips

### 1. Use AI for Code Reviews
Let AI catch the obvious issues so you can focus on architecture and logic.

### 2. Automate Documentation
\`\`\`typescript
// AI can generate JSDoc from your code
/**
 * Calculates the total price including tax
 * @param price - Base price of the item
 * @param taxRate - Tax rate as a decimal
 * @returns Total price with tax applied
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
\`\`\`

### 3. Generate Test Cases
Ask AI to write edge case tests you might miss.

### 4. Scaffold New Features
Use AI to generate boilerplate for new features and customize from there.

### 5. Debug Faster
Paste error messages into AI and get instant explanations and fixes.

### 6. Learn New Technologies
Use AI as a tutor for unfamiliar frameworks and languages.

### 7. Optimize Performance
AI can analyze your code and suggest performance improvements.

## Use Cases

- 🏃 **Sprint Planning**: AI-generated task breakdowns
- 📊 **Code Analytics**: Identify bottlenecks
- 🎯 **Focus Time**: Automate distractions
- 📝 **Meeting Notes**: AI-powered summaries

## Pros and Cons

**Pros:**
- ✅ Immediate time savings
- ✅ Better code quality
- ✅ Continuous learning
- ✅ Reduced burnout

**Cons:**
- ❌ Over-reliance risk
- ❌ Context switching
- ❌ Tool fatigue
- ❌ Privacy concerns

## Conclusion

Start with one tip, master it, and add more. The compound effect of small productivity gains is enormous over time. 📈`,
      es: `## Introducción

La productividad no se trata de trabajar más horas — se trata de trabajar más inteligentemente. Las herramientas de IA pueden ayudarte a hacer exactamente eso.

## ¿Qué Es la Productividad Potenciada por IA?

Es usar herramientas de IA estratégicamente a lo largo de tu flujo de trabajo de desarrollo para eliminar cuellos de botella y automatizar tareas repetitivas.

## Por Qué Importa

Los developers más productivos no son necesariamente los mejores programadores — son los que aprovechan las mejores herramientas.

## 7 Tips de Productividad

### 1. Usa IA para Code Reviews
Deja que la IA detecte los problemas obvios para que puedas enfocarte en la arquitectura y la lógica.

### 2. Automatiza la Documentación
\`\`\`typescript
// La IA puede generar JSDoc desde tu código
/**
 * Calcula el precio total incluyendo impuestos
 * @param price - Precio base del artículo
 * @param taxRate - Tasa de impuesto como decimal
 * @returns Precio total con impuesto aplicado
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
\`\`\`

### 3. Genera Casos de Test
Pide a la IA que escriba tests de casos borde que podrías pasar por alto.

### 4. Genera Scaffold de Nuevas Features
Usa IA para generar boilerplate para nuevas funcionalidades y personaliza desde ahí.

### 5. Depura Más Rápido
Pega mensajes de error en la IA y obtén explicaciones y soluciones instantáneas.

### 6. Aprende Nuevas Tecnologías
Usa IA como tutor para frameworks y lenguajes desconocidos.

### 7. Optimiza el Rendimiento
La IA puede analizar tu código y sugerir mejoras de rendimiento.

## Casos de Uso

- 🏃 **Sprint Planning**: Desglose de tareas generado por IA
- 📊 **Análisis de Código**: Identifica cuellos de botella
- 🎯 **Tiempo de Enfoque**: Automatiza distracciones
- 📝 **Notas de Reunión**: Resúmenes potenciados por IA

## Pros y Contras

**Pros:**
- ✅ Ahorro de tiempo inmediato
- ✅ Mejor calidad de código
- ✅ Aprendizaje continuo
- ✅ Reduce el burnout

**Contras:**
- ❌ Riesgo de dependencia excesiva
- ❌ Cambio de contexto
- ❌ Fatiga de herramientas
- ❌ Preocupaciones de privacidad

## Conclusión

Comienza con un tip, domínalo y agrega más. El efecto compuesto de pequeñas ganancias de productividad es enorme con el tiempo. 📈`,
    },
    category: "productivity",
    tags: ["productivity", "tips", "workflows", "developer"],
    author: "DevAI Team",
    publishedAt: "2025-02-25",
    readTime: 5,
    featured: false,
    image: "",
  },
  {
    slug: "ai-cli-tools-typescript",
    title: {
      en: "Build AI-Powered CLI Tools with TypeScript",
      es: "Construye Herramientas CLI con IA usando TypeScript",
    },
    excerpt: {
      en: "Learn how to create powerful command-line tools enhanced with AI capabilities using TypeScript and Node.js.",
      es: "Aprende a crear herramientas de línea de comandos potenciadas con IA usando TypeScript y Node.js.",
    },
    content: {
      en: `## Introduction

Command-line tools are the backbone of developer workflows. Imagine having an AI assistant right in your terminal that understands your project context and helps you write code, run tests, and deploy applications.

In this guide, we'll build a powerful CLI tool enhanced with AI capabilities using TypeScript.

## What We're Building

We'll create an AI-powered CLI tool that can:
- Analyze your codebase and suggest improvements
- Generate boilerplate code from descriptions
- Explain error messages and suggest fixes
- Run common development tasks with natural language

## Why It Matters

CLI tools with AI integration can dramatically improve developer productivity. Here's what makes them powerful:

- **Context-aware**: They understand your project structure
- **Productive**: Reduce repetitive tasks significantly
- **Learning**: Help junior developers understand code better

## Step-by-Step Implementation

### 1. Project Setup

\`\`\`bash
mkdir ai-cli-tool
cd ai-cli-tool
npm init -y
npm install commander chalk openai dotenv
npm install -D typescript @types/node ts-node
\`\`\`

### 2. Initialize TypeScript

\`\`\`bash
npx tsc --init
\`\`\`

Configure your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
\`\`\`

### 3. Create the CLI Structure

\`\`\`typescript
import { Command } from 'commander';
import chalk from 'chalk';
import { analyzeCode } from './commands/analyze';
import { generateCode } from './commands/generate';

const program = new Command();

program
  .name('devai')
  .description('AI-powered CLI tool for developers')
  .version('1.0.0');

program
  .command('analyze')
  .description('Analyze your codebase')
  .argument('[path]', 'Path to analyze', '.')
  .action(async (path) => {
    console.log(chalk.blue('🔍 Analyzing codebase...'));
    const results = await analyzeCode(path);
    console.log(chalk.green('✅ Analysis complete!'));
    console.log(results);
  });

program
  .command('generate')
  .description('Generate code from description')
  .requiredOption('-d, --description <text>', 'Code description')
  .option('-l, --language <lang>', 'Programming language', 'typescript')
  .action(async (options) => {
    console.log(chalk.blue('✨ Generating code...'));
    const code = await generateCode(options.description, options.language);
    console.log(chalk.green('✅ Generated code:'));
    console.log(code);
  });

program.parse();
\`\`\`

### 4. Integrate AI (OpenAI)

\`\`\`typescript
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateCode(prompt: string, language: string): Promise<string> {
  const response = await openai.createCompletion({
    model: 'gpt-4',
    prompt: \`Generate \${language} code for: \${prompt}\`,
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.data.choices[0].text || 'No code generated';
}

export async function analyzeCode(path: string): Promise<string> {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a code analysis expert. Analyze the provided code and suggest improvements.' },
      { role: 'user', content: \`Analyze code at: \${path}\` }
    ],
  });

  return response.data.choices[0].message?.content || 'Analysis failed';
}
\`\`\`

### 5. Make It Executable

Add to your \`package.json\`:

\`\`\`json
{
  "bin": {
    "devai": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
\`\`\`

Link it locally:

\`\`\`bash
npm link
devai analyze ./src
devai generate -d "create a React useState hook"
\`\`\`

## Use Cases

- 🔧 **Code Review**: Automatically review pull requests
- 📝 **Boilerplate**: Generate starting templates
- 🐛 **Debugging**: Explain errors and suggest fixes
- 📚 **Learning**: Get explanations of complex code

## Pros and Cons

**Pros:**
- ✅ Massive time savings on repetitive tasks
- ✅ Consistent code quality
- ✅ Accessible for all skill levels
- ✅ Extensible with plugins

**Cons:**
- ❌ Requires API key setup
- ❌ Can incur API costs
- ❌ May generate incorrect code sometimes
- ❌ Needs internet connection

## Conclusion

Building AI-powered CLI tools is easier than you think. Start with a simple command, integrate an AI API, and iterate. The possibilities are endless!

Start building today and transform your developer experience. 🚀`,
      es: `## Introducción

Las herramientas de línea de comandos son la columna vertebral del flujo de trabajo de los developers. Imagina tener un asistente de IA прямо в tu terminal que entiende el contexto de tu proyecto y te ayuda a escribir código, ejecutar pruebas y desplegar aplicaciones.

En esta guía, construiremos una herramienta CLI potenciada con IA usando TypeScript.

## Qué Vamos a Construir

Crearemos una herramienta CLI con IA que puede:
- Analizar tu código y sugerir mejoras
- Generar código boilerplate desde descripciones
- Explicar mensajes de error y sugerir soluciones
- Ejecutar tareas comunes de desarrollo con lenguaje natural

## Por Qué Importa

Las herramientas CLI con integración de IA pueden mejorar dramatically la productividad del developer. Esto las hace poderosas:

- **Conocimiento del contexto**: Entienden la estructura de tu proyecto
- **Productivas**: Reducen tareas repetitivas significativamente
- **De aprendizaje**: Ayudan a developers junior a entender mejor el código

## Implementación Paso a Paso

### 1. Configuración del Proyecto

\`\`\`bash
mkdir ai-cli-tool
cd ai-cli-tool
npm init -y
npm install commander chalk openai dotenv
npm install -D typescript @types/node ts-node
\`\`\`

### 2. Inicializar TypeScript

\`\`\`bash
npx tsc --init
\`\`\`

Configura tu \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
\`\`\`

### 3. Crear la Estructura del CLI

\`\`\`typescript
import { Command } from 'commander';
import chalk from 'chalk';
import { analyzeCode } from './commands/analyze';
import { generateCode } from './commands/generate';

const program = new Command();

program
  .name('devai')
  .description('Herramienta CLI con IA para developers')
  .version('1.0.0');

program
  .command('analyze')
  .description('Analiza tu código')
  .argument('[path]', 'Ruta a analizar', '.')
  .action(async (path) => {
    console.log(chalk.blue('🔍 Analizando código...'));
    const results = await analyzeCode(path);
    console.log(chalk.green('✅ Análisis completo!'));
    console.log(results);
  });

program
  .command('generate')
  .description('Genera código desde descripción')
  .requiredOption('-d, --description <text>', 'Descripción del código')
  .option('-l, --language <lang>', 'Lenguaje de programación', 'typescript')
  .action(async (options) => {
    console.log(chalk.blue('✨ Generando código...'));
    const code = await generateCode(options.description, options.language);
    console.log(chalk.green('✅ Código generado:'));
    console.log(code);
  });

program.parse();
\`\`\`

### 4. Integrar IA (OpenAI)

\`\`\`typescript
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateCode(prompt: string, language: string): Promise<string> {
  const response = await openai.createCompletion({
    model: 'gpt-4',
    prompt: \`Genera código en \${language} para: \${prompt}\`,
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.data.choices[0].text || 'No se generó código';
}

export async function analyzeCode(path: string): Promise<string> {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Eres un experto en análisis de código. Analiza el código proporcionado y sugiere mejoras.' },
      { role: 'user', content: \`Analiza el código en: \${path}\` }
    ],
  });

  return response.data.choices[0].message?.content || 'Análisis fallido';
}
\`\`\`

### 5. Hacerlo Ejecutable

Agrega a tu \`package.json\`:

\`\`\`json
{
  "bin": {
    "devai": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
\`\`\`

Vínculo local:

\`\`\`bash
npm link
devai analyze ./src
devai generate -d "crear un hook useState de React"
\`\`\`

## Casos de Uso

- 🔧 **Revisión de Código**: Revisa automáticamente PRs
- 📝 **Boilerplate**: Genera plantillas iniciales
- 🐛 **Depuración**: Explica errores y sugiere soluciones
- 📚 **Aprendizaje**: Obtén explicaciones de código complejo

## Pros y Contras

**Pros:**
- ✅ Ahorro masivo de tiempo en tareas repetitivas
- ✅ Calidad de código consistente
- ✅ Accesible para todos los niveles
- ✅ Extensible con plugins

**Contras:**
- ❌ Requiere configuración de API key
- ❌ Puede generar costos de API
- ❌ A veces puede generar código incorrecto
- ❌ Necesita conexión a internet

## Conclusión

Construir herramientas CLI con IA es más fácil de lo que piensas. Comienza con un comando simple, integra una API de IA e itera. Las posibilidades son infinitas!

Comienza a construir hoy y transforma tu experiencia como developer. 🚀`,
    },
    category: "tutorials",
    tags: ["tutorial", "cli", "typescript", "ai-tools", "productivity"],
    author: "DevAI Team",
    publishedAt: "2025-04-18",
    readTime: 12,
    featured: true,
    image: "",
  },
];

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getPostsByLocale(locale: Locale) {
  return posts.map((post) => ({
    ...post,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    content: post.content[locale],
  }));
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string) {
  return posts.filter((p) => p.category === category);
}

export function getFeaturedPosts() {
  return posts.filter((p) => p.featured);
}
