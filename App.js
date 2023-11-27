import { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';

function App() {
  const API_KEY = "c695400e8a90111c485c0fe73dade11f"
    
  const [location, setLocation] = useState('');

  const [result, setResult] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`

  const searchWeather = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url
        })
        console.log(data);
        setResult(data);
      }
      catch (err) {
        alert(err);
      }
    }
  }
  return (
    <AppWrap>
      <div className='appContentWrap'>
        <input
          placeholder='도시를 입력하세요'
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
        />
        {
          Object.keys(result).length !== 0 && (
            <ResultWrap>
            <div className='city'>{result.data.name}</div>
            <div className='temperature'>
              {Math.round(((result.data.main.temp - 273.15) * 10)) / 10}℃
            </div>
            <div className='sky'>{result.data.weather[0].main}</div>
          </ResultWrap>
          )
        }
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vx;
  height: 100vh;
  .appContentWrap {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input {
    border: 2px balck solid;
    border-radius: 10px;
    padding: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 50px;
  padding: 10px;
  border: 2px black solid;
  border-radius: 10px;
  .city {
    font-size: 20px;
  }
  .temperature {
    font-size: 60px;
  }
  .sky {
    font-size: 18px;
    text-align: right;
  }
`;