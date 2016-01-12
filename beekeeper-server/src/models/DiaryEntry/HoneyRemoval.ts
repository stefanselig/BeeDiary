class HoneyRemoval extends DiaryEntry {
    amount: number;
    
    constructor(type, photos, description, date, amount) {
       super(type, photos, description, date);
       this.amount = amount;
    }
}