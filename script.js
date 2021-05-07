const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeChat: 0,
        newMessage: "",
        query: "",
        emoteList: emoteListGraphic
        // non sono sicuro che queste emote funzionino per ogni browser e sistema operativo, nel caso cambiare con emoteListGraphic con emoteListClassic
    },
    computed: {
        lastAccess() {
            const receivedMessages = this.usersList[this.activeChat].messages.filter((msg) => msg.status == "received");
            if (receivedMessages.length == 0) {
                return "Mai visto sto qui"
            } else {
                const lastMessageDate = receivedMessages[receivedMessages.length - 1];
                return "Ultimo accesso oggi alle " + this.getTimestamp(lastMessageDate)
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
            if (message && message.text != 'Non ci sono messaggi!') {
                const dateFromString = moment(message.date, "DD/MM/YYYY HH:mm:ss");
                return dateFromString.format("HH:mm")
            } else return ""
        },
        lastMessage(contact) {
            if (contact.messages.length == 0) {
                return {
                    text: 'Non ci sono messaggi!'
                }
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
                this.scrollToBottom();
                // funzione che risponde dopo 1s
                setTimeout(() => {
                    this.usersList[temp].messages.push({
                        date: moment().format("DD/MM/YYYY HH:mm:ss"),
                        text: "ok",
                        status: "received"
                    });
                    this.scrollToBottom()
                }, 1000)
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
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const htmlElement = this.$refs.chatContainerToScroll;
                htmlElement.scrollTop = htmlElement.scrollHeight;
            })

        },
        clearQuery() {
            this.query = ""
        },
        // bonus emote
        onEmoteClick(emote) {
            this.newMessage += emote.content
        }
    }
})