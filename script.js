const globalUsersList = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '13/08/2020 15:30:55',
                text: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                text: 'Ricordati di dargli da mangiare',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                text: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                text: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                text: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    }, {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                text: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                text: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                text: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                text: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                text: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
];

const app = new Vue ({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeChat: 0,
        newMessage: "",
        query: "",
    },
    computed: {
        lastAccess() {
            if (!this.usersList[this.activeChat].messages) {
                return "";
            };
            const receivedMessages = this.usersList[this.activeChat].messages.filter((msg) => msg.status == "received");
            const lastMessageDate = receivedMessages[receivedMessages.length - 1];
            return this.getTimestamp(lastMessageDate)
        },
        filteredContacts() {
            return this.usersList.filter(element => element.name.toLowerCase().includes(this.query.toLowerCase()))
        }
    },
    methods: {
        onContactClick(contact) {
            this.activeChat = this.usersList.indexOf(contact)
        },
        getTimestamp(message) {
            const dateFromString = moment(message.date, "DD/MM/YYYY HH:mm:ss");
            return dateFromString.format("HH:mm")
        },
        lastMessage(contact) {
            if (contact.messages == null) {
                return "Non ci sono ancora messaggi"
            } else {
                return contact.messages[contact.messages.length - 1].text
            }
        },
        sendMessage() {
            if (this.newMessage != "") {
                this.usersList[this.activeChat].messages.push({
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: this.newMessage,
                    status: "sent"
                });
                this.newMessage = "";
                // funzione che risponde dopo 1s
                setTimeout(() => 
                this.usersList[this.activeChat].messages.push({
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: "ok",
                    status: "received"
                }), 1000)
            }
        }
    }
})