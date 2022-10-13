import React,{ useState } from 'react';

import './App.css';

function App() {
  const [userQuery, setUserQuery] = useState('');
  const updateUserQuery = event =>{
  console.log('userQuery', userQuery);
  setUserQuery(event.target.value);
  }
  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`);
  }
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      searchQuery();
    }
  }
  return (
    <div className="App">
    <input value ={userQuery} onChange = {updateUserQuery} onKeyPress={handleKeyPress} />
    <button onClick={searchQuery}>Search</button>
      <div>{userQuery}</div>

    </div>
  );
}

export default App;
