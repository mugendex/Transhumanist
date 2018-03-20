import {RoomDataForClient} from "../Share/roomDataForClient";
import {ResultEnterRoomData} from "../Share/resultEnterRoomData";

//import {PlayerDataForClient} from "../Share/playerDataForClient";
import * as uuid from "node-uuid";

type PlayerData = {
    uuId: string;
    roomId: number;
    playerId: number;
};

let testPlayerData: PlayerData[] = [];

let testRoomDataList: RoomDataForClient[] = [
    {
        roomName: "バーチャル控室",
        roomId: 114514,
        playFlag: true,
        playerList: ["ミライアカリ", "輝夜月", "シロ", "のじゃロリ"],
        passwordFlag: false
    },
    {
        roomName: "テスト用収容室",
        roomId: 666,
        playFlag: false,
        playerList: ["何もない"],
        passwordFlag: false
    },
    {
        roomName: "なんでもいい",
        roomId: 10,
        playFlag: false,
        playerList: ["A", "B", "C"],
        passwordFlag: false
    }
];

const myMap = new Map<number, RoomDataForClient>();

//myMapにセット。この関数は完成版では恐らく不要です。
for(let i = 0; i<testRoomDataList.length; i++){
    myMap.set(testRoomDataList[i].roomId, testRoomDataList[i]);
}


//メインソケットからサンプルソケットを生成
export function create(mainSocket: SocketIO.Server) {
    let loginSocket = mainSocket.of("/login");
    //クライアントが繋がった時の処理
    loginSocket.on("connection", (socket: SocketIO.Socket) => {
        //requestRoomList + sendRoomList
        socket.on("requestRoomList", () => {
            socket.emit("sendRoomList", JSON.stringify(Array.from(myMap.values())));
        });

        //addRoom
        socket.emit("addRoom", JSON.stringify({
            roomName: "serverTest",
            roomId: 300,
            playFlag: false,
            playerList: ["add", "delete", "mad", "うける"]
        }));

        setTimeout(()=>{
            //deleteRoom
            socket.emit("deleteRoom", 10);

            //addMember
            socket.emit("addMember", JSON.stringify({
                roomId: 666,
                playerId: 1,
                playerName: "静かなオーケストラ"
            }));

            //deleteMember
            socket.emit("deleteMember", JSON.stringify({
                roomId: 114514,
                playerId: 0,
                playerName: ""
            }));

            //updatePlayFlag
            socket.emit("updatePlayFlag", JSON.stringify({
                roomID: 666,
                playFlag: true
            }));
        },1000);

        //requestEnterRoom
        socket.on("requestEnterRoom", (data: string) => {
            let request = JSON.parse(data);
            let resultEnterRoomData:ResultEnterRoomData = {
                successFlag: false,
                errorMsg: "",
                uuid: 0
            };

            const roomData = myMap.get(request.roomId);
            if (roomData != undefined) {
                for (let j = 0; j < 4; j++) {
                    if (roomData.playerList[j] == null) {
                        roomData.playerList[j] = request.name;

                        let data: PlayerData = {
                            uuId: uuid.v4(),
                            roomId: request.roomId,
                            playerId: j
                        };
                        
                        //resultEnterRoomDataの作成
                        resultEnterRoomData.successFlag = true;
                        //resultEnterRoomData.uuid = data.uuId;

                        testPlayerData.push(data);
                        break;
                    }
                }
            }

            socket.emit("resultEnterRoom",resultEnterRoomData);
        });
        
        return loginSocket;
    });
}
