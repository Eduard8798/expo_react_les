import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('newdaydatabasebepeople.db');
}


export const createTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA foreign_keys = ON;
            PRAGMA journal_mode = WAL;
            
             
            CREATE TABLE IF NOT EXISTS user
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT,
                surname TEXT,
                email TEXT,
                phone TEXT,
                password TEXT
             );
            
            CREATE TABLE IF NOT EXISTS disturbance 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             title TEXT NOT NULL,
             category TEXT NOT NULL,
             urlImage   BLOB NOT NULL,
             date TEXT NOT NULL,
             geolocation TEXT NOT NULL,
             userId INTEGER NOT NULL ,
             FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE);
             
             
        `);
        console.log('Table created')
    } catch (e) {
        console.error('Error creating table:', e)
    }
}

export const insertDisturbance = async (titleDis,categoryDis,urlImageDis,dateCalendar,geolocationDis,userId) => {

    const database = await openDatabase();

    try {

        const insertResult = await database.runAsync(
            'INSERT INTO disturbance (title,category,urlImage,date,geolocation,userId) VALUES (?,?,?,?,?,?)',
            [titleDis,categoryDis,urlImageDis,dateCalendar,geolocationDis,userId]
        );

        console.log('Create Disturbance',insertResult)

        return insertResult.lastInsertRowId;


    }
    catch (e){
        console.log('error insertDisturbance',e)
    }
}

export const fetchDisturbance = async (dateCalendar) => {
    const database = await openDatabase();

    if (!dateCalendar) {
        console.log("error DATA Calendar");
        return [];
    }

    try {
        const allRows = await database.getAllAsync(
            `SELECT * FROM disturbance WHERE date = ?`,
            [dateCalendar]
        );
        console.log('Fetch data ', allRows )
        return allRows; // ✅ Возвращаем полученные данные
    } catch (e) {
        console.log('error fetchDisturbance', e);
        return []; // ✅ Возвращаем пустой массив при ошибке
    }
};


export const updateDisturbance = async (id, updatedData) => {
    const database = await openDatabase();

    const { title, category, urlImage, date, geolocation } = updatedData;

    if (!id) {
        console.log("ID is required for update");
        return;
    }

    try {
        await database.runAsync(
            `UPDATE disturbance 
             SET title = ?, category = ?, urlImage = ?, date = ?, geolocation = ? 
             WHERE id = ?`,
            [title, category, urlImage, date, geolocation, id]
        );
        console.log(`Disturbance with id=${id} updated.`);
    } catch (e) {
        console.log('Error updating disturbance:', e);
    }
};


export const deleteDisturbance = async (id) => {
    const database = await openDatabase();

    if (!id) {
        console.log("ID is required for deletion");
        return;
    }

    try {
        await database.runAsync(
            `DELETE FROM disturbance WHERE id = ?`,
            [id]
        );
        console.log(`Disturbance with id=${id} deleted.`);
    } catch (e) {
        console.log('Error deleting disturbance:', e);
    }
};

//user

export const createUser = (name, surname, email, phone, password) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO user (name, surname, email, phone, password)
       VALUES (?, ?, ?, ?, ?);`,
            [name, surname, email, phone, password],
            (_, result) => {
                console.log('Пользователь добавлен, ID:', result.insertId);
            },
            (_, error) => {
                console.log('Ошибка при добавлении пользователя:', error);
                return false;
            }
        );
    });
};










