import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('newdaydatabasebepeopletwo.db');
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
                email TEXT UNIQUE,
                phone TEXT,
                password TEXT
             );
            
            CREATE TABLE IF NOT EXISTS disturbance 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             title TEXT NOT NULL,
             category TEXT NOT NULL,
             urlImage TEXT NOT NULL,
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

export const fetchAllDisturbance = async () => {
    const database = await openDatabase();

    try {
        const allRows = await database.getAllAsync(
            `SELECT * FROM disturbance `

        );
        console.log('Fetch fetchAllDisturbance ', allRows )
        return allRows;
    } catch (e) {
        console.log('error fetchDisturbance', e);
        return [];
    }
};

export const fetchDisturbanceId = async (id) => {
    const database = await openDatabase();

    try {
        const result = await database.getAllAsync(
            `SELECT * FROM disturbance WHERE id = ?`,
            [id]

        );
        console.log('Fetch item Disturbance ', result )
        return result;
    } catch (e) {
        console.log('error Fetch item Disturbance', e);
        return [];
    }
};

export const fetchImg = async (id) => {
    const database = await openDatabase();

    try {
        const result = await database.getAllAsync(
            `SELECT urlImage FROM disturbance WHERE id = ?`,
            [id]

        );
        console.log('Fetch Img Disturbance ', result )
        return result;
    } catch (e) {
        console.log('error Fetch img Disturbance', e);
        return [];
    }
};

export const fetchDisturbanceItem = async (id) => {
    const database = await openDatabase();

    try {
        const result = await database.getAllAsync(
            `SELECT id, title, category, date, geolocation FROM disturbance WHERE id = ?`,
            [id]

        );
        console.log('fetchDisturbanceItem ', result )
        return result;
    } catch (e) {
        console.log('error fetchDisturbanceItem', e);
        return [];
    }
};

export const fetchDisturbanceItemNotImg = async () => {
    const database = await openDatabase();

    try {
        const result = await database.getAllAsync(
            `SELECT id, title, category, geolocation FROM disturbance`,


        );
        console.log('fetchDisturbanceItemNotImg ', result )
        return result;
    } catch (e) {
        console.log('error fetchDisturbanceItemNotImg', e);
        return [];
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



export const insertUser = async (nameUser,surnameUser,emailUser,phoneUser,passwordUser) => {

    const database = await openDatabase();

    try {

        const insertResult = await database.runAsync(
            'INSERT INTO user (name,surname,email,phone,password) VALUES (?,?,?,?,?)',
            [nameUser,surnameUser,emailUser,phoneUser,passwordUser]
        );

        console.log('Create User',insertResult)

        return insertResult.lastInsertRowId;


    }
    catch (e){
        console.log('error insert New User',e)
    }
}

export const fetchuserid = async (email) => {
    const database = await openDatabase();

    if (!email) {
        console.log("error email or email empty");
        return [];
    }

    try {
        const allRows = await database.getAllAsync(
            `SELECT id FROM user WHERE email = ?`,
            [email]
        );
        console.log('Fetch user id ', allRows )
        return allRows;
    } catch (e) {
        console.log('error Fetch user', e);
        return [];
    }
}


export const fetchalluser = async () => {
    const database = await openDatabase();
    try {
        const allRows = await database.getAllAsync(
            `SELECT * FROM user `
        );
        console.log('Fetch All user  ', allRows )
        return allRows;
    } catch (e) {
        console.log('error Fetch All user', e);
        return [];
    }
}





