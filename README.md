#  Content Broadcasting System (Backend)

## Overview

This project is a Content Broadcasting System (Backend) built using *Node.js, Express, and MySQL*
It enables teachers to upload subject-based content, which is then reviewed by a principal and broadcasted to students through a public API.

The system includes:

1. Authentication (JWT)
2. Role-Based Access Control (RBAC)
3. File Upload System
4. Approval Workflow
 5. Scheduling & Rotation Logic
 6. Public Live Content API

---

##  Tech Stack

1.  **Backend:** Node.js, Express.js
2.  **Database:** MySQL (Sequelize ORM)
 3. **Authentication:** JWT
 4.  **File Upload:** Multer
  5.  **Password Security:** bcrypt

---

##  User Roles

###  Teacher

* Upload content
* Add subject, title, description
* Set start_time & end_time
* Define rotation_order and duration
* View status of uploaded content

###  Principal

* View all uploaded content
* Approve content
* Reject content with reason

---

##  Content Lifecycle

```text
uploaded → pending → approved / rejected
```

Only **approved content** is broadcasted
 Rejected content stores **rejection reason**

---

##  API Endpoints

###  Auth APIs

* `POST /api/auth/register`
* `POST /api/auth/login`

---

###  Content APIs

#### Upload Content (Teacher only)

```http
POST /api/content/upload
```

**Body (form-data):**

* title
* subject
* description (optional)
* start_time
* end_time
* rotation_order
* duration
* file

---

#### Approve Content (Principal only)

```http
PATCH /api/content/approve/:id
```

---

#### Reject Content (Principal only)

```http
PATCH /api/content/reject/:id
```

Body:

```json
{
  "reason": "Not suitable"
}
```

## Get My Content (Teacher only)

GET /api/content/my-content

 ## Returns:

All content uploaded by logged-in teacher
Includes status:
pending
approved
rejected


## Get All Content (Pagination & Filters)



GET /api/content?subject=english&status=approved&page=1&limit=5

 ## Query Params:

subject (optional)
status (optional)
page (default: 1)
limit (default: 5)


---

####  Live Content API (Public)

```http
GET /api/content/live/:teacherId
```

Returns:

* Only **approved**
* Only **within time window**
* Only **one content at a time (rotation applied)**

---

##  Scheduling & Rotation Logic (IMPORTANT)

Each content has:

* `start_time`
* `end_time`
* `rotation_order`
* `duration` (in minutes)

###  How Rotation Works

1. Filter approved content
2. Filter content within active time window
3. Sort by `rotation_order`
4. Calculate total cycle duration
5. Use current time to determine active content:

```js
currentSlot = Date.now() % totalCycleDuration
```

6. Return only **one active content**

---

###  Example

| Content | Duration |
| ------- | -------- |
| A       | 1 min    |
| B       | 1 min    |
| C       | 1 min    |

Rotation:

```text
Minute 1 → A
Minute 2 → B
Minute 3 → C
Repeat...
```

---

##  Edge Case Handling

Handled cases:

* No content available → return empty
* Invalid teacher ID → return empty
* Approved but not active → return empty
* Missing rotation data → ignored
* Zero duration → handled safely

---

##  Folder Structure

```text
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middlewares/
 ├── utils/
 ├── config/
 └── app.js
```

---

##  Authentication & RBAC

* JWT token required for protected routes
* Roles:

  * `teacher`
  * `principal`
* Middleware:

  * `verifyToken`
  * `authorizeRoles`

---

##  File Upload

* Supported formats:

  * JPG, PNG, GIF
* Max size:

  * 10MB
* Stored locally in `/uploads`

---

##  Setup Instructions

```bash
git clone <your-repo-link>
cd project-folder

npm install

# Configure .env
DB_NAME=content_system
DB_USER=root
DB_PASSWORD=yourpassword
JWT_SECRET=secret

# Run server
node src/app.js
```

---

##  Testing

Use **Postman**:

1. Register teacher & principal
2. Login and get token
3. Upload content
4. Approve content
5. Call live API

---

##  Demo Video

 [https://drive.google.com/file/d/1JfVHOPMlHndvCi4pBkUaBo1FcPcS2gKF/view?usp=sharing]

---

##  Deployment

 https://content-broadcasting-system-ydjg.onrender.com/

---

##  Assumptions

* Time is handled in UTC internally
* Teacher provides valid scheduling data
* Rotation applies only to active content

---

##  Future Improvements

* Redis caching for live API
* AWS S3 for file storage

* Analytics (most viewed content)

---

##  Conclusion

This system demonstrates:

* Clean backend architecture
* Real-world scheduling logic
* Secure role-based system
* Scalable and modular design

---

**Author:** Mitul kumar Chauhan
