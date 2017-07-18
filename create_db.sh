#!/bin/bash

# move to data directory
cd data

# create sqlite3 database for uploader
sqlite3 db.uploader << END
CREATE TABLE upload_files (filename TEXT, path TEXT, mimetype TEXT, size INTEGER);
END
