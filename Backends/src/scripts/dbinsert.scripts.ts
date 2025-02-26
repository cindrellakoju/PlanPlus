import db from "../config/db.config";

const inserttodolist = () => {
  const insertQuery = `
    INSERT INTO todolist (task, due_date, priority, status)
    VALUES
      ('Buy groceries', '2025-02-26 09:00:00', 'high', 'pending'),
      ('Finish project report', '2025-02-25 17:00:00', 'medium', 'pending'),
      ('Clean the house', '2025-02-27 10:00:00', 'low', 'pending'),
      ('Call mom', '2025-02-23 15:00:00', 'low', 'completed'),
      ('Prepare for meeting', '2025-02-24 14:00:00', 'high', 'pending');
  `;
  
  sendQuery(insertQuery, "To do List");
};

const insertbucketlist = () => {
  const insertQuery = `
    INSERT INTO bucketlist (title, status)
    VALUES
      ('Skydiving', 'pending'),
      ('Visit Japan', 'completed'),
      ('Learn a new language', 'pending');
  `;
  
  sendQuery(insertQuery, "Bucket List");
};

const insertcomponents = () => {
  const insertQuery = `
    INSERT INTO componentsposition (name, order_index, position_x, position_y)
    VALUES
      ('TopPriority', 0, 0, 0),
      ('ToDo', 1, 2, 0),
      ('BucketList', 2, 4, 0),
      ('Schedule', 3, 6, 0),
      ('Money', 4, 8, 0),
      ('ToBuy', 5, 10, 0);
  `;
  
  sendQuery(insertQuery, "Components");
};

// Function to execute all insertions
const insertAllDatas = () => {
  inserttodolist(); // Insert into todolist
  insertbucketlist(); // Insert into bucketlist
  insertcomponents(); // Insert into componentsposition
};

const sendQuery = (query: string, tablename: string) => {
  db.query(query, (err, results) => {
    if (err) {
      console.log(`Error inserting dummy data into ${tablename}:`, err);
      return;
    }
    console.log(`Successfully inserted dummy data into ${tablename}`, results);
  });
};

export default insertAllDatas;
