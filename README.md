# Tasty Bites Restaurant

Tasty Bites Restaurant is a responsive restaurant website developed by Group A as a group assignment. The website presents the restaurant, displays its food menu, introduces the project team, accepts customer messages, and provides a shopping cart and checkout experience.

## Group Members

| Name | Role |
| --- | --- |
| Sadiq Abdulmumini | Project Coordinator / Frontend Lead |
| Musa Aliyu | Content Lead |
| Hadiza Aminu | Frontend Member |
| Ahmed Sahabo Ubandoma | UI Designer Lead |
| Sarenso Obidah Nebari | UI Designer Member |
| Rukaiya Mohammed | Content Member |
| Sadiq Ibrahim Buwangal | Content Member |
| Ephraim Adamu | Content Member |
| Jesse Yashim Felix | Content Lead |
| Muktar Adamu | Content Lead |

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- JSON for team member records
- Browser Local Storage for cart persistence
- FormSubmit for checkout and contact email delivery

## Setup and Installation

1. Download or clone the repository.
2. Start a local web server using **one** of the following options. Python 3 is optional.

   **Option A: VS Code Live Server**

   - Open the project folder in Visual Studio Code.
   - Install the **Live Server** extension if it is not already installed.
   - Right-click `index.html` and select **Open with Live Server**.

   **Option B: Node.js**

   Open a terminal in the project directory and run:

   ```bash
   npx serve .
   ```

   Open the local address displayed in the terminal, usually `http://localhost:3000`.

   **Option C: Python 3**

   If Python 3 is installed, open a terminal in the project directory and run:

   ```bash
   python3 -m http.server 8000
   ```

   Then open:

   ```text
   http://localhost:8000
   ```

A local server is required because the Meet the Team page loads records from `team.json` using the JavaScript Fetch API. Opening the HTML files directly with a `file://` URL may prevent the team data from loading.
