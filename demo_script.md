# Leave Management System - Demo Video Script

## 1. Introduction (0:00 - 0:30)
**What to say:**
* "Hello everyone, my name is [Your Name], and I would like to present my full-stack Leave Management System."
* "This application was built to simplify the process of requesting and managing employee leaves. It has dedicated portals for both Employees and Employers."

**What to show:**
* Start with your camera turned on (if using Loom) and the **Login Page** of your deployed application open in the browser.

---

## 2. Application Demo & Main Flow (0:30 - 2:30)

### Step A: Employee Flow
**What to say & do:**
* "First, I will log in as an Employee." *(Type in employee credentials and log in)*
* "Here on the employee dashboard, you can see the leave history and leave balances."
* "Now, I will demonstrate how an employee applies for a leave." *(Navigate to 'Apply Leave' form)*
* "I'll select the leave type, specify the start and end dates, and add a quick reason. Then, click submit." *(Fill out the form and submit)*
* "As you can see, the request is successfully submitted and currently marked as 'Pending'."

### Step B: Employer/Admin Flow
**What to say & do:**
* "Next, let's log out and log in as an Employer to review this request." *(Log out, then log in with Admin/Employer credentials)*
* "On the employer dashboard, we can see all pending leave requests from employees."
* "Here is the request we just created. I can review the details and choose to either Approve or Reject it." *(Click Approve or Reject)*
* "Once approved, the status is updated in real-time, and the employee's leave balance is adjusted accordingly."

---

## 3. Code Walkthrough (2:30 - 4:00)
*For this section, open your Code Editor (VS Code).*

**Folders/Files to Open:**
1. `backend/models/...` (The Leave Schema/Model file)
2. `backend/controllers/...` (The Leave Controller file)
3. `backend/routes/...` (The API Routes file)

**What to say & do:**
* **Open the Routes File:** "Moving to the backend, let's look at the API endpoint used for creating a leave request. We defined a POST route here..." *(Highlight the `router.post('/apply', ...)` line)*
* **Open the Controller File:** "When the frontend sends the leave data to this endpoint, it triggers this controller function." *(Show the function that handles leave creation)*
* "In this function, we extract the dates, leave type, and user ID from the request body."
* **Open the Model File:** "We then create a new instance of our Leave Model as defined by this Mongoose schema." *(Show the Schema file briefly)*
* "Finally, we call `.save()` to store the new leave document in our MongoDB database, and return a success response back to the frontend."

---

## 4. Deployment Explanation (4:00 - 5:00)

**What to say:**
* "To make this application accessible online, I have deployed the different tiers of the stack to cloud platforms."
* **Frontend:** "The React frontend is deployed using **Vercel**, which provides fast, continuous deployment directly from my GitHub repository." *(Optionally show the Vercel dashboard or simply mention it)*
* **Backend:** "The Node.js/Express backend API is hosted on **Render**, ensuring smooth handling of HTTP requests and business logic."
* **Database:** "For data storage, I am using **MongoDB Atlas**, a fully managed cloud database, securely connected to my deployed backend."

## 5. Conclusion (5:00 - 5:15)
**What to say:**
* "That covers the main functionality, backend API processing, and the deployment architecture of my Leave Management System. Thank you for watching!"
