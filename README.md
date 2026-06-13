# Tasty Bites Restaurant

Tasty Bites Restaurant is a responsive restaurant website developed by Group A as a group assignment. The website presents the restaurant, displays its food menu, introduces the project team, accepts customer messages, and provides a shopping cart and checkout experience.

## Group Members

| Name | ID Number | Level | Programme | Role | Contact |
| --- | --- | --- | --- | --- | --- |
| Sadiq Abdulmumini | DL/IMT/23D/0159 | 400 Level | Information Management Technology | Project Coordinator / Frontend Lead | sadiqabdulmumini124@gmail.com |
| Musa Aliyu | DL/IMT/23D/0125 | 400 Level | Information Management Technology | Content Lead | Not provided |
| Hadiza Aminu | DL/IMT/23D/0166 | 400 Level | Information Management Technology | Frontend Member | Not provided |
| Ahmed Sahabo Ubandoma | DL/IMT/23D/0156 | 400 Level | Information Management Technology | UI Designer Lead | ahmedsahaboubandoma@gmail.com |
| Sarenso Obidah Nebari | DL/IMT/23D/0165 | 400 Level | BSc Information Management Technology | UI Designer Member | Not provided |
| Rukaiya Mohammed | DL/IMT/23D/0148 | 400 Level | BSc Information Management Technology | Content Member | mohammedrukaiya90@gmail.com |
| Sadiq Ibrahim Buwangal | DL/IMT/21U/0107 | 400 Level | Information Management Technology | Content Member | buwangalsadiq@gmail.com |
| Ephraim Adamu | DL/IMT/21U/0103 | 400 Level | Information Management Technology | Content Member | ephraimadamu196@gmail.com |
| Jesse Yashim Felix | DL/IMT/23D/0167 | 400 Level (Final Year) | Information Technology | Content Lead | +234 813 863 7179 |
| Muktar Adamu | DL/IMT/21U/0104 | 400 Level | Information Management Technology | Content Lead | muktario538@gmail.com |

All ten members are students in the Faculty of Information Technology at Modibbo Adama University, Yola. Their full biographies and photographs are stored in `team.json` and displayed on the Meet the Team page.

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
