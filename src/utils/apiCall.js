import axios from 'axios'

async function fetchData(url){
      
  try {

    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

export default fetchData;