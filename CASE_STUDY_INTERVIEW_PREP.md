# 🏆 FieldOps: The Master Interview Guide (Junior-to-Mid Edition)

Yeh document aapke interview ka **"Secret Weapon"** hai. Is mein woh saare sawalat (questions) aur unke jawab (answers) hain jo CodesSavvy ke interviewers aap se pooch sakte hain. Isay ghul ke pee jao! 🚀

---

## 🎤 1. Professional Introduction (The 30-Second Pitch)
**Sawal:** "Apne project ke baray mein batayein."
**Jawab:** "Sir, FieldOps ek MERN stack ecosystem hai jo field technicians ko manage karne ke liye banaya gaya hai. Is mein maine strictly logic aur workflows par focus kiya hai. Is app mein 3 roles hain: **Admin** (Operations control), **Technician** (Field work execution), aur **Client** (Service request transparency). Maine isay CodesSavvy ke 'intentionally incomplete' brief ke mutabiq as a **Sole Engineer** design kiya hai."

---

## 🧠 2. The "Why" vs "Why Not" (Tech Stack Defense)

Interviewers hamesha "Trade-offs" poonchte hain.

| Sawal (Question) | Jawab (Smart Answer) |
| :--- | :--- |
| **Why MongoDB (NoSQL) instead of SQL?** | "Sir, field jobs ka data (requirements, notes, location) kabhi fix nahi hota. SQL mein hamein rigid tables banane parte, lekin MongoDB mein jobs aur status history ko hum nested structure mein handle kar sakte hain jo early development ke liye best hai." |
| **Why JWT instead of Sessions?** | "Field service apps 'Stateless' honi chahiyein. JWT ki wajah se humein server par sessions store nahi karne parte, aur token ke sath hum user ka **role** bhi bhej dete hain, jis se security aur permissions handle karna asaan hota hai." |
| **Why Polling instead of WebSockets?** | "Manual polling simple hai aur battery-friendly hai for technicians in low-bandwidth areas (kam internet). Junior level par simplicity maintain karne ke liye maine stable implementation ko prioritize kiya." |
| **Why not Tailwind/Bootstrap?** | "Maine Vanilla CSS use ki hai taake main apne fundamental CSS concepts (Grid, Flexbox, Variables) dikha sakun. Built-in frameworks build size bada karti hain aur creative control kam kar deti hain." |

---

## 💻 3. Code Deep-Dive (Junior Level Logic)

**Sawal: "Aapne Audit Log (ActivityLog) kaise implement kiya?"**
> **Jawab:** "Sir, jab bhi koi job status change hoti hai (Controller mein), main sirf job document update nahi karta balkay aik naya `ActivityLog` document create karta hoon. Is mein `previousStatus`, `newStatus`, aur `actor` (user) ki detail hoti hai. Is se poori job ki history (Audit Trail) hamesha mehfooz rehti hai."

**Sawal: "User Roles kaise manage ho rahe hain?"**
> **Jawab:** "Maine backend par aik `role.middleware.js` banaya hai. Yeh middleware routes ko restrict karta hai—maslan, Client kabhi bhi kisi technician ko assign nahi kar sakta. Har restricted request par role check hota hai."

**Sawal: "Naye Technicians foran login kyun nahi kar sakte?"**
> **Jawab:** "Yeh security requirement hai. Signup sab technicians kar sakte hain, lekin unka account `isActive: false` rehta hai. Admin jab tak unhein review karke manual approve na karde, woh access nahi kar sakte."

---

## 🔄 4. The App Flow (Operational Logic)

**Sawal: "Technician ka job acceptance flow kya hai?"**
> **Jawab:** "Admin job assign karta hai (status `ASSIGNED`). Technician ko foran notification milti hai. Technician ko pehle job **'Accept'** karni parti hai (status `ACCEPTED`), tabhi woh kaam shuru kar sakta hai. Is se accountability create hoti hai."

**Sawal: "Agar technician stuck ho jaye (parts na milen), toh kya karta hai?"**
> **Jawab:** "Maine specifically aik **`BLOCKED`** status rakha hai. Technician notes ke saath job ko block kar sakta hai taake Admin ko pata chale aur woh resolution mein help karein."

---

## 🎭 5. The Live Walkthrough (Interview Presentation)

Jab aap screen share karein, toh yeh steps follow karein:

1.  **Dashboard First:** Admin dashboard dikhayein (Stats, Activity Snapshot).
2.  **The "Actionable" Notification:** Notification bell dikhayein jahan Admin techs ko approve karta hai (yeh aapka high-impact UI move hai).
3.  **Create ➔ Assign ➔ Accept:** Aik live job banayen, usay assign karein aur doosray browser mein tech bankar usay 'Accept' karein.
4.  **Audit Trail:** Akhir mein dikhayein ke `ActivityLog` mein aapka sara action record hua hai.

---

## ⚠️ 6. Handling "Missing Things"

Agar poochay jaye: "Aapne file upload ya email kyun nahi dala?"
> **Jawab:** "Sir, 6-10 hours ka deadline tha, maine **Core State Machine** aur **Data Integrity** (Audit Log) ko prioritize kiya. File upload (S3) aik senior-level extra hai jo future version mein easily add ho sakta hai."

---

### Final Tip:
Bhai, aapka project junior level ke liye **Top Level** hai. Bas thanday dimagh se baat karni hai aur har faislay ki wajah (reasoning) batani hai. 

**Best of Luck! CodesSavvy is yours!** 🚀
