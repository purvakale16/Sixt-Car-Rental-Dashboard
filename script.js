/*ANNOUNCEMENT CLOSE*/

const closeAnnouncement =
    document.getElementById("closeAnnouncement");

const announcement =
    document.querySelector(".announcement");


if (closeAnnouncement) {

    closeAnnouncement.addEventListener("click", function () {

        announcement.style.display = "none";

    });

}



/*CATEGORY*/

const categories =
    document.querySelectorAll(".category");


categories.forEach(function (category) {

    category.addEventListener("click", function () {

        categories.forEach(function (item) {

            item.classList.remove("active");

        });

        category.classList.add("active");

    });

});



/*DIFFERENT LOCATION*/

const differentLocation =
    document.getElementById("differentLocation");


let differentReturn = false;


if (differentLocation) {

    differentLocation.addEventListener("click", function () {

        differentReturn = !differentReturn;


        if (differentReturn) {

            differentLocation.innerHTML =
                '<i class="fa-solid fa-check"></i> ' +
                'Different return location';

        } else {

            differentLocation.innerHTML =
                '<i class="fa-solid fa-plus"></i> ' +
                'Different return location';

        }

    });

}



/*DRIVER AGE*/

const driverAge =
    document.getElementById("driverAge");


if (driverAge) {

    driverAge.addEventListener("click", function () {

        const age =
            prompt(
                "Enter driver's age:",
                "30"
            );


        if (age === null) {
            return;
        }


        if (age === "" || isNaN(age)) {

            alert(
                "Please enter a valid age."
            );

            return;
        }


        if (age < 18) {

            alert(
                "Driver must be at least 18 years old."
            );

            return;
        }


        driverAge.innerHTML =
            '<i class="fa-solid fa-user"></i> ' +
            "Driver's age " +
            age +
            "+ " +
            '<i class="fa-solid fa-chevron-down"></i>';

    });

}



/*DATE ELEMENTS*/

const pickupDate =
    document.getElementById("pickupDate");

const returnDate =
    document.getElementById("returnDate");



/*DATE HELPERS*/

function startOfDay(date) {

    const result =
        new Date(date);

    result.setHours(0, 0, 0, 0);

    return result;

}



function formatInputDate(date) {

    const month =
        date.toLocaleString(
            "en-US",
            {
                month: "short"
            }
        );

    const day =
        date.getDate();

    return month + " " + day;

}



function dateToKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}



function keyToDate(value) {

    if (!value) {
        return null;
    }

    const parts =
        value.split("-");

    if (parts.length !== 3) {
        return null;
    }

    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

}



function formatDate(dateString) {

    const date =
        keyToDate(dateString);

    if (!date) {
        return "";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}



/*TODAY*/

const today =
    startOfDay(new Date());



/*CUSTOM CALENDAR CSS*/

const calendarStyle =
    document.createElement("style");


calendarStyle.textContent = `

    .custom-calendar {
        position: absolute;
        z-index: 9999;
        width: 375px;
        background: #ffffff;
        border-radius: 20px;
        padding: 20px 18px 18px;
        box-shadow:
            0 12px 40px rgba(0,0,0,0.20);
        font-family: Arial, Helvetica, sans-serif;
        color: #111;
        display: none;
    }

    .custom-calendar.show {
        display: block;
    }

    .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
    }

    .calendar-title {
        font-size: 22px;
        font-weight: 800;
        text-align: center;
    }

    .calendar-arrow {
        width: 42px;
        height: 42px;
        border: none;
        border-radius: 50%;
        background: #f1f1f1;
        color: #111;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .calendar-arrow:hover {
        background: #e5e5e5;
    }

    .calendar-weekdays {
        display: grid;
        grid-template-columns:
            repeat(7, 1fr);
        margin-bottom: 10px;
    }

    .calendar-weekday {
        text-align: center;
        color: #777;
        font-size: 13px;
        font-weight: 700;
        padding: 5px 0;
    }

    .calendar-days {
        display: grid;
        grid-template-columns:
            repeat(7, 1fr);
        row-gap: 7px;
    }

    .calendar-day {
        width: 40px;
        height: 40px;
        margin: auto;
        border: none;
        border-radius: 50%;
        background: transparent;
        color: #111;
        font-size: 15px;
        cursor: pointer;
    }

    .calendar-day:hover:not(:disabled) {
        background: #f2f2f2;
    }

    .calendar-day.other-month {
        color: #cfcfcf;
    }

    .calendar-day.disabled {
        color: #d3d3d3;
        cursor: not-allowed;
        background: transparent;
    }

    .calendar-day.selected {
        background: #ff5f00;
        color: #ffffff;
        font-weight: 800;
    }

    .calendar-day.today {
        border: 1px solid #ff5f00;
    }

    .calendar-day.today.selected {
        border: none;
    }

    @media (max-width: 650px) {

        .custom-calendar {
            position: fixed;
            width: calc(100vw - 26px);
            max-width: 375px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 18px;
            padding: 20px 15px;
        }

        .calendar-title {
            font-size: 20px;
        }

        .calendar-day {
            width: 38px;
            height: 38px;
        }

    }

`;


document.head.appendChild(calendarStyle);



/*CALENDAR VARIABLES*/

let activeCalendar = null;

let pickupCalendarMonth =
    new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

let returnCalendarMonth =
    new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );



