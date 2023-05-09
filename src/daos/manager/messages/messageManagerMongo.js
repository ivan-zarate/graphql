class MessageManagerMongo {
    constructor(model) {
        this.model = model;
    };
    async getAll() {
        try {
            const messages = await this.model.find();
            return messages;
        } catch (error) {
            throw new Error("No se pudo obtener los mensajes");
        }
    };
    async create(message) {
        try {
            const newMessage = new this.model(message);
            const test = newMessage.save();
            return test;
        } catch (error) {
            throw new Error("No se pudo impactar el mensaje");
        }
    }
}

module.exports = { MessageManagerMongo }