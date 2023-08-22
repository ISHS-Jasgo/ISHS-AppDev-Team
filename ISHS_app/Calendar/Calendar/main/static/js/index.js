import SimpleDate from "./SimpleDate.js"

var $currentPopover = null;
$(document).on('shown.bs.popover', function (ev) {
    var $target = $(ev.target);
    if ($currentPopover && ($currentPopover.get(0) != $target.get(0))) {
        $currentPopover.popover('toggle');
    }
    $currentPopover = $target;
}).on('hidden.bs.popover', function (ev) {
    var $target = $(ev.target);
    if ($currentPopover && ($currentPopover.get(0) == $target.get(0))) {
        $currentPopover = null;
    }
});

$.extend({
    quicktmpl: function (template) {
        return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+template.replace(/[\r\t\n]/g," ").split("{{").join("\t").replace(/((^|\}\})[^\t]*)'/g,"$1\r").replace(/\t:(.*?)\}\}/g,"',$1,'").split("\t").join("');").split("}}").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")
    }
});

$.extend(Date.prototype, {
    toDateCssClass:  function () { 
        return '_' + this.getFullYear() + '_' + (this.getMonth() + 1) + '_' + this.getDate(); 
    },
    toDateInt: function () { 
        return ((this.getFullYear()*12) + this.getMonth())*32 + this.getDate(); 
    },
    toTimeString: function() {
        var hours = this.getHours(),
            minutes = this.getMinutes(),
            hour = (hours > 12) ? (hours - 12) : hours,
            ampm = (hours >= 12) ? ' pm' : ' am';
        if (hours === 0 && minutes===0) {
            return '';
        }
        if (minutes > 0) {
            return hour + ':' + minutes + ampm;
        }
        return hour + ampm;
    }
});


