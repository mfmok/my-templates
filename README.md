# my-templates

## these are some of the issues encountered

1. FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory

Solution: export NODE_OPTIONS=--max-old-space-size=4096

2. Access to XMLHttpRequest at 'https://api-wwlooy.bunnyenv.com/books' from origin 'https://app-wwlooy.bunnyenv.com' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://app-wwlooy.bunnyenv.com/' that is not equal to the supplied origin.

Solution: change the CORS options
var corsOptions = { // need to strip ending slash from frontendUrl for CORS to work
  origin: frontendUrl.replace(/\/+$/, '')
};
