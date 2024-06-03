// src/indexedDB.js
export const openDatabase = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('DiarioMayorDB', 2);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('registros')) {
                db.createObjectStore('registros', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('registrosAccionistas')) {
                db.createObjectStore('registrosAccionistas', { autoIncrement: true }); // Cambio en la línea 18
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const addRegistro = async (registro) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registros', 'readwrite');
        const store = tx.objectStore('registros');
        const request = store.add(registro);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getRegistros = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registros', 'readonly');
        const store = tx.objectStore('registros');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const deleteRegistro = async (id) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registros', 'readwrite');
        const store = tx.objectStore('registros');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const addRegistroAccionista = async (registro) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosAccionistas', 'readwrite');
        const store = tx.objectStore('registrosAccionistas');
        const request = store.add(registro);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getRegistrosAccionistas = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosAccionistas', 'readonly');
        const store = tx.objectStore('registrosAccionistas');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const deleteRegistroAccionista = async (id) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosAccionistas', 'readwrite');
        const store = tx.objectStore('registrosAccionistas');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};
