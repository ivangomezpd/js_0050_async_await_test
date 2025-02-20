//1. Basic Async Function
// Write an async function called getData that uses fetch to get data from https://jsonplaceholder.typicode.com/todos/1 and logs the response.
export async function getData1(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//2. Error Handling
// Modify the getData function to handle errors using try and catch.
export async function getData2(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

//3. Sequential API Calls
export async function sequentialAPICalls(url) {
  const response1 = await fetch(url);
  const data1 = await response1.json();
  const response2 = await fetch(`https://jsonplaceholder.typicode.com/users/${data1.userId}`);
  const { name } = await response2.json();
  return { r1: data1, r2: name };
}

//4. Parallel API Calls
export async function parallelAPICalls() {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
  ];
  const [response1, response2] = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
  return { response1, response2 };
}

//5. Await in Loops
export async function fetchSequentially(urls) {
  const results = [];
  for (const url of urls) {
    const response = await fetch(url);
    results.push(await response.json());
  }
  return results;
}

//6. Async/Await with Array Methods
export async function fetchAll(urls) {
  const results = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
  return results;
}

//7. Async/Await with Conditional Logic
export async function handleResponse(url) {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Request failed with status: ${response.status}`);
  }
}

// 8. Async/Await with File Operations (Node.js)
import fs from 'fs/promises';
export async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf-8');
    const processedData = data.toUpperCase();
    await fs.writeFile(outputFile, processedData);
    return 'File processed successfully';
  } catch (error) {
    return error.message;
  }
}

//9. Fetch with Async/Await and FormData
export async function postData(data) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

//10 Async Function with Destructuring
export async function getUserData(url) {
  const response = await fetch(url);
  const { name, email } = await response.json();
  return { name, email };
}
