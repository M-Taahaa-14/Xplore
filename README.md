# Xplore

Xplore is a modern tour and travel web application built to make trip planning simple, interactive, and community-driven. This project is a complete rewrite and improvement over our previous project, **Taaha-Hikes** (which was based on the .NET Framework and ASPX pages). With Xplore, we leverage a full stack setup using Django&nbsp;![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white), React&nbsp;![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB), and MySQL&nbsp;![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white), which brings a more flexible, responsive, and scalable platform for travel enthusiasts.

---

## 🚩 About the Project

Xplore aims to connect travelers and make planning trips a fun community experience.
The project includes:

- Full stack architecture (Django backend, React frontend)
- Real-time chat rooms for travel communities
- AI-based automated tour guides and recommendations
- Custom trip planning tools
- Complaint logger for reporting issues or harassment
- Modern, responsive UI and smooth user experience

---

## Features

- Plan and organize custom trips and tours
- Join chat rooms to connect with fellow travelers
- Get suggestions from automated AI-powered tour guides
- Log complaints or report issues for quick action
- Share and discuss itineraries within the community
- Secure user authentication and data management

---

## Tech Stack

- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) [Django](https://www.djangoproject.com/) (Backend)
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) [React](https://react.dev/) (Frontend)
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) [MySQL](https://www.mysql.com/) (Database)
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) (optional for deployment)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

---

## Want to Clone?

### Prerequisites

- Python 3.8+
- Node.js (v14 or newer)
- npm or yarn
- MySQL

### Backend Setup (Django)

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Copy the example environment file and update settings:
    ```bash
    cp .env.example .env
    # Edit .env with your MySQL credentials and other secrets according to yours
    ```

5. **Run Django Migrations**

    Django uses migrations to handle changes to the database schema. Run migrations every time you pull new changes that affect models, or after making your own model changes.

    ```bash
    python manage.py makemigrations  
    python manage.py migrate         
    ```

6. Start the Django server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. In a separate terminal, go to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the React development server:
    ```bash
    npm start
    # or
    yarn start
    ```

4. The frontend should be available at [http://localhost:3000](http://localhost:3000).

### Database (MySQL)

Set up a MySQL database and user. Update your Django `.env` with the correct credentials.

---

## 📝 Usage

- Register or log in to view and book trips and tours.
- Use chat rooms to connect and discuss with other travelers.
- Get AI-powered recommendations for places and activities.
- Plan custom itineraries and share them.
- Report issues or harassment via the complaint logger.

---

## 📁 Project Structure

```
Xplore/
├── backend/         # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── ...
├── frontend/        # React frontend
│   ├── package.json
│   ├── ...
├── docs/            # Documentation
├── .env.example     # Example env config for backend
└── README.md        # This file
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you want to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`) and in description give complete details of what you did
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions, help, or suggestions, open an [issue](https://github.com/M-Taahaa-14/Xplore/issues) or reach out to [@M-Taahaa-14](https://github.com/M-Taahaa-14).

---

> _Xplore: Bringing travelers together with modern tools and community-driven features._
