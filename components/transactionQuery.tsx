export async function getTransactions() {
    const res = await fetch('http://localhost:3000/api/statement/1004');
    return res.json();
    
}