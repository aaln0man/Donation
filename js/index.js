let totalBalance = 55000;
const historyLog = [];

function updateBalanceDisplay() {
    document.getElementById('balance-text').innerText = `${totalBalance} BDT`;
}

function makeDonation(card) {
    const inputField = document.getElementById(`donation-input-${card}`);
    const donationAmount = parseFloat(inputField.value);
    const donationDisplay = document.getElementById(`donation-amount-${card}`);

  
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }
    if (donationAmount > totalBalance) {
        alert("Insufficient balance for this donation.");
        return;
    }

   
    totalBalance -= donationAmount;
    updateBalanceDisplay();

    const currentDonation = parseFloat(donationDisplay.innerText) || 0;
    donationDisplay.innerText = `${currentDonation + donationAmount} BDT`;

  
    const timestamp = new Date().toLocaleString();
    const entry = {
         amount: `${donationAmount} Taka donated for flood at ${card.charAt(0).toUpperCase() + card.slice(1)}, Bangladesh`,
    timestamp: `Date: ${timestamp}`
    };
    historyLog.push(entry);
    updateHistoryLog(); 

    
    inputField.value = '';

    document.getElementById('static-modal').classList.remove('hidden');
}


function updateHistoryLog() {
    const historyElement = document.getElementById('history-log');
    historyElement.innerHTML = ''; 
    
    historyLog.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'border border-green-300 p-4 rounded-lg shadow-md mb-2 w-full max-w-md ';
        
        const amount = document.createElement('p');
        amount.className = 'font-bold'; 
        amount.innerText = entry.amount; 

        const date = document.createElement('p');
        date.className = 'text-gray-500'; 
        date.innerText = entry.timestamp; 

        card.appendChild(amount);
        card.appendChild(date);
        historyElement.appendChild(card);
    });
}


document.getElementById('btn-show-add-money').onclick = function() {
    document.getElementById('donation-section').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
    this.classList.add('active');
    document.getElementById('btn-show-cash-out').classList.remove('active');
};

document.getElementById('btn-show-cash-out').onclick = function() {
    document.getElementById('donation-section').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');
    this.classList.add('active');
    document.getElementById('btn-show-add-money').classList.remove('active');
};

document.getElementById('btn-blog').onclick = function() {
    window.location.href = 'blog.html';
};

document.getElementById('close-modal').onclick = function() {
    document.getElementById('static-modal').classList.add('hidden');
};