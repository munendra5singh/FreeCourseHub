
const allCoursesMasterData = [
    // --- 1. WEB DEVELOPMENT ---
    { id: "course-html", category: "Web Development", name: "HTML", img: "https://html.com/wp-content/uploads/html-hpg-featured-new.png", desc: "Learn HTML from scratch.", link: "https://www.youtube.com/watch?v=ATpBuofe2Ro" },
    { id: "course-css", category: "Web Development", name: "CSS", img: "https://media.licdn.com/dms/image/v2/C4D08AQEyDGpyHmRIdw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1597380712586?e=2147483647&v=beta&t=rJu54NyuU5F6jZBaCXi67npMyzWlbx23n1iXn-MSl7k", desc: "Learn CSS from scratch.", link: "https://www.youtube.com/playlist?list=PLpZx2hrNqQcFaUzMnjw94iYIEWqjvZDpt" },
    { id: "course-js", category: ["Web Development", "Programming"], name: "JavaScript", img: "https://www.freecodecamp.org/news/content/images/2023/02/freeCodeCamp-Cover-2.png", desc: "Learn JavaScript from scratch.", link: "https://www.youtube.com/playlist?list=PLjpp5kBQLNTSvHo6Rp4Ky0X8x_MabmKye" },
    
    // --- 2. AI & PROGRAMMING ---
    { id: "course-python", category: ["Data Analytics", "Programming"], name: "Python Programming", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800", desc: "Beginner-friendly Python course.", link: "https://edu.skillcourse.in/dashboard/course/17" },
    { id: "course-ai", category: "AI", name: "Artificial Intelligence", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", desc: "Learn AI and Machine Learning basics.", link: "https://www.youtube.com/playlist?list=PLTukPelH6ee59Kt9WLEcR5Yea9uFZTuiO" },
    { id: "course-deeplearning", category: "AI", name: "Deep Learning Mastery", img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800", desc: "Dive deep into artificial neural networks (ANN).", link: "https://www.youtube.com/playlist?list=PLPzjifo9TUNXh317odp5X_YUQouFgHIqX" },
    { id: "course-machinelearning", category: "AI", name: "Machine Learning Foundations", img: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800", desc: "Explore supervised and unsupervised algorithms.", link: "https://www.youtube.com/playlist?list=PLPzjifo9TUNXQ1LOMoBtCMiIe-gzjKB6H" },
    { id: "course-prompt-eng", category: "AI", name: "Prompt Engineering", img: "https://sureshitacademy.com/wp-content/uploads/2025/08/AI-Prompt-Engineering.jpg", desc: "Effective prompts design karne ki technique.", link: "https://youtube.com/playlist?list=PLyz4Eb45WBQ02Md7BiIO1sUsKTs8GcWKS&si=fe0NS7TfCxFT2UoB" },

    // --- 3. DATA ANALYTICS & MS OFFICE ---
    { id: "course-excel-adv", category: ["Data Analytics", "MS Office"], name: "Advance Excel", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", desc: "Learn basic to advance.", link: "https://www.youtube.com/playlist?list=PLHq_wPEVVWy0WMtrqkOENk-XeuKgu5A2q" },
    { id: "course-excel-ai", category: ["Data Analytics", "MS Office"], name: "Excel with AI", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", desc: "Learn basic to advance.", link: "https://youtu.be/wGBKI6B945w?si=Mws2UM1n8WGSVIGv" },
    { id: "course-word", category: "MS Office", name: "MS Word", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800", desc: "Learn MS Word basic to advance.", link: "https://www.youtube.com/playlist?list=PLRQGNW3q__WkhDpHwdQ3buNntOX-gbsfI" },
    { id: "course-powerpoint", category: "MS Office", name: "Power Point", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwGFk9jTCkL5ejWwexn5CxogjCOogyTFllfE4RlS7oBmAWA3a-kliIQI&s=10", desc: "Professional presentations banane ke liye.", link: "https://www.youtube.com/playlist?list=PLRQGNW3q__WnRgxP7Zpw9OcV7eSSOgKBp" },
    { id: "course-powerbi", category: ["Data Analytics", "MS Office"], name: "Power BI", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", desc: "Learn Power BI basic to advance.", link: "https://edu.skillcourse.in/login?returnTo=%2Fdashboard%2Fcourse%2F11" },

    // --- 4. DATABASES ---
    { id: "course-sql", category:  ["Data Analytics", "Database"], name: "Learn SQL", img: "https://www.bitdegree.org/learn/storage/media/images/2312e5ff-0f2c-4a91-80eb-66098cef26a1.o.jpg", desc: "Learn SQL basic to advance.", link: "https://www.youtube.com/playlist?list=PLUtiFxlb49snsLqN0HqZo8Z45f-7jiM1J" },
    { id: "course-mysql", category: "Database", name: "MySQL", img: "https://studybullet.com/wp-content/uploads/2025/07/Complete-MySQL-Bootcamp-Learn-SQL-Step-by-Step.jpg", desc: "Learn relational database design.", link: "https://www.youtube.com/playlist?list=PLjVLYmrlmjGeyCPgdHL2vWmEGKxcpsC0E" },
    { id: "course-postgresql", category: "Database", name: "PostgreSQL", img: "https://media.licdn.com/dms/image/v2/D4D0DAQFUA7sgw6jTfw/learning-public-crop_288_512/learning-public-crop_288_512/0/1690311691180?e=2147483647&v=beta&t=eckm-eP0bEDhrO7lNBk6zADJMGEOdJ4yKhf70748rQc", desc: "Explore enterprise-level database systems.", link: "https://www.youtube.com/playlist?list=PLEtkoO2np9sx8zFYSL74633wZORnpTWY0" },
    { id: "course-mongodb", category: "Database", name: "MongoDB", img: "https://media.licdn.com/dms/image/v2/C560DAQFYT-OXtGVtSw/learning-public-crop_288_512/learning-public-crop_288_512/0/1652204728246?e=2147483647&v=beta&t=_Id4QEjmtVqtr2bUTN4vZv4XitfT-msK8_XVFyj_3-0", desc: "Dive into the world of NoSQL databases.", link: "https://www.youtube.com/playlist?list=PLA3GkZPtsafZydhN4nP0h7hw7PQuLsBv1" },

    // --- 5. DESIGN & SOFT SKILLS ---
    { id: "course-photoshop", category: "Design", name: "Adobe Photoshop", img: "https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/006/866/6866-original.png?1614010434", desc: "Learn photo editing from basic to advanced.", link: "https://www.youtube.com/playlist?list=PLRQGNW3q__Wk8ztMHh4MrLe-RgnlBtE9T" },
    { id: "course-illustrator", category: "Design", name: "Adobe Illustrator", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROEVpo87c8Z--rFsX8hPzSBTuRuSyI3TN9Y9GvQ3CCQw&s=10", desc: "Master vector graphics and logo creation.", link: "https://www.youtube.com/playlist?list=PL_Omxr2EB5TVo4jrp5_npjyFWptkDWsMH" },
    { id: "course-canva", category: "Design", name: "Canva for Beginners", img: "https://skillzeera.org/wp-content/uploads/2024/07/Learn-Canva-Graphic-Design-Course-Online-2.webp", desc: "Create stunning social media graphics.", link: "https://youtube.com/playlist?list=PLjVLYmrlmjGcvBiUmkBQ5isfnBufjnAu3&si=QP1WaXB0A5mlemQQ" },
    { id: "course-communication", category: "Soft Skills", name: "Communication Skill", img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800", desc: "Learn communication skills.", link: "https://www.youtube.com/playlist?list=PLXkl5QY3nXAHQUsBaOXraJPjbHh9E0DpX" },
    { id: "course-speaking", category: "Soft Skills", name: "Public Speaking Mastery", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800", desc: "Overcome stage fear.", link: "https://www.youtube.com/playlist?list=PLv9O1ieIsEgfbNVwPqWxlZq_JtKmnsubv" },
    { id: "course-english", category: "Soft Skills", name: "Spoken English", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", desc: "Learn spoken english basic to advance.", link: "https://www.youtube.com/playlist?list=PLAX41TUzaphC09B9HFfEqOkwBqCk1yE9v" },
    { id: "course-resume", category: "Career", name: "Create Digital Resume", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800", desc: "Create digital resume from scratch.", link: "https://www.youtube.com/watch?v=n7SBzreUYt0" }
];

   // { id: "", category: "", name: "", img: "", desc: "", link: "" }

