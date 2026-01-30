const addBtn = document.getElementById("addBtn");
const newFourInput = document.getElementById("newFour");
const addResult = document.getElementById("addResult");

const getAllBtn = document.getElementById("getAllBtn");
const allFours = document.getElementById("allFours");

const SERVER_URL = "http://localhost:3000"; // Express szerver

// Új számnégyes hozzáadása
addBtn.addEventListener("click", async () => {
    const raw = newFourInput.value;
    const numbers = raw.split(",").map(n => parseInt(n.trim()));

    try {
        const res = await fetch(`${SERVER_URL}/fours`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(numbers)
        });

        const data = await res.json();
        if (!res.ok) {
            addResult.textContent = `Hiba: a számnégyes érvénytelen vagy már hozzá lett adva`;
        } else {
            addResult.textContent = `Sikeresen hozzáadva: ID ${data.id}`;
        }
    } catch (err) {
        addResult.textContent = `Hálózati hiba: ${err}`;
    }
});

// Összes számnégyes lekérdezése
getAllBtn.addEventListener("click", async () => {
    try {
        const res = await fetch(`${SERVER_URL}/fours`);
        const data = await res.json();

        allFours.innerHTML = "";
        data.forEach(f => {
            const li = document.createElement("li");
            li.textContent = `ID ${f.id}: [${f.values.join(", ")}]`;
            allFours.appendChild(li);
        });
    } catch (err) {
        allFours.innerHTML = `<li>Hálózati hiba: ${err}</li>`;
    }
});
