import axios from 'axios'

async function fetchData(params){

    const token = process.env.REACT_APP_X_API_KEY;
    const hostName = process.env.REACT_APP_X_API_HOST;

    // const url = 'https://asin-data.p.rapidapi.com/request?type=search&amazon_domain=amazon.com&search_term=iphone';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': token,
    //         'X-RapidAPI-Host': hostName,
    //         'content-type': 'application/json'
    //     }
    // };

    const options = {
        method: 'GET',
        url: 'https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-lookup-product',
        params: {
          url: 'https://www.walmart.com/ip/Media-Remote-for-PlayStation-5/381848762'
        },
        headers: {
          'X-RapidAPI-Key': token,
          'X-RapidAPI-Host': 'axesso-walmart-data-service.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    }

export default fetchData;