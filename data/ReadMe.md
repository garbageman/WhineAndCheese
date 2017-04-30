# Using Mysql and Ruby

To start you are going to have to install a ruby gem that allows ruby to communicate with your mysql db. In order to install it you must run

`gem install mysql2 --with-mysql-config[=/path/to/mysql_config]`

You can find the path to your mysql config file by running this

`/path/to/msql --help`

This will show you something like this

```
./mysql  Ver 15.1 Distrib 10.1.19-MariaDB, for osx10.6 (i386) using  EditLine wrapper
Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Usage: ./mysql [OPTIONS] [database]

Default options are read from the following files in the given order:
/Applications/XAMPP/xamppfiles/etc/my.cnf ~/.my.cnf
```
