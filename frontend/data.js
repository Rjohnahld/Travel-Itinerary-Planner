let tripList = [
    {
        "id": "trip-1",
        "name": "Fukuoka, Japan",
        "startDate": "2027-01-15",
        "endDate": "2027-01-24",
        "notes": "Food, onsens and day trips around Kyushu.",
        "activities": [
            { "id": "act-1", "day": 1, "time": "09:00", "title": "Arrive at Fukuoka Airport", "location": "FUK", "category": "Transport" },
            { "id": "act-2", "day": 1, "time": "14:00", "title": "Check in to hotel", "location": "Hakata", "category": "Accommodation" },
            { "id": "act-3", "day": 1, "time": "19:00", "title": "Yatai street food dinner", "location": "Nakasu", "category": "Food" },
            { "id": "act-4", "day": 2, "time": "10:00", "title": "Dazaifu Tenmangu Shrine", "location": "Dazaifu", "category": "Sightseeing" },
            { "id": "act-5", "day": 2, "time": "18:30", "title": "Ichiran ramen", "location": "Tenjin", "category": "Food" },
            { "id": "act-6", "day": 3, "time": "11:00", "title": "Canal boat ride", "location": "Yanagawa", "category": "Sightseeing" },
            { "id": "act-7", "day": 4, "time": "13:00", "title": "Canal City shopping", "location": "Hakata", "category": "Shopping" }
        ]
    },
    {
        "id": "trip-2",
        "name": "Seoul, South Korea",
        "startDate": "2026-12-05",
        "endDate": "2026-12-09",
        "notes": "Winter city break with palaces, markets and cafes.",
        "activities": [
            { "id": "act-8", "day": 1, "time": "08:30", "title": "Airport railroad to Seoul Station", "location": "Incheon Airport", "category": "Transport" },
            { "id": "act-9", "day": 1, "time": "15:00", "title": "Gyeongbokgung Palace", "location": "Jongno", "category": "Sightseeing" },
            { "id": "act-10", "day": 1, "time": "19:00", "title": "Gwangjang Market dinner", "location": "Jongno", "category": "Food" },
            { "id": "act-11", "day": 2, "time": "10:00", "title": "Bukchon Hanok Village", "location": "Bukchon", "category": "Sightseeing" },
            { "id": "act-12", "day": 2, "time": "15:00", "title": "Myeongdong shopping", "location": "Myeongdong", "category": "Shopping" },
            { "id": "act-13", "day": 3, "time": "17:30", "title": "N Seoul Tower at sunset", "location": "Namsan", "category": "Sightseeing" }
        ]
    },
    {
        "id": "trip-3",
        "name": "Bali, Indonesia",
        "startDate": "2027-03-20",
        "endDate": "2027-03-25",
        "notes": "Relaxing beach and rice terrace trip.",
        "activities": [
            { "id": "act-14", "day": 1, "time": "12:00", "title": "Check in to villa", "location": "Ubud", "category": "Accommodation" },
            { "id": "act-15", "day": 2, "time": "07:00", "title": "Tegallalang Rice Terraces", "location": "Ubud", "category": "Sightseeing" },
            { "id": "act-16", "day": 2, "time": "13:00", "title": "Balinese cooking class", "location": "Ubud", "category": "Food" },
            { "id": "act-17", "day": 4, "time": "16:30", "title": "Uluwatu Temple and Kecak dance", "location": "Uluwatu", "category": "Sightseeing" },
            { "id": "act-18", "day": 5, "time": "10:00", "title": "Beach day", "location": "Seminyak", "category": "Other" }
        ]
    },
    {
        "id": "trip-4",
        "name": "Penang, Malaysia",
        "startDate": "2026-11-14",
        "endDate": "2026-11-16",
        "notes": "Long weekend for hawker food and street art.",
        "activities": [
            { "id": "act-19", "day": 1, "time": "10:00", "title": "Flight to Penang", "location": "Changi Airport", "category": "Transport" },
            { "id": "act-20", "day": 1, "time": "16:00", "title": "George Town street art walk", "location": "George Town", "category": "Sightseeing" },
            { "id": "act-21", "day": 1, "time": "19:30", "title": "Gurney Drive hawker centre", "location": "Gurney Drive", "category": "Food" },
            { "id": "act-22", "day": 2, "time": "09:00", "title": "Penang Hill funicular", "location": "Air Itam", "category": "Sightseeing" },
            { "id": "act-23", "day": 2, "time": "13:00", "title": "Kek Lok Si Temple", "location": "Air Itam", "category": "Sightseeing" }
        ]
    }
]
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