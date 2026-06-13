# Tasty Bites Restaurant

Tasty Bites Restaurant is a responsive restaurant website developed by Group A as a group assignment. The website presents the restaurant, displays its food menu, introduces the project team, accepts customer messages, and provides a shopping cart and checkout experience.

## Group Members

| Name | ID Number | Role in the Project |
| --- | --- | --- |
| Sadiq Abdulmumini | DL/IMT/23D/0159 | Project Coordinator / Frontend Lead |
| Musa Aliyu | DL/IMT/23D/0125 | Content Lead |
| Hadiza Aminu | DL/IMT/23D/0166 | Frontend Member |
| Ahmed Sahabo Ubandoma | DL/IMT/23D/0156 | UI Designer Lead |
| Sarenso Obidah Nebari | DL/IMT/23D/0165 | UI Designer Member |
| Rukaiya Mohammed | DL/IMT/23D/0148 | Content Member |
| Sadiq Ibrahim Buwangal | DL/IMT/21U/0107 | Content Member |
| Ephraim Adamu | DL/IMT/21U/0103 | Content Member |

All eight members are 400-level students of Information Management Technology in the Faculty of Information Technology at Modibbo Adama University, Yola.

The project work is organized into three main areas: content, UI design, and frontend development. Each area has a lead supported by its team members.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- JSON for team member records
- Browser Local Storage for cart persistence
- FormSubmit for checkout and contact email delivery

## Main Features

- Responsive navigation and page layouts
- Searchable and filterable restaurant menu
- Shopping cart with quantity controls
- Delivery and pickup checkout options
- Email delivery for orders and contact messages
- Team profiles generated dynamically from `team.json`
- Client-side form validation

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

## Email Setup

Checkout orders and contact messages are sent to:

```text
sadiqabdulmumini124@gmail.com
```

The project uses FormSubmit. On the first test submission, FormSubmit sends a one-time activation email to the address above. The recipient must approve that email before future messages can be delivered.

## Project Structure

```text
.
├── index.html
├── menu.html
├── about.html
├── contact.html
├── styles.css
├── script.js
├── team.json
└── images/
```

To add another team member, place their photograph in `images/` and add a new record with the same fields in `team.json`.
