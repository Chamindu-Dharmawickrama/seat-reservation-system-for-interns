# Admin API Endpoints Documentation

This document outlines the API endpoints that need to be implemented in the backend to support the admin overview component functionality.

## Base URL

```
/api/v1/admin
```

## Authentication

All endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Dashboard Statistics

**GET** `/admin/stats`

Returns dashboard statistics for the admin overview.

**Response:**

```json
{
    "success": true,
    "data": {
        "totalSeats": 150,
        "availableSeats": 45,
        "occupiedSeats": 95,
        "maintenanceSeats": 10,
        "totalInterns": 120,
        "activeAssignments": 95
    }
}
```

### 2. Seats Management

#### Get All Seats

**GET** `/admin/seats`

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "seat_001",
            "seatNumber": "A01",
            "floor": "1st Floor",
            "location": "Window Side",
            "status": "available", // available, occupied, maintenance
            "assignedTo": null, // intern ID if occupied
            "createdAt": "2025-01-01T00:00:00Z",
            "updatedAt": "2025-01-01T00:00:00Z"
        }
    ]
}
```

#### Add New Seat

**POST** `/admin/seats`

**Request Body:**

```json
{
    "seatNumber": "A01",
    "floor": "1st Floor",
    "location": "Window Side",
    "status": "available"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Seat added successfully",
    "data": {
        "id": "seat_001",
        "seatNumber": "A01",
        "floor": "1st Floor",
        "location": "Window Side",
        "status": "available",
        "assignedTo": null,
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-01-01T00:00:00Z"
    }
}
```

#### Update Seat

**PUT** `/admin/seats/:id`

**Request Body:**

```json
{
    "seatNumber": "A01",
    "floor": "1st Floor",
    "location": "Window Side",
    "status": "maintenance"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Seat updated successfully",
    "data": {
        "id": "seat_001",
        "seatNumber": "A01",
        "floor": "1st Floor",
        "location": "Window Side",
        "status": "maintenance",
        "assignedTo": null,
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-01-01T00:00:00Z"
    }
}
```

#### Delete Seat

**DELETE** `/admin/seats/:id`

**Response:**

```json
{
    "success": true,
    "message": "Seat deleted successfully"
}
```

### 3. Interns Management

#### Get All Interns

**GET** `/admin/interns`

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "intern_001",
            "internId": "INT001",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "department": "IT",
            "startDate": "2025-01-01",
            "endDate": "2025-06-30",
            "status": "active", // active, inactive, completed
            "currentSeat": null, // seat ID if assigned
            "createdAt": "2025-01-01T00:00:00Z",
            "updatedAt": "2025-01-01T00:00:00Z"
        }
    ]
}
```

### 4. Seat Assignments

#### Create Assignment

**POST** `/admin/assignments`

**Request Body:**

```json
{
    "internId": "intern_001",
    "seatId": "seat_001",
    "date": "2025-01-15",
    "timeSlot": "09:00 AM - 05:00 PM (Full Day)"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Seat assigned successfully",
    "data": {
        "id": "assignment_001",
        "internId": "intern_001",
        "seatId": "seat_001",
        "date": "2025-01-15",
        "timeSlot": "09:00 AM - 05:00 PM (Full Day)",
        "status": "active",
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-01-01T00:00:00Z"
    }
}
```

#### Get All Assignments

**GET** `/admin/assignments`

**Query Parameters:**

-   `date` (optional): Filter by specific date (YYYY-MM-DD)
-   `internId` (optional): Filter by intern ID
-   `seatId` (optional): Filter by seat ID
-   `status` (optional): Filter by status (active, completed, cancelled)

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "assignment_001",
            "internId": "intern_001",
            "seatId": "seat_001",
            "date": "2025-01-15",
            "timeSlot": "09:00 AM - 05:00 PM (Full Day)",
            "status": "active",
            "intern": {
                "name": "John Doe",
                "internId": "INT001"
            },
            "seat": {
                "seatNumber": "A01",
                "floor": "1st Floor"
            },
            "createdAt": "2025-01-01T00:00:00Z",
            "updatedAt": "2025-01-01T00:00:00Z"
        }
    ]
}
```

#### Update Assignment

**PUT** `/admin/assignments/:id`

**Request Body:**

```json
{
    "status": "cancelled"
}
```

#### Delete Assignment

**DELETE** `/admin/assignments/:id`

### 5. Recent Activities

#### Get Recent Activities

**GET** `/admin/activities`

**Query Parameters:**

-   `limit` (optional): Number of activities to return (default: 10)

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "activity_001",
            "type": "assignment", // assignment, seat_added, seat_updated, maintenance
            "message": "Seat A01 assigned to John Doe",
            "details": {
                "internName": "John Doe",
                "seatNumber": "A01",
                "date": "2025-01-15"
            },
            "createdAt": "2025-01-01T00:00:00Z"
        },
        {
            "id": "activity_002",
            "type": "seat_added",
            "message": "New seat B05 added to 2nd Floor",
            "details": {
                "seatNumber": "B05",
                "floor": "2nd Floor"
            },
            "createdAt": "2025-01-01T00:00:00Z"
        },
        {
            "id": "activity_003",
            "type": "maintenance",
            "message": "Seat A03 marked for maintenance",
            "details": {
                "seatNumber": "A03",
                "status": "maintenance"
            },
            "createdAt": "2025-01-01T00:00:00Z"
        }
    ]
}
```

## Error Responses

All error responses follow this format:

```json
{
    "success": false,
    "message": "Error description",
    "errors": [] // Optional array of validation errors
}
```

### Common HTTP Status Codes:

-   `200` - Success
-   `201` - Created
-   `400` - Bad Request (validation errors)
-   `401` - Unauthorized
-   `403` - Forbidden
-   `404` - Not Found
-   `500` - Internal Server Error

## Database Schema Suggestions

### Seats Table

```sql
CREATE TABLE seats (
    id VARCHAR(50) PRIMARY KEY,
    seat_number VARCHAR(10) NOT NULL UNIQUE,
    floor VARCHAR(20) NOT NULL,
    location VARCHAR(100),
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    assigned_to VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES interns(id)
);
```

### Interns Table

```sql
CREATE TABLE interns (
    id VARCHAR(50) PRIMARY KEY,
    intern_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50),
    start_date DATE,
    end_date DATE,
    status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
    current_seat VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (current_seat) REFERENCES seats(id)
);
```

### Assignments Table

```sql
CREATE TABLE assignments (
    id VARCHAR(50) PRIMARY KEY,
    intern_id VARCHAR(50) NOT NULL,
    seat_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (intern_id) REFERENCES interns(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id)
);
```

### Activities Table

```sql
CREATE TABLE activities (
    id VARCHAR(50) PRIMARY KEY,
    type ENUM('assignment', 'seat_added', 'seat_updated', 'maintenance') NOT NULL,
    message TEXT NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

Make sure to set these environment variables:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
```

## Notes

1. All ID fields should be unique identifiers (UUIDs recommended)
2. Implement proper validation for all input fields
3. Add rate limiting to prevent abuse
4. Implement proper logging for all activities
5. Consider implementing real-time updates using WebSockets for live dashboard updates
6. Add proper database indexing for performance optimization
