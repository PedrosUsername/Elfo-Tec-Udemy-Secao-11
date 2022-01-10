export class Contact {

    id!: number;
    name: string;
    email: string;
    favorite!: boolean;
    foto: any;

    constructor(name: string, email: string){
        this.name = name;
        this.email = email;
    }

}