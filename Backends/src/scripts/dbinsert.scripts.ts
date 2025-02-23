import db from "../config/db.config";

// Function to insert dummy data into the todolist table
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
  
    // Insert the dummy data
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.error('Error inserting dummy data:', err);
        return;
      }
      console.log('Dummy data inserted successfully:', results);
    });
};
  
export default inserttodolist;
  