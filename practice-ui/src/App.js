import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const node_url = 'http://' + process.env.REACT_APP_NODEURL + '/backend/';

  useEffect(() => {
    if (!userData)
      getUserList();
  }, []);

  const getUserList = () => {
    fetch(node_url, { method: 'GET' })
      .then(async res => {
        let data = await res.json();
        if (data.status === 200)
          if (data.data.length > 0)
            setUserData(data.data);
          else
            setErrMsg('No data found.')
        else
          setErrMsg(data.data);
      })
      .catch(err => console.log(err))
  };

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    let request_options = { 
      method: 'POST', 
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({data: inputValue}) 
    }
    fetch(node_url + 'add', request_options)
      .then(async res => {
        let data = await res.json();
        if (data.status === 200) {
          getUserList();
          setInputValue('');
        }
        else
          setErrMsg('Failed to add data');
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <input type="text" onChange={handleChange} value={inputValue} placeholder='Enter name'/>
      <button onClick={handleSubmit}> ADD </button>
      <br /><br />
      {
        userData
          ? (
            <div>
              User list
              <br />
              <table>
                <thead>
                  <tr><th>Name</th></tr>
                </thead>
                <tbody>
                  {
                    userData.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
          : errMsg ? errMsg : 'NO data found'
      }
    </div>
  );
}

export default App;
