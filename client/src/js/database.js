import { openDB } from 'idb';

const initdb = async () =>
// We are creating a new database named 'jate' which will be using version 1 of the database.
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // makes 'id' the keyPath in the newly-created database
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function we will use to POST to the database.
export const putDb = async (content) => {
  console.log('Post/PUT to the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the jate database', result);
};



// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  result
    ? console.log('Data retrieved from database')
    : console.log('Data not found in the database.');
  return result?.value;
};;


// Export a function we will use to DELETE to the database.
// export const deleteDb = async (id) => {
  // console.log('DELETE from the database', id);

  // Create a connection to the database database and version we want to use.
  // const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  // const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  // const store = tx.objectStore('jate');

  // Use the .delete() method to get all data in the database.
  // const request = store.delete(id);

  // Get confirmation of the request.
//   const result = await request;
//   console.log('result.value', result);
//   return result?.value;
// };

// Start the database.
initdb();
