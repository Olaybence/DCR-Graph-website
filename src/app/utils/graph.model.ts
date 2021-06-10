import { User } from "./user.model";

// TODO: Here we need the types we wanna use
// Relation types from here:
// https://github.com/Olaybence/DCR-Graph-website/issues/36
export enum RelationTypes {
    Exclusion = "BackSlash",
    Response = "OpenTriangle",
    Condition = "BackwardCircleFork",
    Inclusion = "PlusCircle",
    Spawn = "Block",
    Milestone = "Diamond"
  }
// export enum RelationTypes {
//     ExclusionFrom = "", // nothing
//     ExclusionTo = "BackSlash",
//     ResponseFrom = "Circle",
//     ResponseTo = "OpenTriangle",
//     ConditionFrom = "", // nothing
//     ConditionTo = "CircleFork",
//     InclusionFrom = "", // nothing
//     InclusionTo = "PlusCircle",
//     SpawnFrom = "", // nothing
//     SpawnTo = "Block",
//     MilestoneFrom = "", // nothing
//     MilestoneTo = "Diamond"
//   }

export enum Location {
    local = 0,
    shared = 1
}

/**
 * DCR Graph
 * A DCR Graph representation
 * @public id : number
 * @public name : string
 * @public description : string
 * @public shortDescription : string
 * @public comments : Array(string)
 * @public collaborators : Array(User)
 * @public roles  : Array(Role)
 * @public startRole : number
 * @public endRole : number
 * @public tasks : Array(Task)
 */
export class Graph {
    public id: number; // Primary key
    public location: Location;
    public name: string;
    public description: string;
    public shortDescription: string;
    public comments: Array<string>;
    public collaborators: Array<User>;

    public roles: Array<Role>;
    public startRole: number;
    public endRole: number;
    public tasks: Array<Task>; // Graph edges

    constructor(id: number,name: string, description: string, location: Location) {
        // Basic data
        this.id = id;
        this.location = location;
        this.name = name;
        this.description = description;
        this.shortDescription = description;
        this.comments = [];
        this.collaborators = [];

        // Graph inner data
        this.startRole = 0;
        this.endRole = 0;
        this.roles = [];
        this.tasks = [];
    }

    addTask(task: Task) {
        this.tasks.push()
    }
}

/**
 * DCR Graph
 * This class is representing one role in DCR Graph
 * @public id : number
 * @public name : string
 */
export class Role {
    public id: number; // Primary key
    public name: string; // Role name
    
    // Visual placement attributes
    public x: number; // Position on the canvas (horizontal distance from the right side)
    public y: number; // Position on the canvas (vertical distance from the top side)

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
 * DCR Graph
 * @public id: number
 * @public roleID: number
 * @public name: string
 * @public prevID: number
 * @public nextID: number
 */
export class Task {
    public id: number; // Primary key
    public roleID: number; // Role it's binded to
    public name: string; // Description of the task
    public prevID: number; // Previous task (might be null if it's the start)
    public nextID: number; // Next task (TODO: make it an array, so conjunctions can be made - After the base solution is working)
    public parameters: Map<string,number>;
    
    // Visual placement attributes
    // (CALCULATED IN VISUAL-VIEW-COMPONENT)
    public x: number; // Position on the canvas (horizontal distance from the right side)
    public y: number; // Position on the canvas (vertical distance from the top side)

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
    setNextForMockUp(id: number) : Task {
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