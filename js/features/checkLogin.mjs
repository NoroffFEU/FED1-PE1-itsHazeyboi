import { loginAPI } from "./API.mjs";
import { myFetcher } from "./fetcher.mjs";


// let loginToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFuc2kiLCJlbWFpbCI6ImhhbnNpQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzE0OTk5ODc5fQ.-y0IUn2YDXhQ1Ake2D8oHWCnwHqPRiog3BFNCuJg2VA';





// export const checkLogin = async function () {
//     try {

//         const loginFetch = await myFetcher(loginAPI);
//         console.log(loginAPI);

//         if (localStorage.getItem.securityToken === loginToken) {
//             let loggedOut = document.querySelector('.header-top');
//             loggedOut.innerHTML = '';

//             let userName = document.createElement('p');
//             userName.innerHTML = '';


//         }         
//     } catch (error) {
//         console.error(error);
//       }
// }


// checkLogin();

// Remember to actually make it so that after logging in with login site 
// it will send the information that was approved to local storage under 
// a name of userInfo!
const loginData = JSON.parse(localStorage.getItem('userInfo'));
  
  function test1 () {
    fetch(loginAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle successful login response
    console.log('Login successful:', data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error logging in:', error);
  });
}

test1();