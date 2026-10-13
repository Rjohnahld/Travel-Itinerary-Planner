let tripList = []
let currentTripId = null

function createActivity(tripList, activityDay, activityTime, activityTitle, activityLocation, activityCategory) {
    const newActivity = {
        activityId: `activity-${Math.floor(Math.random * 100000) + 1}`,
        activityDay,
        activityTime,
        activityTitle,
        activityLocation,
        activityCategory
    }
    const index = tripList.find(i => i.tripId === currentTripId)
    index.tripActivities.push(newActivity)
}

function createTrip(tripList, tripName, tripStartDate, tripEndDate, tripNotes) {
    const newTrip = {
        tripId: `trip-${Math.floor(Math.random() * 100000) + 1}`,
        tripName,
        tripStartDate,
        tripEndDate,
        tripNotes,
        tripActivities: []
    }
    currentTripId = newTrip.tripId
    tripList.push(newTrip)
}