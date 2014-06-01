set mongoCmd=c:\data\mongodb\bin\mongod
set restDir=..\
set nodejsCmd=node
set dbpath=c:\data\db

taskkill /t /fi "WINDOWTITLE eq mongo-rest*"

rem timeout 6 >nul

start "mongo-rest mongo" %mongoCmd% --dbpath %dbpath%
start "mongo-rest node" %nodejsCmd% server.js

