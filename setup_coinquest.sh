#!/bin/bash

# Скрипт для создания конфигурационных файлов
echo "📝 Создаем конфигурационные файлы..."

# package.json
cat > package.json << 'EOF'
{
  "name": "coinquest-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@supabase/supabase-js": "^2.38.5",
    "i18next": "^23.7.6",
    "react-i18next": "^13.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
EOF

# vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# tsconfig.node.json
cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

# eslint.config.js
cat > eslint.config.js << 'EOF'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
EOF

# index.html
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CoinQuest - Твой финансовый помощник</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# .env.local
cat > .env.local << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# App Configuration
VITE_APP_NAME=CoinQuest
VITE_APP_VERSION=1.0.0
EOF

# .gitignore
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Supabase
.supabase
EOF

# README.md
cat > README.md << 'EOF'
# CoinQuest 🦊💰

Образовательное приложение по финансовой грамотности для детей с персонажем Финли.

## Особенности

- 🦊 Интерактивный персонаж Финли
- 💰 Отслеживание доходов и расходов
- 🎯 Постановка и достижение финансовых целей
- 📊 Планирование бюджета
- 🌍 Многоязычность (русский/английский)
- 🎨 Персонализация персонажа

## Технологии

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (база данных)
- React Router
- i18next (интернационализация)

## Установка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## Настройка

1. Скопируйте `.env.local` и настройте переменные окружения
2. Настройте Supabase для базы данных
3. Запустите приложение командой `npm run dev`

## Структура проекта

```
src/
├── components/     # React компоненты
├── pages/         # Страницы приложения
├── hooks/         # Пользовательские хуки
├── lib/           # Утилиты и конфигурация
├── types/         # TypeScript типы
├── styles/        # CSS стили
└── i18n/          # Файлы локализации
```

## Лицензия

MIT License
EOF

# Завершаем создание остальных файлов из основного скрипта

# Дополняем lib/supabase.ts
cat >> src/lib/supabase.ts << 'EOF'
_ANON_KEY || '';

// Note: Replace with your actual Supabase credentials
// You can get them from your Supabase project dashboard

// Uncomment when you have Supabase set up:
// import { createClient } from '@supabase/supabase-js'
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For now, we'll use a mock client
export const supabase = {
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null })
  })
};
EOF

# src/lib/utils.ts
cat > src/lib/utils.ts << 'EOF'
// Utility functions

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU');
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
EOF

# src/types/index.ts
cat > src/types/index.ts << 'EOF'
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  userId: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface FinleyCustomization {
  id: string;
  userId: string;
  selectedFinley: string;
  color: string;
  accessory: string;
  updatedAt: string;
}

export type FinleyEmotion = 'happy' | 'neutral' | 'excited' | 'thinking' | 'sad';
export type FinleySize = 'small' | 'medium' | 'large';
EOF

# src/styles/globals.css
cat > src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
EOF

# src/styles/components.css
cat > src/styles/components.css << 'EOF'
/* Component-specific styles */

.finley-character {
  transition: transform 0.3s ease;
}

.finley-character:hover {
  transform: scale(1.1);
}

.transaction-item {
  @apply border-b border-gray-100 last:border-b-0;
}

.goal-progress {
  @apply bg-gray-200 rounded-full h-2 overflow-hidden;
}

.goal-progress-bar {
  @apply bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}
EOF

# src/i18n/locales/en.json
cat > src/i18n/locales/en.json << 'EOF'
{
  "app": {
    "name": "CoinQuest",
    "tagline": "Your personal finance companion"
  },
  "navigation": {
    "home": "Home",
    "transactions": "Transactions",
    "planning": "Planning",
    "profile": "Profile"
  },
  "home": {
    "welcome": "Welcome to CoinQuest!",
    "balance": "Balance",
    "monthlyExpenses": "Monthly Expenses",
    "activeGoals": "Active Goals"
  },
  "transactions": {
    "title": "Transactions",
    "addTransaction": "Add Transaction",
    "history": "Transaction History",
    "income": "Income",
    "expense": "Expense",
    "amount": "Amount",
    "description": "Description",
    "category": "Category"
  },
  "planning": {
    "title": "Planning",
    "goals": "Financial Goals",
    "budget": "Budget"
  },
  "profile": {
    "title": "Profile",
    "customization": "Finley Customization",
    "settings": "Settings",
    "language": "Language",
    "currency": "Currency"
  },
  "finley": {
    "classic": "Classic Finley",
    "cool": "Cool Finley",
    "cute": "Cute Finley",
    "color": "Color",
    "accessories": "Accessories",
    "noAccessories": "No accessories",
    "preview": "Preview",
    "saveChanges": "Save Changes"
  },
  "common": {
    "add": "Add",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create"
  }
}
EOF

# src/i18n/locales/ru.json
cat > src/i18n/locales/ru.json << 'EOF'
{
  "app": {
    "name": "CoinQuest",
    "tagline": "Твой персональный помощник в мире финансов"
  },
  "navigation": {
    "home": "Главная",
    "transactions": "Транзакции",
    "planning": "Планирование",
    "profile": "Профиль"
  },
  "home": {
    "welcome": "Добро пожаловать в CoinQuest!",
    "balance": "Баланс",
    "monthlyExpenses": "Расходы за месяц",
    "activeGoals": "активные"
  },
  "transactions": {
    "title": "Транзакции",
    "addTransaction": "Добавить транзакцию",
    "history": "История транзакций",
    "income": "Доход",
    "expense": "Расход",
    "amount": "Сумма",
    "description": "Описание",
    "category": "Категория"
  },
  "planning": {
    "title": "Планирование",
    "goals": "Финансовые цели",
    "budget": "Бюджет"
  },
  "profile": {
    "title": "Профиль",
    "customization": "Персонализация Финли",
    "settings": "Настройки",
    "language": "Язык",
    "currency": "Валюта"
  },
  "finley": {
    "classic": "Классический Финли",
    "cool": "Крутой Финли",
    "cute": "Милый Финли",
    "color": "Цвет",
    "accessories": "Аксессуары",
    "noAccessories": "Без аксессуаров",
    "preview": "Предпросмотр",
    "saveChanges": "Сохранить изменения"
  },
  "common": {
    "add": "Добавить",
    "cancel": "Отмена",
    "save": "Сохранить",
    "delete": "Удалить",
    "edit": "Редактировать",
    "create": "Создать"
  }
}
EOF

# src/i18n/index.ts
cat > src/i18n/index.ts << 'EOF'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
EOF

# src/App.tsx
cat > src/App.tsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TransactionsPage } from './pages/TransactionsPage';
import { PlanningPage } from './pages/PlanningPage';
import { ProfilePage } from './pages/ProfilePage';
import './styles/globals.css';
import './styles/components.css';
import './i18n';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

# src/main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# src/vite-env.d.ts
cat > src/vite-env.d.ts << 'EOF'
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
EOF

# Создаем конфигурацию Tailwind CSS
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finley: {
          blue: '#3B82F6',
          green: '#10B981',
          purple: '#8B5CF6',
          orange: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF

# Создаем PostCSS конфигурацию
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "✅ Все конфигурационные файлы созданы!"
echo "🚀 Теперь выполните:"
echo "   npm install"
echo "   npm run dev"