

/*************** fetch requests *******************************/

//FETCH EXAMPLE
// fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>` //make sure to add token here
//     },
//     body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));


// /**********************************/

// //login
// fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //signup
// fetch('/api/users/signup', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "email": "user@jyahoo.com", 
//         "password": "password", 
//         "username": "users", 
//         "firstName":  "userFirst",
//         "lastName": "userLast"
//    })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //create a spot
// fetch('/api/locations', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "address": "1267 srightLn",
//         "city": "nowhere", 
//         "state": "new york", 
//         "country": "USA", 
//         "lat": "33.46", 
//         "lng": "14.242", 
//         "name": "new camp", 
//         "description": "just a new spot to camp", 
//         "price": "34535"
//     })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //create an image for a spot
// fetch('/api/locations/9/images', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "url": "www.image.io",
//         "preview": true
//       })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //edit a spot
// fetch('/api/locations/9', {
//     method: 'PUT',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "id": 1,
//         "ownerId": 1,
//         "address": "123 Disney Lane",
//         "city": "San Francisco",
//         "state": "California",
//         "country": "United States of America",
//         "lat": 37.7645358,
//         "lng": -122.4730327,
//         "name": "App Academy",
//         "description": "Place where web developers are created",
//         "price": 123,
//         "createdAt": "2021-11-19 20:39:36",
//         "updatedAt": "2021-11-20 10:06:40"
//       })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //create a revirew for a spot
// fetch('/api/locations/1/reviews', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "review": "This was an awesome spot!",
//         "stars": "5"
//       })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/


// //create an image for a review
// fetch('/api/reviews/41/images', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "url": "ww.randomimage.com"
//     })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //edit a review
// fetch('/api/reviews/41', {
//     method: 'PUT',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "review": "This was an awesome spot!",
//         "stars": 5
//       })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //create a booking based on spot id
// fetch('/api/locations/1/bookings', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "startDate": "2025-02-28",
//         "endDate": "2025-02-30"
//       })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

// //edit a booking
// fetch('/api/bookings/10', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `5WUJz27N-eg68H2iBl8QOvjpl-XXolCPUnkQ` //make sure to add token here
//     },
//     body: JSON.stringify({
//         "startDate": "2025-02-21",
//         "endDate": "2025-02-29"
//       })
//   }).then(res => res.json()).then(data => console.log(data));

// /**********************************/

