//1. Basic Async Function
// Write an async function called getData that uses fetch to get data from https://jsonplaceholde//r.typicod//e.com/todos/1 and logs the respons//e// .
export async function getData1(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data
}
//2. Error Handling
// Modify the getData function to handle errors using try and catc//h// .
export async function getData2(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    
    return error
  }
}

//3. Sequential API Calls
// Write a function that makes two sequential API calls where the second call 
// depends on the data received from the first cal//l// .
// primera llamada https://jsonplaceholder.typicode.com/todos/1
// segunda llamada https://jsonplaceholder.typicode.com/todos/${data1.userId}
// data1 es el resultado de la primera llamada
export async function sequentialAPICalls(url) {
  const response1 = await fetch(url);
  const data1 = await response1.json();
  const response2 = await fetch(`https://jsonplaceholder.typicode.com/users/${data1.userId}`);
  const {name} = await response2.json();
  return {r1:data1, r2:name}
}

//4. Parallel API Calls
// Write a function that makes two API calls in parallel and logs the 
// results only after both have complete//d// .
// primera llamada https://jsonplaceholder.typicode.com/todos/1
// segunda llamada https://jsonplaceholder.typicode.com/todos/2
export async function parallelAPICalls() {
  const [response1, response2] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos/1'),
    fetch('https://jsonplaceholder.typicode.com/todos/2')
  ]);
  const [data1, data2] = await Promise.all([response1.json(), response2.json()]);
  return [data1, data2]
}

//5. Await in Loops
// Write an async function that iterates over an array of URLs and fetches data from 
// each URL sequentially using a fo//r//.//..of loo//p// .
// https://jsonplaceholder.typicode.com/todos/n siendo n = 1,2,3,4
export async function fetchSequentially(urls) {
  const responses = [];
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    responses.push(data);
  }
  return responses
}


//6. Async/Await with Array Methods
// Create an async function that uses Promis//e.all to fetch data from multiple URLs 
// stored in an array and logs all responses at onc//e// .
// urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2']
export async function fetchAll(urls) {
  const responses = await Promise.all(urls.map(url => fetch(url)));
  const data = await Promise.all(responses.map(response => response.json()));
  return data
}



//7. Async/Await with Conditional Logic
// W rite an async function that makes an API call and performs different actions based on the status code of the respons//e// .
// https://jsonplaceholder.typicode.com/todos/1
export async function handleResponse(url) {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch data');
  }
}
// 8. Async/Await with File Operations (Node.js)
// If you’re using Node.js, write an async function that reads a file, processes its contents, 
// and writes the result to a new file, using await to handle the asynchronous file operations.
export async function processFile(inputFile, outputFile) {
  const fs = require('fs').promises;
  const data = await fs.readFile(inputFile, 'utf8');
  await fs.writeFile(outputFile, data);
}

//9. Fetch with Async/Await and FormData
//Write an async function that sends a POST request with FormData to 
//https://jsonplaceholder.typicode.com/posts. Log the response.
// data = { title: 'foo', body: 'bar', userId: 1 }
export async function postData(data) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData
  });
  const responseData = await response.json();
  console.log(responseData)
  return responseData;
}

//10 Async Function with Destructuring
//Create an async function that fetches user data from 
// https://jsonplaceholder.typicode.com/users/1 and uses destructuring to extract and log the user's name and email.

export async function getUserData(url) {
  const response = await fetch(url);
  const { name, email } = await response.json();
  return { name, email };
}
