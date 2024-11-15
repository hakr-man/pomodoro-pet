# PetPomodoro - Architecture

## High-Level Architecture Overview

### 1. **Frontend (Client-Side)**

- **User Interface (UI):** Provides the interactive experience for the user, including the virtual pet, to-do list, timers, and reminders.
  - **Interactivity:** Handles user inputs, animations of the virtual pets, and dynamic updates of the to-do list and timer.
  - **Responsive Design:** Ensure it works across desktops, tablets, and mobile devices.
  - **Communication with Backend:** Interacts with the backend (API) to store user data (to-do lists, progress, etc.), fetch cloud-synced information, and receive notifications.

### 2. **Backend (Server-Side)**

- **APIs:** Handles requests for storing and retrieving data (e.g., to-do list, user settings, timer progress, virtual pet state).
  - **Authentication/Authorization:** Manages user accounts, login sessions, and secure access to personal data.
  - **Data Storage:** Stores user-specific data (to-do lists, virtual pet progress, and user preferences).
  - **Notification Service:** Sends browser notifications or reminders for tasks, breaks, and other activities.

### 3. **Database**

- A cloud-based database to store and retrieve user data (e.g., PostgreSQL, MongoDB, Firebase).
  - Data stored might include to-do list items, user settings (e.g., break reminders), progress on virtual pets, and user preferences.

### 4. **External Services**

- **Cloud Hosting:** Host the backend (e.g., AWS, Google Cloud, Heroku).
  - **Authentication Service:** Could use OAuth (Google, Facebook) or a custom user authentication service.
  - **Notification Service:** Implement browser push notifications using **Web Push API** or services like **OneSignal** for break reminders and updates.

---

## 1. Frontend Architecture

### Frontend Technology Stack

- **HTML5, CSS3, JavaScript** for building the core UI components.
- **React** (or **Vue.js**) for building a dynamic and responsive UI. React is well-suited for building interactive UIs and managing state (e.g., keeping track of the to-do list, Pomodoro timer, pet progress).
- **TailwindCSS** or **Bootstrap** for styling and responsive design.
- **PixiJS** for rendering 2D graphics and animations for the virtual pets.
- **Web Push API** for sending browser notifications.

### Components

- **Main Dashboard**: Displays all the key features (to-do list, timer, pet, and reminders).
  - **Virtual Pet Component**: Handles the pet animations, interactions (petting, feeding, etc.), and status (hunger, mood).
  - **To-Do List Component**: Displays tasks, allows adding/removing tasks, and marking them as completed.
  - **Pomodoro Timer Component**: Implements the Pomodoro timer with configurable work/break intervals.
  - **Break Reminder Component**: Customizable alerts for breaks (20/20 rule, Pomodoro breaks, etc.).
  - **App Shortcuts Component**: Lets users configure and launch other apps or web links.

### React State Management

- Use **React Context** or **Redux** to manage global state, such as:
  - User’s to-do list
  - Timer state (running, paused, work/break periods)
  - Virtual pet’s status (mood, hunger, happiness)
  - Break reminders configuration

### User Interaction

- Clicking or interacting with the pet updates its state (e.g., petting the pet might improve its mood).
- Interactions with the to-do list allow users to add/remove tasks.
- The timer component starts/stops based on user interaction and alerts the user when it’s time for a break.
- The app will store **local state** on the browser (in **localStorage** or **IndexedDB**) and sync it with the server as needed (e.g., when the user logs in).

---

## 2. Backend Architecture

### Backend Technology Stack

- **Node.js** with **Express.js** (or **Fastify**) for building the API server.
- **JWT (JSON Web Tokens)** for user authentication.
- **PostgreSQL** (or **MongoDB** for more flexibility) for data storage.
- **Redis** for caching frequently accessed data and managing user sessions or token storage.
- **Web Push Notifications** using a service like **OneSignal** or directly through the **Web Push API**.

### Endpoints

- **Authentication**
  - POST `/api/login`: Logs in a user.
  - POST `/api/register`: Registers a new user.
  - POST `/api/logout`: Logs the user out.
  
- **User Settings**
  - GET `/api/settings`: Retrieves user settings (e.g., timer, break intervals).
  - PUT `/api/settings`: Updates user settings (e.g., break reminder configurations).
  
- **To-Do List**
  - GET `/api/todos`: Retrieves the user's to-do list.
  - POST `/api/todos`: Adds a new to-do item.
  - PUT `/api/todos/:id`: Updates the to-do item's status.
  - DELETE `/api/todos/:id`: Removes a to-do item.
  
- **Virtual Pet**
  - GET `/api/pet`: Retrieves the pet's current status (mood, hunger, etc.).
  - POST `/api/pet/feed`: Feeds the pet and updates its status.
  - POST `/api/pet/play`: Plays with the pet, affecting mood.

- **Pomodoro Timer and Break Reminders**
  - GET `/api/timer`: Retrieves current timer settings.
  - POST `/api/timer/start`: Starts the Pomodoro timer.
  - POST `/api/timer/stop`: Stops the timer.
  
- **Notifications**
  - POST `/api/notifications`: Sends notifications to the user when it’s time for a break or when tasks are due.
  
---

## 3. Database Design

### Entities

- **Users**
  - `id` (primary key)
  - `email`
  - `password_hash`
  - `settings` (JSON object with timer settings, break reminders, etc.)

- **To-Do Items**
  - `id` (primary key)
  - `user_id` (foreign key)
  - `task_description`
  - `completed` (boolean)
  - `created_at`
  - `updated_at`

- **Virtual Pet**
  - `id` (primary key)
  - `user_id` (foreign key)
  - `mood` (integer, e.g., 0–100)
  - `hunger` (integer, e.g., 0–100)
  - `happiness` (integer, e.g., 0–100)
  - `last_fed_at` (timestamp)
  - `last_played_with_at` (timestamp)

- **Timers & Reminders**
  - `id` (primary key)
  - `user_id` (foreign key)
  - `pomodoro_work_duration` (integer, minutes)
  - `pomodoro_break_duration` (integer, minutes)
  - `reminder_frequency` (integer, minutes)
  - `reminder_enabled` (boolean)

---

## 4. Notifications

The backend will be responsible for sending notifications to the user. This can be done using the **Web Push API** or through services like **OneSignal**.

- **Push Notifications**: Notifications will remind users to take breaks, complete tasks, or interact with their virtual pet.
  
- **Periodic Notifications**: Based on the user’s timer or to-do list configuration, reminders can be sent at regular intervals (e.g., every 25 minutes for a Pomodoro break).

---

## 5. Cloud Hosting & Scalability

- Host the backend and frontend on **cloud platforms** like **AWS**, **Google Cloud**, or **Heroku**.
- Use **CDN** (Content Delivery Network) like **Cloudflare** to serve static assets (CSS, JS, images) efficiently across the globe.
- For **scalability**, use cloud services like **Elastic Load Balancing** (AWS) or **Kubernetes** to manage multiple instances of the app and handle increased traffic as the user base grows.

---

## 6. Optional Features for Future Expansion

- **User Accounts & Social Features**: Allow users to share pet progress or to-do achievements on social media.
- **Advanced Pet Interactions**: More detailed pet actions, such as training, breeding, or customizing appearance.
- **Data Analytics**: Track user engagement with tasks, pets, and productivity features to refine and optimize the app experience.

---

## Conclusion

The architecture outlined here ensures a **responsive, interactive, and scalable web application** that provides users with a delightful, personalized experience through virtual pets, productivity tools, and break reminders. By leveraging modern web technologies and cloud services, you can build a platform that’s both fun and productive for a wide audience across different devices.
