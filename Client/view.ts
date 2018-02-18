import * as global from "./boardGlobalData"
//player情報
export class PlayerInfo {
    playerName: string;
    speed: number;
    resource: number;
    activityRange: number;
    uncertainty: number;
    positive: number;
    negative: number;
}

//プレイヤーウインドウ表示のベースクラス
export class PlayerWindowBase {
    protected playerNameText: createjs.Text;
    protected speedText: createjs.Text;
    protected resourceText: createjs.Text;
    protected activityRange: createjs.Text;
    protected uncertainty: createjs.Text;
    protected positive: createjs.Text;
    protected negative: createjs.Text;
    protected playerFrame: createjs.Bitmap;
    protected group: createjs.Container;
    constructor(parent: createjs.Container) {
        this.group = new createjs.Container();
        this.playerNameText = new createjs.Text();
        this.playerFrame = new createjs.Bitmap("");
        this.group.addChild(this.playerFrame);
        this.group.addChild(this.playerNameText);
        parent.addChild(this.group);
    }
    //set PlayerInfo(playerInfo: PlayerInfo) {
}

export class Player1Window extends PlayerWindowBase {
    constructor(parent: createjs.Container, queue: createjs.LoadQueue) {
        super(parent);
        this.playerFrame.image = <any>queue.getResult("evenPlayerFrame");
        this.playerFrame.regX = this.playerFrame.image.width / 2;
        this.playerFrame.regY = 0;
        this.group.x = global.canvasWidth / 2;
        this.group.y = global.canvasHeight - this.playerFrame.image.height;
        this.playerNameText.color = "blue";
        this.playerNameText.text = "輝夜月";
        this.playerNameText.font = "20px Arial";
        this.playerNameText.regX = this.playerNameText.getMeasuredWidth() / 2;
        this.playerNameText.x;
        this.playerNameText.y = 5;


    }
}