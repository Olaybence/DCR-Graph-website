/**
 * MIGHT NOT NEEDED
 * DON'T WORK WITH THIS YET
 * (As the back-end can provide the graph itself)
 */
export class ShareInfo {
    public graphID: number;
    public ipAddress: string;
    // TODO: Still unknown how it will work, and what will we need for communication.

    constructor(graphID: number, ipAddress: string) {
        this.graphID = graphID;
        this.ipAddress = ipAddress;
    }
}