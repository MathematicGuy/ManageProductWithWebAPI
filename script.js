// DOM Elements
const productList = document.getElementById('productList');
const createProductForm = document.getElementById('createProductForm');
const readProductById = document.getElementById('fetchHangHoaBtn');
const detailsDiv = document.getElementById('hangHoaDetails');
const readProductForm = document.getElementById('readProductForm');
const updateProductForm = document.getElementById('updateProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');

// API Endpoints
const username = '11170780';
const password = '60-dayfreetrial';

const API_BASE = 'http://heval1st-001-site1.anytempurl.com/api/Hang';
// const API_BASE = 'https://localhost:7116/api/Hang';
// Authenciation
// const basic = `${username}:${password}`;
// const basicAuthHeader = `Basic ${btoa(basic)}`;

// const options = {
//   method: 'GET',
//   mode: 'no-cors',
//   headers: {
//     'Authorization': basicAuthHeader,
//   }
// };



// Event Listeners
createProductForm.addEventListener('click', onCreateProductFormClick);
readProductForm.addEventListener('click', onReadProductFormClick);
readProductById.addEventListener('click', onReadProductByIdClick);
updateProductForm.addEventListener('click', onUpdateProductFormClick);
deleteProductForm.addEventListener('click', onDeleteProductFormClick);

// const express = require("express");
// const app = express()
// const cors = require("cors")
// app.use(
//   cors({
//     origin: "https://localhost:7116/api/"
//   })
// ) 


// Event Handlers
function onCreateProductFormClick(event) {
  createHang();
}

function onReadProductFormClick(event) {
  fetch(`${API_BASE}/GetAllHangs`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(renderProductList)
    .catch(console.error);
}

function onReadProductByIdClick() {
  const hangHoaId = document.getElementById('hangHoaIdInput').value;

  fetch(`${API_BASE}/HangById${hangHoaId}`)
    .then(response => response.json())
    .then(renderProductDetails)
    .catch(error => {
      console.error('Error:', error);
      alert("Error: Product ID is Invalid.");
    });
}

function onUpdateProductFormClick() {
  const hangHoaId = document.getElementById('hangHoaIdInput').value;
  const formData = new FormData(document.getElementById('myForm'));
  const jsonData = Object.fromEntries(formData.entries());
  updateHangHoa(hangHoaId, jsonData);
}

function onDeleteProductFormClick() {
  const hangHoaId = document.getElementById('hangHoaIdInput').value;
  deleteHangHoa(hangHoaId);
}

// Helper Functions
function renderProductList(data) {
  productList.innerHTML = '';
  const tableHeader = document.createElement('tr');
  tableHeader.innerHTML = `
    <th>Id</th>
    <th>Mã hàng hóa</th>
    <th>Tên hàng hóa</th>
    <th>Số lượng</th>
    <th>Ghi chú</th> 
  `;
  productList.appendChild(tableHeader);

  data.forEach(hangHoa => {
    if (hangHoa.id === null) { // Check for null ID
      alert("Error: Hang Hoa entry has a missing ID"); // Display the pop-up
      return; // Skip rendering this entry
    }

    const itemElement = document.createElement('tr');
    itemElement.innerHTML = `
      <td>${hangHoa.id}</td>
      <td>${hangHoa.ma_hang_hoa}</td>
      <td>${hangHoa.ten_hang_hoa}</td>
      <td>${hangHoa.so_luong}</td>
      <td>${hangHoa.ghi_chu}</td>                            
    `;
    productList.appendChild(itemElement);
  });
}

function renderProductDetails(hangHoa) {
  detailsDiv.innerHTML = `
    <p><strong>Mã hàng hóa:</strong> ${hangHoa.id}</p>
    <p><strong>Mã hàng hóa:</strong> ${hangHoa.ma_hang_hoa}</p>
    <p><strong>Tên hàng hóa:</strong> ${hangHoa.ten_hang_hoa}</p>
    <p><strong>Số lượng:</strong> ${hangHoa.so_luong}</p>
    <p><strong>Ghi chú:</strong> ${hangHoa.ghi_chu}</p>
  `;
}
GetAllHangss
function createHang(hangHoaData) {
  const formData = new FormData(document.getElementById('inputForm'));
  const jsonData = Object.fromEntries(formData.entries());


  // Validation
  const errors = [];

  if (!isValidHangHoaData(jsonData.ma_hang_hoa)) {
    errors.push("Error: ma_hang_hoa must be 9 digit.");
  }
  if (!jsonData.ma_hang_hoa || !(/^\d{9}$/.test(jsonData.ma_hang_hoa))) {
        errors.push("Error: ten_hang_hoa must be larger than 0.");
  }

  if (!jsonData.so_luong || jsonData.so_luong <= 0 || !Number.isInteger(jsonData.so_luong)) {  
    errors.push("Error: so_luong must be larger than 0.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return; // Stop submission if there are errors
  }

  

  fetch(`${API_BASE}/CreateHang`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., display a success message, clear the form)
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Error: Số lượng cannot be negative.");

      // Handle error (e.g., display an error message)
    });

  // Re-render table after Updating
  fetch(`${API_BASE}/GetAllHangss`)
    .then(response => response.json())
    .then(renderProductList)
    .catch(console.error);
}


function updateHangHoa(id, jsonData) {
  // Validation
  const errors = [];

  if (!jsonData.ma_hang_hoa || !(/^\d{9}$/.test(jsonData.ma_hang_hoa))) {
    errors.push("Error: ma_hang_hoa must be 9 digit.");
  }
  if (!jsonData.ten_hang_hoa || !(/^[a-zA-Z\s]*$/.test(jsonData.ten_hang_hoa))) {
      errors.push("Error: ten_hang_hoa must be a string with no special character or number");
  }

  if (isValidHangHoaData(jsonData.so_luong)) {
    errors.push("Error: so_luong must be larger than 0.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return; // Stop submission if there are errors
  }

  fetch(`${API_BASE}/UpdateHang${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 400) {
          alert("ma_hang_hoa must be a 9-digit number");
          return response.json();  // Try to parse error details from the response 
        } else {
          throw new Error('Network response was not OK'); // Generic error handling
        }
      }
      return response.json(); // Proceed if successful
    })
    .then(data => {
      // If BadRequest, data will likely contain error information
      if (data.error) { // Assuming your API returns an 'error' property
        alert(data.error); // Display the error message
      } else {
        console.log('Success:', data);
        // Your success handling logic (if no error received from API)
      }
    })
    .catch(error => {
      alert("Fetch before Update. Can only Update through Id", error);
    })


  // Re-render table after Updating
  fetch(`${API_BASE}/GetAllHangs`)
    .then(response => response.json())
    .then(renderProductList)
    .catch(error => {
      alert("Error: ", error);
    });
}

function deleteHangHoa(id) {
  fetch(`${API_BASE}/DelelteHang${id}`, {
    method: 'Delete',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(
      response => response.json()

    )
    .catch(console.error);

  // Re-render table after Updating
  fetch(`${API_BASE}/GetAllHangs`)
    .then(response => response.json())
    .then(renderProductList)
    .catch(console.error);
}

// validate if so luong hang > 0 or not 
function isValidHangHoaData(hangHoaData) {
  return hangHoaData.so_luong > 0;
}

// function authorization() {
//   const basic = `${username}:${password}`;
//   const basicAuthHeader = `Basic ${btoa(basic)}`;

//   const options = {
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//       'Authorization': basicAuthHeader,
//     }
//   };
// }