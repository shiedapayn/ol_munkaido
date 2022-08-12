const employees = [
    {id: 101, name: 'Kis Bela', bithDate: '1977.03.12.', osszMunka: '', hetvegiPotlek: ''},
    {id: 102, name: 'Nagy Sandor', bithDate: '1983.05.19.', osszMunka: '', hetvegiPotlek: ''},
    {id: 103, name: 'Farkas Bela', bithDate: '2005.11.02.', osszMunka: '', hetvegiPotlek: ''},
    {id: 104, name: 'Virag Hajnalka', bithDate: '1998.06.04.', osszMunka: '', hetvegiPotlek: ''},
    {id: 105, name: 'Piros Ilona', bithDate: '2004.02.10.', osszMunka: '', hetvegiPotlek: ''},
    {id: 106, name: 'Geza ', bithDate: '2010.07.22.', osszMunka: '', hetvegiPotlek: ''},
];

const tableRows = [
    {
        text: 'ID',
        value: 'id',
    },
    {
        text: 'Nev',
        value: 'name',
        class: 'text-center minWidth200'
    },
    {
        text: 'Osszes munkaido',
        value: 'osszMunkaido',
    },
    {
        text: 'Hetvegi potlek',
        value: 'hetvegiPotlek'
    },

];

let napok = {};

let workingHours = {};

const dayOfTheWeek = [
    {name: 'Vasarnap', short: 'V'},
    {name: 'Hetfo', short: 'H'},
    {name: 'Kedd', short: 'K'},
    {name: 'Szerda', short: 'Szs'},
    {name: 'Csutortok', short: 'Cs'},
    {name: 'Pentek', short: 'P'},
    {name: 'Szombat', short: 'Sz'},
];

const renderTable = () => {
    let munkaidoTabla = document.createElement('table');
    munkaidoTabla.id = 'munkaidoTabla';
    document.getElementById('root').appendChild(munkaidoTabla);

    const tr_fejlec = addTableElement('tr', munkaidoTabla, '');
    tr_fejlec.classList.add('fejlec');
    // const munkaidoTabla = document.getElementById('munkaidoTabla');
    tableRows.map((tableRow) => {
        let elem = addTableElement('th', tr_fejlec, tableRow.text)
        if (tableRow.value !== 'id') {
            elem.classList.add('text-center', 'minWidth200');

        }
    })

    calcDaysOfTheWeek(tr_fejlec);

    employees.map((employee) => {
        let tr_munkas = document.createElement('tr');
        tr_munkas.id = `employee_${employee.id}`;
        tr_munkas.classList.add('munkasSor');
        addTableElement('td', tr_munkas, employee.id);
        addTableElement('td', tr_munkas, employee.name).classList.add('minWidth300');

        munkaidoTabla.appendChild(tr_munkas);

        const extraFields = [
            {name: 'Osszes munkaido', short: 'osszesMunkaido', value: 0},
            {name: 'hetvegi potlek', short: 'hetvegiPotlek', value: 0},
        ];

        extraFields.map(extraField => {
            addTableElement('td', tr_munkas, Math.floor(extraField.value / 60), {}, extraField.short);
        });
        // let blockId = `${employee.id}_${dayOfTheWeek[getNthDay(i).getDay()].short}`;
        // td.id = blockId;


        for (const key in workingHours[employee.id]) {
            let td = document.createElement('td');
            td.id = key;
            td.classList.add('inputContainer');
            let kezdInput = document.createElement('input');
            kezdInput.name = "kezdInput";
            let vegInput = document.createElement('input');
            vegInput.name = "vegInput";
            let idoSpan = document.createElement('span');
            idoSpan.innerHTML = "00:00"

            kezdInput.type = vegInput.type = "time";
            kezdInput.onchange = vegInput.onchange = (e) => changeTime(e, key, document.getElementById(key), employee.id, {
                kezdInput,
                vegInput,
                idoSpan,
                isWeekend: workingHours[employee.id][key]['isWeekend']
            });

            td.appendChild(kezdInput);
            td.appendChild(vegInput);
            td.appendChild(idoSpan);
            tr_munkas.appendChild(td);
        }
    });
}

const addTableElement = (type, place, text, options = {}, id = null) => {
    let element = document.createElement(type, options);
    if (id) {
        element.id = id;
    }
    element.innerHTML = text;
    place.appendChild(element);

    return element;
}

