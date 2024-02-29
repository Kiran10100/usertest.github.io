// JavaScript code to fetch YAML data and generate the table

// Fetch YAML data
fetch('data.yaml')
    .then(response => response.text())
    .then(yaml => {
        // Parse YAML into JSON
        const data = jsyaml.load(yaml);

        // Generate table headings
        const headings = Object.keys(data[0]);
        const dropdowns = document.getElementById('dropdowns');
        const dataTable = document.getElementById('data-table');

        // Create dropdown menus for column headings
        headings.forEach(heading => {
            const select = document.createElement('select');
            select.innerHTML = `<option value="${heading}">${heading}</option>`;
            select.addEventListener('change', () => {
                // Function to sort data based on selected column
                const index = select.selectedIndex;
                const selectedHeading = select.options[index].value;
                const sortedData = data.sort((a, b) => a[selectedHeading] > b[selectedHeading] ? 1 : -1);
                generateTable(sortedData);
            });
            dropdowns.appendChild(select);
        });

        // Function to generate table
        function generateTable(data) {
            dataTable.innerHTML = '';
            const tableHead = document.createElement('thead');
            const tableBody = document.createElement('tbody');
            const headRow = document.createElement('tr');

            // Generate table headings
            headings.forEach(heading => {
                const th = document.createElement('th');
                th.textContent = heading;
                headRow.appendChild(th);
            });
            tableHead.appendChild(headRow);

            // Generate table rows and cells
            data.forEach(rowData => {
                const row = document.createElement('tr');
                headings.forEach(heading => {
                    const cell = document.createElement('td');
                    cell.textContent = rowData[heading];
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });

            dataTable.appendChild(tableHead);
            dataTable.appendChild(tableBody);
        }

        // Initial table generation
        generateTable(data);
    })
    .catch(error => console.log(error));
