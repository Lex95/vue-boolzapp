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

const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeChat: 0,
        newMessage: "",
        query: "",
    },
    computed: {
        lastAccess() {
            const receivedMessages = this.usersList[this.activeChat].messages.filter((msg) => msg.status == "received");
            if (receivedMessages.length == 0) {
                return "Mai visto sto qui"
            } else {
                const lastMessageDate = receivedMessages[receivedMessages.length - 1];
                return this.getTimestamp(lastMessageDate)
            }
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
            if (message) {
                const dateFromString = moment(message.date, "DD/MM/YYYY HH:mm:ss");
                return dateFromString.format("HH:mm")
            } else return ""
        },
        lastMessage(contact) {
            if (contact.messages.length == 0) {
                return ""
            } else {
                return contact.messages[contact.messages.length - 1]
            }
        },
        sendMessage() {
            if (this.newMessage.trim() != "") {
                this.usersList[this.activeChat].messages.push({
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: this.newMessage,
                    status: "sent"
                });
                this.newMessage = "";
                const temp = this.activeChat;
                // funzione che risponde dopo 1s
                setTimeout(() =>
                    this.usersList[temp].messages.push({
                        date: moment().format("DD/MM/YYYY HH:mm:ss"),
                        text: "ok",
                        status: "received"
                    }), 1000)
            }
        },
        getSender(message) {
            if (message.status == "sent") {
                return "te"
            } else return this.usersList[this.activeChat].name
        },
        messageInfo(message) {
            alert(
                `Inviato il ${moment(message.date, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY")} alle ${moment(message.date, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")} da ${this.getSender(message)}.
Contenuto: ${message.text}`
            )
        },
        deleteMessage(message) {
            const indexToDelete = this.usersList[this.activeChat].messages.indexOf(message);
            this.usersList[this.activeChat].messages.splice(indexToDelete, 1)
        },
        onClickSend(newMessage) {
            if (newMessage == "") {
                alert("Microfono non collegato! :(")
            } else {
                this.sendMessage()
            }
        }
    }
})