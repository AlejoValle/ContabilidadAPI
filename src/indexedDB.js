// src/indexedDB.js

export const openDatabase = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('DiarioMayorDB', 4); // Asegúrate de incrementar la versión de la base de datos

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('registros')) {
                db.createObjectStore('registros', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('registrosAccionistas')) {
                db.createObjectStore('registrosAccionistas', { autoIncrement: true });
            }
            if (!db.objectStoreNames.contains('registrosCapital')) {
                db.createObjectStore('registrosCapital', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('actasJunta')) {
                db.createObjectStore('actasJunta', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('registrosCompras')) {
                db.createObjectStore('registrosCompras', { keyPath: 'id' });
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

// Funciones para registros de capital
export const addRegistroCapital = async (registro) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosCapital', 'readwrite');
        const store = tx.objectStore('registrosCapital');
        const request = store.add(registro);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getRegistrosCapital = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosCapital', 'readonly');
        const store = tx.objectStore('registrosCapital');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const deleteRegistroCapital = async (id) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosCapital', 'readwrite');
        const store = tx.objectStore('registrosCapital');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

// Nuevas funciones para actas de junta de accionistas
export const addActaJunta = async (acta) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('actasJunta', 'readwrite');
        const store = tx.objectStore('actasJunta');
        const request = store.add(acta);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getActasJunta = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('actasJunta', 'readonly');
        const store = tx.objectStore('actasJunta');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const deleteActaJunta = async (id) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('actasJunta', 'readwrite');
        const store = tx.objectStore('actasJunta');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

// Funciones para registros de compras
export const addRegistroCompras = async (registro) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosCompras', 'readwrite');
        const store = tx.objectStore('registrosCompras');
        const request = store.add(registro);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getRegistrosCompras = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosCompras', 'readonly');
        const store = tx.objectStore('registrosCompras');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const deleteRegistroCompras = async (id) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosCompras', 'readwrite');
        const store = tx.objectStore('registrosCompras');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};
