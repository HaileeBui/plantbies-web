const baseUrl = 'http://localhost:8000/api/plants/'

const PlantAPI = () => {
  const getPlantList = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('fetchGET error: ' + response.status);
    }
    return await response.json();
  };

  const getPlantDetail = async (plantId) =>{
    const response = await fetch(baseUrl + plantId +'/');
    if (!response.ok) {
      throw new Error('fetchGET error: ' + response.status);
    }
    return await response.json();
  }

  const addPlant = async (data) => {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(baseUrl, fetchOptions);
    const json = await response.json();
    if (response.status === 400 || response.status === 401) {
      const message = Object.values(json).join();
      throw new Error(message);
    } else if (response.status > 299) {
      throw new Error('fetchPOST error: ' + response.status);
    }
    return json;
  }

  const deletePlant = async (plantId) => {
    const fetchOptions = {
      method: 'DELETE',
    };
    const response = await fetch(baseUrl + plantId +'/', fetchOptions);
    if (!response.ok) {
      throw new Error('fetchDELETE error: ' + response.status);
    }
    return {message: 'deleted'};
  }

  const modifyPlant = async (data, plantId) => {
    const fetchOptions = {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(baseUrl + plantId +'/', fetchOptions);
    const json = await response.json();
    if (response.status === 400 || response.status === 401) {
      alert('Failed. Contact admin');
      const message = Object.values(json).join();
      throw new Error(message);
    } else if (response.status > 299) {
      throw new Error('fetchPUT error: ' + response.status);
    }
    return json;
  }

  return {
    getPlantList,
    getPlantDetail,
    addPlant,
    deletePlant,
    modifyPlant,
  }
}

export default PlantAPI;