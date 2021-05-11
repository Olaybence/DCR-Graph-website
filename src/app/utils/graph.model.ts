import { User } from "./user.model";

export class Graph {
    public id: number;
    public name: string;
    public description: string;
    public shortDescription: string;
    public comments: Array<string>;
    public collaborators: Array<User>;

    constructor(id: number,name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.shortDescription = description;
        this.comments = [];
    }
}