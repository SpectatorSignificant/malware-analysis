import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import Header from "./Header"
import Form from "./Form"
import Info from './Info';

function App() {

  const [uploaded, setUploaded] = useState(false)
  const [file, setFile] = useState()
  const [hash, setHash] = useState(JSON.stringify({hashSHA256: "", hashMD5: ""}))
  const [API_KEY, setAPI_Key] = useState("")

  async function getAPIKey(){
      const response = await axios.get(`http://localhost:3001/APIKey`);
      setAPI_Key(response.data.API_KEY);
      // console.log({API_KEY})
  }
  
  if (!API_KEY) getAPIKey();

  const changeUploaded = (uploadStatus, info, newHash) => {
    setUploaded(uploadStatus);
    setFile(info)
    setHash(newHash)
  }

    // var reader = new FileReader();
    // reader.onloadend = function (event) {
    //     let data = reader.result;
    //     console.log(reader);
    //     const hashSHA256 = CryptoJS.SHA256(data);
    //     const hashMD5 = CryptoJS.MD5(data);
    //     console.log(`SHA256: ${hashSHA256}`);
    //     console.log(`MD5: ${hashMD5}`);
    //     setHash({hashSHA256, hashMD5});
    // }
    // if (file) reader.readAsBinaryString(file);

  console.log({hash});

  return (
    <div>
      <Header />
      <Form onUpdate={changeUploaded}></Form>
      {uploaded && 
        <Info name={file.name} type={file.type} size={file.size} lastModified={file.lastModified} hash={hash} API_KEY={API_KEY}>  
        </Info>
      }
      </div>
  );
}

export default App;
