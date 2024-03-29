$(document).ready(function(){
    var paldex = [];

    var getStats = function(name) {
        var stats = null;
        $.each(paldex, function(idx, data) {
            if (name == data['name']['jp'])
                stats = data['stats'];
        });
        return stats;
    }

    var getQueries = function() {
        if (location.search.length == 0 || location.search.length > 2100) {
            return null;
        }
        var queryhash = {};
        var queries = location.search.replace("?", "").split("&");
        $.each(queries, function(idx, value) {
            var ary = value.split("=");
            queryhash[ary[0]] = ary[1];
        })
        return queryhash;
    }

    var applyQueries = function() {
        var queries = getQueries();
        if (queries) {
            if (queries["name"]) {
                var t = decodeURIComponent(queries["name"]);
                var found = false;
                $.each(paldex, function(idx, value) {
                    if (value['name']['jp'] == t) {
                        found = true;
                    }
                })
                if (found) {
                    $('input[name="name"]').val(t);
                    $('#select-name').val(t);
                }
            }
            if (queries["lv"] && queries["lv"] > 0 && queries["lv"] <= 50) {
                $('input[name="lv"]').val(queries["lv"]);
            }
            if (queries["hp"] && queries["hp"] > 0 && queries["hp"] <= 15000) {
                $('input[name="hp"]').val(queries["hp"]);
            }
            if (queries["atk"] && queries["atk"] > 0 && queries["atk"] <= 1000) {
                $('input[name="atk"]').val(queries["atk"]);
            }
            if (queries["def"] && queries["def"] > 0 && queries["def"] <= 1000) {
                $('input[name="def"]').val(queries["def"]);
            }
            if (queries["con"] && queries["con"] >= 0 && queries["con"] <= 4) {
                $('input[name="condenser"]').val(queries["con"]);
            }
            if (queries["hp_soul"] && queries["hp_soul"] >= 0 && queries["hp_soul"] <= 30) {
                $('input[name="hp_soul"]').val(queries["hp_soul"]);
            }
            if (queries["atk_soul"] && queries["atk_soul"] >= 0 && queries["atk_soul"] <= 30) {
                $('input[name="atk_soul"]').val(queries["atk_soul"]);
            }
            if (queries["def_soul"] && queries["def_soul"] >= 0 && queries["def_soul"] <= 30) {
                $('input[name="def_soul"]').val(queries["def_soul"]);
            }
        }
    }

    var checkInputParams = function() {
        if (getStats($('input[name="name"]').val()) == null ||
            !$.isNumeric($('input[name="lv"]').val()) ||
            !$.isNumeric($('input[name="hp"]').val()) ||
            !$.isNumeric($('input[name="atk"]').val()) ||
            !$.isNumeric($('input[name="def"]').val()) ||
            !$.isNumeric($('input[name="condenser"]').val() ||
            !$.isNumeric($('input[name="hp_soul"]').val()) ||
            !$.isNumeric($('input[name="atk_soul"]').val()) ||
            !$.isNumeric($('input[name="def_soul"]').val()))
            ) {
            return false;
        }

        $('input[name="lv"]').val(
            $('input[name="lv"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="hp"]').val(
            $('input[name="hp"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="atk"]').val(
            $('input[name="atk"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="def"]').val(
            $('input[name="def"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="condenser"]').val(
            $('input[name="condenser"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="hp_soul"]').val(
            $('input[name="hp_soul"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="atk_soul"]').val(
            $('input[name="atk_soul"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="def_soul"]').val(
            $('input[name="def_soul"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        return true;
    }

    var getInputParams = function() {
        return {
            name: $('input[name="name"]').val(),
            level: +$('input[name="lv"]').val(),
            hp: +$('input[name="hp"]').val(),
            attack: +$('input[name="atk"]').val(),
            defense: +$('input[name="def"]').val(),
            condenser: +$('input[name="condenser"]').val(),
            hp_soul: +$('input[name="hp_soul"]').val(),
            attack_soul: +$('input[name="atk_soul"]').val(),
            defense_soul: +$('input[name="def_soul"]').val()
        }
    }

    var renderPotentialTable = function(potential) {
        var potentialtable = $("#potential");
		potentialtable.empty();

        var potential_iv = {hp:{min:0,mid:0,max:0}, atk:{min:0,mid:0,max:0}, def:{min:0,mid:0,max:0}};

        potential_iv.hp.min = potential.hp.min / 0.3 * 100;
        potential_iv.hp.max = potential.hp.max / 0.3 * 100;
        potential_iv.hp.mid = potential.hp.mid / 0.3 * 100;

        potential_iv.atk.min = potential.atk.min / 0.3 * 100;
        potential_iv.atk.max = potential.atk.max / 0.3 * 100;
        potential_iv.atk.mid = potential.atk.mid / 0.3 * 100;

        potential_iv.def.min = potential.def.min / 0.3 * 100;
        potential_iv.def.max = potential.def.max / 0.3 * 100;
        potential_iv.def.mid = potential.def.mid / 0.3 * 100;

        var header = $('<h2>このパルの個体値</h2>');
        var responsive = $('<div>');
        responsive.attr('class', 'table-responsive table-responsive-md');

		var table = $('<table class="table table-hover table-bordered"></table>');
		var thead = $('<thead><tr><th></th><th><div class="th-low">下限</div></th><th><div class="th-mid">中央</div></th><th><div class="th-high">上限</div></th></tr></thead>');
		var tbody = $("<tbody>");

        var row;
        var td;
        row = $('<tr>');
        td = $("<td>HP</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.hp.min * 100) / 100 + "％</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.hp.mid * 100) / 100 + "％</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.hp.max * 100) / 100 + "％</td>");
		row.append(td);
		row.append(td);
        tbody.append(row);

        row = $('<tr>');
        td = $("<td>攻撃</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.atk.min * 100) / 100 + "％</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.atk.mid * 100) / 100 + "％</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.atk.max * 100) / 100 + "％</td>");
		row.append(td);
		row.append(td);
        tbody.append(row);

        row = $('<tr>');
        td = $("<td>防御</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.def.min * 100) / 100 + "％</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.def.mid * 100) / 100 + "％</td>");
		row.append(td);
        td = $("<td>" + Math.round(potential_iv.def.max * 100) / 100 + "％</td>");
		row.append(td);
		row.append(td);
        tbody.append(row);

        var text = $('<div>');
        text.append('<p class="small fst-normal">入力値の小数点以下が丸められているので見かけ上の個体値は一意に定まらないことがほとんどです</p>');
        text.append('<p class="small fst-normal">レベルが上がると範囲が狭くなり特定しやすくなります</p>');

        table.append(thead);
		table.append(tbody);
		responsive.append(table);
        potentialtable.append(header);
        renderStackedBar(potentialtable, potential);
        potentialtable.append(responsive);
        potentialtable.append(text);
    }

    var renderTotalTable = function(input, total) {
        var totaltable = $("#total");
		totaltable.empty();

        var responsive = $('<div>');
        responsive.attr('class', 'table-responsive table-responsive-md');

		var table = $('<table class="table table-hover table-bordered"></table>');
		var thead = $('<thead><tr><th></th><th><div class="th-low">最小値</div></th><th><div class="th-mid">このパルの値</div></th><th><div class="th-high">最大値</div></th></tr></thead>');
		var tbody = $("<tbody>");
        var row;
        var td;
        row = $('<tr>');
        td = $("<td>HP</td>");
		row.append(td);
        td = $("<td>" + Math.round(total.hp.min * 100) / 100 + "</td>");
		row.append(td);
        td = $("<td>" + input.hp + "</td>");
		row.append(td);
        td = $("<td>" + Math.round(total.hp.max * 100) / 100 + "</td>");
		row.append(td);
		row.append(td);
        tbody.append(row);

        row = $('<tr>');
        td = $("<td>攻撃</td>");
		row.append(td);
        td = $("<td>" + Math.round(total.atk.min * 100) / 100 + "</td>");
		row.append(td);
        td = $("<td>" + input.attack + "</td>");
		row.append(td);
        td = $("<td>" + Math.round(total.atk.max * 100) / 100 + "</td>");
		row.append(td);
		row.append(td);
        tbody.append(row);

        row = $('<tr>');
        td = $("<td>防御</td>");
		row.append(td);
        td = $("<td>" + Math.round(total.def.min * 100) / 100 + "</td>");
		row.append(td);
        td = $("<td>" + input.defense + "</td>");
		row.append(td);
        td = $("<td>" + Math.round(total.def.max * 100) / 100 + "</td>");
		row.append(td);
		row.append(td);
        tbody.append(row);

        var header;
        if (input.condenser != 0) {
            header = $("<h3>レベル" + input.level + "の" + input.name + "(+" + input.condenser + ")" + "のステータスの範囲</h3>");
        } else {
            header = $("<h3>レベル" + input.level + "の" + input.name + "のステータスの範囲</h3>");
        }

        var text = $('<div>');
        text.append('<p class="small fst-normal">最小値・最大値は個体値がそれぞれ0%・100%の値になります</p>');

        table.append(thead);
		table.append(tbody);
        responsive.append(table);
        totaltable.append(header);
        totaltable.append(responsive);
        totaltable.append(text);
    }

    var renderCondenserCalcTable = function(condcalc) {
        var totaltable = $("#condenser_calculation");
		totaltable.empty();

        var responsive = $('<div>');
        responsive.attr('class', 'table-responsive table-responsive-md');

		var table = $('<table class="table table-hover table-bordered"></table>');
		var thead = $('<thead><tr><th>回数</th><th><div">HP</div></th><th><div>攻撃</div></th><th><div>防御</div></th></tr></thead>');
		var tbody = $("<tbody>");
        var row;
        var td;
        for(i=0;i<=4;i++){
            row = $('<tr>');
            td = $("<td>"+ i +"</td>");
            row.append(td);
            td = $("<td>" + condcalc[i].hp.mid + "</td>");
            row.append(td);
            td = $("<td>" + condcalc[i].atk.mid + "</td>");
            row.append(td);
            td = $("<td>" + condcalc[i].def.mid + "</td>");
            row.append(td);
            row.append(td);
            tbody.append(row);
        }

        var header;
        header = $("<h3>このパルの濃縮試算</h3>");

        table.append(thead);
		table.append(tbody);
        responsive.append(table);
        totaltable.append(header);
        totaltable.append(responsive);
    }

    var renderShareURI = function(input) {
        var uristring = location.origin + location.pathname + '?name=' + input.name + '&lv=' +
        input.level + '&hp=' + input.hp + '&atk=' + input.attack + '&def=' + input.defense;

        if (input.condenser != 0) {
            uristring += ('&con=' + input.condenser);
        }
        if (input.hp_soul != 0) {
            uristring += ('&hp_soul=' + input.hp_soul);
        }
        if (input.attack_soul != 0) {
            uristring += ('&atk_soul=' + input.attack_soul);
        }
        if (input.defense_soul != 0) {
            uristring += ('&def_soul=' + input.defense_soul);
        }
    
        var thisurl = $('<p class="small fst-normal">計算結果共有用リンク：<a href="' + encodeURI(uristring) + '">' + uristring + '</a></p>');

        var shareuri = $("#shareuri");
		shareuri.empty();
        shareuri.append($('<hr>'));
        shareuri.append(thisurl);
    }

    var renderStackedBar = function(potentialtable, potential) {
        var stackedbar = potentialtable;

        var potential_iv = {hp:{min:0,mid:0,max:0}, atk:{min:0,mid:0,max:0}, def:{min:0,mid:0,max:0}};

        potential_iv.hp.min = potential.hp.min / 0.3 * 100;
        potential_iv.hp.max = potential.hp.max / 0.3 * 100;
        potential_iv.hp.mid = potential.hp.mid / 0.3 * 100;
        potential_iv.atk.min = potential.atk.min / 0.3 * 100;
        potential_iv.atk.max = potential.atk.max / 0.3 * 100;
        potential_iv.atk.mid = potential.atk.mid / 0.3 * 100;
        potential_iv.def.min = potential.def.min / 0.3 * 100;
        potential_iv.def.max = potential.def.max / 0.3 * 100;
        potential_iv.def.mid = potential.def.mid / 0.3 * 100;

        var lower = potential_iv.hp.min;
        var mid = potential_iv.hp.max - potential_iv.hp.min;

        stackedbar.append('<div class="progress-stacked">'+
            '<div class="progress" role="progressbar" aria-valuenow="' + lower + '" aria-valuemin="0" aria-valuemax="100" style="width:' + lower + '%"><div class="progress-bar bg-success overflow-visible text-dark">HP ' + Math.round(potential_iv.hp.mid * 100) / 100 + '％</div></div>'+
            '<div class="progress" role="progressbar" aria-valuenow="' + mid + '" aria-valuemin="0" aria-valuemax="100" style="width:' + mid + '%"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success"></div></div></div>');

        lower = potential_iv.atk.min;
        mid = potential_iv.atk.max - potential_iv.atk.min;

        stackedbar.append('<div class="progress-stacked">'+
            '<div class="progress" aria-valuenow="' + lower + '" aria-valuemin="0" aria-valuemax="100" style="width:' + lower + '%"><div class="progress-bar bg-danger overflow-visible text-dark">攻撃 ' + Math.round(potential_iv.atk.mid * 100) / 100 + '％</div></div>'+
            '<div class="progress" aria-valuenow="' + mid + '" aria-valuemin="0" aria-valuemax="100" style="width:' + mid + '%"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger"></div></div></div>');

        lower = potential_iv.def.min;
        mid = potential_iv.def.max - potential_iv.def.min;

        stackedbar.append('<div class="progress-stacked">'+
            '<div class="progress" aria-valuenow="' + lower + '" aria-valuemin="0" aria-valuemax="100" style="width:' + lower + '%"><div class="progress-bar bg-warning overflow-visible text-dark">防御 ' + Math.round(potential_iv.def.mid * 100) / 100 + '％</div></div>'+
            '<div class="progress" aria-valuenow="' + mid + '" aria-valuemin="0" aria-valuemax="100" style="width:' + mid + '%"><div class="progress-bar progress-bar-striped progress-bar-animated bg-warning"></div></div></div>');
    }

    $('#calcIV').on('click', function() {
        var input = getInputParams();
        var name = input.name;
        var stats = getStats(name);

        var soul = {hp:input.hp_soul * 0.01, attack:input.attack_soul * 0.01, defense:input.defense_soul * 0.01};
        var condenser = {hp:input.condenser * 0.05, attack:input.condenser * 0.05, defense:input.condenser * 0.05};
        var multi = {hp:1,attack:1,defense:1};

        var total = {hp:{min:0,mid:0,max:0}, atk:{min:0,mid:0,max:0}, def:{min:0,mid:0,max:0}};
        var potential = {hp:{min:0,mid:0,max:0}, atk:{min:0,mid:0,max:0}, def:{min:0,mid:0,max:0}};

        total.hp.min = Math.floor(Math.floor(500 + 5 * input.level + stats.hp * 0.5 * input.level * (1 + 0)) * 1 * (1 + soul.hp) * (1 + condenser.hp));
        total.hp.mid = Math.floor(Math.floor(500 + 5 * input.level + stats.hp * 0.5 * input.level * (1 + 0.15)) * 1 * (1 + soul.hp) * (1 + condenser.hp));
        total.hp.max = Math.floor(Math.floor(500 + 5 * input.level + stats.hp * 0.5 * input.level * (1 + 0.3)) * 1 * (1 + soul.hp) * (1 + condenser.hp));

        total.atk.min = Math.floor(Math.floor(100 + stats.attack * 0.075 * input.level * (1 + 0)) * 1 * (1 + soul.attack) * (1 + condenser.attack));
        total.atk.mid = Math.floor(Math.floor(100 + stats.attack * 0.075 * input.level * (1 + 0.15)) * 1 * (1 + soul.attack) * (1 + condenser.attack));
        total.atk.max = Math.floor(Math.floor(100 + stats.attack * 0.075 * input.level * (1 + 0.3)) * 1 * (1 + soul.attack) * (1 + condenser.attack));

        total.def.min = Math.floor(Math.floor(50 + stats.defense * 0.075 * input.level * (1 + 0)) * 1 * (1 + soul.defense) * (1 + condenser.defense));
        total.def.mid = Math.floor(Math.floor(50 + stats.defense * 0.075 * input.level * (1 + 0.15)) * 1 * (1 + soul.defense) * (1 + condenser.defense));
        total.def.max = Math.floor(Math.floor(50 + stats.defense * 0.075 * input.level * (1 + 0.3)) * 1 * (1 + soul.defense) * (1 + condenser.defense));

        potential.hp.min = math.median(0, Math.ceil(input.hp / (1 + soul.hp) / (1 + condenser.hp) / multi.hp - 500 - 5 * input.level) / stats.hp / 0.5 / input.level - 1, 0.3);
        potential.hp.max = math.median(0, Math.floor((input.hp + 1) / (1 + soul.hp) / (1 + condenser.hp) / multi.hp - 500 - 5 * input.level + 1) / stats.hp / 0.5 / input.level - 1, 0.3);
        potential.hp.mid = (potential.hp.min + potential.hp.max) / 2;

        potential.atk.min = math.median(0, Math.ceil(input.attack / (1 + soul.attack) / (1 + condenser.attack) / multi.attack - 100) / stats.attack / 0.075 / input.level - 1, 0.3);
        potential.atk.max = math.median(0, Math.floor((input.attack + 1) / (1 + soul.attack) / (1 + condenser.attack) / multi.attack - 100 + 1) / stats.attack / 0.075 / input.level - 1, 0.3);
        potential.atk.mid = (potential.atk.min + potential.atk.max) / 2;

        potential.def.min = math.median(0, Math.ceil(input.defense / (1 + soul.defense) / (1 + condenser.defense) / multi.defense - 50) / stats.defense / 0.075 / input.level - 1, 0.3);
        potential.def.max = math.median(0, Math.floor((input.defense + 1) / (1 + soul.defense) / (1 + condenser.defense) / multi.defense - 50 + 1) / stats.defense / 0.075 / input.level - 1, 0.3);
        potential.def.mid = (potential.def.min + potential.def.max) / 2;

        var condcalc = [];

        for (i = 0; i <= 4; i++) {
            var trial = {hp:{min:0,mid:0,max:0}, atk:{min:0,mid:0,max:0}, def:{min:0,mid:0,max:0}};
            var cond = {hp: i * 0.05, attack: i * 0.05, defense: i * 0.05};

            trial.hp.min = Math.floor(Math.floor(500 + 5 * input.level + stats.hp * 0.5 * input.level * (1 + 0)) * 1 * (1 + soul.hp) * (1 + cond.hp));
            trial.hp.mid = Math.floor(Math.floor(500 + 5 * input.level + stats.hp * 0.5 * input.level * (1 + potential.hp.mid)) * 1 * (1 + soul.hp) * (1 + cond.hp));
            trial.hp.max = Math.floor(Math.floor(500 + 5 * input.level + stats.hp * 0.5 * input.level * (1 + 0.3)) * 1 * (1 + soul.hp) * (1 + cond.hp));
    
            trial.atk.min = Math.floor(Math.floor(100 + stats.attack * 0.075 * input.level * (1 + 0)) * 1 * (1 + soul.attack) * (1 + cond.attack));
            trial.atk.mid = Math.floor(Math.floor(100 + stats.attack * 0.075 * input.level * (1 + potential.atk.mid)) * 1 * (1 + soul.attack) * (1 + cond.attack));
            trial.atk.max = Math.floor(Math.floor(100 + stats.attack * 0.075 * input.level * (1 + 0.3)) * 1 * (1 + soul.attack) * (1 + cond.attack));
    
            trial.def.min = Math.floor(Math.floor(50 + stats.defense * 0.075 * input.level * (1 + 0)) * 1 * (1 + soul.defense) * (1 + cond.defense));
            trial.def.mid = Math.floor(Math.floor(50 + stats.defense * 0.075 * input.level * (1 + potential.def.mid)) * 1 * (1 + soul.defense) * (1 + cond.defense));
            trial.def.max = Math.floor(Math.floor(50 + stats.defense * 0.075 * input.level * (1 + 0.3)) * 1 * (1 + soul.defense) * (1 + cond.defense));

            condcalc.push(trial);
        }

        renderPotentialTable(potential);
        renderTotalTable(input, total);
        renderShareURI(input);
        renderCondenserCalcTable(condcalc);
    })

    $('input[name="lv"]').change(function() {
        if($(this).val() < 0){
            $('input[name="lv"]').val(0);
        }else if ($(this).val() > 50){
            $('input[name="lv"]').val(50);
        }
    })

    $('input[name="hp"]').change(function() {
        if($(this).val() < 0){
            $('input[name="hp"]').val(0);
        }
    })

    $('input[name="atk"]').change(function() {
        if($(this).val() < 0){
            $('input[name="atk"]').val(0);
        }
    })

    $('input[name="def"]').change(function() {
        if($(this).val() < 0){
            $('input[name="def"]').val(0);
        }
    })

    $('input[name="condenser"]').change(function() {
        if($(this).val() < 0){
            $('input[name="condenser"]').val(0);
        }else if ($(this).val() > 4){
            $('input[name="condenser"]').val(4);
        }
    })

    $('input[name="hp_soul"]').change(function() {
        if($(this).val() < 0){
            $('input[name="hp_soul"]').val(0);
        }else if ($(this).val() > 30){
            $('input[name="hp_soul"]').val(30);
        }
    })

    $('input[name="atk_soul"]').change(function() {
        if($(this).val() < 0){
            $('input[name="atk_soul"]').val(0);
        }else if ($(this).val() > 30){
            $('input[name="atk_soul"]').val(30);
        }
    })

    $('input[name="def_soul"]').change(function() {
        if($(this).val() < 0){
            $('input[name="def_soul"]').val(0);
        }else if ($(this).val() > 30){
            $('input[name="def_soul"]').val(30);
        }
    })

    $('#select-name').change(function() {
        $('input[name="name"]').val($(this).val());
    })

    $('input[name="name"]').change(function() {
        $('#select-name').val($(this).val());
    })

    $('#name').autocomplete( {
        source: function(request, response) {
            var names = [];
            var termed = new RegExp('^(' + request.term + ')');
            $.each(paldex, function(idx, data) {
                if (data['name']['jp'].match(termed) || data['name']['hira'].match(termed) ||
                        data['name']['en'].match(termed) || data['name']['en'].toLowerCase().match(termed)) {
                    names.push(data['name']['jp']);
                }
            });
            response(names);
        },
        autoFocus: true,
        delay: 250,
        minLength: 1
    });

    var init = function(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'js/pal.json', true);
        xhr.send(null);
        xhr.onload = function() {
            //console.log(xhr.statusText);
            if (xhr.readyState === 4 && xhr.status === 200){
                paldex = JSON.parse(xhr.responseText);
                var selectName = $('#select-name');
                selectName.empty();
                selectName.hide();
                $.each(paldex, function(idx, value) {
                    var name = value['name']['jp'];
                    selectName.append($("<option>").val(name).text(name));
                })
                //selectName.show(0);

                if(getQueries()) {
                    applyQueries();
                    if(checkInputParams()){
                        $('#calcIV').click();
                    }
                }
            }
        }
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        }
    }

    init();
})