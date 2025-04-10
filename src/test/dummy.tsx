import React, { useState } from 'react';
import './dummy.css';

interface User {
  name: string;
  username: string;
}

const App: React.FC = () => {
  // Dummy data for users
  const users: User[] = [
    { name: "John Doe", username: "john_doe" },
    { name: "Jane Smith", username: "jane_smith" },
    { name: "Michael Lee", username: "michael_lee" },
    { name: "Emma Watson", username: "emma_watson" },
    { name: "Lucas Grey", username: "lucas_grey" },
  ];

  const [dragging, setDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);

  const startDrag = (e: React.MouseEvent) => {
    setDragging(true);
    setDragX(e.clientX);
  };

  const stopDrag = () => {
    setDragging(false);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (dragging) {
      const diff = dragX - e.clientX;
      setDragX(e.clientX);
      const list = document.getElementById('user-list');
      if (list) {
        const currentLeft = list.getBoundingClientRect().left;
        list.style.left = `${currentLeft - diff}px`;
      }
    }
  };

  return (
    <div className="App">
      <div
        className="user-list-container"
        onMouseDown={startDrag}
        onMouseMove={handleDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div id="user-list" className="user-list">
          {users.map((user, index) => (
            <div className="user-card" key={index}>
              <div className="user-name">{user.name}</div>
              <div className="user-username">@{user.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
