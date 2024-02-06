$(document).ready(function(){
    var paldex = [];

    var getStats = function(name) {
        var stats = null;
        $.each(paldex, function(idx, data) {
            if (name == data['name'])
                stats = data['stats'];
        });
        return stats;
    }

    var checkInputParams = function() {
        if (getStats($('input[name="name"]').val()) == null ||
            !$.isNumeric($('input[name="lv"]').val()) ||
            !$.isNumeric($('input[name="hp"]').val()) ||
            !$.isNumeric($('input[name="atk"]').val()) ||
            !$.isNumeric($('input[name="def"]').val())) {
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
        $('input[name="condener"]').val(
            $('input[name="condener"]').val().replace(/[０-９]/g,function(s){
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
        console.log('potential_iv.hp.min:' + potential_iv.hp.min + ' potential_iv.hp.max:' + potential_iv.hp.max);

        potential_iv.atk.min = potential.atk.min / 0.3 * 100;
        potential_iv.atk.max = potential.atk.max / 0.3 * 100;
        potential_iv.atk.mid = potential.atk.mid / 0.3 * 100;
        console.log('potential_iv.atk.min:' + potential_iv.atk.min + ' potential_iv.atk.max:' + potential_iv.atk.max);

        potential_iv.def.min = potential.def.min / 0.3 * 100;
        potential_iv.def.max = potential.def.max / 0.3 * 100;
        potential_iv.def.mid = potential.def.mid / 0.3 * 100;
        console.log('potential_iv.def.min:' + potential_iv.def.min + ' potential_iv.def.max:' + potential_iv.def.max);

        var header = $('<h2>個体値の範囲</h2>');
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
        text.append('<p class="small text-right text-muted">入力値の小数点以下が丸められているので個体値は一意に定まらないことがほとんどです</p>');
        text.append('<p class="small text-right text-muted">レベルが上がると範囲が狭くなり特定しやすくなります</p>');

        table.append(thead);
		table.append(tbody);
		responsive.append(table);
        potentialtable.append(header);
        potentialtable.append(responsive);
        potentialtable.append(text);
    }

    var renderTotalTable = function(input, total) {
        var totaltable = $("#total");
		totaltable.empty();

        var responsive = $('<div>');
        responsive.attr('class', 'table-responsive table-responsive-md');

		var table = $('<table class="table table-hover table-bordered"></table>');
		var thead = $('<thead><tr><th></th><th><div class="th-low">最小値</div></th><th><div class="th-mid">この個体の値</div></th><th><div class="th-high">最大値</div></th></tr></thead>');
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
            header = $("<h2>レベル" + input.level + "の" + input.name + "(+" + input.condenser + ")" + "のステータスの範囲</h2>");
        } else {
            header = $("<h2>レベル" + input.level + "の" + input.name + "のステータスの範囲</h2>");
        }

        var text = $('<div>');
        text.append('<p class="small text-right text-muted">最小値・最大値は個体値がそれぞれ0%・100%の値になります</p>');

        table.append(thead);
		table.append(tbody);
        responsive.append(table);
        totaltable.append(header);
        totaltable.append(responsive);
        totaltable.append(text);
    }

    $('#calcIV').on('click', function() {
        var input = getInputParams();
        var name = input.name;
        var stats = getStats(name);

        var soul = {hp:0,attack:0,defense:0};
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

        renderPotentialTable(potential);
        renderTotalTable(input, total);
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
                if (data['name'].match(termed)) {
                    names.push(data['name']);
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
                    var name = value['name'];
                    selectName.append($("<option>").val(name).text(name));
                })
                //selectName.show(0);
            }
        }
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        }
    }

    init();
})