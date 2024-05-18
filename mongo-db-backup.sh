#!/bin/bash

# Configuración
CONTAINER_NAME="mongo-db-mongo-1" # Nombre del contenedor de MongoDB
BACKUP_PATH="/home/backups"       # Ruta en la máquina local donde se guardará el backup
TIMESTAMP=$(date +%F-%H%M%S)      # Timestamp para el nombre del backup
BACKUP_NAME="mongodb_backup_$TIMESTAMP"
LOCAL_BACKUP_DIR="$BACKUP_PATH/$BACKUP_NAME"
MONGO_USER_NAME="root"
MONGO_USER_PASSWORD="argA84O4VQ51"

# Crear el directorio de backup local
mkdir -p $LOCAL_BACKUP_DIR

# Hacer el backup de MongoDB y guardarlo en un archivo en el sistema
echo "Realizando backup de MongoDB dentro del contenedor..."
docker exec $CONTAINER_NAME mongodump --username root --password $MONGO_USER_PASSWORD --out /data/backup

# Copiar el backup desde el contenedor a la máquina local
echo "Copiando el backup a la máquina local..."
docker cp $CONTAINER_NAME:/data/backup $LOCAL_BACKUP_DIR

# Comprimir el backup
echo "Comprimiendo el backup..."
tar cf - $LOCAL_BACKUP_DIR -P | pv -s $(du -sb $LOCAL_BACKUP_DIR | awk '{print $1}') | gzip >$LOCAL_BACKUP_DIR.tar.gz

# Eliminar el directorio temporal de backup
rm -rf $LOCAL_BACKUP_DIR

echo "Eliminando el backup del contenedor..."
docker exec $CONTAINER_NAME rm -rf /data/backup

echo "Backup completado: $LOCAL_BACKUP_DIR.tar.gz"
