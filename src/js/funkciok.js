export function funkciok() {
    const calcOsszmunka = (employeeID) => {
        let workingHourSumm = 0;
        let workingHousesInMin = 0;
        for (const date in workingHouses[employeeID]) {
            if (workingHouses[employeeID][date]['ido']) {
                workingHousesInMin += getTimeInMins(workingHouses[employeeID][date]['ido'].toString());
                console.log(workingHousesInMin);

            }
            // workingHourSumm += workingHouses[employeeID][date].ido;
        }

        workingHourSumm = formatTime(workingHousesInMin);
        employees.find(x => x.id === employeeID)['osszMunka'] = workingHourSumm;
        // let row = document.querySelector(`#employee_${employeeID}`);
        document.querySelector(`#employee_${employeeID}`).
            // row.
            querySelector("#osszesMunkaido").innerHTML = workingHourSumm;
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
}
