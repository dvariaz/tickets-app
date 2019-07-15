const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.emit('actualState', {
        actual: ticketControl.getLast(),
        last4: ticketControl.getLast4()
    })
    
    client.on('nextTicket', (data, callback) => {
        let next= ticketControl.next();
        console.log(next);
        callback(next);
    });

    client.on('serveTicket', (data, callback) => {
        if(!data.desk){
            return callback({
                ok: false,
                err: {
                    message: 'El escritorio es necesario'
                }
            })
        }

        let serveTicket = ticketControl.serveTicket(data.desk);
        
        callback(serveTicket);
        client.broadcast.emit('actualState', {
            actual: ticketControl.getLast(),
            last4: ticketControl.getLast4()
        });
    });
});