/*CALENDAR CONTAINER*/

const calendar =
    document.createElement("div");

calendar.className =
    "custom-calendar";


calendar.innerHTML = `

    <div class="calendar-header">

        <button
            type="button"
            class="calendar-arrow"
            id="calendarPrev">

            <i class="fa-solid fa-chevron-left"></i>

        </button>


        <div
            class="calendar-title"
            id="calendarTitle">
        </div>


        <button
            type="button"
            class="calendar-arrow"
            id="calendarNext">

            <i class="fa-solid fa-chevron-right"></i>

        </button>

    </div>


    <div class="calendar-weekdays">

        <div class="calendar-weekday">Su</div>
        <div class="calendar-weekday">Mo</div>
        <div class="calendar-weekday">Tu</div>
        <div class="calendar-weekday">We</div>
        <div class="calendar-weekday">Th</div>
        <div class="calendar-weekday">Fr</div>
        <div class="calendar-weekday">Sa</div>

    </div>


    <div
        class="calendar-days"
        id="calendarDays">
    </div>

`;


document.body.appendChild(calendar);



const calendarTitle =
    document.getElementById("calendarTitle");

const calendarDays =
    document.getElementById("calendarDays");

const calendarPrev =
    document.getElementById("calendarPrev");

const calendarNext =
    document.getElementById("calendarNext");



/*MINIMUM DATE*/

function getMinimumDate() {

    /*
       Pickup:
       today is minimum.

       Return:
       pickup date is minimum.
    */

    if (
        activeCalendar === "return" &&
        pickupDate &&
        pickupDate.dataset.date
    ) {

        const pickup =
            keyToDate(
                pickupDate.dataset.date
            );

        if (pickup) {
            return startOfDay(pickup);
        }

    }

    return today;

}



/*RENDER CALENDAR*/

function renderCalendar() {

    if (!activeCalendar) {
        return;
    }


    let monthDate;


    if (activeCalendar === "pickup") {

        monthDate =
            pickupCalendarMonth;

    } else {

        monthDate =
            returnCalendarMonth;

    }


    const year =
        monthDate.getFullYear();

    const month =
        monthDate.getMonth();


    calendarTitle.textContent =
        monthDate.toLocaleString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    calendarDays.innerHTML = "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const daysInPreviousMonth =
        new Date(
            year,
            month,
            0
        ).getDate();


    const minimumDate =
        getMinimumDate();


    /*
       Previous month dates
    */

    for (
        let i = firstDay - 1;
        i >= 0;
        i--
    ) {

        const dayNumber =
            daysInPreviousMonth - i;


        const date =
            new Date(
                year,
                month - 1,
                dayNumber
            );


        createCalendarDay(
            date,
            true,
            minimumDate
        );

    }


    /*
       Current month dates
    */

    for (
        let dayNumber = 1;
        dayNumber <= daysInMonth;
        dayNumber++
    ) {

        const date =
            new Date(
                year,
                month,
                dayNumber
            );


        createCalendarDay(
            date,
            false,
            minimumDate
        );

    }


    /*
       Next month dates
    */

    const totalCells =
        firstDay +
        daysInMonth;


    const remainingCells =
        Math.ceil(
            totalCells / 7
        ) * 7 -
        totalCells;


    for (
        let dayNumber = 1;
        dayNumber <= remainingCells;
        dayNumber++
    ) {

        const date =
            new Date(
                year,
                month + 1,
                dayNumber
            );


        createCalendarDay(
            date,
            true,
            minimumDate
        );

    }

}



/*CREATE CALENDAR DAY*/

