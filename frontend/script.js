document.addEventListener("DOMContentLoaded", () => {
    function main() {
        document.querySelector("#newTripBtn")
            .addEventListener("click", () => {
                Swal.fire({
                    title: "Update Workout",
                    html: ` <div class="mb-3">
            <label for="tripName" class="form-label fw-semibold">Destination</label>
            <input type="text" id="tripName" class="form-control" placeholder="e.g. Fukuoka, Japan" required>
            </div>
 
            <div class="row g-2 mb-3">
            <div class="col-sm-6">
            <label for="tripStart" class="form-label fw-semibold">Start date</label>
            <input type="date" id="tripStart" class="form-control" required>
            </div>
            <div class="col-sm-6">
            <label for="tripEnd" class="form-label fw-semibold">End date</label>
            <input type="date" id="tripEnd" class="form-control" required>
             </div>
            </div>
 
            <div>
                <label for="tripNotes" class="form-label fw-semibold">Notes <span class="text-body-secondary fw-normal">(optional)</span></label>
                <textarea id="tripNotes" class="form-control" rows="3" placeholder="What's this trip about?"></textarea>
            </div>`,
                    showCancelButton: true,
                    preConfirm: async function () {
                        const tripName = document.querySelector("#tripName").value
                        const tripStart = document.querySelector("#tripStart").value
                        const tripEnd = document.querySelector("#tripEnd").value
                        const tripNotes = document.querySelector("#tripNotes").value
                        createTrip(tripList, tripName, tripStart, tripEnd, tripNotes)
                        renderTripList()
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Created!",
                            text: "Trip has been created.",
                            icon: "success"
                        })
                    }
                })
            })
        renderTripList()
    }
    main()
    function renderTripList() {
        const tripListEl = document.querySelector("#tripList")
        tripListEl.innerHTML = ""
        tripList.forEach(i => {
            const newDiv = document.createElement("div")
            newDiv.classList.add("col")
            newDiv.innerHTML = `<div class="card h-100 shadow-sm trip-card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h3 class="h5 card-title">${i.tripName}</h3>
                                <span class="badge text-bg-info align-self-start">${getTripDays(i)} days</span>
                            </div>
                            <p class="card-text text-body-secondary small mb-2">
                                ${i.tripStartDate} to ${i.tripEndDate}
                            </p>
                            <p class="card-text">${i.tripNotes}</p>
                        </div>
                        <div class="card-footer bg-white border-0 d-flex gap-2">
                            <button class="btn btn-sm btn-primary flex-fill tripViewBtn">View</button>
                            <button class="btn btn-sm btn-outline-secondary tripEditBtn">Edit</button>
                            <button class="btn btn-sm btn-outline-danger tripDeleteBtn">Delete</button>
                        </div>
                    </div>`
            newDiv.querySelector(".tripDeleteBtn")
                .addEventListener("click", () => {
                    deleteTrip(tripList, i.tripId)
                    renderTripList()
                })

            newDiv.querySelector(".tripEditBtn")
                .addEventListener("click", () => {
                    const tripName = prompt("Destination:", i.tripName) ?? i.tripName
                    const tripStartDate = prompt("Start date (YYYY-MM-DD):", i.tripStartDate) ?? i.tripStartDate
                    const tripEndDate = prompt("End date (YYYY-MM-DD):", i.tripEndDate) ?? i.tripEndDate
                    const tripNotes = prompt("Notes:", i.tripNotes) ?? i.tripNotes
                    updateTrip(tripList, i.tripId, tripName, tripStartDate, tripEndDate, tripNotes)
                    renderTripList()
                })
            newDiv.querySelector(".tripViewBtn")
                .addEventListener("click", () => {
                    viewTrip(tripList, i.tripId)
                    renderItinerary()
                })
            tripListEl.appendChild(newDiv)
        })
    }

    function renderItinerary() {
        const trip = tripList.find(i => i.tripId === currentTripId)
        const tripItineraryListEl = document.querySelector("#itinerary")   // 1. added #
        tripItineraryListEl.innerHTML = ""                                    // 2. clear old card

        if (!trip) {                                                          // 6. nothing selected
            tripItineraryListEl.innerHTML = `<p class="text-body-secondary">Click View on a trip to see its itinerary.</p>`
            return
        }

        const tripCard = document.createElement("div")
        tripCard.className = "card shadow-sm"
        tripCard.innerHTML = `
        <div class="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2 py-3">
            <div>
                <h2 class="h4 mb-0">${trip.tripName}</h2>
                <small class="text-body-secondary">${trip.tripStartDate} to ${trip.tripEndDate}</small>
            </div>
            <button class="btn btn-success addActivityBtn" type="button">Add Activity</button>
        </div>
        <div class="card-body">
            <div class="accordion" id="dayAccordion"></div>
        </div>`                                                           // 4. real trip data

        tripCard.querySelector(".addActivityBtn").addEventListener("click", () => {   // 7.
            const activityDay = Number(prompt("Day:"))
            const activityTime = prompt("Time (HH:MM):")
            const activityTitle = prompt("Title:")
            const activityLocation = prompt("Location:")
            const activityCategory = prompt("Category:")
            createActivity(tripList, activityDay, activityTime, activityTitle, activityLocation, activityCategory)
            renderItinerary()
        })

        const accordionEl = tripCard.querySelector("#dayAccordion")
        const totalDays = getTripDays(trip)

        for (let day = 1; day <= totalDays; day++) {
            const dayActivities = trip.tripActivities
                .filter(a => a.activityDay === day)
                .sort((a, b) => a.activityTime.localeCompare(b.activityTime))

            // 3. one accordion item per day, built inside the loop
            const dayDiv = document.createElement("div")
            dayDiv.className = "accordion-item"
            dayDiv.innerHTML = `
            <h3 class="accordion-header">
                <button class="accordion-button ${day === 1 ? "" : "collapsed"}" type="button"
                    data-bs-toggle="collapse" data-bs-target="#day${day}">
                    <strong>Day ${day}</strong>
                </button>
            </h3>
            <div id="day${day}" class="accordion-collapse collapse ${day === 1 ? "show" : ""}" data-bs-parent="#dayAccordion">
                <div class="accordion-body p-0">
                    <ul class="list-group list-group-flush"></ul>
                </div>
            </div>`                                                       // 5. id="day${day}" added

            const ulEl = dayDiv.querySelector("ul")

            dayActivities.forEach(i => {
                const newLiEl = document.createElement("li")
                newLiEl.className = "list-group-item d-flex align-items-start gap-3 activity-item"
                newLiEl.innerHTML = `
                <span class="badge text-bg-primary activity-time">${i.activityTime}</span>
                <div class="flex-grow-1">
                    <div class="fw-semibold">${i.activityTitle}</div>
                    <small class="text-body-secondary">${i.activityLocation} · ${i.activityCategory}</small>
                </div>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary activityEditBtn">Edit</button>
                    <button class="btn btn-outline-danger activityDeleteBtn">Delete</button>
                </div>`

                newLiEl.querySelector(".activityDeleteBtn").addEventListener("click", () => {   // 7.
                    deleteActivity(tripList, trip.tripId, i.activityId)
                    renderItinerary()
                })
                newLiEl.querySelector(".activityEditBtn").addEventListener("click", () => {     // 7.
                    const activityDay = Number(prompt("Day:", i.activityDay) ?? i.activityDay)
                    const activityTime = prompt("Time (HH:MM):", i.activityTime) ?? i.activityTime
                    const activityTitle = prompt("Title:", i.activityTitle) ?? i.activityTitle
                    const activityLocation = prompt("Location:", i.activityLocation) ?? i.activityLocation
                    const activityCategory = prompt("Category:", i.activityCategory) ?? i.activityCategory
                    updateActivity(tripList, trip.tripId, i.activityId, activityDay, activityTime, activityTitle, activityLocation, activityCategory)
                    renderItinerary()
                })

                ulEl.appendChild(newLiEl)
            })

            if (dayActivities.length === 0) {
                ulEl.innerHTML = `<li class="list-group-item text-body-secondary small">No activities yet</li>`
            }

            accordionEl.appendChild(dayDiv)
        }

        tripItineraryListEl.appendChild(tripCard)
    }
})