(function ($) {
    const template_text = `{{ 
        var date = date || new Date(),
            month = date.getMonth(), 
            year = date.getFullYear(), 
            first = new Date(year, month, 1), 
            last = new Date(year, month + 1, 0),
            startingDay = first.getDay(), 
            thedate = new Date(year, month, 1 - startingDay),
            dayclass = lastmonthcss,
            today = new Date(),
            i, j; 
        if (mode === 'week') {
            thedate = new Date(date);
            thedate.setDate(date.getDate() - date.getDay());
            first = new Date(thedate);
            last = new Date(thedate);
            last.setDate(last.getDate()+6);
        } else if (mode === 'day') {
            thedate = new Date(date);
            first = new Date(thedate);
            last = new Date(thedate);
            last.setDate(thedate.getDate() + 1);
        }
        }}
        <table class="calendar-table table table-condensed table-tight">
            <thead>
                <tr>
                    <td colspan="7" style="text-align: center">
                        <table style="white-space: nowrap; width: 100%">
                            <tr>
                                <td style="text-align: left;">
                                    <span class="btn-group">
                                        <button class="js-cal-prev btn btn-default">&lt;</button>
                                        <button class="js-cal-next btn btn-default">&gt;</button>
                                    </span>
                                    <button class="js-cal-option btn btn-default {{: first.toDateInt() <= today.toDateInt() && today.toDateInt() <= last.toDateInt() ? 'active':'' }}" data-date="{{: today.toISOString()}}" data-mode="month">{{: todayname }}</button>
                                </td>
                                <td>
                                    <span class="btn-group btn-group-lg">
                                        {{ if (mode !== 'day') { }}
                                            {{ if (mode === 'month') { }}<button class="js-cal-option btn btn-link" data-mode="year">{{: months[month] }}</button>{{ } }}
                                            {{ if (mode ==='week') { }}
                                                <button class="btn btn-link disabled">{{: shortMonths[first.getMonth()] }} {{: first.getDate() }} - {{: shortMonths[last.getMonth()] }} {{: last.getDate() }}</button>
                                            {{ } }}
                                            <button class="js-cal-years btn btn-link">{{: year}}</button> 
                                        {{ } else { }}
                                            <button class="btn btn-link disabled">{{: date.toDateString() }}</button> 
                                        {{ } }}
                                    </span>
                                </td>
                                <td style="text-align: right">
                                    <span class="btn-group">
                                        <button class="js-cal-option btn btn-default {{: mode==='year'? 'active':'' }}" data-mode="year">Year</button>
                                        <button class="js-cal-option btn btn-default {{: mode==='month'? 'active':'' }}" data-mode="month">Month</button>
                                        <button class="js-cal-option btn btn-default {{: mode==='week'? 'active':'' }}" data-mode="week">Week</button>
                                        <button class="js-cal-option btn btn-default {{: mode==='day'? 'active':'' }}" data-mode="day">Day</button>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </thead>
            {{ if (mode ==='year') {
                month = 0;
            }}
            <tbody>
                {{ for (j = 0; j < 3; j++) { }}
                <tr>
                    {{ for (i = 0; i < 4; i++) { }}
                    <td class="calendar-month month-{{:month}} js-cal-option" data-date="{{: new Date(year, month, 1).toISOString() }}" data-mode="month">
                        {{: months[month] }}
                        {{ month++;}}
                    </td>
                    {{ } }}
                </tr>
                {{ } }}
            </tbody>
            {{ } }}
            {{ if (mode ==='month' || mode ==='week') { }}
            <thead>
                <tr class="c-weeks">
                    {{ for (i = 0; i < 7; i++) { }}
                        <th class="c-name">
                            {{: days[i] }}
                        </th>
                    {{ } }}
                </tr>
            </thead>
            <tbody>
                {{ for (j = 0; j < 6 && (j < 1 || mode === 'month'); j++) { }}
                <tr>
                    {{ for (i = 0; i < 7; i++) { }}
                    {{ if (thedate > last) { dayclass = nextmonthcss; } else if (thedate >= first) { dayclass = thismonthcss; } }}
                    <td class="calendar-day {{: dayclass }} {{: thedate.toDateCssClass() }} {{: date.toDateCssClass() === thedate.toDateCssClass() ? 'selected':'' }} {{: daycss[i] }} js-cal-option" data-date="{{: thedate.toISOString() }}">
                        <div class="date">{{: thedate.getDate() }}</div>
                        {{ thedate.setDate(thedate.getDate() + 1);}}
                    </td>
                    {{ } }}
                </tr>
                {{ } }}
            </tbody>
            {{ } }}
            {{ if (mode ==='day') { }}
            <tbody>
                <tr>
                    <td colspan="7">
                        <table class="table table-striped table-condensed table-tight-vert" >
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th style="text-align: center; width: 100%">{{: days[date.getDay()] }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th class="timetitle" >All Day</th>
                                    <td class="{{: date.toDateCssClass() }}">  </td>
                                </tr>
                                <tr>
                                    <th class="timetitle" >Before 6 AM</th>
                                    <td class="time-0-0"> </td>
                                </tr>
                                {{for (i = 6; i < 22; i++) { }}
                                <tr>
                                    <th class="timetitle" >{{: i <= 12 ? i : i - 12 }} {{: i < 12 ? "AM" : "PM"}}</th>
                                    <td class="time-{{: i}}-0"> </td>
                                </tr>
                                <tr>
                                    <th class="timetitle" >{{: i <= 12 ? i : i - 12 }}:30 {{: i < 12 ? "AM" : "PM"}}</th>
                                    <td class="time-{{: i}}-30"> </td>
                                </tr>
                                {{ } }}
                                <tr>
                                    <th class="timetitle" >After 10 PM</th>
                                    <td class="time-22-0"> </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            {{ } }} 
        </table>`
    var t = $.quicktmpl(template_text);

    function calendar($el, options) {
        $el.on('click', '.js-cal-prev', function () {
            switch(options.mode) {
            case 'year': options.date.setFullYear(options.date.getFullYear() - 1); break;
            case 'month': options.date.setMonth(options.date.getMonth() - 1); break;
            case 'week': options.date.setDate(options.date.getDate() - 7); break;
            case 'day':  options.date.setDate(options.date.getDate() - 1); break;
            }
            draw();
        }).on('click', '.js-cal-next', function () {
            switch(options.mode) {
            case 'year': options.date.setFullYear(options.date.getFullYear() + 1); break;
            case 'month': options.date.setMonth(options.date.getMonth() + 1); break;
            case 'week': options.date.setDate(options.date.getDate() + 7); break;
            case 'day':  options.date.setDate(options.date.getDate() + 1); break;
            }
            draw();
        }).on('click', '.js-cal-option', function () {
            var $t = $(this), o = $t.data();
            if (o.date) { o.date = new Date(o.date); }
            $.extend(options, o);
            draw();
        }).on('click', '.js-cal-years', function () {
            var $t = $(this), 
                haspop = $t.data('popover'),
                s = '', 
                y = options.date.getFullYear() - 2, 
                l = y + 5;
            if (haspop) {
                return true;
            }
            for (; y < l; y++) {
                s += '<button type="button" class="btn btn-default btn-lg btn-block js-cal-option" data-date="' + (new Date(y, 1, 1)).toISOString() + '" data-mode="year">'+y + '</button>';
            }
            $t.popover({content: s, html: true, placement: 'auto top'}).popover('toggle');
            return false;
        }).on('click', '.event', function () {
            var $t = $(this), 
                index = +($t.attr('data-index')), 
                haspop = $t.data('popover'),
                data, time;
            if (haspop || isNaN(index)) {
                return true;
            }
            data = options.data[index];
            time = data.start.toTimeString();
            if (time && data.end) {
                time = time + ' - ' + data.end.toTimeString();
            }
            $t.data('popover',true);
            $t.popover({content: '<p><strong>' + time + '</strong></p>'+data.text, html: true, placement: 'auto left'}).popover('toggle');
            return false;
        });

        function dayAddEvent(index, event) {
            if (!!(event.type == 'all-day')) {
                monthAddEvent(index, event);
                return;
            }
            var $event = $('<div/>', {'class': 'event', text: event.title, title: event.title, 'data-index': index}),
                start = event.start,
                end = event.end || start,
                time = event.start.toTimeString(),
                hour = start.getHours(),
                timeclass = '.time-22-0',
                startint = start.toDateInt(),
                dateint = options.date.toDateInt(),
                endint = end.toDateInt();
            if (startint > dateint || endint < dateint) {
                return;
            }
            if (!!time) {
                $event.html('<strong>' + time + '</strong> ' + $event.html());
            }
            $event.toggleClass('begin', startint === dateint);
            $event.toggleClass('end', endint === dateint);
            if (hour < 6) {
                timeclass = '.time-0-0';
            }
            if (hour < 22) {
                timeclass = '.time-' + hour + '-' + (start.getMinutes() < 30 ? '0' : '30');
            }
            $(timeclass).append($event);
        }

        function monthAddEvent(index, event) {
            var $event = $('<div/>', {'class': 'event', text: event.title, title: event.title, 'data-index': index}),
                e = new Date(event.start),
                dateclass = e.toDateCssClass(),
                day = $('.' + e.toDateCssClass()),
                empty = $('<div/>', {'class':'clear event', html:'&nbsp;'}), 
                numbevents = 0, 
                time = event.start.toTimeString(),
                endday = event.end && $('.' + event.end.toDateCssClass()).length > 0,
                checkanyway = new Date(e.getFullYear(), e.getMonth(), e.getDate()+40),
                existing,
                i;
            $event.toggleClass('league', !!(event.type == 'league'));
            $event.toggleClass('type1', !!(event.type == 'type1'));
            $event.toggleClass('type2', !!(event.type == 'type2'));
            $event.toggleClass('type3', !!(event.type == 'type3'));
            $event.toggleClass('all_type', !!(event.type == 'all_type'));
            if (!!time) {
                $event.html('<strong>' + time + '</strong> ' + $event.html());
            }
            if (!event.end) {
                $event.addClass('begin end');
                $('.' + event.start.toDateCssClass()).append($event);
                return;
            }
            while (e <= event.end && (day.length || endday || options.date < checkanyway)) {
                if(day.length) { 
                    existing = day.find('.event').length;
                    numbevents = Math.max(numbevents, existing);
                    for(i = 0; i < numbevents - existing; i++) {
                        day.append(empty.clone());
                    }
                    day.append(
                        $event.
                        toggleClass('begin', dateclass === event.start.toDateCssClass()).
                        toggleClass('end', dateclass === event.end.toDateCssClass())
                    );
                    $event = $event.clone();
                    $event.html('&nbsp;');
                }
                e.setDate(e.getDate() + 1);
                dateclass = e.toDateCssClass();
                day = $('.' + dateclass);
            }
        }

        function yearAddEvents(events, year) {
            var counts = [0,0,0,0,0,0,0,0,0,0,0,0];
            $.each(events, function (i, v) {
                if (v.start.getFullYear() === year) {
                    counts[v.start.getMonth()]++;
                }
            });
            $.each(counts, function (i, v) {
                if (v!==0) {
                    $('.month-'+i).append('<span class="badge">'+v+'</span>');
                }
            });
        }
      
        function draw() {
            $el.html(t(options));
            $('.' + (new Date()).toDateCssClass()).addClass('today');
            if (options.data && options.data.length) {
                if (options.mode === 'year') {
                    yearAddEvents(options.data, options.date.getFullYear());
                } else if (options.mode === 'month' || options.mode === 'week') {
                    $.each(options.data, monthAddEvent);
                } else {
                    $.each(options.data, dayAddEvent);
                }
            }
        }
        draw();    
    }
    
    ;(function (defaults, $, window, document) {
        $.extend({
            calendar: function (options) {
                return $.extend(defaults, options);
            }
        }).fn.extend({
            calendar: function (options) {
                options = $.extend({}, defaults, options);
                return $(this).each(function () {
                    var $this = $(this);
                    calendar($this, options);
                });
            }
        });
    })({
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        date: (new Date()),
            daycss: ["c-sunday", "", "", "", "", "", "c-saturday"],
            todayname: "Today",
            thismonthcss: "current",
            lastmonthcss: "outside",
            nextmonthcss: "outside",
        mode: "month",
        data: []
    }, jQuery, window, document);
      
})(jQuery);



