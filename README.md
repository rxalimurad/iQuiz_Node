
# iQuiz

API for getting/create/delete quizes along with category

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [Categories](#categories)
    1. [Get All Categories](#1-get-all-categories)
    1. [Add New Category](#2-add-new-category)
    1. [Update Category Name](#3-update-category-name)
    1. [Delete Category](#4-delete-category)
* [Quiz](#quiz)
    1. [Get quiz with id](#1-get-quiz-with-id)
    1. [add new Quiz](#2-add-new-quiz)
    1. [Upload Quiz in bulk](#3-upload-quiz-in-bulk)
    1. [Delete Quiz](#4-delete-quiz)

--------



## Categories

For adding/deleting/uploading and fetching categories.



### 1. Get All Categories



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/category/
```



### 2. Add New Category



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/category/
```



***Body:***

```js        
{
    "name": "2022 Qestion papers"
}
```



### 3. Update Category Name



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/category/6547426c491d582f518c3897
```



***Body:***

```js        
{"name": "2505 fdfdf course"}
```



### 4. Delete Category



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/category/65474448252f82aaab1c7663
```



## Quiz

For adding/deleting/uploading and fetching quiz.



### 1. Get quiz with id



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/quiz/6547427b491d582f518c3899
```



### 2. add new Quiz



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/quiz/
```



***Body:***

```js        
{
    "categoryId": "6547427b491d582f518c3899",
    "question": "New Quiz Bb is tight23ddfdfdfdf6?",
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



### 3. Upload Quiz in bulk



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: {{URL}}/api/v1/quiz/bulkUpload
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| dataFile |  |  |



### 4. Delete Quiz



***Endpoint:***

```bash
Method: DELETE
Type: FORMDATA
URL: {{URL}}/api/v1/quiz/6547781ba35fc98b9e1d2faa
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| dataFile |  |  |



---
[Back to top](#iquiz)

>Generated at 2023-11-05 17:55:40 by [docgen](https://github.com/thedevsaddam/docgen)
