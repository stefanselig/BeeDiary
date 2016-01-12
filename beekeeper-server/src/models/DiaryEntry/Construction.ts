class Construction extends DiaryEntry {
    swarmBought: boolean;
    notes: string;
    
    constructor(type, photos, description, date, swarmBought, notes) {
       super(type, photos, description, date);
       this.swarmBought = swarmBought;
       this.notes = notes;
    }
}