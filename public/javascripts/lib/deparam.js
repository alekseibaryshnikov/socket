function deparam(uri) {
  uri = uri || window.location.search;
  let queryString = {};

  const result = new Promise((resolve, reject) => {
    uri.replace(
      new RegExp("([^?=&]+)(=([^&#]*))?", "g"),
      function ($0, $1, $2, $3) {
        queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        (queryString) ? resolve(queryString) : reject(queryString);
      }
    );
  });
  
  return Object.freeze({
    result
  });
}