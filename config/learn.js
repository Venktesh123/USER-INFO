// // Fetching data from JSONPlaceholder API using fetch and promises
// const fetchPosts = () => {
//   const apiUrl = "https://jsonplaceholder.typicode.com/posts";

//   fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json(); // Parse JSON from the response
//     })
//     .then((data) => {
//       console.log("Posts data:", data.slice(1, 5)); // Log the posts data
//     })
//     .catch((error) => {
//       console.error("Error fetching posts:", error); // Handle errors
//     });
// };

// // Call the function to fetch posts
// fetchPosts();
console.log("start");
console.log("start");

function blockMainThread(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy-wait loop
  }
}

blockMainThread(2000);

for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log("end");
