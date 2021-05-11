import { User } from "./user.model";

/**
 * A DCR Graph representation
 * @public id : number
 * @public name : string
 * @public description : string
 * @public shortDescription : string
 * @public comments : Array(string)
 * @public collaborators : Array(User)
 * @public roles  : Array(Role)
 * @public startRoles : number
 * @public nodes : Array(Node)
 */
export class Graph {
    public id: number; // Primary key
    public name: string;
    public description: string;
    public shortDescription: string;
    public comments: Array<string>;
    public collaborators: Array<User>;

    public roles: Array<Role>;
    public startRoles: number;
    public nodes: Array<Node>; // Graph edges

    constructor(id: number,name: string, description: string) {
        // Basic data
        this.id = id;
        this.name = name;
        this.description = description;
        this.shortDescription = description;
        this.comments = [];
        this.collaborators = [];

        // Graph inner data
        this.startRoles = 0;
        this.roles = [];
        this.nodes = [];
    }
}

/**
 * This class is representing one role in DCR Graph
 * @public id : number
 * @public name : string
 */
export class Role {
    public id: number; // Primary key
    public name: string; // Role name

    /**
     * @param id Primary key
     * @param name Name of the role
     */
    constructor(id: number, name: string) {
        this.name = name;
        this.id = id;
    }
}

/**
 * @public id: number
 * @public roleID: number
 * @public name: string
 * @public prevID: number
 * @public nextID: number
 */
export class Node {
    public id: number; // Primary key
    public roleID: number; // Role it's binded to
    public name: string; // Description of the task
    public prevID: number; // Previous task (might be null if it's the start)
    public nextID: number; // Next task (TODO: make it an array, so conjunctions can be made - After the base solution is working)

    /**
     * The constructor
     * @param id: primary key
     * @param name: name of the task
     * @param roleID: role it's bind to
     * @param prevID: the previous task it comes from
     */
    constructor(id: number, name: string, roleID: number, prevID: number) {
        this.name = name;
        this.roleID = roleID;
        this.id = id;
        this.prevID = prevID;
        this.nextID = null;
    }

    /**
     * Set the next task
     * @param id: number
     */
    setNextForMockUp(id: number) : Node {
        this.nextID = id;
        return this;
    }

    /**
     * Set the next task
     * @param id: number
     */
    setNext(id: number) {
        this.nextID = id;
        return this;
    }
}