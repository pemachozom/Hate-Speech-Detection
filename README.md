# 🧠 Hate Speech Detection Using NLP

This project focuses on detecting and classifying hate speech in social media content using **Natural Language Processing (NLP)** and **deep learning models** such as LSTM and GRU. As part of this project, we also **developed a browser extension** that detects hate speech in real-time on web pages, enhancing user safety and awareness online.

---

## 📚 Module Information

**Module:** CSA402 – Natural Language Processing  
**Program:** BSc in Computer Science (AI & Data Science)  
**Semester:** VII  
**Guided by:** Ms. Tawmo

### 👥 Group Members
- Pema Chozom (12210024)  
- Bidash Gurung (12210001)  
- Dorji Thogmay (12210006)

---

## 🎯 Project Objectives

- Detect hate speech using context-aware NLP models.  
- Classify hate speech into categories: **racism**, **sexism**, **homophobia**, **xenophobia**, or **non-hate**.  
- Use deep learning to understand both explicit and implicit hate language.  
- Integrate the model into a **Chrome extension** for real-time detection on web content.

---

## 🛠️ Technologies & Tools

- Python  
- TensorFlow & Keras  
- LSTM & GRU  
- NLTK, Pandas  
- Google Colab  
- HTML, JavaScript (for browser extension)  

---

## 📂 Dataset Overview

- Labeled text in 5 categories:  
  🟢 Not Hate | 🔴 Racism | 🟣 Sexism | 🟠 Homophobia | 🔵 Xenophobia  
- Preprocessing included punctuation removal, lowercasing, tokenization, stopword removal, label encoding, and padding sequences.

---

## 🤖 Model Architecture & Evaluation

| Model | Accuracy |
|-------|----------|
| LSTM | 94.6%     |
| GRU  | 94.5%     |

Metrics: Accuracy, Precision, Recall, F1-score  
Tuned parameters: Embedding size, batch size, epochs, dropout

---

## 🧩 Extension Integration

We developed a **Chrome extension** that:
- Scans website content in real time  
- Sends text to the trained model API  
- Highlights or warns users about detected hate speech

This integration bridges AI and usability, making hate speech detection accessible in daily browsing.

---

## 🎓 Learning Outcomes

- Built and evaluated LSTM and GRU models  
- Applied NLP in a real-world problem domain  
- Developed a browser extension with live model inference  
- Strengthened teamwork and Agile development skills  
- Explored full-stack AI application deployment

---

## ✅ Project Status

✔️ Completed and submitted as a group project for **CSA402 – Natural Language Processing** with an integrated browser extension.
