
var p1 = {
    name: "Eleven",
    health: 200,
    attack: 3,
    counter_attack: 3,
    img_name:"assets/images/Eleven.jpg"
}

var p2 = {
    name: "Demodogs",
    health: 80,
    attack: 1,
    counter_attack: 1,
    img_name:"assets/images/Demodogs.jpg"
}

var p3 = {
    name: "Demogorgon",
    health: 5000,
    attack: 20,
    counter_attack: 20,
    img_name:"assets/images/Demogorgon.jpg"
}

var p4 = {
    name: "Hopper",
    health: 50,
    attack: 2,
    counter_attack: 2,
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
var attack_num = 0;

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
        var c_player = "#player" + id_num 
        $(c_player).attr("value", i);
        var health_id = "#player" + id_num + " #health";
        $(health_id).text(active_players[i].health);
        // var attack_id = "#player" + id_num + " #attack";
        // $(attack_id).text(active_players[i].attack);
        // var c_attack_id = "#player" + id_num + " #c_attack";
        // $(c_attack_id).text(active_players[i].counter_attack);
        var img_link = "#player" + id_num + " img";
        $(img_link).attr("src",active_players[i].img_name);
    }
    attack_btn.attr("class", "btn btn-danger btn-lg attack hide");
    enemy_text.attr("class", "col-md-6 enemy_header text-light hide");
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
        enemy_text.attr("class", "col-md-6 enemy_header text-light");
        attack_btn.attr("class", "btn btn-danger btn-lg attack" )
        message.text("Use the Attack Button to attack the enemy, remember the will counter attack and your health will get lower by the amount of the attack.")
        counter_power = active_players[enemy_name].counter_attack;
        player_health = active_players[player_name].health;
        enemy_health = active_players[enemy_name].health;
        if (attack_power == 0){
        attack_power = active_players[player_name].attack;
        }
    }
});
function move_enemy(player_info){
    var id_num = 0;
    for(var i = 0; i < active_players.length; i++){
        id_num = i + 1;

        if($("#player" + id_num).attr("id") == player_info){
            $("#player" + id_num).parent().attr("class", "players card-group col-md-6")
        }
        else{
            enemy_area.append($("#player" + id_num));
            $("#player" + id_num).addClass("border-danger");
        }
    };
}

attack_btn.on("click", function(){
    console.log(player_health);
    console.log(enemy_health);
    console.log(attack_power);

    if (player_health > 0 && enemy_health > 0 && num_win < active_players.length-1){
    enemy_health = enemy_health - attack_power;
    player_health = player_health - counter_power;
    attack_power = attack_power * 2;

    var player_current = $("#selection #health");
    var enemy_current = $("#fight #health")
    player_current.text(player_health);
    enemy_current.text(enemy_health);
    }
    

    if (player_health < 1 && enemy_selected){
        message.text("You Lose!, Please try again")
    }
    if (enemy_health < 1 && enemy_selected){
        message.text("You Win!, Select next enemy")
        var enemy_num = parseInt(enemy_name) + 1
        var dead_player = $("#player" + enemy_num);
        dead_player.attr("class", "card player_select off")
        enemy_selected = false;
        num_win++
    }

    if(num_win == active_players.length-1){
        message.text("YOU WIN THE GAME!!")
    }
});
