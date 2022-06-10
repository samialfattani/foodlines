#!/bin/sh
cd "D:\Program Files\schemaSpy_5.0.0"
java -jar "schemaSpy_5.0.0.jar" -t pgsql -host horton.elephantsql.com -db qwuwjgeu -u qwuwjgeu -p iOxCHkWjMAfctkDi_N8N9V9CxB66DC8H -dp postgresql-42.2.2.jar -o output -s public -gv "graphviz-2.38\release" -hq

start "" "output/index.html"