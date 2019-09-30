
var p1 = {
    name: "Eleven",
    health: 50,
    attack: 1,
    counter_attack: 1,
    img_name:"assets/images/Eleven.jpg"
}

var p2 = {
    name: "Demodogs",
    health: 25,
    attack: 1,
    counter_attack: 1,
    img_name:"assets/images/Demodogs.jpg"
}

var p3 = {
    name: "Demogorgon",
    health: 15,
    attack: 1,
    counter_attack: 1,
    img_name:"assets/images/Demogorgon.jpg"
}

var p4 = {
    name: "Hopper",
    health: 5,
    attack: 1,
    counter_attack: 1,
    img_name:"assets/images/Hopper.jpg"
}

var active_players = [p1, p2, p3, p4];
var enemy_selected = false;
var player_name = "";
var enemy_name = "";
var attack_power = 0;
var counter_power = 0;
var player_health = 0;
var enemy_health = 0;
var num_win = 0;

var player1 = $("#player1");
var attack_btn = $(".attack")
var enemy_area= $("#enemy");
var player_area =$("#selection");
var fight_area =$("#fight");
var enemy_text = $(".enemy_header");
var message = $("#message");
var player_header = $("#header1")


create_players();
var play_card = $(".card");

function create_players(){
    var id_num = 0;
    for(var i = 1; i < active_players.length; i++) {
        id_num = i + 1;
        player1.clone(true).attr("id", "player" + id_num).appendTo(player_area);
        var value_text = "#player" + id_num 
        $(value_text).attr("value", i);
        var health_id = "#player" + id_num + " #health";
        $(health_id).text(active_players[i].health);
        var attack_id = "#player" + id_num + " #attack";
        $(attack_id).text(active_players[i].attack);
        var c_attack_id = "#player" + id_num + " #c_attack";
        $(c_attack_id).text(active_players[i].counter_attack);
        var img_link = "#player" + id_num + " img";
        $(img_link).attr("src",active_players[i].img_name);
    }
    attack_btn.attr("class", "btn btn-danger attack hide");
    enemy_text.attr("class", "col-md-6 enemy_header hide");
    message.text("Select a player from below and battle the others to win. Know that this a game of math and not strength or speed.")
}

player1.on("click",function(){
    // move_enemy("player1")
});

play_card.on("click",function(){
    if($(this).parent().attr("id") == "selection" && !enemy_selected) {
        move_enemy($(this).attr("id"));
        player_name = $(this).attr("value");
        player_header.text("Your Player");
        message.text("Select an enemy from below to fight against.");
    }
    else if($(this).parent().attr("id") == "enemy" && !enemy_selected) {
        $(this).appendTo(fight_area);
        enemy_selected = true;
        enemy_name = $(this).attr("value");
        enemy_text.attr("class", "col-md-6 enemy_header");
        attack_btn.attr("class", "btn btn-danger attack" )
        message.text("Use the Attack Button to attack the enemy, remember the will counter attack and your health will get lower by the amount of the attack.")
        attack_power = active_players[player_name].attack;
        counter_power = active_players[enemy_name].counter_attack;
        player_health = active_players[player_name].health;
        enemy_health = active_players[enemy_name].health;
    }
});
function move_enemy(player_info){
    var id_num = 0;
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
    };
}

attack_btn.on("click", function(){

    if (player_health > 0 && enemy_health > 0 && num_win < active_players.length-1){
    enemy_health = enemy_health - attack_power;
    player_health = player_health - counter_power;
    attack_power = attack_power*2;

    var player_current = $("#selection #health");
    var enemy_current = $("#fight #health")
    player_current.text(player_health);
    enemy_current.text(enemy_health)
    }
    

    if (player_health < 1){
        message.text("You Lose!, Please try again")
    }
    if (enemy_health < 1){
        message.text("You Win!, Select next enemy")
        var enemy_num = parseInt(enemy_name) + 1
        var dead_player = $("#player" + enemy_num);
        console.log(enemy_num)
        dead_player.attr("class", "card player_select off")
        enemy_selected = false;
        num_win++
    }

    if(num_win == active_players.length-1){
        message.text("YOU WIN THE GAME!!")
    }
});
