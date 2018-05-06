import * as view from "./view";
import { PlayerWindowBase, PlayerResourceAreaBase } from "./viewBase";
import { PlayerViewState } from "../Share/playerViewState";
import { SelectActionWindow } from "./viewSelectActionWindow";
import { NumberOfActionCard } from "../Share/numberOfActionCard";
import { ResourceKind } from "../Share/resourceKind";

export interface BindParams {
    stage: createjs.Stage;
    queue: createjs.LoadQueue;
    socket: SocketIOClient.Socket;
}

//viewを生成してソケットと結びつける関数
export function viewBuilder(bindParams: BindParams) {
    playerWindowBuilder(bindParams);
    PlayerResourceAreaBuilder(bindParams);
    turnFinishButtonBuilder(bindParams);
    declareWarButtonBuilder(bindParams);
    selectActionWindowBuilder(bindParams);
}

function playerWindowBuilder(bindParams: BindParams) {
    const playerWindowList: PlayerWindowBase[] = [
        new view.Player1Window(bindParams.queue),
        new view.Player2Window(bindParams.queue),
        new view.Player3Window(bindParams.queue),
        new view.Player4Window(bindParams.queue)
    ];

    for (let i = 0; i < playerWindowList.length; i++) {
        //プレイヤーの状態を更新するソケットイベント
        bindParams.socket.on("setPlayerViewState" + (i + 1),
            (data: string) => {
                const playerViewState: PlayerViewState = JSON.parse(data);
                playerWindowList[i].setPlayerName(playerViewState.playerName);
                playerWindowList[i].setSpeed(playerViewState.speed);
                playerWindowList[i].setResource(playerViewState.resource);
                playerWindowList[i].setPositive(playerViewState.positive);
                playerWindowList[i].setNegative(playerViewState.negative);
                playerWindowList[i].setUncertainty(playerViewState.uncertainty);
                playerWindowList[i].setActivityRange(playerViewState.activityRange);
                bindParams.stage.update();
            }
        );
        bindParams.stage.addChild(playerWindowList[i]);
    }
}

//プレイヤーのリソース欄生成
function PlayerResourceAreaBuilder(bindParams: BindParams) {
    const playerResourceAreaList: PlayerResourceAreaBase[] = [
        new view.Player1ResourceArea(bindParams.queue),
        new view.Player2ResourceArea(bindParams.queue),
        new view.Player3ResourceArea(bindParams.queue),
        new view.Player4ResourceArea(bindParams.queue)
    ];
    for (let i = 0; i < 4; i++) {
        bindParams.socket.on("player" + String(i) + "AddResource", (str: string) => {
            const resourceKindList: ResourceKind[] = JSON.parse(str);
            resourceKindList.forEach(x =>
                playerResourceAreaList[i].addResource(x, bindParams.queue)
            );
        });
        bindParams.socket.on("player" + String(i) + "DeleteResource", (str: string) => {
            const iconIdList: number[] = JSON.parse(str);
            iconIdList.forEach(x =>
                playerResourceAreaList[i].deleteResource(x)
            );
        });
        bindParams.stage.addChild(playerResourceAreaList[i]);
    }
}

function turnFinishButtonBuilder(bindParams: BindParams) {
    const turnFinishButton =
        new view.TurnFinishButton(
            () => bindParams.socket.emit("turnFinishButtonClick"),
            bindParams.queue
        );
    bindParams.stage.addChild(turnFinishButton);
}

function declareWarButtonBuilder(bindParams: BindParams) {
    const declareWarButton =
        new view.DeclareWarButton(
            () => bindParams.socket.emit("declareWarButtonClick"),
            bindParams.queue
        );
    bindParams.stage.addChild(declareWarButton);
}

function selectActionWindowBuilder(bindParams: BindParams) {
    const selectActionWindow = new SelectActionWindow(bindParams.queue);
    selectActionWindow.onSelectedLevel(level => bindParams.socket.emit("selectLevel", level));
    bindParams.stage.addChild(selectActionWindow);
    selectActionWindow.visible = false;
    bindParams.socket.on("setSelectActionWindowVisible", (str: string) => {
        const visibleFlag: boolean = JSON.parse(str);
        selectActionWindow.visible = visibleFlag;
        bindParams.stage.update();
    })
    bindParams.socket.on("setNumberOfActionCard", (str: string) => {
        const numberOfActionCardList: NumberOfActionCard[] = JSON.parse(str);
        selectActionWindow.setNumberOfActionCard(numberOfActionCardList);
        bindParams.stage.update();
    })
}