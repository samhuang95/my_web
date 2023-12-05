# Project goals
This project is for share my tech knowledge web<br>

# How to build the project
1. Build the MongoDB server<br>
	use EC2 or VM build the docker-compose.yaml,<br>
	then get the MONGODB_URL. <br>

2. Add .env file to frontend and backend, the format be like<br>
   - frontend<br>
     VITE_PACKAGE_VERSION='0.0.1'<br>
     VITE_SERVER={add your API server}<br>
     
   - backend<br>
     DEV_MODE=true<br>
     DB_NAME={MongoDB name}<br>
     MONGODB_USER={MongoDB user name}<br>
     MONGODB_PASSWORD={MongoDB password}<br>
     MONGODB_URL={MongoDB host}<br>
	 
3. Run the vue project<br>
   Use VScode and enter 'npm run dev' in frontend and backend terminal.<br>
   Then the localhost is activate.<br>
