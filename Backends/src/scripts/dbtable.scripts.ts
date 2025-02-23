import db from "../config/db.config";

// SQL query to create the todolist table
const createToDoListTable = () => {
  const createToDoListQuery = `
    CREATE TABLE IF NOT EXISTS todolist (
      todolist_id INT AUTO_INCREMENT PRIMARY KEY,
      task VARCHAR(255) NOT NULL,
      due_date DATETIME,
      priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
      status ENUM('pending', 'completed', 'overdue') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  // Execute the query to create the table
  db.query(createToDoListQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:', results);
  });
};

export default createToDoListTable;
