# 📋 API Testing Guide

Test these endpoints using Postman or cURL.

## 1️⃣ Authentication

### Register User
**POST** `http://localhost:5000/api/auth/register`

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "student@example.com",
  "password": "password123",
  "role": "student",
  "department": "Computer Science"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "student@example.com",
    "role": "student",
    "department": "Computer Science"
  }
}
```

### Login
**POST** `http://localhost:5000/api/auth/login`

**Body (JSON):**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response:** (Same as register)

---

## 2️⃣ Events API

### Create Event
**POST** `http://localhost:5000/api/events`

**Headers:**
```
Authorization: Bearer <token_from_login>
Content-Type: multipart/form-data
```

**Body (Form Data):**
```
title: "Tech Summit 2024"
description: "Annual tech summit"
eventDate: "2024-03-15"
eventTime: "10:00"
department: "Computer Science"
image: <select image file>
```

**Response:**
```json
{
  "success": true,
  "event": {
    "_id": "...",
    "title": "Tech Summit 2024",
    "description": "Annual tech summit",
    "image": "uploads/event-1234567890-123.jpg",
    "eventDate": "2024-03-15T00:00:00.000Z",
    "eventTime": "10:00",
    "month": 3,
    "year": 2024,
    "department": "Computer Science",
    "status": "pending",
    "createdBy": {
      "_id": "...",
      "name": "John Doe",
      "email": "student@example.com"
    },
    "createdAt": "2024-02-21T..."
  }
}
```

### Get My Events
**GET** `http://localhost:5000/api/events/my`

**Headers:**
```
Authorization: Bearer <token>
```

### Get Approved Events (Public)
**GET** `http://localhost:5000/api/events/approved`

### Get Events by Month
**GET** `http://localhost:5000/api/events/month/3/2024`

(Gets events for March 2024)

### Get Pending Events (HOD Only)
**GET** `http://localhost:5000/api/events/pending`

**Headers:**
```
Authorization: Bearer <hod_token>
```

### Approve Event (HOD Only)
**PUT** `http://localhost:5000/api/events/<event_id>/approve`

**Headers:**
```
Authorization: Bearer <hod_token>
```

**Body:** Empty (just {})

### Reject Event (HOD Only)
**PUT** `http://localhost:5000/api/events/<event_id>/reject`

**Headers:**
```
Authorization: Bearer <hod_token>
Content-Type: application/json
```

**Body:**
```json
{
  "rejectionReason": "Event details not clear. Please provide more information."
}
```

### Update Event
**PUT** `http://localhost:5000/api/events/<event_id>`

**Headers:**
```
Authorization: Bearer <token>
```

**Body (Form Data):**
```
title: "Updated Title"
description: "Updated description"
(can include image: <new file>)
```

### Delete Event
**DELETE** `http://localhost:5000/api/events/<event_id>`

**Headers:**
```
Authorization: Bearer <token>
```

---

## 🧪 Example Workflow

### 1. Register Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "john@example.com",
    "password": "pass123",
    "role": "student",
    "department": "Computer Science"
  }'
```

Copy the token from response.

### 2. Create Event
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>" \
  -F "title=Tech Fest" \
  -F "description=Our annual tech festival" \
  -F "eventDate=2024-03-20" \
  -F "eventTime=14:00" \
  -F "department=Computer Science" \
  -F "image=@/path/to/image.jpg"
```

Copy the event _id from response.

### 3. Register HOD
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Jane",
    "email": "hod@example.com",
    "password": "pass123",
    "role": "hod",
    "department": "Computer Science"
  }'
```

Copy the HOD token.

### 4. Get Pending Events (as HOD)
```bash
curl -X GET http://localhost:5000/api/events/pending \
  -H "Authorization: Bearer <hod_token>"
```

### 5. Approve Event (as HOD)
```bash
curl -X PUT http://localhost:5000/api/events/<event_id>/approve \
  -H "Authorization: Bearer <hod_token>"
```

### 6. Get Approved Events
```bash
curl -X GET http://localhost:5000/api/events/approved
```

### 7. Filter by Month
```bash
curl -X GET http://localhost:5000/api/events/month/3/2024
```

---

## ✅ Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## 🔍 Debugging Tips

1. **Check Token:** Ensure token is not expired
2. **Wrong Department:** Both student and HOD must be same department
3. **Image Not Uploading:** Check file type and size (< 5MB)
4. **Permission Denied:** Verify user role (HOD for approval)
5. **MongoDB Error:** Check if MongoDB is running

## 📝 Notes

- All timestamps are in ISO 8601 format
- Event status: pending → approved/rejected
- Only pending events can be edited/deleted
- Images served from: `http://localhost:5000/<image_path>`
