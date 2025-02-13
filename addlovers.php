<!DOCTYPE html>
<?php
session_start(); // Start the session

if (!isset($_SESSION['confirmed']) || $_SESSION['confirmed'] !== true) {
    header("Location: /"); // Redirect if not confirmed
    exit();
}
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/flowers.png" type="image/x-icon">
    <title>Lovers CRUD UI</title>
    <script>
        
        function generateCode() {
    return Math.random().toString(36).substr(2, 4);
    }

    console.log(generateCode());
    loversid = generateCode();

        let data = [];

        async function fetchData() {
    const response = await fetch('lovers.json');
    data = await response.json();
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        tableBody.innerHTML += `<tr>
            <td>${index}</td>
            <td>${item.id}</td>
            <td><input type="text" value="${item.sender}" onchange="updateItem(${index}, 'sender', this.value)"></td>
            <td><input type="text" value="${item.recepient}" onchange="updateItem(${index}, 'recepient', this.value)"></td>
            <td><input type="text" value="${item.phone}" onchange="updateItem(${index}, 'phone', this.value)"></td>
            <td><input type="text" value="${item.text}" onchange="updateItem(${index}, 'text', this.value)"></td>
            <td><a href="https://wa.me/+961${item.phone}?text=https://loveatfirstsite.tech/?lovers=${item.id}" target="_blank">Message on WhatsApp</a>
</td>
            

            <td>
                <button onclick="updateRow(${index})">Update</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

 function addItem() {
            const id = loversid;
            const sender = document.getElementById('new-sender').value;
            const recepient = document.getElementById('new-recepient').value;
            const phone = document.getElementById('new-phone').value;
            const text = document.getElementById('new-text').value;

            if (sender && recepient && phone) {
                data.push({ id, sender, recepient, phone, text });
                renderTable();
                saveData();
            }
        }

        function updateItem(index, key, value) {
            data[index][key] = value;
            saveData();
        }

        function updateRow(index) {
            if (confirm('Are you sure you want to update this item?')) {
                const id = loversid;
                const sender = document.getElementById('new-sender').value;
                const recepient = document.getElementById('new-recepient').value;
                const phone = document.getElementById('new-phone').value;
                const text = document.getElementById('new-text').value;

                if (sender && recepient && phone) {
                    data[index] = { id, sender, recepient, phone , text};
                    renderTable();
                    saveData();
                }
            }
        }

        function deleteItem(index) {
            if (confirm('Are you sure you want to delete this item?')) {
                data.splice(index, 1);
                renderTable();
                saveData();
            }
        }

        async function saveData() {
            await fetch('save.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
    </script>
</head>
<body onload="fetchData()">
    <h2>Manage Lovers Data</h2>
    <input type="text" id="new-sender" placeholder="Enter sender">
    <input type="text" id="new-recepient" placeholder="Enter recepient">
    <input type="text" id="new-phone" placeholder="Enter phone number">
    <input type="text" id="new-text" placeholder="Enter Text" value="">
    <button onclick="addItem()">Add</button>
    <table border="1">
        <thead>
            <tr><th>#</th><th>id</th><th>Sender</th><th>Recepient</th><th>Phone</th><th>text</th><th>link</th><th>Actions</th></tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table>
</body>
</html>
