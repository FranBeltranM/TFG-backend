#!/bin/bash

# Configuración
CONTAINER_NAME="mongo_container"                          # Nombre del contenedor de MongoDB
BACKUP_FILE="/path/to/local/backup/mongodb_backup.tar.gz" # Ruta al archivo de backup en la máquina local
TMP_DIR="/tmp/mongo_restore"                              # Directorio temporal para descomprimir el backup
MONGO_USER_NAME="root"
MONGO_USER_PASSWORD="argA84O4VQ51"

# Crear el directorio temporal para descomprimir el backup
mkdir -p $TMP_DIR

# Descomprimir el backup
echo "Descomprimiendo el backup..."
tar -xzvf $BACKUP_FILE -C $TMP_DIR

# Restaurar el backup dentro del contenedor
echo "Restaurando la base de datos dentro del contenedor..."
docker cp $TMP_DIR/mongodb_backup /data/restore
docker exec $CONTAINER_NAME mongorestore --username $MONGO_USER_NAME --password $MONGO_USER_PASSWORD /data/restore/mongodb_backup

# Limpiar el directorio temporal
rm -rf $TMP_DIR

# Eliminar los datos restaurados dentro del contenedor
docker exec $CONTAINER_NAME rm -rf /data/restore

echo "Restauración completada."
