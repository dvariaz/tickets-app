const socket = io();

let lblTicket1 = document.getElementById('lblTicket1');
let lblTicket2 = document.getElementById('lblTicket2');
let lblTicket3 = document.getElementById('lblTicket3');
let lblTicket4 = document.getElementById('lblTicket4');

let lblDesk1 = document.getElementById('lblDesk1');
let lblDesk2 = document.getElementById('lblDesk2');
let lblDesk3 = document.getElementById('lblDesk3');
let lblDesk4 = document.getElementById('lblDesk4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];
// console.log(lblTickets, lblDesks);

socket.on('actualState', (state) => {
    console.log(state);
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(state.last4);
});

function updateHTML(last4) {
    last4.map((ticket, index) => {
        // console.log(ticket,index);
        lblTickets[index].innerHTML = `Ticket ${ticket.num}`;
        lblDesks[index].innerHTML = `Escritorio ${ticket.desk}`;
    })
}