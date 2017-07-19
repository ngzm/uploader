#!/bin/bash

dtdir='data'
updir="${dtdir}/uploads"
dbfil="${dtdir}/db.uploader"

# make upload data's directory
if [ ! -d $updir ]; then
  mkdir -p $updir
fi

# create sqlite3 database for uploader
if [ ! -f $dbfil ]; then
  sqlite3 $dbfil << END
  CREATE TABLE upload_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    mime TEXT,
    size INTEGER,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
END
fi
