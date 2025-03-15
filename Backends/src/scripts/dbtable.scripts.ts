import db from "../config/db.config";

// SQL query to create the todolist table
export const createToDoListTable = () => {
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

  sendQuery(createToDoListQuery,"To Do List");

};

const createBucketListTable = () =>{
  const createBucketListQuery = `
    CREATE TABLE IF NOT EXISTS bucketlist (
      bucketlist_id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      status ENUM('pending','completed') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

    sendQuery(createBucketListQuery,"Bucket List");
}

const createComponentTable = () =>{
  const createComponentTableQuery = `
    CREATE TABLE IF NOT EXISTS componentsposition(
      component_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      order_index INT NOT NULL,
      position_x FLOAT NOT NULL DEFAULT 0,
      position_y FLOAT NOT NULL DEFAULT 0
    )
  `
  sendQuery(createComponentTableQuery,'Component Table');
}

const createUserTable = () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS user(
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `

  sendQuery(createUserTableQuery,"User Table")
}

const sendQuery = (query:string,tablename:string) =>{
  db.query(query,(err,results)=>{
    if(err){
      console.log(`Error creating table ${tablename}:`,err);
      return;
    }
    console.log(`Successfully created table ${tablename}`,results)
  })
};



const createAllTable = () =>{
  // createToDoListTable();
  // createBucketListTable();
  // createComponentTable();
  createUserTable();
}

export default createAllTable;
