# 💸 Budget Buddy

Welcome! This is a beautiful, modern React application for personal budget management. Here you can track your income, expenses, manage your savings goals, and view insights.

Below is the **most detailed, beginner-friendly guide** on how to run this project on your computer.

---

## 🛠 Prerequisites (What you need installed)
To run this project, you must have **Node.js** installed on your computer.
1. Go to the [nodejs.org](https://nodejs.org/) website.
2. Download and install the **LTS version** (Recommended for most users).
3. During the installation, just keep clicking "Next" — you don't need to change any default settings.

---

## 🚀 How to Run the Project

### Step 1: Get the Project
If you have a link to this project (or downloaded a ZIP file):
1. Extract the archive into any convenient folder on your computer.
2. Open this folder in a code editor (we highly recommend [Visual Studio Code](https://code.visualstudio.com/)).

### Step 2: Install Dependencies (Libraries)
This project uses several third-party libraries (React, icons, charts). To download them:
1. In VS Code, open the terminal (in the top menu: `Terminal` -> `New Terminal`).
2. In the console that appears at the bottom, type the following command:
```bash
npm install
```
3. Press `Enter` and wait a minute for everything to download. A `node_modules` folder will appear in your project (you don't need to touch it).

### Step 3: Set Up the Database (Supabase)
This app includes cloud synchronization. For this to work, you need to connect a free Supabase database.

1. Go to [supabase.com](https://supabase.com/) and sign up.
2. Click **New Project**, come up with a name and a password (make sure to save this password somewhere safe). Wait a couple of minutes for the database to be created.
3. Go to the project settings (the gear icon ⚙️ in the bottom left) -> **API** section.
4. You need two specific lines from here: the **Project URL** and the **anon public key**.
5. Go back to your code editor. In the main project folder, find the `.env.example` file.
6. Rename it to just `.env` (remove the `.example` part).
7. Open this file and paste your keys inside:
```env
VITE_SUPABASE_URL=paste_your_Project_URL_here
VITE_SUPABASE_ANON_KEY=paste_your_long_anon_key_here
```
*(Make sure there are no quotes or extra spaces around the values)*

### Step 4: Prepare the Database Tables
Your database is created, but it doesn't have the necessary tables yet (for transactions, settings, and goals).
1. In the left menu of Supabase, find the **SQL Editor** section (the `>_` console icon).
2. Click **New Query**.
3. In your code editor, open the `supabase/schema.sql` file.
4. Copy **all the text** from this file, paste it into the SQL Editor in your browser, and click the **Run** button in the bottom right corner.
That's it, your database is ready!

### Step 5: Launch! 🎉
Go back to the VS Code terminal and type the following command:
```bash
npm run dev
```
You will see text similar to `➜  Local:   http://localhost:5173/`. Hold down the `Ctrl` key (or `Cmd` on Mac) and click on this link. The app will open in your browser!

---

## 💡 How to Use the App

The application can operate in **two modes**:

1. **Guest Mode**: If you just open the app and click "Start Tracking", you are in local mode. All data is saved **only in your browser**. This is great for testing and quick tracking.
2. **Auth Mode (Cloud sync)**: Go to the `Settings` menu (the gear icon in the top right) -> `Account` -> `Sign Up`. Create an account. Now all your data will be securely saved in the cloud, and you can log in from your phone to see your expenses anywhere!

*(If you get a yellow warning about Supabase during registration — it means you skipped Step 3 or Step 4).*

Happy tracking! 💰
