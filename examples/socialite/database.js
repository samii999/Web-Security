import { db } from '#shared/database.js';



/**

 * @typedef {object} User

 * @property {number} id

 * @property {string} username

 * @property {string} password

 * @property {string} photograph

 * @property {string} biography

 * @property {boolean} administrator

 * @property {boolean} suspended

 * @property {string} createdAt

 * @property {string} updatedAt

 */



await db.run(`CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        username TEXT NOT NULL UNIQUE,

        password TEXT NOT NULL,

        salt TEXT,

        photograph TEXT,

        biography TEXT,

        administrator BOOLEAN DEFAULT 0,

        suspended BOOLEAN DEFAULT 0,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )`);



await db.run(`CREATE TABLE IF NOT EXISTS sessions (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        userId INTEGER NOT NULL,

        sessionId TEXT NOT NULL UNIQUE,

        token TEXT NOT NULL,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE

    )`);



await db.run(`CREATE TABLE IF NOT EXISTS posts (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        userId INTEGER NOT NULL,

        content TEXT NOT NULL,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE

    )`);



import { v4 as uuid } from 'uuid';

/**
 * Creates a new session for a user
 * @param {string} userId - The user ID
 * @returns {string} The session ID
 */
export const createSession = (userId) => {
  const sessionId = uuid();
  const token = uuid();

  db.run('INSERT INTO sessions (userId, sessionId, token) VALUES (?, ?, ?)', [userId, sessionId, token]);
  return sessionId;
};

/**
 * Gets a session by session ID
 * @param {string} sessionId - The session ID
 * @returns {Promise<{sessionId: string, userId: string, token: string}|undefined>} The session object
 */
export const getSession = async (sessionId) => {
  const session = await db.get('SELECT * FROM sessions WHERE sessionId = ?', [sessionId]);
  return session;
};

export { db };

