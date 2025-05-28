import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('newdaydatabase.db');
}


export const createTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA foreign_keys = ON;
            PRAGMA journal_mode = WAL;
            
             
            
            CREATE TABLE IF NOT EXISTS days
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              data TEXT UNIQUE  
             );
            
            CREATE TABLE IF NOT EXISTS tasks 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             title TEXT NOT NULL,
              day_id INTEGER,
             FOREIGN KEY(day_id) REFERENCES days(id) ON DELETE CASCADE);
             
             
        `);
        console.log('Table created')
    } catch (e) {
        console.error('Error creating table:', e)
    }
}


export const insertDays = async (data) => {
    const database = await openDatabase();

    try {
        if (!data) return;

        // 1. Сначала ищем, существует ли дата
        const selectResult = await database.getAllAsync(
            'SELECT id FROM days WHERE data = ?',
            [data]
        );

        if (selectResult.length > 0) {
            return selectResult[0].id; // Дата уже есть, возвращаем её id
        }

        // 2. Если не существует — вставляем
        const insertResult = await database.runAsync(
            'INSERT INTO days (data) VALUES (?)',
            [data]
        );

        return insertResult.lastInsertRowId;
    } catch (e) {
        console.log('Error inserting day', e);
    }
};





export const insertTask = async (title, dayId) => {

    const database = await openDatabase();
    if (!title || !dayId) {
        return;
    }
    try {
        const result = await database.runAsync(' INSERT INTO tasks (title,day_id) VALUES (?,?)',
            [title, dayId]
        );
        console.log(result)
        return result.lastInsertRowId;
    } catch (e) {
        console.log('Error inserting Task:', e)
    }
}


export const fetchDays = async () => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync('SELECT * FROM days ' );
        console.log('All days:', allRows);
        return allRows;
    } catch (e) {
        console.log('Error fetching days:', e)
    }
}
export const fetchTasks = async (dayId) => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync('SELECT * FROM tasks WHERE day_id = ?', [dayId]);
        console.log('All tasks:', allRows);
        return allRows;
    } catch (e) {
        console.log('Error fetching tasks:', e)
    }
}

export const updateTask = async (id,title) => {
    const database = await openDatabase();
    if (!id || !title) {
        return;
    }
    try {
        await database.runAsync('UPDATE tasks SET title = ? WHERE id = ?', [title,id]);
        console.log('tasks updated');
    } catch (e) {
        console.error('Error updating tasks: ', e)
    }
}



export const deleteDays = async (id) => {
    console.log(typeof id)
    const database = await openDatabase();
    try {
        if (!id) {
            throw new Error(`This id not exists: ${id}`)
        }
        await database.runAsync('DELETE FROM days WHERE id = ?', [id]);
        console.log('Day deleted')
    } catch (e) {
        console.error('Error deleting day: ', e);
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
