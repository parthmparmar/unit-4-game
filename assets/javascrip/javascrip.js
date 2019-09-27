
var p1 = {
    name: "Eleven",
    health: 50,
    attack: 50,
    counter_attack: 50,
    img_name:"assets/images/Eleven.jpg"
}

var p2 = {
    name: "Demodogs",
    health: 25,
    attack: 50,
    counter_attack: 50,
    img_name:"assets/images/Demodogs.jpg"
}

var p3 = {
    name: "Demogorgon",
    health: 30,
    attack: 50,
    counter_attack: 50,
    img_name:"assets/images/Demogorgon.jpg"
}

var p4 = {
    name: "Hopper",
    health: 55,
    attack: 50,
    counter_attack: 50,
    img_name:"assets/images/Hopper.jpg"
}

var active_players = [p1, p2, p3, p4];

var player1 = $("#player1");

var enemy_area= $("#enemy");
var player_area =$("#selection");
var fight_area =$("#fight");


create_players();
var play_card = $(".card");

function create_players(){
    var id_num = 0;
    for(var i = 1; i < active_players.length; i++) {
        id_num = i + 1;
        player1.clone(true).attr("id", "player" + id_num).appendTo(player_area);
        var health_id = "#player" + id_num + " #health";
        $(health_id).text(active_players[i].health);
        var attack_id = "#player" + id_num + " #attack"
        $(attack_id).text(active_players[i].attack);
        var c_attack_id = "#player" + id_num + " #c_attack"
        $(c_attack_id).text(active_players[i].counter_attack);
        var img_link = "#player" + id_num + " img";
        $(img_link).attr("src",active_players[i].img_name);
    }
}

player1.on("click",function(){
    // move_enemy("player1")
});

play_card.on("click",function(){
    if($(this).parent().attr("id") == "selection") {
    move_enemy($(this).attr("id"))
    }
    else if($(this).parent().attr("id") == "enemy") {
        $(this).appendTo(fight_area)
    }
});
function move_enemy(player_info){
    var id_num = 0
    for(var i = 0; i < active_players.length; i++){
        id_num = i + 1;
        // console.log($("#player" + id_num).attr("id"))
        // console.log(player_info)

        if($("#player" + id_num).attr("id") == player_info){
            $("#player" + id_num).parent().attr("class", "players card-group col-md-6")
        }
        else{
            enemy_area.append($("#player" + id_num));
        }
    }
}