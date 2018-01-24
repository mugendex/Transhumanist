let testRoomDataList = [
    {
        roomName: "バーチャル控室",
        roomId: 114514,
        playFlag: true,
        playerList: ["ミライアカリ", "輝夜月", "シロ", "のじゃロリ"]
    },
    {
        roomName: "テスト用収容室",
        roomId: 666,
        playFlag: false,
        playerList: ["何もない"]
    },
    {
        roomName: "なんでもいい",
        roomId: 10,
        playFlag: false,
        playerList: ["A", "B", "C"]
    }
];
initRoomList(testRoomDataList);
//部屋のリストを受け取って画面に表示
function initRoomList(roomDataList) {
    for (let i = 0; i < roomDataList.length; i++) {
        addRoom(roomDataList[i]);
    }
}
//部屋を新規追加
function addRoom(roomData) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let table = document.createElement("table");
    table.setAttribute("class", "roomTable");
    table.setAttribute("id", String(roomData.roomId));
    //テーブル上段
    td.textContent = roomData.roomName;
    tr.appendChild(td);
    td = document.createElement("td");
    td.setAttribute("colspan", "4");
    td.textContent = "入室中のプレイヤー";
    tr.appendChild(td);
    table.appendChild(tr);
    //テーブル下段
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "部屋に入室");
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class", "playFlag");
    if (roomData.playFlag) {
        td.textContent = "プレイ中";
    }
    else {
        //ここにボタンを追加。
        td.appendChild(button);
    }
    tr.appendChild(td);
    for (let i = 0; i < 4; i++) {
        td = document.createElement("td");
        td.setAttribute("class", "player" + i);
        if (!(roomData.playerList.length < i)) {
            td.textContent = roomData.playerList[i];
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
    let roomListArea = document.getElementById("roomListArea");
    if (roomListArea != null)
        roomListArea.appendChild(table);
}
//部屋を削除
function deleteRoom(roomID) {
    let target = document.getElementById(String(roomID));
    if (target != null && target.parentNode)
        target.parentNode.removeChild(target);
}
//メンバーを追加(playerTagはclass =”player1”等の部分)
function addMember(roomID, playerName, playerTag) {
    let room = document.getElementById(String(roomID));
    if (room != null && room.lastElementChild != null)
        room.lastElementChild.
            getElementsByClassName(playerTag)[0].textContent = playerName;
}
//メンバーを削除(playerTagはclass =”player1”等の部分)
function deleteMember(roomID, playerTag) {
    let room = document.getElementById(String(roomID));
    if (room != null && room.lastElementChild != null)
        room.lastElementChild.
            getElementsByClassName(playerTag)[0].textContent = "";
}
//プレイ中かどうかが変更
function updatePlayFlag(roomID, playFlag) {
    let room = document.getElementById(String(roomID));
    if (room != null && room.lastElementChild) {
        let target = room.lastElementChild.
            getElementsByClassName("playFlag")[0];
        if (target.children != null)
            target.textContent = null;
        if (playFlag) {
            target.textContent = "プレイ中";
        }
        else {
            let button = document.createElement("input");
            button.setAttribute("type", "button");
            button.setAttribute("value", "部屋に入室");
            //ここにボタンを追加。
            target.appendChild(button);
        }
    }
}
