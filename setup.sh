#!/bin/bash

# Nombre del entorno virtual
venv_name="venv"

# Comando para crear el entorno virtual
python3 -m venv "$venv_name"

# Activar el entorno virtual
source "$venv_name/bin/activate"

# Instalar paquetes con pip
pip3 install flask flask_bcrypt flask_session flask_sqlalchemy redis flask_cors

# Mostrar mensaje de finalización
echo "Entorno virtual '$venv_name' creado y paquetes instalados."

# Desactivar el entorno virtual (opcional)
# deactivate

