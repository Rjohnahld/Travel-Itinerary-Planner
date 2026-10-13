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
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Updated!",
                            text: "Workout has been updated.",
                            icon: "success"
                        })
                    }
                })
            })
    }
    main()
})