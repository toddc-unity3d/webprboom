let localStorageEnabled = false;

function checkLocalStorageAvailable(){
  let test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      localStorageEnabled = true;
      console.log("Local storage is available.");
  } catch(e) {
    console.log("Local storage is not available.");
  }
}

function init() {
    checkLocalStorageAvailable();     
}

function writeValue(name, value, throwError) {
  if (!localStorageEnabled) {
    let message = "Unable to write '" + name + "', local storage disabled.";
    if (throwError) {
      throw message;
    } else {
      console.log(message);
      return false;
    }
  }

  try {
    localStorage.setItem(name, value);
  } catch (e) {
    let message = "An error occurred attempting to save '" + name + "': " + e;
    console.log(message);
  }
  return true;
}

function readValue(name, throwError) {
  if (!localStorageEnabled) {
    let message = "Unable to read '" + name + "', local storage disabled.";
    if (throwError) {
      throw message;
    } else {
      console.log(message);
      return;
    }
  }

  try {
    return localStorage.getItem(name);
  } catch (e) {
    var message = "An error occurred attempting to load '" + name + "': " + e;
    console.log(message);
  }
  return null;
}

function isLocalStorageEnabled() {
  return localStorageEnabled;
}

export {
  init,
  writeValue,
  readValue,
  isLocalStorageEnabled
}