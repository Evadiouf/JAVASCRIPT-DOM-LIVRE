// Initialiser les données à partir du localStorage
let tables = JSON.parse(localStorage.getItem('tables')) || [];

const table = document.querySelector('.table');
const tblbody = document.createElement('tbody');

// Fonction pour créer le tableau
function createTable() {
    tblbody.innerHTML = '';  
    tables.forEach((entry, index) => {
        let row = document.createElement('tr');
        
        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        let buttonCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "SUPPRIMER";
        deleteButton.className = "delete-sup";
        buttonCell.appendChild(deleteButton);
        row.appendChild(buttonCell);

        row.id = "row-" + index;

        deleteButton.addEventListener('click', function() {
            tblbody.removeChild(row);
            tables.splice(index, 1);
            updateLocalStorage();
            createTable();  
        });

        tblbody.appendChild(row);
    });

    table.appendChild(tblbody);
}

// Mettre à jour le localStorage
function updateLocalStorage() {
    localStorage.setItem('tables', JSON.stringify(tables));
}

// Afficher le tableau au chargement de la page
createTable();

let modal = document.getElementById("modals");
let modalbutton = document.getElementById("addLivreModalButton");
let close = document.querySelector(".close");

modalbutton.onclick = function() {
    modal.style.display = "block";
}

close.onclick = function() {
    modal.style.display = "none";
}

// Ajouter un livre
let addAjouterButton = document.querySelector(".addAjouterButton");
addAjouterButton.onclick = function(event) {
    event.preventDefault();
    const livre = document.getElementById("livre").value;
    const auteur = document.getElementById("auteur").value;
    const anneePub = document.getElementById("anneePub").value;

    if (livre && auteur && anneePub) {
        const newtables = { livre, auteur, annepublication: anneePub };
        tables.push(newtables);
        updateLocalStorage();

        let row = document.createElement('tr');

        const cell0 = document.createElement('td');
        cell0.textContent = livre;
        row.appendChild(cell0);

        const cell1 = document.createElement('td');
        cell1.textContent = auteur;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = anneePub;
        row.appendChild(cell2);

        let buttonCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "SUPPRIMER";
        deleteButton.className = "delete-sup";
        buttonCell.appendChild(deleteButton);
        row.appendChild(buttonCell);

        deleteButton.addEventListener('click', function() {
            tblbody.removeChild(row);
            tables = tables.filter(item => item !== newtables);
            updateLocalStorage();
            createTable();  
        });

        tblbody.appendChild(row);

        // Réinitialiser le formulaire et fermer le modal
        document.querySelector('form').reset();
        modal.style.display = "none";
    } else {
        alert('Veuillez remplir tous les champs.');
    }
};
// Fonction pour créer le tableau
function createTable() {
    tblbody.innerHTML = '';  
    tables.forEach((entry, index) => {
        let row = document.createElement('tr');
        
        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Ajouter le bouton "Marquer lu"
        let actionCell = document.createElement("td");
        let markButton = document.createElement("button");
        markButton.textContent = "Marquer lu";
        markButton.className = "mark-read";
        actionCell.appendChild(markButton);
        row.appendChild(actionCell);

        // Ajouter un événement de clic pour marquer la ligne comme lue
        markButton.addEventListener('click', function() {
            row.style.textDecoration = "line-through"; // Appliquer le style de barre
        });

        let buttonCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "SUPPRIMER";
        deleteButton.className = "delete-sup";
        buttonCell.appendChild(deleteButton);
        row.appendChild(buttonCell);

        row.id = "row-" + index;

        deleteButton.addEventListener('click', function() {
            tblbody.removeChild(row);
            tables.splice(index, 1);
            updateLocalStorage();
            createTable();  
        });

        tblbody.appendChild(row);
    });

    table.appendChild(tblbody);
}