function createCalendarDay(
    date,
    otherMonth,
    minimumDate
) {

    const day =
        document.createElement("button");


    day.type = "button";

    day.className =
        "calendar-day";


    day.textContent =
        date.getDate();


    if (otherMonth) {

        day.classList.add(
            "other-month"
        );

    }


    const normalizedDate =
        startOfDay(date);


    if (
        normalizedDate < minimumDate
    ) {

        day.disabled = true;

        day.classList.add(
            "disabled"
        );

    }


    /*
       Today's date
    */

    if (
        normalizedDate.getTime() ===
        today.getTime()
    ) {

        day.classList.add(
            "today"
        );

    }


    /*
       Selected date
    */

    const selectedInput =
        activeCalendar === "pickup"
            ? pickupDate
            : returnDate;


    if (
        selectedInput &&
        selectedInput.dataset.date
    ) {

        const selectedDate =
            keyToDate(
                selectedInput.dataset.date
            );


        if (
            selectedDate &&
            dateToKey(selectedDate) ===
            dateToKey(date)
        ) {

            day.classList.add(
                "selected"
            );

        }

    }


    /*Click date*/

    if (!day.disabled) {

        day.addEventListener(
            "click",
            function () {

                selectCalendarDate(
                    date
                );

            }
        );

    }


    calendarDays.appendChild(day);

}



/*SELECT CALENDAR DATE*/

function selectCalendarDate(date) {

    const value =
        dateToKey(date);


    if (activeCalendar === "pickup") {

        pickupDate.value =
            formatInputDate(date);

        pickupDate.dataset.date =
            value;

        if (
            returnDate.dataset.date
        ) {

            const currentReturn =
                keyToDate(
                    returnDate.dataset.date
                );


            if (
                currentReturn &&
                currentReturn < date
            ) {

                returnDate.value =
                    formatInputDate(date);

                returnDate.dataset.date =
                    value;

            }

        }


    } else {

        returnDate.value =
            formatInputDate(date);

        returnDate.dataset.date =
            value;

    }


    closeCalendar();

}



/*OPEN CALENDAR*/

function openCalendar(type) {

    activeCalendar =
        type;


    if (type === "pickup") {

        if (pickupDate.dataset.date) {

            const selected =
                keyToDate(
                    pickupDate.dataset.date
                );


            if (selected) {

                pickupCalendarMonth =
                    new Date(
                        selected.getFullYear(),
                        selected.getMonth(),
                        1
                    );

            }

        } else {

            pickupCalendarMonth =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                );

        }

    } else {

        if (returnDate.dataset.date) {

            const selected =
                keyToDate(
                    returnDate.dataset.date
                );


            if (selected) {

                returnCalendarMonth =
                    new Date(
                        selected.getFullYear(),
                        selected.getMonth(),
                        1
                    );

            }

        } else {

            returnCalendarMonth =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                );

        }

    }


    renderCalendar();


    calendar.classList.add(
        "show"
    );


    positionCalendar();

}



/*POSITION CALENDAR*/

function positionCalendar() {

    if (
        window.innerWidth <= 650
    ) {

        /*
           Mobile CSS handles
           the position.
        */

        return;

    }


    const input =
        activeCalendar === "pickup"
            ? pickupDate
            : returnDate;


    const rect =
        input.getBoundingClientRect();


    calendar.style.left =
        (
            rect.left +
            window.scrollX
        ) + "px";


    calendar.style.top =
        (
            rect.bottom +
            window.scrollY +
            10
        ) + "px";

}



/*CLOSE CALENDAR*/

function closeCalendar() {

    calendar.classList.remove(
        "show"
    );

    activeCalendar =
        null;

}



/*PREVIOUS MONTH*/

calendarPrev.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();


        if (
            activeCalendar === "pickup"
        ) {

            pickupCalendarMonth =
                new Date(
                    pickupCalendarMonth.getFullYear(),
                    pickupCalendarMonth.getMonth() - 1,
                    1
                );

        } else {

            returnCalendarMonth =
                new Date(
                    returnCalendarMonth.getFullYear(),
                    returnCalendarMonth.getMonth() - 1,
                    1
                );

        }


        renderCalendar();

    }
);



/*NEXT MONTH*/

calendarNext.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();


        if (
            activeCalendar === "pickup"
        ) {

            pickupCalendarMonth =
                new Date(
                    pickupCalendarMonth.getFullYear(),
                    pickupCalendarMonth.getMonth() + 1,
                    1
                );

        } else {

            returnCalendarMonth =
                new Date(
                    returnCalendarMonth.getFullYear(),
                    returnCalendarMonth.getMonth() + 1,
                    1
                );

        }


        renderCalendar();

    }
);



