import * as global from "../../boardGlobalData"
import * as viewBase from "./viewBase"



export class Player1BuildArea extends viewBase.PlayerBuildBase {
    constructor(queue: createjs.LoadQueue) {
        super(15);
        this.buildArea.image = <any>queue.getResult("oddPlayerRBArea");
        this.buildArea.regX = this.buildArea.image.width / 2;
        this.buildArea.regY = this.buildArea.image.height;
        this.buildArea.x = global.canvasWidth / 2;
        this.buildArea.y = (global.canvasHeight - 85) - this.buildArea.image.height - 4;
        this.buildList.x = global.canvasWidth / 2 - this.buildArea.image.width / 2;
        this.buildList.y = global.canvasHeight - this.buildArea.image.height - 85 - this.buildArea.image.height - 4;

    }
}



export class Player2BuildArea extends viewBase.PlayerBuildBase {
    constructor(queue: createjs.LoadQueue) {
        super(5);
        this.buildArea.image = <any>queue.getResult("evenPlayerRBArea");
        this.buildArea.regX = 0;
        this.buildArea.regY = this.buildArea.image.height / 2;
        this.buildArea.x = 100;
        this.buildArea.y = global.canvasHeight / 2 + (this.buildArea.image.height / 2) + 2;
        this.buildList.x = 100;
        this.buildList.y = global.canvasHeight / 2 + 2;

    }
}


export class Player3BuildArea extends viewBase.PlayerBuildBase {
    constructor(queue: createjs.LoadQueue) {
        super(15);
        this.buildArea.image = <any>queue.getResult("oddPlayerRBArea");
        this.buildArea.regX = this.buildArea.image.width / 2;
        this.buildArea.regY = 0;
        this.buildArea.x = global.canvasWidth / 2;
        this.buildArea.y = 85 + this.buildArea.image.height + 4;
        this.buildList.x = global.canvasWidth / 2 - this.buildArea.image.width / 2;
        this.buildList.y = 85 + this.buildArea.image.height + 4;;

    }
}



export class Player4BuildArea extends viewBase.PlayerBuildBase {
    constructor(queue: createjs.LoadQueue) {
        super(5);
        this.buildArea.image = <any>queue.getResult("evenPlayerRBArea");
        this.buildArea.regX = this.buildArea.image.width;
        this.buildArea.regY = this.buildArea.image.height / 2;
        this.buildArea.x = global.canvasWidth - 100;
        this.buildArea.y = global.canvasHeight / 2 + (this.buildArea.image.height / 2) + 2;
        this.buildList.x = global.canvasWidth - 100 - this.buildArea.image.width;
        this.buildList.y = global.canvasHeight / 2 + 2;
    }
}