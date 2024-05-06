// Класс для формирования payload для генерации токена
 class UserDto {
    email;
    id;
    secret;
    post;
    name;
    number;
    team;
    date;
    img;
    trenerId;


    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.post = model.post;
        this.name = model.name;
        this.secret = model.secret;
        this.number = model.number;
        this.team = model.team;
        this.date = model.date;
        this.img = model.img;
        this.trenerId = model.trenerId;
    }
}
export default UserDto
