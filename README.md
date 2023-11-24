
# iQuiz
[![Netlify Status](https://api.netlify.com/api/v1/badges/238fe9aa-9587-4c04-a3aa-01f1c89fbc82/deploy-status)](https://app.netlify.com/sites/taupe-cupcake-ef27a7/deploys)

API for getting/creating/deleting Quizzes and saving its results against a user.

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [Quizzes](#quizzes)
    1. [Get All Quiz](#1-get-all-quiz)
    1. [Add New Quiz](#2-add-new-quiz)
    1. [Update Quiz Name](#3-update-quiz-name)
    1. [Delete Quiz](#4-delete-quiz)
* [Question](#question)
    1. [Get questions](#1-get-questions)
    1. [add new Question](#2-add-new-question)
    1. [Upload Question in bulk](#3-upload-question-in-bulk)
    1. [Delete Question](#4-delete-question)
* [User](#user)
    1. [Login User](#1-login-user)
    1. [Get LoggedIn User](#2-get-loggedin-user)
    1. [Update User details](#3-update-user-details)
* [History](#history)
    1. [Get All History Against User](#1-get-all-history-against-user)
    1. [Get Detailed History](#2-get-detailed-history)
    1. [Save History](#3-save-history)

--------



## Quizzes

For adding/deleting/updating and fetching Quizzes.



### 1. Get All Quiz



Get all Quizzes.

- No specific input is required.
    
- Quizzes are publically available.
- Quizzes are not associated with any user.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://iquiz.onrender.com/api/v1/quiz/
```



### 2. Add New Quiz



Add new Quiz

- name must be provided in the body in JSON format.
- **(Pending)** Need to add an admin user to add Quiz.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://iquiz.onrender.com/api/v1/quiz/
```



***Body:***

```js        
{
    "name": "2026 Qestion papers"
}
```



### 3. Update Quiz Name



Update Quiz name

- name must be provided in body in json format.
- **(Pending)** Need to add admin user to update Quiz


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://iquiz.onrender.com/api/v1/quiz/
```



***Body:***

```js        
{
    "quizId" : "Quiz_ID",    
    "name": "2022 Murad course"
}
```



### 4. Delete Quiz



Delete Quiz

- name must be provided in body in json format.
- **(Pending)** Need to add admin user to delete Quiz.


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: https://iquiz.onrender.com/api/v1/quiz/Quiz_ID
```



## Question

This section is for adding/deleting questions in a quiz.



### 1. Get questions



Get all questions against a quiz id.

- Input is category id in path params.
- quiz id can be gotten from Get All Quzzies request.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://iquiz.onrender.com/api/v1/question/QUIZ_ID
```



### 2. add new Question



Add a new question against a Quiz. .

- Input is must be in mentioned format.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://iquiz.onrender.com/api/v1/question/
```



***Body:***

```js        
{
    "quizId": "Quiz_ID",
    "question": "question 2",
    "options": [
      "Correct",
      "Wrong",
      "Wrong",
      "Wrong",
      "Wrong"
    ],
    "correctAnswer": "A"
  }
```



### 3. Upload Question in bulk



 Add new questions against a Quiz through a file.

- Input file must be in array of update question formate.


***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: https://iquiz.onrender.com/api/v1/question/bulkUpload
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| dataFile |  |  |



### 4. Delete Question


Delete quiz

- Input must be question id
    
- question id can be get from Get quizzes request


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://iquiz.onrender.com/api/v1/question/QUESTION_ID
```



## User

For saving the history, user must login as saving and retriving quiz history.



### 1. Login User



Login User will return JWT Token.  
Client must save it for history action.  
**(Pending)** Currently admin user is pending


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://iquiz.onrender.com/api/v1/user/
```



***Body:***

```js        
{
    "name": "Ali M",
    "phone": "+923244897384",
    "imageName": "1.png",
    "role": "user"
}
```



### 2. Get LoggedIn User



End point for getting current user.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://iquiz.onrender.com/api/v1/user/getUser
```



### 3. Update User details



Update user details.

- name and imageName can be updated.
- **(Pending)** Need to add admin user to update user.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://iquiz.onrender.com/api/v1/user/
```



***Body:***

```js        
{
    "name": "Ali Farzan",
    "imageName": "2.png"
}
```



## History

Saving and fetching quiz results.



### 1. Get All History Against User


Return all quiz attemped completed by user with some details(score, quiz name, attempted date)


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://iquiz.onrender.com/api/v1/history
```



### 2. Get Detailed History



Return detail of single quiz in details with correct and selected option.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://iquiz.onrender.com/api/v1/history/QUIZ_ID
```



### 3. Save History



Save a quiz attempt in history.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://iquiz.onrender.com/api/v1/history/
```



***Body:***

```js        
{
    "quizID" : "Quiz_ID",
    "anwsers" : [
            "A",
            "B",
            "C",
            "D",
            "F"
    ]
    
}
```



---
[Back to top](#iquiz)

>Generated at 2023-11-08 01:24:48 by [docgen](https://github.com/thedevsaddam/docgen)
