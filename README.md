# Buyer Portal

A full-stack web application for property buyers to browse listings and manage their favorite properties.

---

## Features

- **User Authentication** — Register and log in with email, password, and display name
- **JWT-based Sessions** — Secure, stateless authentication using JSON Web Tokens
- **Buyer Dashboard** — View your profile info, role, and all available property listings
- **Favorites Management** — Add or remove properties from your personal favorites list
- **Favorites Page** — Dedicated view showing only your saved properties

---

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| **Frontend** | React, React-Bootstrap, React Router    |
| **Backend**  | Node.js, Express                        |
| **Database** | SQLite                                  |
| **Auth**     | bcrypt (password hashing), jsonwebtoken |

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/bisesh7/buyer-portal
cd buyer-portal
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5002
JWT_SECRET=your_jwt_secret_here
```

Start the server:

```bash
npm start
```

The server will start at `http://localhost:5002`. On first run, `init.js` automatically creates the database tables and seeds sample property data.

### 3. Set Up the Client

Open a new terminal:

```bash
cd client
npm install
npm start
```

The React app will open at `http://localhost:3000`.

---

## Usage

### Sign Up & Log In

1. Navigate to `/signup`
2. Enter your **Name**, **Email**, **Password**, and **Confirm Password**, then click **Signup**
3. After successful registration, log in at `/` with your email and password

### Managing Favorites

- From the **Dashboard**, browse all available property listings
- Click ❤️ **Add** on any property to save it to your favorites
- Click **My Favorites** in the navbar to view your saved properties
- Click 💔 **Remove** on any property to remove it from your favorites

### Logging Out

Click the **Logout** button in the navbar to end your session and clear the JWT token.

---

## Environment Variables

| Variable     | Description                                          |
| ------------ | ---------------------------------------------------- |
| `PORT`       | Port the Express server listens on (default: `5002`) |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens        |

---

## License

MIT
