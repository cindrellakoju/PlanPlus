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

const insertTableTheme = () => {
  const insertTableThemeQuery = `
    INSERT INTO table_themes (theme_name)
    VALUES
      ('Plain'),
      ('Seperate data');
  `

  sendQuery(insertTableThemeQuery,"Theme")
}
const insertUserTable= () => {
  const insertUserTableQuery = `
    INSERT INTO user_tables (user_id, table_name, theme_id)
    VALUES
      (1, 'bucket_list_table', 1),
      (1, 'to_do_list_table', 2);
  `
  sendQuery(insertUserTableQuery, "Table created by user")
}

const insertUserTableColumn = () => {
  const insertUserTableColumnQuery1= `
    INSERT INTO user_table_columns (user_table_id, column_name, column_type, theme_id)
    VALUES
      (2, 'task_name', 'VARCHAR(255)', 2),
      (2, 'priority', 'VARCHAR(50)', 2),
      (2, 'status', 'VARCHAR(50)', 2);
  `;
  const insertUserTableColumnQuery2=`
    INSERT INTO user_table_columns (user_table_id, column_name, column_type, theme_id)
    VALUES
      (1, 'task_name', 'VARCHAR(255)', 1),
      (1, 'status', 'VARCHAR(50)', 1);  
  `;

  // Assuming sendQuery function is properly set up to handle multiple queries in one go
  sendQuery(insertUserTableColumnQuery1,"Column Name of user Table1");
  sendQuery(insertUserTableColumnQuery2,"Column Name of user Table2");
};


const insertUserTableData = () => {
  const insertUserTableDataQuery1 = `
    INSERT INTO user_table_data (user_table_id, column_data)
    VALUES
      (1, '{"task": "Travel to Japan", "status": "Pending"}'),
      (1, '{"task": "Go Hiking", "status": "In Progress"}');
  `;
  const insertUserTableDataQuery2 = `
    INSERT INTO user_table_data (user_table_id, column_data)
    VALUES
      (2, '{"task": "Complete JavaScript tutorial", "priority": "High", "status": "In Progress"}'),
      (2, '{"task": "Clean the house", "priority": "Medium", "status": "Pending"}');
  `;
  
  sendQuery(insertUserTableDataQuery1, "User Table Data 1");
  sendQuery(insertUserTableDataQuery2, "User Table Data 2");
};


// Function to execute all insertions
const insertAllDatas = () => {
  // inserttodolist(); // Insert into todolist
  // insertbucketlist(); // Insert into bucketlist
  // insertcomponents(); // Insert into componentsposition
  // insertTableTheme(),
  // insertUserTable(),
  // insertUserTableColumn(),
  insertUserTableData()
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
