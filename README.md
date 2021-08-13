# overview_api
## [ETL Process](https://docs.google.com/document/d/1JbnGmiCtY8lXE16d7vOf6HJ3nPvRgVVyNVESXIq3T-0/edit)
1. Created schema/tables for database
   1. Also added `COPY ... FROM ...` statements to .sql files
2. Downloaded csv files to project directory
3. Created database using `psql` from command line
4. From command line, ran the following:
   1. `psql -U <user_name> <db_name> < <schema_filename>.sql`
5.