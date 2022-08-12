
# OL Munkaidő próbafeladat

Egy egyszerű Munkaidő számoló táblázat.


funciókról egyszerűen:

renderTable:

    Fő funkció, amely megjelníti a táblázatot.
    Generál egy table elemet, majd azt feltölti th,tr és td elemekkel
    általában loopok segítségével de, de van hogy hardcodeolt adatot visz fel.
    Nem vár semmilyen paramétert.
    Használja az #

# OL Munkaidő próbafeladat

Egy egyszerű Munkaidő számoló táblázat.


funciókról egyszerűen:

renderTable:

    Fő funkció, amely megjelníti a táblázatot.
    Generál egy table elemet, majd azt feltölti th,tr és td elemekkel
    általában loopok segítségével de, de van hogy hardcodeolt adatot visz fel.
    Nem vár semmilyen paramétert.
    Használja az addTableElement calcDaysOfTheWeek funkciót.


addTableElement: 

    kisegítő funkciót amit azért csináltam, hogy kevesebb document.createElement sort kelljen használni.
    több paraméter vár, melyik közül a type, a place és a text kötelező
    a type az element típusát határozza meg (td,tr,th etc.),
    a place a szülő elem , amely ahhoz szükséges , hogy tudjuk hova kell generálni az elemet,
    a text pedig az elemben megjelenő szöveg ha van

 calcDaysOfTheWeek:

    funkció, mellyel x számú napot hozunk létre a workingHours változóba, hogy később könnyebben tudjuk tárolni a
    ledolgozott munkaórákat.
    itt a numberOfDays paraméter mondja meg, hogy a következő hány napot szeretnénk megjeleníteni.

calcMunkaido: 

    a táblázatba bevitt idő alapján kiszámoljuk az eltelt órát

calcEmployeeAge: 

    kiszámolja egy dolgozó életkorát a mai nap és a születésnapja alapján.


changeTime: 

    mikor kitöltünk egy mezőt ez a funkció fut le megváltoztatva a workingHours tábla adott munkás adott napjára vonatkozó "kezd" vagy "veg" értéket
    attól függően,hogy melyiket vittük fel.
    ha mindkettő mező ki van töltve, lefuttatja a calcMunkaido funkciót, amely visszadja az elvégezz órákat, melyet megjelnítünk a "ido" elemben.
    majd megvizsgáljuk,hogy az adott munkás kiskoru-e és hogy az adott nap hétvége-e ha igen lefut a calcHetvegiPotlek funkció.

    ettől függetlenül lefut calcOsszmunka.


calcHetvegiPotlek: 

    végig megyünk a workingHours adott munkásra eső sorain, és megvizsgáljuk,hogy dolgozott e hétvégén, ha igen hozzáadjuk a pótlékhoz.


calcOsszmunka: 

    hasonlóan a calcHetvegiPotlek-hoz itt is végigmegyünk a munkanapokon, de itt mindegy egyes nem nullával rendelkező eredményt hozzáadunk a teljes mumkaidőhöz.


getTimeInMins: 

    feldarabolja az adott időt majd átváltjuk percbe a könnyebben kezelhetőség érdekében

 formatTime: 

    általában a getTimeInMins-tól visszakpott percet váltjuk át óó:pp formátumú idővé.

todo: 
    -css
    -tesztek
    -funciók szeparálása