/*OPEN PICKUP CALENDAR*/

if (pickupDate) {

    pickupDate.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            openCalendar("pickup");

        }
    );

}



/*OPEN RETURN CALENDAR*/

if (returnDate) {

    returnDate.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            openCalendar("return");

        }
    );

}



/*PREVENT TEXT EDITING*/

if (pickupDate) {

    pickupDate.addEventListener(
        "keydown",
        function (event) {

            event.preventDefault();

        }
    );

}


if (returnDate) {

    returnDate.addEventListener(
        "keydown",
        function (event) {

            event.preventDefault();

        }
    );

}



/*CLICK OUTSIDE CALENDAR*/

document.addEventListener(
    "click",
    function (event) {

        if (
            calendar.classList.contains("show") &&
            !calendar.contains(event.target) &&
            event.target !== pickupDate &&
            event.target !== returnDate
        ) {

            closeCalendar();

        }

    }
);



/*WINDOW RESIZE*/

window.addEventListener(
    "resize",
    function () {

        if (
            calendar.classList.contains("show")
        ) {

            positionCalendar();

        }

    }
);


/*INITIAL DATE VALUES */

function initializeDateInput(
    input,
    fallbackDate
) {

    if (!input) {
        return;
    }


    const existingValue =
        input.value;

    let existingDate = null;


    if (
        input.dataset.date
    ) {

        existingDate =
            keyToDate(
                input.dataset.date
            );

    }


    if (
        !existingDate ||
        existingDate < today
    ) {

        input.value =
            formatInputDate(
                fallbackDate
            );

        input.dataset.date =
            dateToKey(
                fallbackDate
            );

    } else {

        input.value =
            formatInputDate(
                existingDate
            );

        input.dataset.date =
            dateToKey(
                existingDate
            );

    }

}


initializeDateInput(
    pickupDate,
    today
);


let defaultReturnDate =
    new Date(today);

defaultReturnDate.setDate(
    defaultReturnDate.getDate() + 1
);


initializeDateInput(
    returnDate,
    defaultReturnDate
);



/*SHOW CARS*/

const showCars =
    document.getElementById("showCars");


if (showCars) {

    showCars.addEventListener(
        "click",
        function () {

            const location =
                document
                    .getElementById("location")
                    .value
                    .trim();


            const pickup =
                pickupDate.dataset.date ||
                "";


            const returnValue =
                returnDate.dataset.date ||
                "";


            if (location === "") {

                alert(
                    "Please enter a pickup location."
                );


                document
                    .getElementById("location")
                    .focus();


                return;

            }


            if (pickup === "") {

                alert(
                    "Please select pickup date."
                );

                return;

            }


            if (returnValue === "") {

                alert(
                    "Please select return date."
                );

                return;

            }


            if (
                returnValue < pickup
            ) {

                alert(
                    "Return date cannot be before pickup date."
                );

                return;

            }


            const pickupTime =
                document
                    .getElementById("pickupTime")
                    .value;


            const returnTime =
                document
                    .getElementById("returnTime")
                    .value;


            alert(

                "Searching available cars...\n\n" +

                "Location: " +
                location +

                "\nPickup: " +
                formatDate(pickup) +
                " at " +
                pickupTime +

                "\nReturn: " +
                formatDate(returnValue) +
                " at " +
                returnTime

            );

        }
    );

}



/*EDIT BOOKING*/

const editBooking =
    document.querySelector(".edit-booking");


if (editBooking) {

    editBooking.addEventListener(
        "click",
        function () {

            document
                .querySelector(".booking-card")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}



/*HERO BUTTON*/

const heroExplore =
    document.getElementById("heroExplore");


if (heroExplore) {

    heroExplore.addEventListener(
        "click",
        function () {

            document
                .querySelector(".booking-card")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}



/*LEARN MORE*/

const learnMore =
    document.getElementById("learnMore");


if (learnMore) {

    learnMore.addEventListener(
        "click",
        function () {

            alert(
                "SIXT ONE gives members access to exclusive rates and benefits."
            );

        }
    );

}



/*MENU BUTTON*/

const menuBtn =
    document.getElementById("menuBtn");


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function () {

            alert(
                "Mobile navigation menu"
            );

        }
    );

}

