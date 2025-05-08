

// Save data on page unload
const postData = (url, data) => {
    const jsonData = JSON.stringify(data);
    const beaconSuccess = navigator.sendBeacon(url, jsonData);
    if (!beaconSuccess) {
      new Image().src = `${url}?data=${encodeURIComponent(jsonData)}`;
    }
};

export { postData };