# Project goals
This project is for share my tech knowledge web<br>
[![image](https://github.com/samhuang95/my_web/assets/124756719/8c1ebb8d-abdb-4500-bc91-cdde83b83e9a)](https://youtu.be/RfNeaCq9UZg)


# How to build the project
1. Build the MongoDB server<br>
	use EC2 or VM build the docker-compose.yaml,<br>
	then get the MONGODB_URL. <br>

2. Add .env file to frontend and backend, the format be like<br>

   - frontend<br>
```bash
     VITE_PACKAGE_VERSION='0.0.1'
     VITE_SERVER={add your API server}
```
   - backend<br>
```bash
     DEV_MODE=true
     DB_NAME={MongoDB name}
     MONGODB_USER={MongoDB user name}
     MONGODB_PASSWORD={MongoDB password}
     MONGODB_URL={MongoDB host}
```	 
3. Run the vue project<br>
   Use VScode and enter 'npm run dev' in frontend and backend terminal.<br>
   Then the localhost is activate.<br>
