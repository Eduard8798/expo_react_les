import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('mydatabase.db');
}


export const createTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL , phone TEXT NOT NULL);
        `);
        console.log('Table created')
    } catch (e) {
        console.error('Error creating table:', e)
    }
}

export const insertUser = async (name,phone) => {
    const database = await openDatabase();
    if (!name && !phone) {
        return;
    }
    try {
        const result = await database.runAsync('INSERT INTO users (name,phone) VALUES (?,?)', name,phone);
        console.log(result)
        return result.lastInsertRowId;
    } catch (e) {
        console.error('Error inserting user:', e)
    }
}



export const fetchUsers = async () => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync('SELECT * FROM users');
        console.log('All Users:', allRows);
        return allRows;
    } catch (e) {
        console.log('Error fetching users:', e)
    }
}

export const updateUser = async (name,phone, id)=>{
    const database = await openDatabase();
    if (!id || !name || !phone){
        return;
    }
    try{
        await database.runAsync('UPDATE users SET name = ?, phone = ? WHERE id = ?', name,phone, id);
        console.log('User updated');
    }catch (e){
        console.error('Error updating user: ', e)
    }
}



export const deleteUser = async (id)=>{
    console.log(typeof id)
    const database = await openDatabase();
    try{
        if(!id){
            throw new Error(`This id not exists: ${id}`)
        }
        await database.runAsync('DELETE FROM users WHERE id = ?', id);
        console.log('User deleted')
    }catch (e){
        console.error('Error deleting user: ', e);
    }
}
