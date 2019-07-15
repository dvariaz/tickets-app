const socket = io();
const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desk')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let desk = searchParams.get('desk');
document.getElementById('desk').innerHTML = `Escritorio ${desk}`;

document.getElementById('serveNext').addEventListener('click', () => {
    socket.emit('serveTicket', { desk }, (res) => {
        //console.log(res);
        if(!res.ok && res.err){
            alert(res.err.message);
            return;
        }
        document.getElementById('ticketServed').innerHTML = `Ticket ${res.num}`;
    });
})