const calcDaysOfTheWeek = (place, numberOfDays = 7) => {
    for (let i = 0; i < numberOfDays; i++) {
        let currentDate = new Date();
        let th = document.createElement('th', {});
        currentDate.setDate(currentDate.getDate() + i);
        napok[currentDate.getDate()] = {
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
            dayName: dayOfTheWeek[currentDate.getDay()].short,
        };

        let isWeekend = ['Sz', 'V'].includes(dayOfTheWeek[currentDate.getDay()].short);
        employees.map(employee => {
            workingHours[employee.id] = workingHours[employee.id] ?? {};
            workingHours[employee.id][currentDate.getDate().toString()] = workingHours[employee.id][currentDate.getDate()] ?? {};
            workingHours[employee.id][currentDate.getDate().toString()] = {
                kezd: 0,
                veg: 0,
                ido: 0,
                isWeekend: isWeekend,
            };
        });
        th.id = dayOfTheWeek[currentDate.getDay()].short;
        th.innerHTML = `${currentDate.getMonth() + 1}.${currentDate.getDate()}. ${dayOfTheWeek[currentDate.getDay()].short}`;

        let thContainer = document.createElement('td');
        thContainer.classList.add('grid')
        th.appendChild(thContainer);
        // tableRows.find(x => x.dates).dates.map((data) => {
        addTableElement('span', thContainer, 'kezd', {});
        addTableElement('span', thContainer, 'veg', {});
        addTableElement('span', thContainer, 'ido', {});
        // })
        if (isWeekend) {
            th.classList.add("weekend");
        }
        place.appendChild(th);

    }
}

const getNthDay = (i) => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate;
}

const calcMunkaido = (id = 0, kezd = '0:00', veg = '7:00') => {

    let timeStartHours = new Date("01/01/2007 " + kezd).getHours();
    let timeEndHours = new Date("01/01/2007 " + veg).getHours();

    let timeStartMinutes = new Date("01/01/2007 " + kezd).getMinutes();
    let timeEndMinutes = new Date("01/01/2007 " + veg).getMinutes();

    let hourDiffInMinutes = (timeStartHours < timeEndHours ? (timeEndHours - timeStartHours) : (timeEndHours - timeStartHours) + 24) * 60;
    let minutesDiff = (timeEndMinutes - timeStartMinutes);

    let hourDiff = Math.floor((hourDiffInMinutes + minutesDiff) / 60);
    minutesDiff = (hourDiffInMinutes + minutesDiff) % 60;

    return hourDiff + ":" + minutesDiff;
}

const calcEmployeeAge = (id) => {
    let today = new Date();

    let employee = employees.find(x => x.id === id);
    let birthDate = new Date(employee.bithDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

renderTable();

const changeTime = (e, day, block, employeeID, {kezdInput, vegInput, idoSpan, isWeekend}) => {
    workingHours[employeeID][day]['kezd'] = kezdInput.value;
    workingHours[employeeID][day]['veg'] = vegInput.value;
    let allFilled = !!(kezdInput.value && vegInput.value);
    let row = document.querySelector(`#employee_${employeeID}`);

    if (allFilled) {
        let ido = calcMunkaido(0, kezdInput.value, vegInput.value);
        workingHours[employeeID][day]['ido'] = ido;
        idoSpan.innerHTML = formatTime(getTimeInMins(ido));
        if (isWeekend && calcEmployeeAge(employeeID) < 18) {
            calcHetvegiPotlek(employeeID, ido, row);
        }
        calcOsszmunka(employeeID, row)
    }
}

const calcHetvegiPotlek = (employeeID, ido, row) => {
    let hetvegiPotlekMin = 0;
    for (const date in workingHours[employeeID]) {
        let workingHour = workingHours[employeeID][date];
        if (workingHour['ido'] && workingHour['isWeekend']) {
            hetvegiPotlekMin += getTimeInMins(workingHour['ido'].toString()) / 2;
        }
    }
    let hetvegiPotlek = formatTime(hetvegiPotlekMin);

    console.log(hetvegiPotlek);
    employees.find(employee => employee.id === employeeID).hetvegiPotlek = hetvegiPotlek;
    row.querySelector("#hetvegiPotlek").innerHTML = hetvegiPotlek;

}

const calcOsszmunka = (employeeID, row) => {
    let workingHoursInMin = 0;
    for (const date in workingHours[employeeID]) {
        if (workingHours[employeeID][date]['ido']) {
            workingHoursInMin += getTimeInMins(workingHours[employeeID][date]['ido'].toString());
        }
    }
    let workingHourSumm = formatTime(workingHoursInMin);
    employees.find(x => x.id === employeeID)['osszMunka'] = workingHourSumm;
    // let row = document.querySelector(`#employee_${employeeID}`);     // row.
    row.querySelector("#osszesMunkaido").innerHTML = workingHourSumm;
}

const getTimeInMins = (time) => {
    let separetedTime = time.split(':')
    return (parseInt(separetedTime[0]) * 60) + parseInt(separetedTime[1]);

}

const formatTime = (time) => {
    let hours = Math.floor(time / 60);
    let mins = time % 60;
    return `${hours > 9 ? hours : `0${hours}`}:${mins > 9 ? mins : `0${mins}`}`;
}