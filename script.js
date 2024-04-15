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

// const API_BASE = 'http://heval1st-001-site1.anytempurl.com';
const API_BASE = 'https://localhost:7116/api/Hang';
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
  fetch(`${API_BASE}/GetAllHang`)
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
    .catch(() => alert('Error fetching Hang Hoa data.'));
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

function createHang(hangHoaData) {
  const formData = new FormData(document.getElementById('inputForm'));
  const jsonData = Object.fromEntries(formData.entries());

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
      // Handle error (e.g., display an error message)
    });

    // Re-render table after Updating
    fetch(`${API_BASE}/GetAllHang`)
    .then(response => response.json())
    .then(renderProductList)
    .catch(console.error);
}

function updateHangHoa(id, formData) {
  fetch(`${API_BASE}/UpdateHang${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(hangHoa => {
      console.log('Success:', hangHoa);
    })
    .catch(console.error);

  // Re-render table after Updating
  fetch(`${API_BASE}/GetAllHang`)
    .then(response => response.json())
    .then(renderProductList)
    .catch(console.error);
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
  fetch(`${API_BASE}/GetAllHang`)
  .then(response => response.json())
  .then(renderProductList)
  .catch(console.error);
}

function authorization() {
  const basic = `${username}:${password}`;
  const basicAuthHeader = `Basic ${btoa(basic)}`;

  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Authorization': basicAuthHeader,
    }
  };
}