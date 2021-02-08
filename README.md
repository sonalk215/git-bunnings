# Bunnings Challenge
Create a catalog with merged products

## **Purpose**

* Application should be able to accept data as csv files from input folder and must produce a merged catalog as a csv file in output folder

## **Technologies Used**
* Developed on Windows 10 using Visual Studio Code


## **Dependencies Needed**
* react-papaparse  (Fastest in-browser CSV (or delimited text) parser for React)
* Jest (Inbuilt with create-react-app)
* Enzyme (Testing react component's output)


## **How to use**
* Clone the project from my GitHub account
* Change directory into the project folder
* Install all node packages
* Start the local server

FROM TERMINAL
* git clone https://github.com/sonalk215/git-bunnings.git
* cd catalog-bunnings
* npm install
* npm start


## **Design Implementation**

I created input csv files and placed them in input folder. For running the application, select the csv files from the folder, and then click on Generate Output button, which will create and download a csv file with the merged catalog of products from sources A and B.

## **Assumptions**
* 
* 

## **User Interface**
### **On startup, the landing page is displayed with all movies streaming in Cinemaworld & Filmworld**
 
<img src="prince-theatre/public/design/LandingPage.jpeg" />

### **On click of movie, below page displays movie title, poster and prices from each movie provider**

<img src="prince-theatre/public/design/MovieDetailPage.jpeg" />

### **On network error, we see the below screen**

<img src="prince-theatre/public/design/NetworkError.jpeg" />

### **On navigating to an unknown page, we go to page not found screen**

<img src="prince-theatre/public/design/PageNotFound.jpeg" />
