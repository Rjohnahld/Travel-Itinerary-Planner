let tripList = [
    {
        tripId: "trip-1",
        tripName: "Fukuoka, Japan",
        tripStartDate: "2027-01-15",
        tripEndDate: "2027-01-24",
        tripNotes: "Food, onsens and day trips around Kyushu.",
        tripActivities: [
            { activityId: "activity-1", activityDay: 1, activityTime: "09:00", activityTitle: "Arrive at Fukuoka Airport", activityLocation: "FUK", activityCategory: "Transport" },
            { activityId: "activity-2", activityDay: 1, activityTime: "14:00", activityTitle: "Check in to hotel", activityLocation: "Hakata", activityCategory: "Accommodation" },
            { activityId: "activity-3", activityDay: 1, activityTime: "19:00", activityTitle: "Yatai street food dinner", activityLocation: "Nakasu", activityCategory: "Food" },
            { activityId: "activity-4", activityDay: 2, activityTime: "10:00", activityTitle: "Dazaifu Tenmangu Shrine", activityLocation: "Dazaifu", activityCategory: "Sightseeing" },
            { activityId: "activity-5", activityDay: 2, activityTime: "18:30", activityTitle: "Ichiran ramen", activityLocation: "Tenjin", activityCategory: "Food" },
            { activityId: "activity-6", activityDay: 3, activityTime: "11:00", activityTitle: "Canal boat ride", activityLocation: "Yanagawa", activityCategory: "Sightseeing" },
            { activityId: "activity-7", activityDay: 4, activityTime: "13:00", activityTitle: "Canal City shopping", activityLocation: "Hakata", activityCategory: "Shopping" }
        ]
    },
    {
        tripId: "trip-2",
        tripName: "Seoul, South Korea",
        tripStartDate: "2026-12-05",
        tripEndDate: "2026-12-09",
        tripNotes: "Winter city break with palaces, markets and cafes.",
        tripActivities: [
            { activityId: "activity-8", activityDay: 1, activityTime: "08:30", activityTitle: "Airport railroad to Seoul Station", activityLocation: "Incheon Airport", activityCategory: "Transport" },
            { activityId: "activity-9", activityDay: 1, activityTime: "15:00", activityTitle: "Gyeongbokgung Palace", activityLocation: "Jongno", activityCategory: "Sightseeing" },
            { activityId: "activity-10", activityDay: 1, activityTime: "19:00", activityTitle: "Gwangjang Market dinner", activityLocation: "Jongno", activityCategory: "Food" },
            { activityId: "activity-11", activityDay: 2, activityTime: "10:00", activityTitle: "Bukchon Hanok Village", activityLocation: "Bukchon", activityCategory: "Sightseeing" },
            { activityId: "activity-12", activityDay: 2, activityTime: "15:00", activityTitle: "Myeongdong shopping", activityLocation: "Myeongdong", activityCategory: "Shopping" },
            { activityId: "activity-13", activityDay: 3, activityTime: "17:30", activityTitle: "N Seoul Tower at sunset", activityLocation: "Namsan", activityCategory: "Sightseeing" }
        ]
    },
    {
        tripId: "trip-3",
        tripName: "Bali, Indonesia",
        tripStartDate: "2027-03-20",
        tripEndDate: "2027-03-25",
        tripNotes: "Relaxing beach and rice terrace trip.",
        tripActivities: [
            { activityId: "activity-14", activityDay: 1, activityTime: "12:00", activityTitle: "Check in to villa", activityLocation: "Ubud", activityCategory: "Accommodation" },
            { activityId: "activity-15", activityDay: 2, activityTime: "07:00", activityTitle: "Tegallalang Rice Terraces", activityLocation: "Ubud", activityCategory: "Sightseeing" },
            { activityId: "activity-16", activityDay: 2, activityTime: "13:00", activityTitle: "Balinese cooking class", activityLocation: "Ubud", activityCategory: "Food" },
            { activityId: "activity-17", activityDay: 4, activityTime: "16:30", activityTitle: "Uluwatu Temple and Kecak dance", activityLocation: "Uluwatu", activityCategory: "Sightseeing" },
            { activityId: "activity-18", activityDay: 5, activityTime: "10:00", activityTitle: "Beach day", activityLocation: "Seminyak", activityCategory: "Other" }
        ]
    },
    {
        tripId: "trip-4",
        tripName: "Penang, Malaysia",
        tripStartDate: "2026-11-14",
        tripEndDate: "2026-11-16",
        tripNotes: "Long weekend for hawker food and street art.",
        tripActivities: [
            { activityId: "activity-19", activityDay: 1, activityTime: "10:00", activityTitle: "Flight to Penang", activityLocation: "Changi Airport", activityCategory: "Transport" },
            { activityId: "activity-20", activityDay: 1, activityTime: "16:00", activityTitle: "George Town street art walk", activityLocation: "George Town", activityCategory: "Sightseeing" },
            { activityId: "activity-21", activityDay: 1, activityTime: "19:30", activityTitle: "Gurney Drive hawker centre", activityLocation: "Gurney Drive", activityCategory: "Food" },
            { activityId: "activity-22", activityDay: 2, activityTime: "09:00", activityTitle: "Penang Hill funicular", activityLocation: "Air Itam", activityCategory: "Sightseeing" },
            { activityId: "activity-23", activityDay: 2, activityTime: "13:00", activityTitle: "Kek Lok Si Temple", activityLocation: "Air Itam", activityCategory: "Sightseeing" }
        ]
    }
]
let currentTripId = null

