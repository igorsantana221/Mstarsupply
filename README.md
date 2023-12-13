
### Obs: Utilizar powershel para realizar o procedimento. 

### *** Executando Back-end 

### Criar Ambiente virtual
	# Linux
	
		python3 -m venv venv
		
	# Windows
	
		python -m venv venv

### Ativar
	# Linux
	
		source venv/bin/activate
		
	# Windows
	
		venv/Scripts/Activate

# Caso algum comando retorne um erro de permissão execute o código e tente novamente:

	Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  
### Instale as bibliotecas:

	pip install flask, flask_sqlalchemy, flask_marshmallow, flask_cors

### Iniciando Aplicação (Backend)
>Acesse mstarsupply/backend

	python app.py


### *** Executando Frontend 


### Instale as bibliotecas:
>Acesse mstarsupply/frontend

	npm install 

### Iniciando Aplicação (Frontend)

#Acesse mstarsupply/frontend

	npm start 
