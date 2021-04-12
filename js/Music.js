export class Music 
{
    constructor(id, title, path, idList) 
    {
        this.id = id;
        this.title = title;
        this.path = path;
        this.sound = new Audio(path);
        this.idList = idList;
    }
}