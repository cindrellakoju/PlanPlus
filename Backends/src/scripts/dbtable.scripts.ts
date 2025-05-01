import db from "../config/db.config";

// SQL query to create the todolist table
// export const createToDoListTable = () => {
//   const createToDoListQuery = `
//     CREATE TABLE IF NOT EXISTS todolist (
//       todolist_id INT AUTO_INCREMENT PRIMARY KEY,
//       task VARCHAR(255) NOT NULL,
//       due_date DATETIME,
//       priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
//       status ENUM('pending', 'completed', 'overdue') DEFAULT 'pending',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
//     );
//   `;

//   sendQuery(createToDoListQuery,"To Do List");

// };

// const createBucketListTable = () =>{
//   const createBucketListQuery = `
//     CREATE TABLE IF NOT EXISTS bucketlist (
//       bucketlist_id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       status ENUM('pending','completed') DEFAULT 'pending',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//       user_id INT,
//       FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
//     );
//   `;

//     sendQuery(createBucketListQuery,"Bucket List");
// }

// const createComponentTable = () =>{
//   const createComponentTableQuery = `
//     CREATE TABLE IF NOT EXISTS componentsposition(
//       component_id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       order_index INT NOT NULL,
//       position_x FLOAT NOT NULL DEFAULT 0,
//       position_y FLOAT NOT NULL DEFAULT 0,
//       FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
//     )
//   `
//   sendQuery(createComponentTableQuery,'Component Table');
// }

const createUsers = () => {
  const createUsersQuery = `
    CREATE TABLE IF NOT EXISTS users(
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `

  sendQuery(createUsersQuery,"users")
}

const createThemeTable = () =>{
  const createThemeTableQuery = `
    CREATE TABLE IF NOT EXISTS table_themes (
      theme_id INT AUTO_INCREMENT PRIMARY KEY,
      theme_name VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `
  sendQuery(createThemeTableQuery,"Theme Table")
}

const createUserTable = () => {
  const createUserTableQuery =  `
    CREATE TABLE IF NOT EXISTS user_tables (
      user_table_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      table_name VARCHAR(255) NOT NULL,
      theme_id INT NOT NULL,
      orderindex INT,                                
      width DECIMAL(10, 2),                         
      height DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (theme_id) REFERENCES table_themes(theme_id) ON DELETE CASCADE
    );
  `
  sendQuery(createUserTableQuery,"User Table")
} 

const createUserTableColumns = () => {
  const createUserTableColumnsQuery =  `
    CREATE TABLE IF NOT EXISTS user_table_columns (
      column_meta_id INT AUTO_INCREMENT PRIMARY KEY,
      user_table_id INT NOT NULL,
      column_name VARCHAR(255) NOT NULL,
      column_type VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      theme_id INT NOT NULL,
      FOREIGN KEY (user_table_id) REFERENCES user_tables(user_table_id) ON DELETE CASCADE,
      FOREIGN KEY (theme_id) REFERENCES table_themes(theme_id) ON DELETE CASCADE
    );
  `
  sendQuery(createUserTableColumnsQuery,"User Table Columns")
}

const createUserTableData = () => {
  const createUserTableDataQuery = `
    CREATE TABLE IF NOT EXISTS user_table_data (
      data_id INT AUTO_INCREMENT PRIMARY KEY,
      user_table_id INT NOT NULL,
      column_data JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_table_id) REFERENCES user_tables(user_table_id) ON DELETE CASCADE
    );
  `;
  sendQuery(createUserTableDataQuery, "User Table Data");
};


// 0 flase 1 true
const UpdateTable = () => {
  // const alterUserTableQuery = `
  //   ALTER TABLE user_tables
  //     ADD COLUMN checkbox TINYINT(1) NOT NULL DEFAULT 0,
  //     ADD COLUMN table_margin TINYINT(1) NOT NULL DEFAULT 0,
  //     ADD COLUMN bg_for_header TINYINT(1) NOT NULL DEFAULT 0,
  //     ADD COLUMN col_name TINYINT(1) NOT NULL DEFAULT 0;
  // `;
  const alterUserTableQuery = `
    ALTER TABLE user_table_columns
    ADD COLUMN IF NOT EXISTS options TEXT DEFAULT NULL;
  `;

  sendQuery(alterUserTableQuery, "Alter User Table - Add Boolean Flags");
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
  // createUsers();
  // createThemeTable();
  // createUserTable();
  // createUserTableColumns();
  // createUserTableData();
  UpdateTable()
}

export default createAllTable;
