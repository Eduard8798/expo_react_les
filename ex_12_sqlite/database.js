import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('newdatabase.db');
}


export const createTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA foreign_keys = ON;
            PRAGMA journal_mode = WAL;
            
            CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT NOT NULL
             );
            
            CREATE TABLE IF NOT EXISTS tasks 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             title TEXT NOT NULL,
             user_id INTEGER,
             FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
             
             
        `);
        console.log('Table created')
    } catch (e) {
        console.error('Error creating table:', e)
    }
}


export const insertUser = async (name) => {

    const database = await openDatabase();
    if (!name) {
        return;
    }
    try {
        const result = await database.runAsync(' INSERT INTO users (name) VALUES (?)',
            [name]
        );
        console.log(result);
        return result.lastInsertRowId;
    } catch (e) {
        console.log('Error inserting user', e)
    }
}


export const insertTask = async (title, userId) => {

    const database = await openDatabase();
    if (!title || !userId) {
        return;
    }
    try {
        const result = await database.runAsync(' INSERT INTO tasks (title,user_id) VALUES (?,?)',
            [title, userId]
        );
        console.log(result)
        return result.lastInsertRowId;
    } catch (e) {
        console.log('Error inserting Task:', e)
    }
}


export const fetchUsers = async () => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync('SELECT * FROM users ' );
        console.log('All Users:', allRows);
        return allRows;
    } catch (e) {
        console.log('Error fetching users:', e)
    }
}
export const fetchTasks = async (userId) => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        console.log('All tasks:', allRows);
        return allRows;
    } catch (e) {
        console.log('Error fetching tasks:', e)
    }
}

export const updateTask = async (title, id) => {
    const database = await openDatabase();
    if (!id || !title) {
        return;
    }
    try {
        await database.runAsync('UPDATE tasks SET title = ? WHERE id = ?', [title, id]);
        console.log('tasks updated');
    } catch (e) {
        console.error('Error updating tasks: ', e)
    }
}

export const updateUser = async (name, id) => {
    const database = await openDatabase();
    if (!id || !name) {
        return;
    }
    try {
        await database.runAsync('UPDATE users SET name = ? WHERE id = ?', [name, id]);
        console.log('User updated');
    } catch (e) {
        console.error('Error updating user: ', e)
    }
}


export const deleteUser = async (id) => {
    console.log(typeof id)
    const database = await openDatabase();
    try {
        if (!id) {
            throw new Error(`This id not exists: ${id}`)
        }
        await database.runAsync('DELETE FROM users WHERE id = ?', [id]);
        console.log('User deleted')
    } catch (e) {
        console.error('Error deleting user: ', e);
    }
}

export const deleteTask = async (id) => {
    console.log(typeof id)
    const database = await openDatabase();
    try {
        if (!id) {
            throw new Error(`This id not exists: ${id}`)
        }
        await database.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
        console.log('Task deleted')
    } catch (e) {
        console.error('Error deleting task: ', e);
    }
}
