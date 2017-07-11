#!/bin/bash

sqlite3 db.uploader << END
CREATE TABLE upload_files (filename TEXT, path TEXT, mimetype TEXT, size INTEGER);
END