var celdata = []
window.onload = () => {
    fetch("/calendar_data")
    .then(response => response.json())
    .then(data => {
        for(let d of data){
            let a1 = d[1].split(',')
            let a2 = d[2].split(',')
            for(let i = 0; i < 5; i++){
                a1[i] = parseInt(a1[i])
            }
            for(let i = 0; i < 5; i++){
                a2[i] = parseInt(a2[i])
            }
            let st = SimpleDate.SimpleDateYMDHM(a1[0], a1[1], a1[2], a1[3], a1[4])
            let du = new SimpleDate(a2[0], a2[1], a2[2], a2[3], a2[4])
            addEvent(d[0], st, du, d[3], d[4])
        }
        //Actually do everything
        $('#holder').calendar({
            data: celdata
        });
    });
}

// /**
//  * 
//  * @param {SimpleDate} start 
//  * @param {SimpleDate} duration 
//  * @param {String} type 
//  * @param {String} text 
//  */
function addEvent(name, start, duration, type, text) {
    let end = new Date(start.year + duration.year, start.month + duration.month, start.day + duration.day, start.hour + duration.hour, start.minute + duration.minute)
    celdata.push({
        title: name,
        start: start.toDate(),
        end: end,
        type: type,
        text: text
    })
}

function showEvent(type) {
    $(`div.event.${type}`).show()
}

function hideEvent(type) {
    $(`div.event.${type}`).hide()
}
//data must be sorted by start date



const check_league = document.getElementById("league")
const check_type1 = document.getElementById("type1")
const check_type2 = document.getElementById("type2")
const check_type3 = document.getElementById("type3")

check_league.addEventListener("change", function() {
    if (check_league.checked) {
        showEvent("league")
    } else {
        hideEvent("league")
    }
})

check_type1.addEventListener("change", function() {
    if (check_type1.checked) {
        showEvent("type1")
    } else {
        hideEvent("type1")
    }
})

check_type2.addEventListener("change", function() {
    if (check_type2.checked) {
        showEvent("type2")
    } else {
        hideEvent("type2")
    }
})

check_type3.addEventListener("change", function() {
    if (check_type3.checked) {
        showEvent("type3")
    } else {
        hideEvent("type3")
    }
})