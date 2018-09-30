import { LogMessageForClient, LogMessageType } from "../../Share/logMessageForClient";
import { EventLogMessageForClient } from "../../Share/eventLogMessageForClient";
import { SocketBinder } from "../socketBinder";

export class Message {
    private logMessageList: SocketBinder.BinderList<LogMessageForClient>;
    private eventLogMessage: SocketBinder.Binder<EventLogMessageForClient>;

    constructor(boardsocketManager: SocketBinder.Namespace) {
        this.logMessageList = new SocketBinder.BinderList<LogMessageForClient>("logMessageList");
        this.logMessageList.Value = new Array();
        this.logMessageList.push(new LogMessageForClient("イベント【人口爆発】が発生しました。", LogMessageType.EventMsg));
        this.logMessageList.push(new LogMessageForClient("スターは「工場」を設置しました。", LogMessageType.Player1Msg));
        this.logMessageList.push(new LogMessageForClient("N.Hのターンです。", LogMessageType.Player2Msg));
        this.logMessageList.push(new LogMessageForClient("らいぱん鳥のターンです。", LogMessageType.Player3Msg));
        this.logMessageList.push(new LogMessageForClient("戦争状態のため、Positiveが-1されました", LogMessageType.Player3Msg));
        setTimeout(() => this.logMessageList.push(new LogMessageForClient("ようこそ", LogMessageType.EventMsg)), 5000);
        this.eventLogMessage = new SocketBinder.Binder<EventLogMessageForClient>("eventLogMessage");
        this.eventLogMessage.Value = new EventLogMessageForClient("イベント【人口爆発】が発生しました", "リソース欄にある『人間の』2倍の\n新たな『人間』を追加する。\n新たに追加する時、『人間』は削除対象に出来ない。");

        for (var i = 0; i < 4; i++) {
            let sendChatMessage = new SocketBinder.EmitReceiveBinder("sendChatMessage", true, ["player" + i]);
            let ii = i + 1;
            sendChatMessage.OnReceive((str: string) => {
                if (this.chatMessageValidation(str))
                    this.logMessageList.push(
                        new LogMessageForClient(`[player${ii}]${str}`, ii));
            });
            boardsocketManager.addSocketBinder(sendChatMessage);
        }
        boardsocketManager.addSocketBinder(this.logMessageList, this.eventLogMessage);
    }

    private chatMessageValidation(str: string) {
        var reg = new RegExp(/[^\s]/g);
        return reg.test(str);
    }
}