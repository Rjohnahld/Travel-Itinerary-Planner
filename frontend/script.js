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
                                <span class="badge text-bg-info align-self-start">10 days</span>
                            </div>
                            <p class="card-text text-body-secondary small mb-2">
                                ${i.tripStartDate} to ${i.tripEndDate}
                            </p>
                            <p class="card-text">${i.tripNotes}</p>
                        </div>
                        <div class="card-footer bg-white border-0 d-flex gap-2">
                            <button class="btn btn-sm btn-primary flex-fill">View</button>
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
            tripListEl.appendChild(newDiv)
        })
    }
    
    function renderItinerary(){
        const intineraryEl = document.querySelector("#itinerary")
        intineraryEl.innerHTML = ""
        const cardHeader = document.createElement("")
    }
})