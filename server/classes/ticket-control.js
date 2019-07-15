const fs = require('fs');

class Ticket {
    constructor(num, desk) {
        this.num = num;
        this.desk = desk;
    }
}

class TicketControl {
    
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else{
            this.rebootCount();
        }
    }

    rebootCount() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        this.saveFile();
        console.log('Se ha inicializado el sistema');
    }

    next() {
        this.last++;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveFile();
        
        return this.getLast();
    }

    getLast(){
        return `Ticket ${ this.last }`;
    }

    getLast4(){
        return this.last4;
    }

    serveTicket(desk) {
        if(this.tickets.length === 0){
            return {
                ok: false,
                err: {
                    message: 'No hay tickets'
                }
            };
        }

        let numberTicket = this.tickets[0].num;
        this.tickets.shift();

        let serveTicket = new Ticket(numberTicket, desk);
        this.last4.unshift(serveTicket);

        if(this.last4.length > 4) {
            this.last4.splice(-1,1);//Elimina el ultimo
        }

        console.log('Ultimos 4', this.last4);

        this.saveFile();

        return serveTicket;
    }

    saveFile(){
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);
        
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}