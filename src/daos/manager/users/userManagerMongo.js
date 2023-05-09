const bcrypt = require("bcryptjs");

class UserManagerMongo {
    constructor(model) {
        this.model = model;
    };
    async signup(user) {
        try {
            const newUser = {
                username: user.username,
                password: bcrypt.hashSync(user.password, 8),
                name: user.name,
                addres: user.addres,
                age: user.age,
                telphone: user.telphone,
                avatar: user.avatar,
            }
            const userCreated = await this.model.create(newUser);
            if (userCreated) {
                return userCreated;
            } else {
                throw new Error("hubo un error al crear el usuario");
            }
        } catch (error) {
            throw new Error(`hubo un error al crear el usuario ${error.message}`)
        }
    };
    async login(users) {
        try {
            const { email, password } = users;
            const login = await this.model.findOne({ username: email });
            console.log("login",login);
            if (login) {
                const compare = bcrypt.compareSync(password, login.password);
                if (compare) {
                    return (`Bienvenid@ ${email} `);
                }
                else {
                    return ("La contraseña no es correcta");
                }
            }
            else {
                return ({ succes: "El usuario no existe" })
            }
        }
        catch (error) {
            return res.status(400).send({
                error: `An error occurred ${error.message}`,
            });
        }
    }
    async getAll(){
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
            throw new Error("No se pudo obtener los usuarios");
        }
    }
}

module.exports = { UserManagerMongo }