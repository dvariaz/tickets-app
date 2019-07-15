// Comando para establecer la conexion
const socket = io();
const label = document.getElementById('lblNewTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexión con el servidor');
})

socket.on('actualState', (state) => {
    label.innerHTML = state.actual;
})

document.getElementById('newTicket').addEventListener('click', () => {
    socket.emit('nextTicket',null, (nextTicket) => {
        label.innerHTML = nextTicket;
    });
})