# Fluenix 🚀
[🇹🇷 Türkçe Sürüm Aşağıdadır](#türkçe-sürüm-tr)
Welcome to **Fluenix**! This is a modern monorepo project powered by `pnpm`, featuring a robust tech stack across multiple platforms including web, mobile, backend, and an AI service.
## 🌟 Features & Architecture
Fluenix is structured as a monorepo with the following components:
- **🌐 Web (`apps/web`)**: A powerful Next.js (React 19) web application utilizing Tailwind CSS, Framer Motion, and Zustand for state management. Uses Clerk for authentication.
- **📱 Mobile (`apps/mobile`)**: The mobile counterpart of the application.
- **🧠 AI Service (`apps/ai-service`)**: A Python-based AI microservice built with FastAPI/Uvicorn.
- **⚙️ Backend (`backend`)**: A secure and scalable Node.js/Express REST API. Includes Prisma ORM, Upstash Redis caching, and robust security measures (Helmet, Rate Limiting, XSS protection).
- **📦 Shared Packages (`packages/shared`)**: Shared types, utilities, and components used across the monorepo.
## 🛠️ Tech Stack
- **Monorepo Management**: pnpm workspaces
- **Web Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion, Zustand, Clerk
- **Backend**: Node.js, Express, Prisma, Upstash Redis
- **AI Microservice**: Python, FastAPI, Uvicorn
- **Testing**: Vitest, Playwright
- **Validation**: Zod
## 🚀 Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- Python 3.x (for the AI service)
- A running database instance (for Prisma)
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fluenix.git
   cd fluenix
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Setup environment variables (create `.env` files where necessary based on `.env.example`).
4. Run database migrations and seed data:
   ```bash
   pnpm seed
   ```
### Running the Apps
You can run individual parts of the application using `pnpm` filter scripts:
- **Web Frontend**: `pnpm web`
- **Mobile App**: `pnpm mobile`
- **Node.js Backend**: `pnpm backend`
- **AI Service**: `pnpm ai`
---
<br />
# Fluenix 🚀 <a name="türkçe-sürüm-tr"></a>
**Fluenix**'e hoş geldiniz! Bu proje, web, mobil, arka uç (backend) ve yapay zeka servisini içinde barındıran, `pnpm` tabanlı modern bir monorepo projesidir.
## 🌟 Özellikler ve Mimari
Fluenix, aşağıdaki bileşenlerden oluşan bir monorepo yapısına sahiptir:
- **🌐 Web (`apps/web`)**: Tailwind CSS, Framer Motion ve durum yönetimi için Zustand kullanan güçlü bir Next.js (React 19) web uygulaması. Kimlik doğrulama için Clerk kullanır.
- **📱 Mobil (`apps/mobile`)**: Uygulamanın mobil versiyonu.
- **🧠 Yapay Zeka Servisi (`apps/ai-service`)**: FastAPI/Uvicorn ile geliştirilmiş Python tabanlı bir yapay zeka mikro servisi.
- **⚙️ Arka Uç / Backend (`backend`)**: Güvenli ve ölçeklenebilir Node.js/Express REST API. Prisma ORM, Upstash Redis önbellekleme ve güçlü güvenlik önlemleri (Helmet, Rate Limiting, XSS koruması) içerir.
- **📦 Paylaşılan Paketler (`packages/shared`)**: Monorepo genelinde kullanılan ortak tipler, yardımcı fonksiyonlar ve bileşenler.
## 🛠️ Teknoloji Yığını (Tech Stack)
- **Monorepo Yönetimi**: pnpm workspaces
- **Web Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion, Zustand, Clerk
- **Backend**: Node.js, Express, Prisma, Upstash Redis
- **Yapay Zeka Servisi**: Python, FastAPI, Uvicorn
- **Test Araçları**: Vitest, Playwright
- **Validasyon**: Zod
## 🚀 Başlarken
### Gereksinimler
- [Node.js](https://nodejs.org/) (v20+ önerilir)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- Python 3.x (Yapay zeka servisi için)
- Çalışan bir veritabanı (Prisma için)
### Kurulum
1. Repoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/kullaniciadiniz/fluenix.git
   cd fluenix
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   pnpm install
   ```
3. Çevre (environment) değişkenlerini ayarlayın (Gerekli dizinlerde `.env` dosyalarını oluşturun).
4. Veritabanı tablolarını oluşturun ve başlangıç verilerini yükleyin:
   ```bash
   pnpm seed
   ```
### Uygulamaları Çalıştırma
`pnpm` filter script'lerini kullanarak uygulamanın istediğiniz bölümünü başlatabilirsiniz:
- **Web Uygulaması**: `pnpm web`
- **Mobil Uygulama**: `pnpm mobile`
- **Node.js Backend**: `pnpm backend`
- **Yapay Zeka Servisi**: `pnpm ai`
<img width="1764" height="3393" alt="fluenix-web vercel app_dashboard" src="https://github.com/user-attachments/assets/ad07b15c-e537-4d4b-ac02-47092e8084a6" />
