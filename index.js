// Importing necessary modules
const express = require('express'); // Imports the Express framework for building web applications
const bodyParser = require('body-parser'); // Middleware used to extract JSON bodies from incoming requests

// Creating an instance of an Express application
const app = express();

// Using body-parser middleware to parse JSON bodies in requests
app.use(bodyParser.json());

// Mock Database: An array of objects representing users with properties like id, name, and email
const mockDatabase = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Williams', email: 'bob.williams@example.com' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
    { id: 6, name: 'David Green', email: 'david.green@example.com' },
    { id: 7, name: 'Eva White', email: 'eva.white@example.com' }
];

// Function to simulate asynchronous operations with a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); // Returns a promise that resolves after a specified number of milliseconds
}

// GET API endpoint to retrieve data from the mock database
app.get('/api/data', async(req, res) => {
  await delay(1000); // Simulating a delay before responding
  res.json(mockDatabase); // Sends the mock database as a JSON response
});

// POST API endpoint to add new data to the mock database
app.post('/api/data', async(req, res) => {
  const newData = req.body; // Extracts the request body which contains the new data
  await delay(500); // Simulating a delay before processing the request
  mockDatabase.push(newData); // Adds the new data to the mock database
  res.status(201).send('Data Added Successfully!!'); // Sends a success message with status code 201
});

// PUT API endpoint to update existing data in the mock database based on ID
app.put('/api/data/:id', async(req, res) => {
  const { id } = req.params; // Extracts the ID parameter from the URL
  const updateData = req.body; // Extracts the request body which contains the updated data
  await delay(700); // Simulating a delay before processing the request
  const index = mockDatabase.findIndex(item => item.id === parseInt(id)); // Finds the index of the item with the matching ID
  if (index!== -1) { // If the item exists
    mockDatabase[index] = updateData; // Updates the item with the new data
    res.send('Data Updated Successfully!!'); // Sends a success message
  } else {
    res.status(404).send('Data NOT FOUND'); // Sends a 404 error if the item does not exist
  }
});

// DELETE API endpoint to remove data from the mock database based on ID
app.delete('/api/data/:id', async(req, res) => {
  const { id } = req.params; // Extracts the ID parameter from the URL
  await delay(300); // Simulating a delay before processing the request
  const index = mockDatabase.findIndex(item => item.id === parseInt(id)); // Finds the index of the item with the matching ID
  if (index!== -1) { // If the item exists
    mockDatabase.splice(index, 1); // Removes the item from the mock database
    res.send('Data deleted successfully'); // Sends a success message
  } else {
    res.status(404).send('Data not found'); // Sends a 404 error if the item does not exist
  }
});

// Setting the port the server will listen on, defaulting to 3000 if no environment variable is set
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => console.log(`Server running on ${PORT}`)); // Logs a message indicating the server has started listening on the specified port