function createActivity(tripList, activityDay, activityTime, activityTitle, activityLocation, activityCategory) {
    const newActivity = {
        activityId: `activity-${Math.floor(Math.random() * 100000) + 1}`,
        activityDay,
        activityTime,
        activityTitle,
        activityLocation,
        activityCategory
    }
    const trip = tripList.find(i => i.tripId === currentTripId)
    trip.tripActivities.push(newActivity)
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

function deleteTrip(tripList, tripIdToDelete) {
    const tripIndexToDelete = tripList.findIndex(i => i.tripId === tripIdToDelete)
    if (tripIndexToDelete !== -1) {
        tripList.splice(tripIndexToDelete, 1)
    }
}

function updateTrip(tripList, tripIdToUpdate, tripName, tripStartDate, tripEndDate, tripNotes) {
    const trip = tripList.find(i => i.tripId === tripIdToUpdate)
    trip.tripName = tripName
    trip.tripStartDate = tripStartDate
    trip.tripEndDate = tripEndDate
    trip.tripNotes = tripNotes
}

function viewTrip(tripList, tripIdToView){
    const trip = tripList.find(i => i.tripId === tripIdToView)
    if (trip){
        currentTripId = trip.tripId
    }
}

function getTripDays(trip) {
    const ms = new Date(trip.tripEndDate) - new Date(trip.tripStartDate)
    return ms / (1000 * 60 * 60 * 24) + 1  
}

function deleteActivity(tripList, tripId, activityIdToDelete) {
    const trip = tripList.find(i => i.tripId === tripId)
    const activityIndexToDelete = trip.tripActivities.findIndex(i => i.activityId === activityIdToDelete)
    if (activityIndexToDelete !== -1) {
        trip.tripActivities.splice(activityIndexToDelete, 1)
    }
}

function updateActivity(tripList, tripId, activityIdToUpdate, activityDay, activityTime, activityTitle, activityLocation, activityCategory) {
    const trip = tripList.find(i => i.tripId === tripId)
    const activity = trip.tripActivities.find(i => i.activityId === activityIdToUpdate)
    activity.activityDay = activityDay
    activity.activityTime = activityTime
    activity.activityTitle = activityTitle
    activity.activityLocation = activityLocation
    activity.activityCategory = activityCategory
}
