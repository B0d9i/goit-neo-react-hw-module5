# Інструкція для деплою на Vercel

## Спосіб 1: Через GitHub (Найпростіший)

### Крок 1: Створіть репозиторій на GitHub

1. Зайдіть на [github.com](https://github.com) і увійдіть до свого акаунту
2. Натисніть кнопку **"New"** (або **"+"** → **"New repository"**)
3. Назвіть репозиторій (наприклад: `social-network-profile`)
4. Оберіть **Public** або **Private**
5. НЕ ставте галочки на "Add README" та інші файли
6. Натисніть **"Create repository"**

### Крок 2: Завантажте код на GitHub

Відкрийте термінал у папці вашого проєкту і виконайте команди:

```bash
# Ініціалізуйте Git (якщо ще не зроблено)
git init

# Додайте всі файли
git add .

# Зробіть перший коміт
git commit -m "Initial commit: Social Network Profile App"

# Додайте віддалений репозиторій (замініть YOUR_USERNAME та REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Встановіть гілку main
git branch -M main

# Завантажте код на GitHub
git push -u origin main
```

**Примітка:** Замініть `YOUR_USERNAME` на ваш GitHub username та `REPO_NAME` на назву репозиторію.

### Крок 3: Деплой на Vercel

1. Зайдіть на [vercel.com](https://vercel.com)
2. Натисніть **"Sign Up"** або **"Log In"**
3. Оберіть **"Continue with GitHub"** та авторизуйтеся
4. Після входу натисніть **"Add New..."** → **"Project"**
5. Знайдіть свій репозиторій у списку та натисніть **"Import"**
6. Vercel автоматично визначить налаштування:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
7. Натисніть **"Deploy"**
8. Зачекайте 1-2 хвилини, поки проєкт задеплоїться
9. Після завершення ви отримаєте посилання типу: `https://your-project-name.vercel.app`

### Крок 4: Автоматичні оновлення

Після деплою кожен раз, коли ви запушите зміни у GitHub:
```bash
git add .
git commit -m "Опис змін"
git push
```

Vercel автоматично задеплоїть нову версію!

---

## Спосіб 2: Через Vercel CLI (Для терміналу)

### Крок 1: Встановіть Vercel CLI

```bash
npm install -g vercel
```

### Крок 2: Увійдіть до Vercel

```bash
vercel login
```

Це відкриє браузер для авторизації.

### Крок 3: Деплой проєкту

Переконайтеся, що ви знаходитесь у папці проєкту, потім:

```bash
vercel
```

Відповідайте на запитання:
- **Set up and deploy?** → Натисніть `Y` (Так)
- **Which scope?** → Оберіть ваш акаунт
- **Link to existing project?** → Натисніть `N` (Ні, якщо це новий проєкт)
- **What's your project's name?** → Введіть назву або натисніть Enter
- **In which directory is your code located?** → Натисніть Enter (`.`)
- **Want to override the settings?** → Натисніть `N` (Ні, Vercel визначить автоматично)

### Крок 4: Production деплой

Для production версії:

```bash
vercel --prod
```

---

## Перевірка налаштувань

Якщо Vercel не розпізнав налаштування автоматично, перевірте:

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install`
4. **Framework Preset:** Vite

---

## Після деплою

✅ Ваш сайт буде доступний за адресою: `https://your-project-name.vercel.app`

✅ Кожен новий push у GitHub автоматично оновлює сайт

✅ Ви можете додати власний домен у налаштуваннях проєкту

---

## Допомога

Якщо виникли проблеми:
- Перевірте логи деплою у Vercel Dashboard
- Переконайтеся, що `package.json` містить скрипт `build`
- Перевірте, що проєкт працює локально: `npm run build && npm run preview`

