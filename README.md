# ApiNestjsPdf
 Creation of an API which is able to extract information from a pdf in NestJs

 # Running the app

Step 1 : Install the packages 

Command 1 : npm install

Step 2 : Start the app

Command 2 : npm start

# Root of the API

# Controller (data) : 

Root 1 : http://localhost:3000/data/text
Description root 1 : Return the text of the pdf
Test root 1 : curl -X GET -F "file=@./exempleCv/CV" http://localhost:3000/data/text


Root 2 : http://localhost:3000/data/numpage
Description root 2 : Return the number of page in the pdf
Test root 2 : curl -X GET -F "file=@./exempleCv/CV" http://localhost:3000/data/numpage

Root 3 : http://localhost:3000/data/info
Description root 3 : Return some information about the pdf (PDFVersion, author, title ...)
Test root 3 : curl -X GET -F "file=@./exempleCv/CV" http://localhost:3000/data/info

# Controller (cv) : 

Root 1 : http://localhost:3000/cv/experience
Description root 1 : Return the experience of the author of CV
Test root 1 : curl -X GET -F "file=@./exempleCv/CV3" http://localhost:3000/cv/experience

Root 2 : http://localhost:3000/cv/personal-information
Description root 2 : Return the personal information of the author of CV
Test root 2 : curl -X GET -F "file=@./exempleCv/CV" http://localhost:3000/cv/personal-information

Root 3 : http://localhost:3000/cv/associative-experience
Description root 3 : Return the associativ experience of the author of CV
Test root 3 : curl -X GET -F "file=@./exempleCv/CV3" http://localhost:3000/cv/associative-experience

Root 4 : http://localhost:3000/cv/language
Description root 4 : Return the information about the different languages 
Test root 4 : curl -X GET -F "file=@./exempleCv/CV3" http://localhost:3000/cv/language

Root 5 : http://localhost:3000/cv/formation
Description root 5 : Return the different formation of the author of CV
Test root 5 : curl -X GET -F "file=@./exempleCv/CV3" http://localhost:3000/cv/formation

Root 6 : http://localhost:3000/cv/hobbies
Description root 6 : Return the differents hobbies of the author of CV
Test root 6 : curl -X GET -F "file=@./exempleCv/CV3" http://localhost:3000/cv/hobbies

Root 7 : http://localhost:3000/cv/description
Description root 7 : Return a short description of tha author of CV
Test root 7 : curl -X GET -F "file=@./exempleCv/CV3" http://localhost:3000/cv/description